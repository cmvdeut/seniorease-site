#!/usr/bin/env python3
"""Bouw alle PDF's voor pakket F (telefoon/tablet)."""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "Ft1-zoeken",
    "Ft2-browser",
    "Ft3-qr-codes",
    "Ft4-formulieren-downloads",
]


def main() -> int:
    for folder in LESSONS:
        script = ROOT / folder / "build_pdf.py"
        if not script.exists():
            print(f"Overgeslagen (nog niet aanwezig): {folder}")
            continue
        print(f"--- {folder} ---")
        r = subprocess.run([sys.executable, str(script)], cwd=ROOT)
        if r.returncode != 0:
            return r.returncode
    print("Klaar.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
