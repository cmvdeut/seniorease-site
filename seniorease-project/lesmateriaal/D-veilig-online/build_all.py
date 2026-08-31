#!/usr/bin/env python3
"""Bouw alle PDF's van pakket D."""

import runpy
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SCRIPTS = [
    ROOT / "D1-nepberichten" / "build_pdf.py",
    ROOT / "D2-phishing-links-qr" / "build_pdf.py",
    ROOT / "D3-whatsapp-sms-fraude" / "build_pdf.py",
    ROOT / "D4-veilig-betalen" / "build_pdf.py",
]


def main() -> None:
    for script in SCRIPTS:
        print(f"--- {script.parent.name} ---")
        runpy.run_path(str(script), run_name="__main__")


if __name__ == "__main__":
    main()
