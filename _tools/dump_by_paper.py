"""Dump each paper's problems into readable text file, for use as translation source."""
import json
import pathlib
from collections import defaultdict

RAW = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\_tools\problems_raw.json")
OUT = pathlib.Path(r"C:\Users\eguihta\Learning\Guihao\math\math-knowledge-map\_tools\paper_dumps")
OUT.mkdir(exist_ok=True)

records = json.loads(RAW.read_text(encoding="utf-8"))
by_file = defaultdict(list)
for r in records:
    by_file[r["file"]].append(r)

for fname, probs in by_file.items():
    probs.sort(key=lambda r: r["num"])
    lines = [f"# {fname}",
             f"# AK={probs[0]['ak']}  Year={probs[0]['year']}  Round={probs[0]['round']}",
             f"# {len(probs)} problems",
             ""]
    for p in probs:
        diff_star = "*" * (p["difficulty"] or 0) if p.get("difficulty") else ""
        lines.append(f"--- #{p['num']} {diff_star}  (page {p['page']}) ---")
        lines.append(p["stem"])
        if p["options"]:
            for i, opt in enumerate(p["options"]):
                letter = chr(ord("a") + i)
                lines.append(f"  {letter}) {opt}")
        lines.append("")
    (OUT / (fname.replace(".pdf", ".txt"))).write_text("\n".join(lines), encoding="utf-8")

print(f"Wrote {len(by_file)} paper dumps to {OUT}")
