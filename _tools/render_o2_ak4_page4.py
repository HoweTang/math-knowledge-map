"""Render page 4 of O2-AK4 PDF (where the 蚂蚁绕图一圈 problem is)."""
import sys, os
os.environ['PYTHONIOENCODING'] = 'utf-8'
sys.stdout.reconfigure(encoding='utf-8')

import pdfplumber
from pathlib import Path

PDF = '盘古竞赛/O2-ü0ç3k4-PMT16.pdf'
OUT = Path('_tools/pdf_o2ak4')
OUT.mkdir(parents=True, exist_ok=True)

with pdfplumber.open(PDF) as pdf:
    print(f'PDF: {PDF}')
    print(f'Total pages: {len(pdf.pages)}')
    for i, page in enumerate(pdf.pages):
        text = page.extract_text() or ''
        print(f'\n--- Page {i+1} ({len(text)} chars) ---')
        print(text[:800])
        # Render page as PNG for viewing
        if i+1 in [4, 5]:  # focus on page 4 and 5
            img = page.to_image(resolution=150)
            out_file = OUT / f'page_{i+1:02d}.png'
            img.save(out_file)
            print(f'  → saved {out_file} ({out_file.stat().st_size//1024} KB)')
