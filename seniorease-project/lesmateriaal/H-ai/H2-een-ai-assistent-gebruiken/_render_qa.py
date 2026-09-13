#!/usr/bin/env python3
"""Render H2 print + beamer for visual QA."""
from pathlib import Path

import pymupdf

root = Path(__file__).resolve().parent
out = root / "_qa_pages"

# Remove stale renders
if out.exists():
    for p in out.glob("*.png"):
        p.unlink()
else:
    out.mkdir(parents=True)

print_pdf = root / "pdf" / "SeniorEase-H2-Een-AI-assistent-gebruiken-v2.pdf"
beamer_pdf = root / "beamer" / "SeniorEase-H2-Beamer-v2.pdf"

doc = pymupdf.open(print_pdf)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5))
    pix.save(out / f"print-{i+1:02d}.png")
print("print", doc.page_count)
doc.close()

doc = pymupdf.open(beamer_pdf)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.4, 1.4))
    pix.save(out / f"beamer-{i+1:02d}.png")
print("beamer", doc.page_count)
doc.close()

# count check
prints = sorted(out.glob("print-*.png"))
beamers = sorted(out.glob("beamer-*.png"))
print("qa_print", len(prints), "qa_beamer", len(beamers))
