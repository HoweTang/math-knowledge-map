"""Render pages of 学而思秘籍 lecture PDFs (scanned images) and OCR them.

The PDFs have no text layer, so text has to come from OCR (RapidOCR / PaddleOCR models via onnxruntime).
Results are cached as JSON in _tools/xes_ocr/ so the (slow) OCR only ever runs once per page.

Lecture pages take ~2-4 s each (a whole 32-page lecture ~100 s). Answer-book pages are dense two-column text
and take ~10 s each, so for answer books we first build a cheap heading index (low resolution) and then OCR only
the pages that belong to the lectures we need.

Usage:
    python _tools/ocr_xes.py --lectures 4-6,5-15            # OCR whole lectures
    python _tools/ocr_xes.py --lectures 4-6 --pages 3-9     # only some pages
    python _tools/ocr_xes.py --level 4                      # every lecture in level 4
    python _tools/ocr_xes.py --answers 4 --only 6,12        # answer pages of lectures 6 and 12 in the level-4 answer book
    python _tools/ocr_xes.py --answers 4                    # the whole answer book of level 4 (slow)
    python _tools/ocr_xes.py --plan                         # everything listed in _tools/xes_ocr_plan.json
    python _tools/ocr_xes.py --lectures 4-6 --force         # ignore cache
    python _tools/ocr_xes.py --bench                        # time a few pages

Requires:  pip install rapidocr-onnxruntime==1.4.4 pypdfium2
"""
import argparse
import glob
import json
import os
import re
import sys
import time

import numpy as np
import pypdfium2 as pdfium

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
SRC = os.path.join(ROOT, '学而思数学')
OUT = os.path.join(os.path.dirname(__file__), 'xes_ocr')

_engine = None


def get_engine():
    global _engine
    if _engine is None:
        from rapidocr_onnxruntime import RapidOCR
        _engine = RapidOCR()
    return _engine


def level_folder(level):
    hits = glob.glob(os.path.join(SRC, '%02d级-*' % level))
    return hits[0] if hits else None


def find_lecture_pdf(level, no):
    folder = level_folder(level)
    if not folder:
        return None
    for f in os.listdir(folder):
        m = re.search(r'第\s*(\d+)\s*讲', f)
        if m and int(m.group(1)) == no and f.lower().endswith('.pdf'):
            return os.path.join(folder, f)
    return None


def find_answer_pdf(level):
    folder = level_folder(level)
    if not folder:
        return None
    for f in os.listdir(folder):
        if '参考答案' in f and f.lower().endswith('.pdf'):
            return os.path.join(folder, f)
    return None


def parse_pages(spec, total):
    if not spec:
        return list(range(1, total + 1))
    pages = []
    if isinstance(spec, (list, tuple)):
        pages = list(spec)
    else:
        for part in spec.split(','):
            if '-' in part:
                a, b = part.split('-')
                pages.extend(range(int(a), int(b) + 1))
            else:
                pages.append(int(part))
    return sorted(set(p for p in pages if 1 <= p <= total))


def ocr_page(pdf, page_no, scale):
    """Return list of {text, score, box:[x1,y1,x2,y2]} plus the image size."""
    img = pdf[page_no - 1].render(scale=scale).to_pil().convert('RGB')
    arr = np.array(img)[:, :, ::-1]  # RGB -> BGR for OpenCV based engines
    result, _ = get_engine()(arr)
    items = []
    for box, text, score in (result or []):
        xs = [p[0] for p in box]
        ys = [p[1] for p in box]
        items.append({
            'text': text.strip(),
            'score': round(float(score), 3),
            'box': [round(min(xs)), round(min(ys)), round(max(xs)), round(max(ys))],
        })
    return [i for i in items if i['text']], img.size


def merge_lines(items):
    """Join OCR segments that sit on the same visual line (single-column pages)."""
    items = sorted(items, key=lambda i: ((i['box'][1] + i['box'][3]) / 2, i['box'][0]))
    lines = []
    for it in items:
        cy = (it['box'][1] + it['box'][3]) / 2
        h = max(it['box'][3] - it['box'][1], 1)
        if lines and abs(lines[-1]['cy'] - cy) < h * 0.55:
            ln = lines[-1]
            ln['parts'].append(it)
            ln['cy'] = (ln['cy'] + cy) / 2
        else:
            lines.append({'cy': cy, 'parts': [it]})
    out = []
    for ln in lines:
        parts = sorted(ln['parts'], key=lambda i: i['box'][0])
        out.append({
            'text': ' '.join(p['text'] for p in parts),
            'x': min(p['box'][0] for p in parts),
            'y': min(p['box'][1] for p in parts),
            'x2': max(p['box'][2] for p in parts),
            'y2': max(p['box'][3] for p in parts),
            'score': round(sum(p['score'] for p in parts) / len(parts), 3),
        })
    return out


