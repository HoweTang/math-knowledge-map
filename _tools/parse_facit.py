"""Parse official Pangea Facit (answer keys) PDFs into a JSON mapping:
    problem_id (e.g. "P2223O1_AK5_3") -> answer letter (a/b/c/d/e)

Output: _tools/facit_answers.json
"""
import json
import re
import pathlib
import pdfplumber

FOLDER = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\盘古竞赛")

FONT_REMAP = str.maketrans({
    "┼": "Å", "─": "Ä", "╓": "Ö",
    "σ": "å", "Σ": "ä", "÷": "ö",
    "╣": "ß", "μ": "ü",
    "⋆": "*",
})

# ID prefix helper
def build_id(year_code, round_code, grade, qnum):
    """Build problem id following existing schema.
    year_code: '1516'..'2526'
    round_code: 'O1' / 'O2' / 'F'
    grade: 4..9
    qnum: 1..15
    """
    # AK4 problems (2024/25 and 2025/26) use bare ids like P2425O1_1
    # All other AK4 use the _AK4_ form... actually no, existing AK4 use bare form.
    # AK5-9 always use _AK{n}_ form.
    if grade == 4:
        # For "modern" years (24/25, 25/26) the id is bare: P2425O1_1
        # For historical AK4 (15/16, 21/22, 22/23, 23/24) also bare per our schema:
        return f"P{year_code}{round_code}_{qnum}"
    return f"P{year_code}{round_code}_AK{grade}_{qnum}"


def parse_grid_format(text, grade_cols=(4, 5, 6, 7, 8, 9)):
    """Parse the 6-column grid format:
        "1 e e d a b a 1"   or   "d c d e a e" followed by "1"
    Returns dict: qnum -> { grade: letter }
    """
    answers = {}
    lines = [l.strip() for l in text.split('\n')]

    # Format A: number-letters-optional number
    for line in lines:
        m = re.match(r'^(\d+)\s+((?:[a-eA-E]\s+){' + str(len(grade_cols)-1) + r'}[a-eA-E])(?:\s+\d+)?$', line)
        if m:
            q = int(m.group(1))
            letters = m.group(2).split()
            if len(letters) == len(grade_cols):
                answers[q] = {g: letters[i].lower() for i, g in enumerate(grade_cols)}
                continue

    # Format B: letters-only line followed by number
    for i, line in enumerate(lines):
        m1 = re.match(r'^((?:[a-eA-E]\s+){' + str(len(grade_cols)-1) + r'}[a-eA-E])$', line)
        if m1 and i + 1 < len(lines):
            m2 = re.match(r'^(\d+)$', lines[i + 1])
            if m2:
                q = int(m2.group(1))
                letters = m1.group(1).split()
                if len(letters) == len(grade_cols):
                    answers[q] = {g: letters[i2].lower() for i2, g in enumerate(grade_cols)}

    return answers


def parse_side_by_side(text, grade_cols=(7, 8, 9)):
    """Parse the '3 side-by-side small tables' format used by 2020/21 Facits:
       "1 a 1 b 1 e"    (qnum + letter, three times)
    Returns dict: qnum -> { grade: letter }
    """
    answers = {}
    for line in text.split('\n'):
        line = line.strip()
        parts = line.split()
        # Expected: 6 tokens: N L N L N L, all Ns equal
        if len(parts) == 2 * len(grade_cols):
            try:
                nums = [int(parts[i]) for i in range(0, len(parts), 2)]
                letters = [parts[i].lower() for i in range(1, len(parts), 2)]
                if all(n == nums[0] for n in nums) and all(re.match(r'^[a-e]$', l) for l in letters):
                    q = nums[0]
                    answers[q] = {g: letters[i2] for i2, g in enumerate(grade_cols)}
            except ValueError:
                pass
    return answers


def extract_text(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        return "\n".join((p.extract_text() or "").translate(FONT_REMAP) for p in pdf.pages)


# Mapping of Facit files → (year_code, round_code, format, grades)
# PMT2122 = 2021/22 season; PMT2223 = 2022/23; PMT2324 = 2023/24
# Facit_O1_2021 / Pangea-Final-2021-Facit = 2020/21 season (id year_code "2021")
FACIT_FILES = [
    # (filename, year_code, round_code, parser, grades)
    ("Facit-O1-2223.pdf",                     "2223", "O1", "grid",  (4, 5, 6, 7, 8, 9)),
    ("Facit-_-Arskurs-4-_PMT2324.pdf",        "2324", "O1", "grid",  (4, 5, 6, 7, 8, 9)),
    ("Facit-_-Final-arskurs-4-9-PMT2223.pdf", "2223", "F",  "grid",  (4, 5, 6, 7, 8, 9)),
    ("Facit-Final-PMT2122.pdf",               "2122", "F",  "grid",  (4, 5, 6, 7, 8, 9)),
    ("Facit_O1_2021.pdf",                     "2021", "O1", "side",  (7, 8, 9)),
    ("Pangea-Final-2021-Facit.docx.pdf",      "2021", "F",  "side",  (7, 8, 9)),
]


def main():
    out_map = {}
    for fname, year, rnd, fmt, grades in FACIT_FILES:
        p = FOLDER / fname
        if not p.exists():
            print(f"[MISS] {fname}")
            continue
        text = extract_text(p)
        if fmt == "grid":
            grid = parse_grid_format(text, grades)
        else:
            grid = parse_side_by_side(text, grades)

        n_added = 0
        for qnum, g_map in grid.items():
            for g, letter in g_map.items():
                pid = build_id(year, rnd, g, qnum)
                out_map[pid] = letter
                n_added += 1
        print(f"[OK]   {fname}  ({fmt})  → {n_added} answers ({len(grid)} questions × {len(grades)} grades)")

    # Note: 2021 files use year_code "2021" but our schema uses "2021/22" and "2020/21".
    # Reality: Facit_O1_2021 (Oct 2020) = 2020/21 O1  → year_code should be "2021" -> we map to "2021" but data uses "2020/21".
    # I'll keep the raw and post-process below.

    out = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\_tools\facit_answers.json")
    out.write_text(json.dumps(out_map, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\nTotal: {len(out_map)} answers → {out}")


if __name__ == "__main__":
    main()
