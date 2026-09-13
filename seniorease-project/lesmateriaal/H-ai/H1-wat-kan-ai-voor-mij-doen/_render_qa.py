#!/usr/bin/env python3
"""Render H1 print + beamer for visual QA."""
from pathlib import Path

import pymupdf

root = Path(__file__).resolve().parent
out = root / "_qa_pages"
out.mkdir(exist_ok=True)

print_pdf = root / "pdf" / "SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf"
beamer_pdf = root / "beamer" / "SeniorEase-H1-Beamer-v2.pdf"

doc = pymupdf.open(print_pdf)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.5, 1.5))
    pix.save(out / f"print-{i+1:02d}.png")
print("print", doc.page_count)

doc = pymupdf.open(beamer_pdf)
for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.4, 1.4))
    pix.save(out / f"beamer-{i+1:02d}.png")
print("beamer", doc.page_count)