def merge_lines_two_columns(items, width):
    """Answer books are laid out in two columns: split by x, read the left column first, then the right."""
    left = [i for i in items if (i['box'][0] + i['box'][2]) / 2 < width * 0.5]
    right = [i for i in items if (i['box'][0] + i['box'][2]) / 2 >= width * 0.5]
    out = []
    for col, group in ((0, left), (1, right)):
        for ln in merge_lines(group):
            ln['col'] = col
            out.append(ln)
    return out


def ocr_strip(pdf, page_no, scale, frac=0.22):
    """OCR only the top strip of a page (enough to read a lecture heading, and far cheaper than a full page)."""
    img = pdf[page_no - 1].render(scale=scale).to_pil().convert('RGB')
    w, h = img.size
    img = img.crop((0, 0, w, int(h * frac)))
    arr = np.array(img)[:, :, ::-1]
    result, _ = get_engine()(arr)
    return [{'text': t.strip()} for _, t, _ in (result or []) if t.strip()]


def answer_pages_for(level, lecture_nos, scale=1.2):
    """Cheap pass: read the top strip of every answer-book page to find where each lecture starts.
    (In these books every lecture starts at the top of a page.)"""
    pdf_path = find_answer_pdf(level)
    if not pdf_path:
        return None, None
    os.makedirs(OUT, exist_ok=True)
    idx_path = os.path.join(OUT, 'A%02d_index.json' % level)
    pdf = pdfium.PdfDocument(pdf_path)
    total = len(pdf)
    if os.path.exists(idx_path):
        with open(idx_path, encoding='utf-8') as f:
            index = json.load(f)
    else:
        index = {'level': level, 'pageCount': total, 'headings': {}}
    t0 = time.time()
    for p in range(1, total + 1):
        if str(p) in index['headings']:
            continue
        items = ocr_strip(pdf, p, scale)
        nos = []
        for it in items:
            for m in re.finditer(r'第\s*(\d{1,2})\s*讲', it['text']):
                nos.append(int(m.group(1)))
        index['headings'][str(p)] = nos
        with open(idx_path, 'w', encoding='utf-8') as f:
            json.dump(index, f, ensure_ascii=False)
    if time.time() - t0 > 1:
        print('  A%02d index built in %.0fs' % (level, time.time() - t0), flush=True)

    def first_pages():
        fp = {}  # lecture no -> first page where its heading appears
        for p in range(1, total + 1):
            for n in index['headings'].get(str(p), []):
                fp.setdefault(n, p)
        return fp

    first = first_pages()
    # Fallback for lectures whose heading was missed by the cheap strip pass: rescan the pages between the
    # neighbouring headings that we do know, with a taller strip and a higher resolution.
    for n in lecture_nos:
        if n in first:
            continue
        prev = max([first[k] for k in first if k < n], default=0)
        nxt = min([first[k] for k in first if k > n], default=total + 1)
        rescanned = index.setdefault('rescanned', {})
        for p in range(prev + 1, nxt):
            if str(p) in rescanned or index['headings'].get(str(p)):
                continue
            items = ocr_strip(pdf, p, 1.6, frac=0.45)
            nos = [int(m.group(1)) for it in items for m in re.finditer(r'第\s*(\d{1,2})\s*讲', it['text'])]
            rescanned[str(p)] = True
            if nos:
                index['headings'][str(p)] = nos
            with open(idx_path, 'w', encoding='utf-8') as f:
                json.dump(index, f, ensure_ascii=False)
            if n in nos:
                break
        first = first_pages()

    # Second fallback: in some books the heading sits mid-page (below the previous lecture's last exercises), so the
    # top strip never sees it. Read whole pages (lower resolution) between the known neighbours until it shows up.
    for n in lecture_nos:
        if n in first:
            continue
        prev = max([first[k] for k in first if k < n], default=0)
        nxt = min([first[k] for k in first if k > n], default=total + 1)
        full = index.setdefault('full', {})
        for p in range(prev + 1, nxt):
            if str(p) in full:
                continue
            items, _ = ocr_page(pdf, p, 1.0)
            nos = [int(m.group(1)) for it in items for m in re.finditer(r'第\s*(\d{1,2})\s*讲', it['text'])]
            full[str(p)] = True
            if nos:
                index['headings'].setdefault(str(p), [])
                index['headings'][str(p)] = sorted(set(index['headings'][str(p)] + nos))
            with open(idx_path, 'w', encoding='utf-8') as f:
                json.dump(index, f, ensure_ascii=False)
            print('  A%02d full-page scan p%d -> headings %s' % (level, p, nos), flush=True)
            if n in nos:
                break
        first = first_pages()

    wanted = set()
    for n in lecture_nos:
        if n not in first:
            print('  !! heading for lecture %d not found in the level-%d answer book index' % (n, level))
            continue
        start = first[n]
        later = [first[k] for k in first if k > n]
        end = min(later) if later else min(total, start + 3)
        end = max(end, start)
        # the next heading may simply have been missed by the cheap pass; a lecture is ~2-4 pages in these books,
        # so never read more than 5 pages for one lecture (each answer page costs ~10 s)
        end = min(end, start + 4)
        # a heading may sit mid-page, so the previous lecture can share the start page: keep [start, end]
        wanted.update(range(start, min(end, total) + 1))
    return pdf_path, sorted(wanted)


