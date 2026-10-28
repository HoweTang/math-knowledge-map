"""Render each PDF page as a high-res PNG for easy attachment."""
import sys, os
os.environ['PYTHONIOENCODING'] = 'utf-8'
sys.stdout.reconfigure(encoding='utf-8')

import pdfplumber
from pathlib import Path

PDF = '盘古竞赛/qw.pdf'
OUT = Path('_tools/pdf_qw_pages')
OUT.mkdir(parents=True, exist_ok=True)

with pdfplumber.open(PDF) as pdf:
    for i, page in enumerate(pdf.pages):
        img = page.to_image(resolution=120)
        out_file = OUT / f'page_{i+1:02d}.png'
        img.save(out_file)
        print(f'Page {i+1:02d} → {out_file} ({out_file.stat().st_size//1024} KB)')
print(f'\n✓ Rendered {len(pdf.pages)} pages to {OUT}/')
