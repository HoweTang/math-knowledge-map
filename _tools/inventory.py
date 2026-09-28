"""Survey all Pangu PDFs: which are text-extractable, page count, character count."""
import pathlib
import re
import pdfplumber

FONT_REMAP = str.maketrans({
    "┼": "Å", "─": "Ä", "╓": "Ö",
    "σ": "å", "Σ": "ä", "÷": "ö",
    "╣": "ß", "μ": "ü",
    "⋆": "*",
})

FOLDER = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\盘古竞赛")

# Only papers, not solutions or answer keys (for now)
PATTERNS = [
    r"^Fragekatalog.*\.pdf$",
    r"^Fr.*gekatalog.*\.pdf$",     # 2016 files with mojibake filenames
    r"^PMT2\d{3}-.*\.pdf$",
    r"^Final-.*PMT16.*\.pdf$",
    r"^O2-.*PMT16.*\.pdf$",
]

def is_paper(name: str) -> bool:
    return any(re.match(p, name) for p in PATTERNS)

rows = []
for pdf in sorted(FOLDER.iterdir()):
    if not pdf.suffix.lower() == ".pdf" or not is_paper(pdf.name):
        continue
    try:
        with pdfplumber.open(pdf) as p:
            pages = len(p.pages)
            all_text = ""
            for pg in p.pages:
                t = pg.extract_text() or ""
                all_text += t
            all_text = all_text.translate(FONT_REMAP)
            chars = len(all_text)
            # Count "Uppgift N" markers as heuristic
            uppgift = len(re.findall(r"Uppgift\s+\d+", all_text))
            rows.append((pdf.name, pages, chars, uppgift))
    except Exception as e:
        rows.append((pdf.name, -1, -1, str(e)))

print(f"{'FILE':<50} {'PAGES':>6} {'CHARS':>7} {'UPPGIFT':>8}")
for r in rows:
    print(f"{r[0]:<50} {str(r[1]):>6} {str(r[2]):>7} {str(r[3]):>8}")
print(f"\nTotal papers: {len(rows)}")