def run_pdf(pdf_path, out_name, pages, scale, force, meta, two_columns=False):
    os.makedirs(OUT, exist_ok=True)
    out_path = os.path.join(OUT, out_name + '.json')
    existing = None
    if os.path.exists(out_path) and not force:
        with open(out_path, encoding='utf-8') as f:
            existing = json.load(f)
    pdf = pdfium.PdfDocument(pdf_path)
    total = len(pdf)
    wanted = parse_pages(pages, total)
    data = existing or dict(meta, file=os.path.relpath(pdf_path, ROOT).replace('\\', '/'), pageCount=total, scale=scale, pages={})
    todo = [p for p in wanted if str(p) not in data['pages']]
    if not todo:
        print('  %s: cached (%d pages)' % (out_name, len(data['pages'])), flush=True)
        return data
    t0 = time.time()
    for p in todo:
        t1 = time.time()
        items, size = ocr_page(pdf, p, scale)
        lines = merge_lines_two_columns(items, size[0]) if two_columns else merge_lines(items)
        data['pages'][str(p)] = {'size': size, 'lines': lines}
        print('  %s p%02d: %d lines, %.1fs' % (out_name, p, len(lines), time.time() - t1), flush=True)
        # save as we go so a crash does not lose everything
        with open(out_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False)
    print('  %s: %d pages in %.0fs' % (out_name, len(todo), time.time() - t0), flush=True)
    return data


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('--lectures', help='comma list like 4-6,5-15 (level-lecture)')
    ap.add_argument('--level', type=int, help='OCR all lectures of one level')
    ap.add_argument('--answers', type=int, help='OCR the answer book of one level')
    ap.add_argument('--only', help='with --answers: only these lecture numbers, e.g. 6,12 (uses the heading index)')
    ap.add_argument('--pages', help='page spec like 3-9,12')
    ap.add_argument('--scale', type=float, default=1.6)
    ap.add_argument('--force', action='store_true')
    ap.add_argument('--bench', action='store_true')
    ap.add_argument('--plan', action='store_true', help='run everything listed in _tools/xes_ocr_plan.json')
    args = ap.parse_args()

    if args.bench:
        pdf = pdfium.PdfDocument(find_lecture_pdf(4, 6))
        t = time.time()
        get_engine()
        print('engine load %.1fs' % (time.time() - t))
        for p in (6, 7, 10):
            t = time.time()
            items, size = ocr_page(pdf, p, args.scale)
            print('page %d: %d segments, %.1fs, size=%s' % (p, len(items), time.time() - t, size))
        return

    # ---- build the job list ----
    lecture_jobs = []
    if args.lectures:
        for part in args.lectures.split(','):
            l, n = part.split('-')
            lecture_jobs.append((int(l), int(n)))
    if args.level:
        folder = level_folder(args.level)
        for f in sorted(os.listdir(folder)):
            m = re.search(r'第\s*(\d+)\s*讲', f)
            if m:
                lecture_jobs.append((args.level, int(m.group(1))))
    answer_jobs = {}  # level -> set of lecture numbers (None = whole book)
    if args.plan:
        with open(os.path.join(os.path.dirname(__file__), 'xes_ocr_plan.json'), encoding='utf-8') as f:
            plan = json.load(f)
        for part in plan['lectures']:
            l, n = part.split('-')
            lecture_jobs.append((int(l), int(n)))
            answer_jobs.setdefault(int(l), set()).add(int(n))
    if args.answers:
        if args.only:
            answer_jobs.setdefault(args.answers, set()).update(int(x) for x in args.only.split(','))
        else:
            answer_jobs[args.answers] = None

    seen = set()
    for level, no in lecture_jobs:
        if (level, no) in seen:
            continue
        seen.add((level, no))
        pdf_path = find_lecture_pdf(level, no)
        if not pdf_path:
            print('!! PDF not found for %d-%d' % (level, no))
            continue
        run_pdf(pdf_path, 'L%02d_%02d' % (level, no), args.pages, args.scale, args.force,
                {'type': 'lecture', 'level': level, 'no': no})

    for level in sorted(answer_jobs):
        nos = answer_jobs[level]
        if nos is None:
            pdf_path, pages = find_answer_pdf(level), args.pages
        else:
            pdf_path, pages = answer_pages_for(level, sorted(nos))
        if not pdf_path:
            print('!! answer book not found for level %d' % level)
            continue
        if nos is not None and not pages:
            continue
        run_pdf(pdf_path, 'A%02d' % level, pages, args.scale, args.force,
                {'type': 'answers', 'level': level}, two_columns=True)


if __name__ == '__main__':
    main()
