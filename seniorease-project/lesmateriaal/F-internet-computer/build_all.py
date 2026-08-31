#!/usr/bin/env python3
"""Bouw alle PDF's voor pakket F (computer)."""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "Fc1-zoeken-google",
    "Fc2-websites-tabbladen",
    "Fc3-downloaden",
    "Fc4-formulieren",
]


def main() -> int:
    for folder in LESSONS:
        script = ROOT / folder / "build_pdf.py"
        print(f"--- {folder} ---")
        r = subprocess.run([sys.executable, str(script)], cwd=ROOT)
        if r.returncode != 0:
            return r.returncode
    print("Klaar.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
