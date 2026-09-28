"""Extract text from a Pangu PDF for inspection.

Some Pangea PDFs use custom font mappings where Swedish characters
come out as codepage-swapped symbols. We remap the ones we know back
to Swedish letters so a human can read the extracted text.
"""
import sys
import pathlib
import pdfplumber

# Observed remap for the WSOY / Pangea font subset
FONT_REMAP = str.maketrans({
    "┼": "Å", "─": "Ä", "╓": "Ö",
    "σ": "å", "Σ": "ä", "÷": "ö",
    "╣": "ß", "μ": "ü",
    "⋆": "*",  # difficulty star
})

def extract(path, out_path=None):
    lines = []
    with pdfplumber.open(path) as pdf:
        for i, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            text = text.translate(FONT_REMAP)
            lines.append(f"===== PAGE {i} =====")
            lines.append(text)
            lines.append("")
    output = "\n".join(lines)
    if out_path:
        pathlib.Path(out_path).write_text(output, encoding="utf-8")
    else:
        # Force UTF-8 on stdout
        sys.stdout.reconfigure(encoding="utf-8")
        print(output)

if __name__ == "__main__":
    p = sys.argv[1]
    o = sys.argv[2] if len(sys.argv) > 2 else None
    extract(p, o)
