# -*- coding: utf-8 -*-
"""
在李永乐三~六年级的 讲义 / 习题 PDF 文字层里搜关键词，结果写到 _tools/li_grep_out.txt
用来确认"盘古 AK4 的某个知识点，李永乐有没有对应讲次"。

用法: python _tools/li_grep.py 关键词1 关键词2 ...
"""
import fitz, os, re, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LI = os.path.join(ROOT, "李永乐小学数学")
INVIS = re.compile("[\u200b-\u200f\u202a-\u202e\u2060-\u2064\u2066-\u2069\ufeff]")
WATER = re.compile(r"[★☆\s]*售\s*后\s*V\s*[:：]?\s*[xX]\s*b\s*a\s*n\s*9\s*0\s*9\s*9\s*1")


def clean(n):
    return re.sub(r"\s+", " ", WATER.sub("", INVIS.sub("", n))).strip()


def main():
    kws = sys.argv[1:]
    out = []
    cache = os.path.join(os.path.dirname(__file__), "li_text_all.json")
    import json
    if os.path.exists(cache):
        data = json.load(open(cache, encoding="utf-8"))
    else:
        data = {}
        for dp, _, fs in os.walk(LI):
            for f in fs:
                if not f.lower().endswith(".pdf"):
                    continue
                if not any(g in dp for g in ("三年级", "四年级", "五年级", "六年级")):
                    continue
                full = os.path.join(dp, f)
                rel = os.path.relpath(full, LI)
                try:
                    d = fitz.open(full)
                    data[rel] = [p.get_text() for p in d]
                    d.close()
                except Exception as e:
                    data[rel] = []
        json.dump(data, open(cache, "w", encoding="utf-8"), ensure_ascii=False)
    for kw in kws:
        out.append(f"##### {kw}")
        for rel, pages in sorted(data.items()):
            hits = []
            for i, t in enumerate(pages, 1):
                n = t.count(kw)
                if n:
                    hits.append(f"p{i}x{n}")
            if hits:
                out.append(f"  {clean(rel)}  {' '.join(hits[:8])}")
    with open(os.path.join(os.path.dirname(__file__), "li_grep_out.txt"), "w", encoding="utf-8") as fh:
        fh.write("\n".join(out))
    print("done")


if __name__ == "__main__":
    main()
