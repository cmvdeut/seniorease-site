#!/usr/bin/env python3
"""Genereer alle PDF's van pakket C."""
from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "C1-berichten",
    "C2-fotos-documenten",
    "C3-bellen-groepen",
    "C4-privacy-fraude",
]


def main() -> None:
    for name in LESSONS:
        script = ROOT / name / "build_pdf.py"
        print(f"--- {name} ---")
        runpy.run_path(str(script), run_name="__main__")


if __name__ == "__main__":
    main()
