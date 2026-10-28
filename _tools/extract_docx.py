"""
Extract text and inventory images from .docx files without external deps.
Usage: python _tools/extract_docx.py <input.docx> <output_dir>
"""
import zipfile
import re
import os
import sys
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
    'pic': 'http://schemas.openxmlformats.org/drawingml/2006/picture',
    'wp': 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing',
}

def ns(tag, prefix):
    return f'{{{NS[prefix]}}}{tag}'

def extract(docx_path, out_dir):
    out = Path(out_dir)
    out.mkdir(parents=True, exist_ok=True)
    media_dir = out / 'media'
    media_dir.mkdir(exist_ok=True)

    with zipfile.ZipFile(docx_path) as z:
        # Dump all media files
        images = []
        for name in z.namelist():
            if name.startswith('word/media/'):
                data = z.read(name)
                fname = os.path.basename(name)
                (media_dir / fname).write_bytes(data)
                images.append(fname)

        # Parse document.xml
        doc_xml = z.read('word/document.xml')

        # Also parse the relationships to map rId -> image filename
        rels_xml = z.read('word/_rels/document.xml.rels')
        rels_root = ET.fromstring(rels_xml)
        rid_to_image = {}
        for rel in rels_root:
            rid = rel.attrib.get('Id', '')
            target = rel.attrib.get('Target', '')
            if 'image' in target.lower() or target.startswith('media/'):
                rid_to_image[rid] = os.path.basename(target)

    # Parse body
    root = ET.fromstring(doc_xml)
    body = root.find(ns('body', 'w'))

    output_lines = []
    image_counter = 0

    for para in body.iter(ns('p', 'w')):
        parts = []
        has_img = False
        for element in para.iter():
            tag = element.tag
            if tag == ns('t', 'w'):
                if element.text:
                    parts.append(element.text)
            elif tag == ns('tab', 'w'):
                parts.append('\t')
            elif tag == ns('br', 'w'):
                parts.append('\n')
            elif tag.endswith('}blip'):
                # Image reference
                embed = element.attrib.get(f'{{{NS["r"]}}}embed', '')
                if embed:
                    img = rid_to_image.get(embed, embed)
                    parts.append(f'[IMG:{img}]')
                    has_img = True
                    image_counter += 1

        line = ''.join(parts).strip()
        if line:
            output_lines.append(line)
        elif has_img:
            output_lines.append('[IMAGE-ONLY-PARAGRAPH]')

    text_file = out / 'extracted.txt'
    text_file.write_text('\n'.join(output_lines), encoding='utf-8')

    print(f'=== {Path(docx_path).name} ===')
    print(f'  Paragraphs with text: {len(output_lines)}')
    print(f'  Images: {len(images)}')
    print(f'  Image references in body: {image_counter}')
    print(f'  Output: {text_file}')
    print(f'  Media: {media_dir}/ ({len(images)} files)')
    print()
    print('--- First 60 lines ---')
    for line in output_lines[:60]:
        print(line)
    return output_lines, images

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: python extract_docx.py <input.docx> <output_dir>')
        sys.exit(1)
    extract(sys.argv[1], sys.argv[2])
