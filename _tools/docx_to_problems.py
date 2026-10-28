"""Parse docx using python-docx and segment into problems with image references."""
import sys, os, json
os.environ['PYTHONIOENCODING'] = 'utf-8'
sys.stdout.reconfigure(encoding='utf-8')

from docx import Document
from pathlib import Path

def parse_docx(docx_path):
    doc = Document(docx_path)
    # Build a map rId -> image filename
    rels = doc.part.rels
    rid_to_img = {}
    for rel_id, rel in rels.items():
        if 'image' in rel.target_ref.lower():
            rid_to_img[rel_id] = os.path.basename(rel.target_ref)

    # Iterate paragraphs in order
    all_items = []  # list of {type:'text'|'img', value:str}
    for para in doc.paragraphs:
        text = para.text.strip()
        # Find images in this paragraph by searching the XML
        imgs = []
        for run in para.runs:
            # Look for blip refs in run's XML
            xml = run._element.xml
            # Simple regex
            import re
            for m in re.finditer(r'r:embed="([^"]+)"', xml):
                rid = m.group(1)
                img = rid_to_img.get(rid)
                if img: imgs.append(img)
        if text:
            all_items.append({'type': 'text', 'value': text})
        for img in imgs:
            all_items.append({'type': 'img', 'value': img})
    return all_items

def segment_problems(items):
    """Group items into problems. Each starts with '任务X' header."""
    problems = []
    current = None
    for it in items:
        if it['type'] == 'text' and it['value'] in ('任务一','任务二','任务三','任务四'):
            if current:
                problems.append(current)
            current = {
                'taskLabel': it['value'],
                'items': [],
            }
        elif current:
            current['items'].append(it)
    if current:
        problems.append(current)
    # Parse each
    for i, p in enumerate(problems):
        p['idx'] = i + 1
        texts = [it['value'] for it in p['items'] if it['type']=='text']
        imgs = [it['value'] for it in p['items'] if it['type']=='img']
        p['images'] = imgs
        p['textLines'] = texts
        # Extract fields
        import re
        for t in texts:
            m = re.match(r'^(\d+)\s*分$', t)
            if m: p['points'] = int(m.group(1))
            if t.startswith('你的回答是：'):
                p['rawAnswer'] = t.replace('你的回答是：', '').strip()
        # Question text: skip header/metadata/options
        question_lines = []
        option_lines = []
        for t in texts:
            if re.match(r'^\d+\s*\d+$', t): continue  # dimensions
            if re.match(r'^\d+\s*分$', t): continue
            if t in ('.审判', '审判', '检查'): continue
            if t.startswith('你的回答是：'): continue
            if re.match(r'^[A-Ea-e]\)', t):
                option_lines.append(t)
            else:
                if option_lines:
                    option_lines.append(t)  # continuation
                else:
                    question_lines.append(t)
        p['questionZh'] = ' '.join(question_lines)
        p['optionsRaw'] = option_lines
    return problems

if __name__ == '__main__':
    docx = sys.argv[1]
    out = sys.argv[2]
    items = parse_docx(docx)
    print(f'Total items: {len(items)} (text + images intermixed)')
    text_count = sum(1 for i in items if i['type']=='text')
    img_count = sum(1 for i in items if i['type']=='img')
    print(f'  Texts: {text_count}, Images: {img_count}')

    problems = segment_problems(items)
    print(f'Problems: {len(problems)}')

    # Save
    Path(out).mkdir(exist_ok=True)
    with open(f'{out}/problems_v2.json', 'w', encoding='utf-8') as f:
        json.dump(problems, f, ensure_ascii=False, indent=2)
    print(f'Saved {out}/problems_v2.json')

    # Preview first 5
    print('\n=== First 5 problems ===')
    for p in problems[:5]:
        print(f"\n--- P{p['idx']} ({p['taskLabel']}, {p.get('points','?')}分, 答:{p.get('rawAnswer','?')}) ---")
        print(f"Images: {p['images']}")
        print(f"Q: {p['questionZh']}")
        print(f"Options: {p['optionsRaw']}")
