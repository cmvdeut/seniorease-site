#!/usr/bin/env python3
"""H2 beamer — Een AI-assistent gebruiken v2.0 (deelnemersbeamer)."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HBeamerPDF, MUTED, NAVY, PAPER, WHITE  # noqa: E402

H2_VERSION = "v2.0"
H2_TITLE = "Een AI-assistent gebruiken"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-H2-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "gemini"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."

DEMO_Q = (
    "Geef mij drie eenvoudige ideeën voor een maaltijd "
    "met aardappelen, broccoli en eieren."
)


def _header(pdf: HBeamerPDF, label: str = "") -> None:
    pdf.add_page()
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 297, 22, "F")
    pdf._logo_mark(22, 4, 14)
    pdf.set_xy(42, 7)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*WHITE)
    header = f"H2  —  {label}" if label.strip() else "H2"
    pdf.cell(0, 8, header)


def _foot(pdf: HBeamerPDF) -> None:
    pdf.set_y(198)
    pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4, f"SeniorEase  |  {H2_TITLE}  |  Beamer {H2_VERSION}", align="C")


def shot_full(
    pdf: HBeamerPDF,
    label: str,
    title: str,
    image: Path,
    point: str,
    note: str = NOTE,
    *,
    wide_boost: bool = False,
) -> None:
    """One calm instruction slide: one big crop + one point."""
    _header(pdf, label)
    pdf.set_xy(18, 26)
    pdf.set_font("DejaVu", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(261, 10, title)

    if image.exists():
        from PIL import Image as _PILImage

        with _PILImage.open(image) as im:
            aspect = im.height / max(im.width, 1)
        img_w = 270.0 if wide_boost else 250.0
        img_h = img_w * aspect
        max_h = 118.0
        if img_h > max_h:
            img_h = max_h
            img_w = img_h / aspect
        img_x = (297 - img_w) / 2
        img_y = 48 if wide_boost else 42
        pdf.image(str(image), x=img_x, y=img_y, w=img_w, h=img_h)
        text_y = img_y + img_h + 8
    else:
        text_y = 50
        pdf.set_xy(22, 50)
        pdf.set_font("DejaVu", "I", 16)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(253, 8, "(Screenshot ontbreekt)")

    pdf.set_xy(22, min(text_y, 168))
    pdf.set_font("DejaVu", "B", 18)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 9, point)
    pdf.set_xy(22, 180)
    pdf.set_font("DejaVu", "I", 12)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(253, 5, note)
    _foot(pdf)


def route_slide(pdf: HBeamerPDF) -> None:
    _header(pdf, "Hoofdroute")
    steps = [
        "OPENEN",
        "VRAGEN",
        "ANTWOORD LEZEN",
        "DOORVRAGEN",
    ]
    y = 40
    for i, step in enumerate(steps):
        pdf.set_fill_color(*PAPER)
        pdf.set_draw_color(*GOLD)
        pdf.set_line_width(1.0)
        pdf.rect(40, y, 217, 22, "DF")
        pdf.set_xy(40, y + 5)
        pdf.set_font("DejaVu", "B", 22)
        pdf.set_text_color(*NAVY)
        pdf.cell(217, 12, step, align="C")
        y += 28
        if i < len(steps) - 1:
            pdf.set_xy(40, y - 8)
            pdf.set_font("DejaVu", "B", 18)
            pdf.set_text_color(*GOLD)
            pdf.cell(217, 8, "↓", align="C")
    _foot(pdf)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HBeamerPDF("H2", H2_TITLE)
    pdf._slide_version = H2_VERSION

    # 1 Titel
    pdf.concept_slide(
        H2_TITLE,
        [
            "Ik kan AI zelf gebruiken",
            "Openen · vragen · lezen · doorvragen",
        ],
        label="",
    )

    # 2 Retrieval
    pdf.concept_slide(
        "Waar zou AI u bij kunnen helpen?",
        [
            "Iets eenvoudiger uitgelegd krijgen",
            "Ideeën bedenken",
            "Een bericht helpen formuleren",
        ],
        label="Terugblik",
    )

    # 3 Brug
    pdf.concept_slide(
        "Vorige keer: waar AI bij kan helpen.",
        [
            "Vandaag gaat u het zelf bedienen.",
        ],
        label="Vandaag",
    )

    # 4 Startsituatie
    pdf.concept_slide(
        "U wilt vanavond iets makkelijks koken.",
        [
            "U heeft aardappelen, broccoli en eieren.",
            "U vraagt AI om drie eenvoudige ideeën.",
        ],
        label="Situatie",
    )

    # 5 Hoofdroute
    route_slide(pdf)

    # 6 Gemini kader
    pdf.concept_slide(
        "In deze les gebruiken we Gemini.",
        [
            "Andere AI-assistenten, zoals ChatGPT en Copilot,",
            "werken op een vergelijkbare manier.",
        ],
        label="Voorbeeld",
        note="Dit is geen Gemini-cursus.",
    )

    # 7 Openen URL
    pdf.concept_slide(
        "Open de browser.",
        [
            "Ga naar: gemini.google.com",
        ],
        label="Openen",
        note=NOTE,
    )

    # 8 S1 typvak
    shot_full(
        pdf,
        "Openen",
        "Hier typ ik mijn vraag.",
        SHOTS / "G2-S1-openen-typvak.png",
        "Zoek het typvak.",
    )

    # 9 Vraag tekst
    pdf.concept_slide(
        "Typ deze vraag",
        [
            DEMO_Q,
        ],
        label="Vragen",
        note="Een gewone begrijpelijke vraag is genoeg.",
    )

    # 10 S2 typed + send
    shot_full(
        pdf,
        "Vragen",
        "Kijk eerst kort. Daarna versturen.",
        SHOTS / "G2-S2-vragen-versturen.png",
        "De cirkel markeert versturen.",
    )

    # 11 Antwoord lezen intro
    pdf.concept_slide(
        "Dit is het antwoord van AI.",
        [
            "Het kan langer zijn dan één scherm.",
            "U mag rustig scrollen.",
        ],
        label="Antwoord",
        note="Een AI-antwoord kan een fout bevatten.",
    )

    # 12 S3 antwoord
    shot_full(
        pdf,
        "Antwoord",
        "Lees het antwoord.",
        SHOTS / "G2-S3-antwoord.png",
        "Niet alles hoeft in één keer.",
        wide_boost=True,
    )

    # 13 Doorvragen intro
    pdf.concept_slide(
        "U mag verder vragen.",
        [
            "U hoeft niet opnieuw vanaf nul te beginnen.",
            "AI kan in hetzelfde gesprek meedenken.",
        ],
        label="Doorvragen",
    )

    # 14 S4a vervolgvraag
    shot_full(
        pdf,
        "Doorvragen",
        "Typ een vervolgvraag.",
        SHOTS / "G2-S4a-vervolgvraag.png",
        "Bijvoorbeeld: Welke is het makkelijkst?",
    )

    # 15 S4b vervolgantwoord
    shot_full(
        pdf,
        "Doorvragen",
        "Lees wat er verandert.",
        SHOTS / "G2-S4b-vervolgantwoord.png",
        "Eerste vraag → antwoord → vervolg → nieuw antwoord.",
    )

    # 16 Nieuw gesprek overgang
    pdf.concept_slide(
        "Nu wilt u iets anders vragen.",
        [
            "Bijvoorbeeld: een idee voor een verjaardagscadeau.",
            "Hoort dit nog bij hetzelfde onderwerp?",
        ],
        label="Nieuw gesprek",
    )

    # 17 S5 nieuw gesprek
    shot_full(
        pdf,
        "Nieuw gesprek",
        "Start een nieuw gesprek.",
        SHOTS / "G2-S5-nieuw-gesprek.png",
        "Zoek de knop: Nieuw gesprek.",
        wide_boost=True,
    )

    # 18 S6 leeg
    shot_full(
        pdf,
        "Nieuw gesprek",
        "U kunt opnieuw beginnen.",
        SHOTS / "G2-S6-leeg-typvak.png",
        "Het typvak is weer leeg.",
    )

    # 19 Privacy
    pdf.concept_slide(
        "Gebruik in de oefening geen privégegevens.",
        [
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan een fout bevatten.",
        ],
        label="Veilig",
    )

    # 20 Oefenronde 1
    pdf.concept_slide(
        "Oefenronde 1 — samen",
        [
            "Geef mij drie ideeën voor een gezellige middag thuis.",
            "Daarna: Welke is het makkelijkst om te organiseren?",
        ],
        label="Oefenen",
        note="Iedereen dezelfde veilige oefening.",
    )

    # 21 Oefenronde 2
    pdf.concept_slide(
        "Oefenronde 2 — kies een kaart",
        [
            "A Eten · B Uitje thuis · C Bericht · D Uitleg",
            "Stel één vraag en één vervolgvraag.",
        ],
        label="Oefenen",
        note="Geen privégegevens.",
    )

    # 22 Eindmissie
    pdf.concept_slide(
        "Eindmissie — doe dit zelf",
        [
            "Openen · vraag · versturen · lezen",
            "Vervolgvraag · nieuw gesprek",
        ],
        label="Eindmissie",
        note="Geen toets. Geen punten.",
    )

    # 23 Succes
    pdf.concept_slide(
        "Klaar als u dit kunt laten zien:",
        [
            "“Hier typ ik mijn vraag.”",
            "Versturen · antwoord · vervolg · nieuw gesprek",
        ],
        label="Eindmissie",
    )

    # 24 Afronding
    pdf.concept_slide(
        "U weet waar u typt.",
        [
            "U durft zelf verder te vragen.",
            "Thuis: één gewone vraag + één vervolgvraag.",
        ],
        label="Afronding",
        note="Volgende les: betere vragen stellen.",
    )

    pdf.output(str(OUT))
    print("wrote", OUT, "pages", pdf.page)
    return OUT


if __name__ == "__main__":
    build()
