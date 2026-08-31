#!/usr/bin/env python3
"""Genereer alle PDF's van pakket A."""
from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "A1-toestel-leren-kennen",
    "A2-apps",
    "A3-wifi",
    "A4-fotos",
]


def main() -> None:
    for name in LESSONS:
        script = ROOT / name / "build_pdf.py"
        print(f"--- {name} ---")
        runpy.run_path(str(script), run_name="__main__")


if __name__ == "__main__":
    main()
