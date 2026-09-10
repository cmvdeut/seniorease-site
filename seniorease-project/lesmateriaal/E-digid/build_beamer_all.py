#!/usr/bin/env python3
import subprocess, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent
LESSONS = [
    "E1-digid",
    "E2-mijnoverheid",
    "E3-gemeente-belastingdienst",
    "E4-veilig-digid-berichten",
]

def main() -> int:
    for folder in LESSONS:
        r = subprocess.run([sys.executable, str(ROOT / folder / "build_beamer.py")], cwd=ROOT)
        if r.returncode != 0:
            return r.returncode
    print("Beamer klaar:", ROOT.name)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
