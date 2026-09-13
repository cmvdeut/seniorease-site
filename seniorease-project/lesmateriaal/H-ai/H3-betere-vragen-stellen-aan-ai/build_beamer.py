#!/usr/bin/env python3
"""H3 beamer — Betere vragen stellen aan AI v2.0 (deelnemersbeamer).

Visueel centrum: SeniorEase VOOR/NA + WAT/INFO/HOE.
Gemini alleen waar nodig voor inhoudelijk effect.
Geen H3-S3 (beamer rustiger zonder).
Geen H2-bedieningsinstructie.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HBeamerPDF, MUTED, NAVY, PAPER, WHITE  # noqa: E402

H3_VERSION = "v2.0"
H3_TITLE = "Betere vragen stellen aan AI"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-H3-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "gemini"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."

VOOR = "Wat kan ik koken?"
NA_LINES = [
    "Geef mij drie ideeën voor een eenvoudige avondmaaltijd.",
    "Ik heb aardappelen, broccoli en eieren in huis.",
    "Geef per idee maximaal drie korte stappen.",
]


def _header(pdf: HBeamerPDF, label: str = "") -> None:
    pdf.add_page()
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 297, 22, "F")
    pdf._logo_mark(22, 4, 14)
    pdf.set_xy(42, 7)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*WHITE)
    header = f"H3  —  {label}" if label.strip() else "H3"
    pdf.cell(0, 8, header)


def _foot(pdf: HBeamerPDF) -> None:
    pdf.set_y(198)
    pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4, f"SeniorEase  |  {H3_TITLE}  |  Beamer {H3_VERSION}", align="C")


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
    """Drie tekstdominante blokken — optioneel één rustig icoon-achtig teken."""
    _header(pdf, "Hoofdroute")
    steps = [
        ("1", "WAT WILT U?"),
        ("2", "GEEF WAT INFORMATIE"),
        ("3", "ZEG HOE U HET WILT"),
    ]
    y = 38
    for i, (num, step) in enumerate(steps):
        pdf.set_fill_color(*PAPER)
        pdf.set_draw_color(*GOLD)
        pdf.set_line_width(1.0)
        pdf.rect(36, y, 225, 28, "DF")
        # simple number mark (not icon rain)
        pdf.set_xy(44, y + 6)
        pdf.set_font("DejaVu", "B", 20)
        pdf.set_text_color(*GOLD)
        pdf.cell(18, 16, num)
        pdf.set_xy(66, y + 6)
        pdf.set_font("DejaVu", "B", 22)
        pdf.set_text_color(*NAVY)
        pdf.cell(180, 16, step)
        y += 36
        if i < len(steps) - 1:
            pdf.set_xy(36, y - 10)
            pdf.set_font("DejaVu", "B", 18)
            pdf.set_text_color(*GOLD)
            pdf.cell(225, 8, "↓", align="C")
    _foot(pdf)


def big_quote_slide(pdf: HBeamerPDF, label: str, title: str, quote: str, note: str = "") -> None:
    _header(pdf, label)
    pdf.set_xy(22, 36)
    pdf.set_font("DejaVu", "B", 20)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 10, title)
    pdf.set_xy(22, 70)
    pdf.set_font("DejaVu", "B", 32)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 16, quote)
    if note:
        pdf.set_xy(22, 170)
        pdf.set_font("DejaVu", "I", 14)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(253, 7, note)
    _foot(pdf)


def na_slide(pdf: HBeamerPDF) -> None:
    _header(pdf, "Na")
    pdf.set_xy(22, 32)
    pdf.set_font("DejaVu", "B", 20)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 10, "NA")
    y = 52
    for line in NA_LINES:
        pdf.set_xy(22, y)
        pdf.set_font("DejaVu", "B", 22)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(253, 12, line)
        y = pdf.get_y() + 6
    _foot(pdf)


def compare_slide(pdf: HBeamerPDF) -> None:
    _header(pdf, "Voor / na")
    pdf.set_xy(22, 30)
    pdf.set_font("DejaVu", "B", 18)
    pdf.set_text_color(*GOLD)
    pdf.cell(120, 8, "VOOR")
    pdf.set_xy(155, 30)
    pdf.cell(120, 8, "NA")

    pdf.set_fill_color(*PAPER)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(0.8)
    pdf.rect(18, 44, 125, 110, "DF")
    pdf.rect(154, 44, 125, 110, "DF")

    pdf.set_xy(24, 70)
    pdf.set_font("DejaVu", "B", 20)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(113, 11, VOOR)

    pdf.set_xy(160, 54)
    pdf.set_font("DejaVu", "B", 14)
    pdf.set_text_color(*NAVY)
    for line in NA_LINES:
        pdf.set_x(160)
        pdf.multi_cell(113, 8, line)
        pdf.ln(2)

    pdf.set_xy(22, 168)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 8, "Vage vraag → duidelijkere vraag → bruikbaarder antwoord")
    pdf.set_xy(22, 182)
    pdf.set_font("DejaVu", "I", 12)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(253, 5, "Het antwoord kan nog steeds fout zijn. Controleren komt later.")
    _foot(pdf)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HBeamerPDF("H3", H3_TITLE)
    pdf._slide_version = H3_VERSION

    # 1 Titel
    pdf.concept_slide(
        H3_TITLE,
        [
            "Ik kan betere antwoorden krijgen",
            "Duidelijker vragen · bruikbaarder antwoord",
        ],
        label="",
    )

    # 2 Retrieval H2
    pdf.concept_slide(
        "Waar typt u uw vraag?",
        [
            "Wat doet u als u nog iets wilt weten?",
        ],
        label="Terugblik",
        note="Kort ophalen. Geen bedieningsles.",
    )

    # 3 Brug
    pdf.concept_slide(
        "U weet hoe u AI bedient.",
        [
            "Vandaag: hoe maakt u een vraag duidelijker?",
        ],
        label="Vandaag",
    )

    # 4 Startsituatie
    pdf.concept_slide(
        "Stel… u wilt iets koken.",
        [
            "U vraagt: Wat kan ik koken?",
            "Is dit antwoord bruikbaar?",
        ],
        label="Situatie",
    )

    # 5 VOOR tekst groot
    big_quote_slide(
        pdf,
        "Voor",
        "VOOR",
        VOOR,
        note="AI geeft wel antwoord, maar weet nog weinig.",
    )

    # 6 S1 Gemini voor
    shot_full(
        pdf,
        "Voor",
        "AI vraagt om meer informatie.",
        SHOTS / "H3-S1-voor.png",
        "Het antwoord past nog weinig bij wat u nodig heeft.",
    )

    # 7 Hoofdroute
    route_slide(pdf)

    # 8 Niet altijd alle drie
    pdf.concept_slide(
        "U hoeft niet altijd alles te gebruiken.",
        [
            "Soms is één duidelijke vraag genoeg.",
            "Past het antwoord niet? Voeg iets toe.",
        ],
        label="Tip",
    )

    # 9 WAT
    pdf.concept_slide(
        "WAT WILT U?",
        [
            "Zeg duidelijk waarvoor u hulp wilt.",
            "Bijvoorbeeld: drie ideeën voor een eenvoudige avondmaaltijd.",
        ],
        label="WAT",
    )

    # 10 INFO
    pdf.concept_slide(
        "GEEF WAT INFORMATIE",
        [
            "Geef alleen wat nodig is.",
            "Bijvoorbeeld: aardappelen, broccoli en eieren.",
        ],
        label="INFO",
        note="Geen wachtwoorden, codes of gevoelige gegevens.",
    )

    # 11 HOE
    pdf.concept_slide(
        "ZEG HOE U HET WILT",
        [
            "Kort · eenvoudig · drie ideeën · korte stappen.",
            "Bijvoorbeeld: maximaal drie korte stappen per idee.",
        ],
        label="HOE",
    )

    # 12 NA tekst groot
    na_slide(pdf)

    # 13 S2 Gemini na
    shot_full(
        pdf,
        "Na",
        "Het antwoord past beter bij uw vraag.",
        SHOTS / "H3-S2-na.png",
        "Duidelijker vragen → bruikbaarder antwoord.",
        note="Het antwoord kan nog steeds fout zijn.",
    )

    # 14 Vergelijking
    compare_slide(pdf)

    # 15 Doorvragen (kort, geen S3)
    pdf.concept_slide(
        "U kunt ook verder vragen.",
        [
            "In hetzelfde gesprek.",
            "Bijvoorbeeld: Maak het korter.",
        ],
        label="Doorvragen",
        note="U hoeft niet alles opnieuw te typen.",
    )

    # 16 Veiligheid licht
    pdf.concept_slide(
        "Geef alleen informatie die nodig is.",
        [
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan nog steeds fout zijn.",
        ],
        label="Veilig",
    )

    # 17 Oefenronde 1
    pdf.concept_slide(
        "Oefenronde 1 — samen",
        [
            "Vage vraag: Wat kan ik doen?",
            "Situatie: het regent · thuis iets ontspannends.",
        ],
        label="Oefenen",
        note="Samen: WAT · INFO · HOE",
    )

    # 18 Oefenronde 1 bouw
    pdf.concept_slide(
        "Bouw de vraag samen",
        [
            "WAT: drie ideeën voor iets ontspannends thuis",
            "INFO: het regent en ik wil thuis blijven",
            "HOE: geef drie korte ideeën",
        ],
        label="Oefenen",
    )

    # 19 Oefenronde 2
    pdf.concept_slide(
        "Oefenronde 2 — kies een kaart",
        [
            "A Eten · B Bericht · C Uitleg · D Ideeën",
            "Maak de vage vraag duidelijker.",
        ],
        label="Oefenen",
        note="Geen privégegevens.",
    )

    # 20 Oefenronde 3
    pdf.concept_slide(
        "Oefenronde 3 — zelf",
        [
            "Stel een gewone vraag.",
            "Verbeter met minstens één element.",
            "Vergelijk het verschil.",
        ],
        label="Oefenen",
        note="Geen toets. Geen punten.",
    )

    # 21 Eindmissie
    pdf.concept_slide(
        "Eindmissie — doe dit zelf",
        [
            "Gewone vraag → antwoord → verbeteren",
            "Minstens twee van: WAT · INFO · HOE",
        ],
        label="Eindmissie",
    )

    # 22 Eindmissie check
    pdf.concept_slide(
        "Zeg tot slot:",
        [
            "“Dit antwoord past beter omdat…”",
        ],
        label="Eindmissie",
        note="Geen perfecte formulering nodig.",
    )

    # 23 Afronding
    pdf.concept_slide(
        "U kunt een vraag duidelijker maken.",
        [
            "WAT · INFO · HOE — niet altijd alle drie.",
            "Thuis: één vraag iets duidelijker stellen.",
        ],
        label="Afronding",
        note="Later: controleren of een antwoord klopt.",
    )

    pdf.output(str(OUT))
    print("wrote", OUT, "pages", pdf.page)
    return OUT


if __name__ == "__main__":
    build()
