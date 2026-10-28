"""Extract text and image positions from qw.pdf page by page."""
import sys, os, json
os.environ['PYTHONIOENCODING'] = 'utf-8'
sys.stdout.reconfigure(encoding='utf-8')

import pdfplumber
from pathlib import Path

PDF = '盘古竞赛/qw.pdf'
OUT = '_tools/pdf_qw'
Path(OUT).mkdir(parents=True, exist_ok=True)

pages_data = []
with pdfplumber.open(PDF) as pdf:
    print(f'Total pages: {len(pdf.pages)}')
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ''
        imgs = page.images  # list of dicts with page position
        pages_data.append({
            'page': i + 1,
            'text': text,
            'image_count': len(imgs),
            'width': page.width,
            'height': page.height,
        })
        print(f'--- Page {i+1} ({page.width}x{page.height}, {len(imgs)} imgs, {len(text)} chars) ---')
        print(text[:500])
        print()

with open(f'{OUT}/pages.json', 'w', encoding='utf-8') as f:
    json.dump(pages_data, f, ensure_ascii=False, indent=2)
print(f'✓ Saved {OUT}/pages.json')
