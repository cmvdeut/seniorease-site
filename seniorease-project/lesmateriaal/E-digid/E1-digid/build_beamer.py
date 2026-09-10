#!/usr/bin/env python3
"""E1 beamer — DigiD begrijpen en openen v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import EBeamerPDF, GOLD, NAVY  # noqa: E402

E1_VERSION = "v2.0"
E1_TITLE = "DigiD begrijpen en openen"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-E1-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"E1 beamer vereist screenshot: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie(pdf: EBeamerPDF) -> None:
    pdf._bar("")
    pdf.set_xy(22, 24)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie")

    pdf.set_xy(22, 42)
    pdf.set_font("DejaVu", "B", 22)
    pdf.multi_cell(253, 10, "U wilt iets regelen bij de overheid")
    pdf.set_xy(22, pdf.get_y() + 2)
    pdf.multi_cell(253, 10, "en ziet DigiD.")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "B", 24)
    pdf.multi_cell(253, 11, "Wat doet u nu?")
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "", 16)
    pdf.multi_cell(
        253,
        8,
        "Laat zien hoe u zelf begint bij DigiD — tot Inloggen herkennen — "
        "en hoe u veilig afsluit.",
    )
    pdf.set_xy(22, pdf.get_y() + 10)
    pdf.set_font("DejaVu", "I", 14)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 7, "U hoeft niet in te loggen.")
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "I", 12)
    pdf.multi_cell(253, 6, "Geen antwoorden van tevoren · doe dit zelf")
    pdf._foot()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = EBeamerPDF("E1", E1_TITLE)
    pdf._slide_version = E1_VERSION

    # Opening
    pdf.concept_slide(
        E1_TITLE,
        [
            "Zelf digid.nl openen",
            "en Inloggen herkennen",
        ],
        label="",
    )
    pdf.concept_slide(
        "U wilt online iets regelen bij de overheid.",
        [
            "Er staat: Inloggen met DigiD.",
            "Wat is DigiD — en hoe weet u",
            "waar u moet beginnen?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Vandaag begint u bij DigiD.",
        [
            "Wat het is.",
            "Waar u zelf begint.",
            "U hoeft niet verplicht in te loggen.",
        ],
        label="",
    )

    # Kapstok + definitie
    shot(
        pdf,
        "Bij DigiD",
        "shared/e1-kapstok.png",
        "ZELF OPENEN → INLOGGEN HERKENNEN → DIGID HERKENNEN → VEILIG AFSLUITEN",
    )
    shot(
        pdf,
        "Wat is DigiD?",
        "shared/e1-definitie.png",
        "Persoonlijke digitale inlogmethode",
    )

    # digid.nl openen
    pdf.concept_slide(
        "We openen DigiD zelf.",
        ["Typ digid.nl in de adresbalk."],
        label="",
    )
    shot(pdf, "Telefoon — adresbalk", "ios/e1-adresbalk.png", "Typ digid.nl")
    shot(pdf, "Android — adresbalk", "android/e1-adresbalk.png", "Typ digid.nl")
    shot(pdf, "Computer — adresbalk", "computer/e1-adresbalk.png", "Typ digid.nl")
    pdf.concept_slide(
        "Nu u",
        ["Open digid.nl zelf.", "Nog niet inloggen."],
        label="",
    )

    # Inloggen herkennen
    shot(
        pdf,
        "digid.nl",
        "shared/e1-digid-home.png",
        "Zoek Inloggen of Mijn DigiD",
    )
    pdf.concept_slide(
        "KIJKEN / HERKENNEN",
        ["Niet: nu inloggen.", "Vul niets in."],
        label="",
    )
    shot(
        pdf,
        "DigiD-inlogomgeving",
        "shared/e1-inlog-omgeving.png",
        "Alleen kijken · geen wachtwoord · geen code",
    )
    pdf.concept_slide(
        "Nu u",
        ["Vind Inloggen.", "Herken de DigiD-omgeving.", "Vul niets in."],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: DigiD herkennen en herhalen."], label="")

    # App + herhaling
    pdf.concept_slide(
        "DigiD-app",
        [
            "Hebt u de app al? Dan herkennen we die kort.",
            "Geen installeren. Geen activeren.",
            "Geen app? Prima.",
        ],
        label="",
    )
    shot(pdf, "DigiD-app herkennen", "ios/e1-digid-app.png", "Alleen als u die al heeft")
    # Android same idea - only show one platform for app if same; user said don't put two side by side if same. Showing one is enough, or both separately since slight chrome differs. I'll show both as separate slides briefly as D did for bank apps - but for DigiD app icon it's nearly same. Skip second android app slide to avoid duplication - one is enough.
    pdf.concept_slide(
        "Iedereen probeert het nog een keer",
        [
            "Open DigiD opnieuw.",
            "Zoek waar u moet beginnen.",
            "Stop vóór u persoonlijke gegevens invult.",
            "Sluit daarna weer af.",
        ],
        label="",
    )

    # Afsluiten + privacy
    shot(
        pdf,
        "Veilig afsluiten",
        "shared/e1-afsluiten.png",
        "Niet ingelogd → sluiten",
    )
    shot(
        pdf,
        "Privacy",
        "shared/e1-privacyzin.png",
        "Mijn DigiD-gegevens en codes houd ik voor mezelf.",
    )
    pdf.concept_slide(
        "Nu u",
        ["Sluit tabblad of app.", "U hoeft de zin niet na te zeggen."],
        label="",
    )

    # Eindmissie
    eindmissie(pdf)

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u wat DigiD is,",
            "opent u digid.nl zelf,",
            "herkent u Inloggen —",
            "en weet u dat echte login privé is.",
            "Volgende keer: MijnOverheid.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT} ({pdf.page_no()} dia’s)")
    return OUT


if __name__ == "__main__":
    build()
