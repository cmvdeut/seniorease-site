#!/usr/bin/env python3
"""Bouw beamer-PDF's voor pakket G."""
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
LESSONS = [
    "G1-wat-is-ai",
    "G2-ai-gebruiken",
    "G3-goede-vragen",
    "G4-ai-veilig",
]


def main() -> int:
    for folder in LESSONS:
        script = ROOT / folder / "build_beamer.py"
        print(f"--- beamer {folder} ---")
        r = subprocess.run([sys.executable, str(script)], cwd=ROOT)
        if r.returncode != 0:
            return r.returncode
    print("Beamer-PDF's klaar.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
