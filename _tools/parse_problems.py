"""Parse every Pangu PDF into structured problem records.

Output: _tools/problems_raw.json
Each record: {file, page, num, difficulty, stem, options, ak, year, round}
"""
import json
import pathlib
import re
import pdfplumber

FOLDER = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\盘古竞赛")

FONT_REMAP = str.maketrans({
    "┼": "Å", "─": "Ä", "╓": "Ö",
    "σ": "å", "Σ": "ä", "÷": "ö",
    "╣": "ß", "μ": "ü",
    "⋆": "*",
})

PAPER_PATTERNS = [
    r"^Fragekatalog.*\.pdf$",
    r"^Fr.*gekatalog.*\.pdf$",
    r"^PMT2\d{3}-.*\.pdf$",
    r"^Final-.*PMT16.*\.pdf$",
    r"^O2-.*PMT16.*\.pdf$",
]


def is_paper(name):
    return any(re.match(p, name) for p in PAPER_PATTERNS)


def guess_meta(filename):
    """Infer (ak, year, round) from filename."""
    fn = filename.lower()

    # årskurs (grade)
    ak = 0
    for pat in [r"ak\s*[-_]?\s*(\d)", r"k(\d)-pmt16", r"k(\d)[-_]pmt16",
                r"pmt\d{4}[-_](\d)[-_]", r"ar\s*[-_]?\s*(\d)"]:
        m = re.search(pat, fn)
        if m:
            ak = int(m.group(1))
            break

    # year
    year = None
    if "pmt2526" in fn:
        year = "2025/26"
    elif "pmt2425" in fn:
        year = "2024/25"
    elif "pmt2324" in fn:
        year = "2023/24"
    elif "pmt2223" in fn:
        year = "2022/23"
    elif "pmt2122" in fn:
        year = "2021/22"
    elif "pmt16" in fn:
        year = "2015/16"
    elif "2021" in fn:
        year = "2020/21"

    # round
    if "final" in fn:
        rnd = "决赛"
    elif "o2" in fn or "andra" in fn:
        rnd = "复赛"
    elif "o1" in fn or "-01-" in fn or "-01." in fn or "forsta" in fn:
        rnd = "初赛"
    else:
        rnd = "初赛"

    return ak, year, rnd


DIFF_TOKENS = [
    ("(cid:70)(cid:70)(cid:70)(cid:70)(cid:70)", 5),
    ("(cid:70)(cid:70)(cid:70)(cid:70)", 4),
    ("(cid:70)(cid:70)(cid:70)", 3),
    ("(cid:70)(cid:70)", 2),
    ("(cid:70)", 1),
    ("*****", 5), ("****", 4), ("***", 3), ("**", 2), ("*", 1),
]


def strip_diff(header):
    """From 'Fråga 5 (cid:70)(cid:70)' or 'Uppgift 5 ****' return (num, diff, rest)."""
    m = re.match(r"^(?:Fråga|Uppgift)\s+(\d+)\s*(.*)$", header.strip())
    if not m:
        return None, None, header
    num = int(m.group(1))
    rest = m.group(2).strip()
    diff = None
    for token, val in DIFF_TOKENS:
        if rest.startswith(token):
            diff = val
            rest = rest[len(token):].strip()
            break
    return num, diff, rest


def parse_options(line):
    """Given a line, find a) b) c) d) e) options and return list or None."""
    if not re.search(r"\ba\)", line):
        return None
    parts = re.split(r"\s+(?=[a-e]\))", line)
    opts = []
    for p in parts:
        m = re.match(r"^([a-e])\)\s*(.+)$", p.strip())
        if m:
            opts.append(m.group(2).strip())
    return opts if len(opts) >= 3 else None


def parse_all(pages):
    """pages: list of (pageno, text). Returns list of problem dicts."""
    # 1) detect format
    all_text = "\n".join(t for _, t in pages)
    has_fraga = re.search(r"\b(?:Fråga|Uppgift)\s+\d+", all_text) is not None

    # 2) join with page markers so we know which page each problem starts on
    lines_with_page = []
    for pageno, text in pages:
        for ln in text.split("\n"):
            lines_with_page.append((pageno, ln))

    problems = []
    cur = None

    def flush():
        if not cur:
            return
        stem_lines = []
        options = None
        for ln in cur["lines"]:
            if options is None and re.search(r"\ba\)", ln) and re.search(r"\bb\)", ln):
                options = parse_options(ln)
                if not options:
                    stem_lines.append(ln)
            else:
                stem_lines.append(ln)
        cur["stem"] = "\n".join(stem_lines).strip()
        cur["options"] = options
        del cur["lines"]
        problems.append(cur)

    if has_fraga:
        for pageno, ln in lines_with_page:
            stripped = ln.strip()
            m = re.match(r"^(Fråga|Uppgift)\s+(\d+)", stripped)
            if m:
                flush()
                num, diff, rest = strip_diff(stripped)
                cur = {"page": pageno, "num": num, "difficulty": diff, "lines": []}
                if rest:
                    cur["lines"].append(rest)
            else:
                if cur is not None and stripped and not stripped.startswith("(cid:"):
                    cur["lines"].append(ln)
    else:
        # 2016 format: line starting with a small integer
        expected = 1
        for pageno, ln in lines_with_page:
            stripped = ln.strip()
            m = re.match(r"^(\d{1,2})\s+(.+)$", stripped)
            started = False
            if m:
                n = int(m.group(1))
                rest = m.group(2).strip()
                # sanity: must be sequential, must look like problem text
                if n == expected and len(rest) > 5 and not re.match(r"^(m|cm|kg|min|år|st|sida)\b", rest, re.IGNORECASE):
                    flush()
                    cur = {"page": pageno, "num": n, "difficulty": None, "lines": [rest]}
                    expected = n + 1
                    started = True
            if not started and cur is not None and stripped and not stripped.startswith("(cid:"):
                cur["lines"].append(ln)
    flush()
    return problems


def main():
    ak_year_round = {}
    all_records = []

    for pdf in sorted(FOLDER.iterdir()):
        if not (pdf.suffix.lower() == ".pdf" and is_paper(pdf.name)):
            continue
        ak, year, rnd = guess_meta(pdf.name)
        with pdfplumber.open(pdf) as p:
            pages = []
            for pageno, page in enumerate(p.pages, start=1):
                text = (page.extract_text() or "").translate(FONT_REMAP)
                pages.append((pageno, text))
        probs = parse_all(pages)
        for pr in probs:
            all_records.append({
                "file": pdf.name,
                "page": pr["page"],
                "ak": ak, "year": year, "round": rnd,
                "num": pr["num"],
                "difficulty": pr["difficulty"],
                "stem": pr["stem"],
                "options": pr["options"],
            })
        ak_year_round[(ak, year, rnd, pdf.name)] = len(probs)

    out = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\_tools\problems_raw.json")
    out.write_text(json.dumps(all_records, ensure_ascii=False, indent=2), encoding="utf-8")

    lines = [f"Total problems extracted: {len(all_records)}\n"]
    lines.append(f"{'FILE':<48} {'AK':>3} {'YEAR':>8} {'ROUND':>6} {'#':>3}")
    for (ak, year, rnd, fn), count in sorted(ak_year_round.items()):
        lines.append(f"{fn:<48} {str(ak):>3} {str(year):>8} {rnd:>6} {str(count):>3}")
    summary = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\_tools\parse_summary.txt")
    summary.write_text("\n".join(lines), encoding="utf-8")
    print(f"Summary: {summary}")


if __name__ == "__main__":
    main()
