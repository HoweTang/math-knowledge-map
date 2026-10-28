"""Extract docx keeping image markers in-place with text."""
import zipfile, re, os, sys
import xml.etree.ElementTree as ET
from pathlib import Path

NS = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main',
    'a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
    'r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
}
def ns(tag, prefix): return f'{{{NS[prefix]}}}{tag}'

def extract(docx_path, out_dir):
    out = Path(out_dir); out.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(docx_path) as z:
        doc_xml = z.read('word/document.xml')
        rels = ET.fromstring(z.read('word/_rels/document.xml.rels'))
        rid_to_img = {r.attrib.get('Id',''): os.path.basename(r.attrib.get('Target','')) for r in rels if 'image' in r.attrib.get('Target','').lower()}
    root = ET.fromstring(doc_xml)
    body = root.find(ns('body', 'w'))
    output_lines = []
    for para in body.iter(ns('p', 'w')):
        parts = []
        for element in para.iter():
            tag = element.tag
            if tag == ns('t', 'w'):
                if element.text: parts.append(element.text)
            elif tag == ns('tab', 'w'):
                parts.append('\t')
            elif tag == ns('br', 'w'):
                parts.append('\n')
            elif tag.endswith('}blip'):
                embed = element.attrib.get(f'{{{NS["r"]}}}embed', '')
                if embed:
                    img = rid_to_img.get(embed, embed)
                    parts.append(f'\n[IMG:{img}]\n')
        line = ''.join(parts).strip()
        if line:
            output_lines.append(line)
    (out / 'extracted_v2.txt').write_text('\n'.join(output_lines), encoding='utf-8')
    return output_lines

if __name__ == '__main__':
    import os
    os.environ['PYTHONIOENCODING'] = 'utf-8'
    sys.stdout.reconfigure(encoding='utf-8')
    lines = extract(sys.argv[1], sys.argv[2])
    print(f'Output lines: {len(lines)}')
    print(f'Saved to {sys.argv[2]}/extracted_v2.txt')
