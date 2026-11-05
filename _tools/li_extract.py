# -*- coding: utf-8 -*-
"""
李永乐小学数学：把 三~六年级 的 讲义 / 习题 / 习题答案 / 阶段测 / 期末卷 PDF 建成目录，
三、四年级同时抽出文字层，供"盘古 AK4 <-> 李永乐"匹配用。

用法:  python _tools/li_extract.py
产物:  _tools/li_text/<序号>.txt   三/四年级每个 PDF 的文字层（逐页，页间 "=== p.N ==="）
       _tools/li_catalog.json      目录：年级 / 类型 / 讲次或专题号 / 相对路径 / 页数 / 文字量

文件名里混有零宽/方向控制字符和 "★★★售后V：xxx" 水印：
  - "name" 字段是清洗后的展示名；
  - "path" 字段保留原始相对路径（相对仓库根目录），网页链接要用它才能打开文件。
"""
import fitz  # PyMuPDF
import json
import os
import re
import sys

sys.stdout.reconfigure(encoding="utf-8")

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LI = os.path.join(ROOT, "李永乐小学数学")
OUT_TXT = os.path.join(os.path.dirname(__file__), "li_text")
OUT_JSON = os.path.join(os.path.dirname(__file__), "li_catalog.json")

GRADES = {"三年级": 3, "四年级": 4, "五年级": 5, "六年级": 6}
TEXT_GRADES = {3, 4}  # 只给这两个年级抽文字层

INVIS = re.compile("[\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]")
WATER = re.compile(r"[★☆\s]*售\s*后\s*V\s*[:：]?\s*[xX]\s*b\s*a\s*n\s*9\s*0\s*9\s*9\s*1")


def clean_name(name: str) -> str:
    s = INVIS.sub("", name)
    s = WATER.sub("", s)
    s = re.sub(r"[★☆]+", "", s)
    s = re.sub(r"\.pdf$", "", s, flags=re.I)
    return re.sub(r"\s+", " ", s).strip()


def grade_of(path_parts):
    for p in path_parts:
        for k, v in GRADES.items():
            if p.startswith(k):
                return v
    return 0


def classify(sub_dir: str, fname: str):
    """返回 (kind, key, extra)。kind: handout|exercise|answer|exam|final|other"""
    c = clean_name(fname)
    if "视频" in sub_dir and "阶段测" not in sub_dir:
        return "other", None, c
    if "期末" in sub_dir:
        return "final", None, c
    if "阶段测" in sub_dir and "练习题" not in sub_dir:
        return "exam", None, c
    if "答案" in sub_dir.split(os.sep)[-1]:
        kind = "answer"
    elif ("习题" in sub_dir.split(os.sep)[-1]) or ("练习题" in sub_dir.split(os.sep)[-1]):
        kind = "exercise"
    elif "讲义" in sub_dir.split(os.sep)[-1]:
        kind = "handout"
    else:
        return "other", None, c

    if kind in ("exercise", "answer"):
        m = re.search(r"第(\d+)讲[：:]\s*(.+)", c)
        if m:
            title = re.sub(r"[（(](?:习题答案|习题|答案)[)）]\s*$", "", m.group(2)).strip()
            title = re.sub(r"\s*\(\d+\)\s*$", "", title)
            return kind, int(m.group(1)), title
        if "阶段测" in c:
            return "exam", None, c
        return "other", None, c

    # handout：专题N：标题（a-b）
    m = re.search(r"专题(\d+)[：:]\s*(.+)", c)
    if not m:
        return "other", None, c
    num = int(m.group(1))
    rest = m.group(2)
    rng = re.search(r"[（(]\s*(?:第)?(\d+)\s*讲?\s*(?:[-－—~]\s*(?:第)?(\d+)\s*讲?)?\s*[)）]", rest)
    a = int(rng.group(1)) if rng else None
    b = int(rng.group(2)) if rng and rng.group(2) else a
    title = re.sub(r"[（(].*$", "", rest).strip()
    title = re.sub(r"\d+\.\d+更新", "", title).strip()
    return "handout", num, {"title": title, "from": a, "to": b}


def main():
    os.makedirs(OUT_TXT, exist_ok=True)
    items = []
    idx = 0
    for gdir in sorted(os.listdir(LI)):
        g = GRADES.get(gdir[:3], 0)
        # 只跳过"习题视频讲解"目录；"阶段测（测试卷+解析视频）"里有 PDF，要保留（mp4 本来就不是 .pdf）
        if not g or gdir.endswith("习题视频讲解"):
            continue
        for dirpath, _, files in os.walk(os.path.join(LI, gdir)):
            sub = os.path.relpath(dirpath, LI)
            parts = sub.split(os.sep)
            for f in sorted(files):
                if not f.lower().endswith(".pdf"):
                    continue
                full = os.path.join(dirpath, f)
                rel = os.path.relpath(full, ROOT).replace("\\", "/")
                kind, key, extra = classify(os.sep.join(parts[1:]) or parts[0], f)
                try:
                    doc = fitz.open(full)
                    pages = len(doc)
                    texts = [p.get_text() for p in doc] if g in TEXT_GRADES else []
                    doc.close()
                except Exception as e:  # noqa
                    print("!! 打不开", rel, e)
                    continue
                idx += 1
                tfile = None
                if g in TEXT_GRADES:
                    tfile = f"{idx:04d}.txt"
                    with open(os.path.join(OUT_TXT, tfile), "w", encoding="utf-8") as fh:
                        for i, t in enumerate(texts, 1):
                            fh.write(f"=== p.{i} ===\n{t}\n")
                items.append({
                    "kind": kind, "grade": g, "key": key, "extra": extra,
                    "path": rel, "name": clean_name(f), "pages": pages,
                    "chars": sum(len(t) for t in texts), "txt": tfile,
                })
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(items, fh, ensure_ascii=False, indent=1)

    from collections import Counter
    cnt = Counter((i["grade"], i["kind"]) for i in items)
    print("文件数:", len(items))
    for k, v in sorted(cnt.items()):
        print("  ", k, v)


if __name__ == "__main__":
    main()
