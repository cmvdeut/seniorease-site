#!/usr/bin/env python3
"""Genereer alle PDF's van pakket E."""
from pathlib import Path
import runpy

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "E1-digid",
    "E2-mijnoverheid",
    "E3-gemeente-belastingdienst",
    "E4-veilig-digid-berichten",
]


def main() -> None:
    for name in LESSONS:
        script = ROOT / name / "build_pdf.py"
        print(f"--- {name} ---")
        runpy.run_path(str(script), run_name="__main__")


if __name__ == "__main__":
    main()
