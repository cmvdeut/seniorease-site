#!/usr/bin/env python3
"""E4 beamer — Berichten van de overheid vinden en lezen v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import EBeamerPDF, GOLD, NAVY  # noqa: E402

E4_VERSION = "v2.0"
E4_TITLE = "Berichten van de overheid vinden en lezen"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-E4-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"E4 beamer vereist screenshot: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie(pdf: EBeamerPDF) -> None:
    pdf._bar("")
    pdf.set_xy(22, 22)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie — 12 minuten")

    pdf.set_xy(22, 38)
    pdf.set_font("DejaVu", "", 16)
    pdf.multi_cell(
        253,
        8,
        "U krijgt een melding dat er een nieuw bericht voor u klaarstaat.",
    )
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "B", 20)
    pdf.multi_cell(253, 9, "Laat zien hoe u zelf het bericht vindt.")
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "", 16)
    pdf.multi_cell(253, 8, "Bekijk waar het over gaat.")
    pdf.set_xy(22, pdf.get_y() + 4)
    pdf.multi_cell(253, 8, "Kijk of er een bijlage bij hoort.")
    pdf.set_xy(22, pdf.get_y() + 4)
    pdf.multi_cell(253, 8, "Ga daarna veilig terug en sluit af.")
    pdf.set_xy(22, pdf.get_y() + 10)
    pdf.set_font("DejaVu", "I", 14)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 7, "Geen antwoorden van tevoren · doe dit zelf")
    pdf.set_xy(22, pdf.get_y() + 4)
    pdf.set_font("DejaVu", "I", 12)
    pdf.multi_cell(253, 6, "U hoeft niet in te loggen.")
    pdf._foot()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = EBeamerPDF("E4", E4_TITLE)
    pdf._slide_version = E4_VERSION

    # Opening
    pdf.concept_slide(
        E4_TITLE,
        [
            "Zelf de Berichtenbox openen,",
            "een bericht vinden",
            "en herkennen wat erbij hoort",
        ],
        label="",
    )
    pdf.concept_slide(
        "Even zelf — zoals vorige keer",
        [
            "U wilt iets regelen bij de",
            "digitale overheid.",
            "Laat zien hoe u zelf bij een",
            "officiële route begint.",
        ],
        label="",
    )
    pdf.concept_slide(
        "U krijgt een melding",
        [
            "Er staat een bericht van de",
            "overheid voor u klaar.",
            "Waar leest u het echte bericht?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Vorige keer: zelf beginnen.",
        [
            "Vandaag: zelf bij MijnOverheid.",
        ],
        label="",
    )

    shot(
        pdf,
        "Bij overheidsberichten",
        "shared/e4-kapstok.png",
        "MELDING → … → VEILIG AFSLUITEN",
    )
    shot(
        pdf,
        "Melding (voorbeeld)",
        "shared/e4-melding.png",
        "Geen werkende link nodig in de les",
    )
    shot(
        pdf,
        "Kernregel",
        "shared/e4-melding-niet-bericht.png",
        "MELDING ≠ BERICHT · Ik open MijnOverheid zelf",
    )

    # Openen
    pdf.concept_slide(
        "We openen MijnOverheid zelf.",
        ["Typ mijnoverheid.nl in de adresbalk."],
        label="",
    )
    shot(pdf, "Telefoon — adresbalk", "ios/e4-adresbalk.png", "Typ mijnoverheid.nl")
    shot(pdf, "Android — adresbalk", "android/e4-adresbalk.png", "Typ mijnoverheid.nl")
    shot(pdf, "Computer — adresbalk", "computer/e4-adresbalk.png", "Typ mijnoverheid.nl")
    pdf.concept_slide(
        "Nu u",
        ["Open MijnOverheid zelf.", "Nog niet inloggen."],
        label="",
    )

    shot(
        pdf,
        "mijnoverheid.nl",
        "shared/e4-mo-home.png",
        "Zoek: Inloggen met DigiD",
    )
    pdf.concept_slide(
        "KIJKEN / HERKENNEN",
        ["Niet: nu inloggen.", "Vul niets in."],
        label="",
    )
    shot(
        pdf,
        "Persoonlijke toegang",
        "shared/e4-digid-toegang.png",
        "MijnOverheid gebruikt DigiD",
    )

    # Demolaag
    shot(
        pdf,
        "SeniorEase-oefenomgeving",
        "shared/e4-brug-demolaag.png",
        "Geen echte account · geen echte berichten",
    )
    shot(
        pdf,
        "Oefenoverzicht",
        "shared/e4-demo-overzicht.png",
        "SENIOREASE — OEFENOMGEVING",
    )
    pdf.concept_slide(
        "Nu: Berichtenbox",
        [
            "Zoek het oefenbericht van",
            "Gemeente Oefenstad",
            "over openingstijden bibliotheek.",
        ],
        label="",
    )
    shot(
        pdf,
        "Berichtenbox — oefenen",
        "shared/e4-demo-berichtenbox-a.png",
        "Meerdere oefenberichten · vind bericht A",
    )
    pdf.concept_slide(
        "Nu u",
        ["Vind het oefenbericht.", "Nog even wachten met openen."],
        label="",
    )

    shot(
        pdf,
        "Bericht openen en lezen",
        "shared/e4-demo-bericht-a.png",
        "Afzender · onderwerp · tekst · bijlage herkennen",
    )
    pdf.concept_slide(
        "Waar gaat dit bericht over?",
        [
            "Van wie komt het?",
            "Wat is het onderwerp?",
            "Ziet u een bijlage?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Bijlage herkennen",
        [
            "Bij een bericht kan een bijlage horen.",
            "We herkennen hem.",
            "We downloaden niets.",
        ],
        label="",
    )

    pdf.concept_slide("Korte pauze", ["Daarna: terug en afsluiten."], label="")

    shot(
        pdf,
        "Waar gaat u nu terug?",
        "shared/e4-demo-terug.png",
        "Kies zelf in de oefenomgeving",
    )
    shot(
        pdf,
        "Veilig afsluiten",
        "shared/e4-afsluiten.png",
        "Niet ingelogd → sluiten",
    )
    shot(
        pdf,
        "Privacy",
        "shared/e4-privacy.png",
        "Persoonlijk bericht hoeft u aan niemand te laten zien",
    )

    # Open herhaling — GEEN antwoordpad
    pdf.concept_slide(
        "Probeer het nog een keer",
        [
            "U krijgt een melding dat er een",
            "bericht voor u klaarstaat.",
            "Laat zien waar u zelf begint",
            "en hoe u het bericht vindt.",
        ],
        label="",
    )

    # Eindmissie — GEEN verklapping bericht B / route
    eindmissie(pdf)

    # Note: e4-demo-berichtenbox-b.png and e4-demo-bericht-b.png bestaan
    # voor print/review — NIET op deelnemersbeamer tijdens eindmissie.

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u waar u een",
            "overheidsbericht zelf kunt vinden —",
            "en u hoeft uw persoonlijke berichten",
            "aan niemand te laten zien.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT} ({pdf.page_no()} dia's)")
    return OUT


if __name__ == "__main__":
    build()
