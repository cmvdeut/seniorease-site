#!/usr/bin/env python3
"""Genereer alle PDF's van pakket B."""
from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "B1-muis-toetsenbord",
    "B2-vensters",
    "B3-bestanden-mappen",
    "B4-downloaden-printen",
]


def main() -> None:
    for name in LESSONS:
        script = ROOT / name / "build_pdf.py"
        print(f"--- {name} ---")
        runpy.run_path(str(script), run_name="__main__")


if __name__ == "__main__":
    main()
