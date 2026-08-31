#!/usr/bin/env python3
"""G4 beamer-slides."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import BeamerPDF  # noqa: E402

OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-G4-Beamer-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = BeamerPDF("G4", "AI veilig gebruiken")
    pdf.title_slide()

    pdf.concept_slide(
        "Drie regels",
        [
            "1. Geen geheimen of gevoelige persoonsgegevens",
            "2. Belangrijke informatie controleren — AI kan fouten maken",
            "3. Gezondheid, geld, recht, overheid:",
            "   deskundige of officiële bron",
        ],
    )
    pdf.concept_slide(
        "Controleren ≠ AI om een bron vragen",
        [
            "Vraag: Hoe kan ik controleren of dit klopt?",
            "Zoek daarna zelf één feit op",
            "bij een betrouwbare bron.",
            "AI kan ook bronnen verzinnen.",
        ],
        label="Demo",
    )
    pdf.concept_slide(
        "Niet uploaden",
        [
            "Geen paspoort",
            "Geen bankafschrift",
            "Geen belastingbrief",
            "Geen medisch document",
        ],
        note="Zeg hardop: Nee, ik typ geen wachtwoord in AI.",
    )

    pdf.oefentaak_slide(
        1,
        "Drie regels",
        "regels hardop kunnen noemen",
        ["Lees de regels op de beamer of A4", "Noem ze tegen uw buur"],
        "u de drie regels kunt noemen",
    )
    pdf.oefentaak_slide(
        2,
        "Echt controleren",
        "zelf één feit nakijken",
        [
            "Vraag AI om drie schilders",
            "Vraag: Hoe kan ik controleren of dit klopt?",
            "Check één naam zelf op een betrouwbare site",
        ],
        "u één feit zelf heeft nagekeken",
    )
    pdf.oefentaak_slide(
        5,
        "Zelfstandig",
        "regels + controle-route",
        ["Noem de drie regels", "Herhaal: AI vragen hoe - zelf checken"],
        "u regels + controle-route kent",
    )

    pdf.output(str(OUT))
    print(f"Beamer-PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
