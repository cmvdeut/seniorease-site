#!/usr/bin/env python3
"""H1 beamer — Wat kan AI voor mij doen? v2.0 (deelnemersbeamer)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CREAM, GOLD, HBeamerPDF, MUTED, NAVY, PAPER, WHITE  # noqa: E402

H1_VERSION = "v2.0"
H1_TITLE = "Wat kan AI voor mij doen?"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-H1-Beamer-v2.pdf"
ICONS = Path(__file__).resolve().parent / "assets" / "icons"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."

DEMO_LINES = [
    "Geachte bezoeker,",
    "Vanwege werkzaamheden is de leeszaal van 12 tot en",
    "met 16 mei beperkt toegankelijk. Wij adviseren u vóór",
    "uw bezoek op onze website te controleren of de",
    "leeszaal geopend is. De overige ruimtes van de",
    "bibliotheek blijven volgens de normale",
    "openingstijden toegankelijk.",
]

ANTWOORD = [
    "Van 12 tot 16 mei is de leeszaal minder open",
    "door werkzaamheden.",
    "Kijk vóór uw bezoek op de website of de",
    "leeszaal open is.",
    "De rest van de bibliotheek is gewoon open.",
]

KORTER = [
    "Leeszaal 12–16 mei beperkt open.",
    "Check de website vóór u komt.",
    "De rest van de bibliotheek is gewoon open.",
]


def _header(pdf: HBeamerPDF, label: str = "") -> None:
    pdf.add_page()
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 297, 22, "F")
    pdf._logo_mark(22, 4, 14)
    pdf.set_xy(42, 7)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*WHITE)
    header = f"H1  —  {label}" if label.strip() else "H1"
    pdf.cell(0, 8, header)


def _foot(pdf: HBeamerPDF) -> None:
    pdf.set_y(198)
    pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4, f"SeniorEase  |  {H1_TITLE}  |  Beamer {H1_VERSION}", align="C")


def text_card(
    pdf: HBeamerPDF,
    x: float,
    y: float,
    w: float,
    h: float,
    title: str,
    lines: list[str],
    *,
    title_size: int = 16,
    body_size: int = 16,
    line_h: float = 8.0,
    pad: float = 10.0,
) -> None:
    pdf.set_fill_color(*PAPER)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(1.2)
    pdf.rect(x, y, w, h, "DF")
    pdf.set_line_width(0.2)
    pdf.set_xy(x + pad, y + pad - 1)
    pdf.set_font("DejaVu", "B", title_size)
    pdf.set_text_color(*GOLD)
    pdf.cell(w - 2 * pad, title_size * 0.5 + 2, title)
    pdf.set_text_color(*NAVY)
    yy = y + pad + title_size * 0.55 + 6
    for line in lines:
        pdf.set_xy(x + pad, yy)
        pdf.set_font("DejaVu", "", body_size)
        pdf.multi_cell(w - 2 * pad, line_h, line)
        yy = pdf.get_y() + 1.5
        if yy > y + h - pad:
            break


def text_card_paragraph(
    pdf: HBeamerPDF,
    x: float,
    y: float,
    w: float,
    h: float,
    title: str,
    text: str,
    *,
    title_size: int = 16,
    body_size: int = 15,
    line_h: float = 8.0,
    pad: float = 10.0,
) -> None:
    pdf.set_fill_color(*PAPER)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(1.2)
    pdf.rect(x, y, w, h, "DF")
    pdf.set_line_width(0.2)
    pdf.set_xy(x + pad, y + pad - 1)
    pdf.set_font("DejaVu", "B", title_size)
    pdf.set_text_color(*GOLD)
    pdf.cell(w - 2 * pad, title_size * 0.5 + 2, title)
    pdf.set_xy(x + pad, y + pad + title_size * 0.55 + 6)
    pdf.set_font("DejaVu", "", body_size)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(w - 2 * pad, line_h, text)


DEMO_FULL = (
    "Geachte bezoeker, Vanwege werkzaamheden is de leeszaal van 12 tot en met 16 mei "
    "beperkt toegankelijk. Wij adviseren u vóór uw bezoek op onze website te controleren "
    "of de leeszaal geopend is. De overige ruimtes van de bibliotheek blijven volgens de "
    "normale openingstijden toegankelijk."
)

ANTWOORD_FULL = (
    "Van 12 tot 16 mei is de leeszaal minder open door werkzaamheden. "
    "Kijk vóór uw bezoek op de website of de leeszaal open is. "
    "De rest van de bibliotheek is gewoon open."
)

KORTER_FULL = (
    "Leeszaal 12–16 mei beperkt open. "
    "Check de website vóór u komt. "
    "De rest van de bibliotheek is gewoon open."
)


def category_slide(pdf: HBeamerPDF, icon: str, word: str, example: str) -> None:
    _header(pdf, "AI kan helpen")
    icon_path = ICONS / icon
    if icon_path.exists():
        pdf.image(str(icon_path), x=118, y=36, w=60, h=60)
    pdf.set_xy(22, 108)
    pdf.set_font("DejaVu", "B", 36)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 16, word, align="C")
    pdf.set_xy(30, 140)
    pdf.set_font("DejaVu", "", 20)
    pdf.multi_cell(237, 10, example, align="C")
    pdf.set_xy(22, 175)
    pdf.set_font("DejaVu", "I", 13)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(253, 6, NOTE, align="C")
    _foot(pdf)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HBeamerPDF("H1", H1_TITLE)
    pdf._slide_version = H1_VERSION

    # 1 Titel
    pdf.concept_slide(
        H1_TITLE,
        [
            "AI kan mij helpen",
            "Gewone vragen · zelf ervaren",
        ],
        label="",
    )

    # 2 Situatie
    pdf.concept_slide(
        "U krijgt een tekst die u niet meteen duidelijk vindt.",
        [
            "Wat zou u ermee willen doen?",
        ],
        label="Situatie",
    )

    # 3 Demotekst — groot leesbaar vanaf de zaal
    _header(pdf, "Situatie")
    pdf.set_xy(22, 26)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Fictieve bibliotheekmededeling")
    text_card(
        pdf,
        14,
        34,
        269,
        148,
        "TEKST",
        DEMO_LINES,
        title_size=20,
        body_size=22,
        line_h=11.5,
        pad=12,
    )
    pdf.set_xy(22, 186)
    pdf.set_font("DejaVu", "I", 12)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(253, 5, "SeniorEase-oefening — geen echte brief · geen persoonsgegevens")
    _foot(pdf)

    # 4 Wat zou u hiermee willen?
    pdf.concept_slide(
        "WAT ZOU U HIERMEE WILLEN?",
        [
            "Geen goede of foute antwoorden.",
        ],
        label="Situatie",
    )

    # 5 Vraag aan AI
    pdf.concept_slide(
        "Leg deze tekst uit in gewone taal.",
        [
            "We laten zien wat een AI-assistent ermee kan.",
        ],
        label="Vraag",
    )

    # 6 TEKST → GEWONE TAAL — belangrijkste aha-moment (groot)
    _header(pdf, "Antwoord zien")
    pdf.set_xy(18, 26)
    pdf.set_font("DejaVu", "B", 26)
    pdf.set_text_color(*NAVY)
    pdf.cell(100, 12, "TEKST")
    pdf.set_text_color(*GOLD)
    pdf.cell(40, 12, "→", align="C")
    pdf.set_text_color(*NAVY)
    pdf.cell(100, 12, "GEWONE TAAL")
    # gouden pijl-band tussen kaarten
    pdf.set_fill_color(*GOLD)
    pdf.rect(143, 95, 11, 50, "F")
    pdf.set_xy(143, 108)
    pdf.set_font("DejaVu", "B", 28)
    pdf.set_text_color(*WHITE)
    pdf.cell(11, 12, "→", align="C")
    text_card_paragraph(
        pdf,
        14,
        44,
        125,
        128,
        "TEKST",
        DEMO_FULL,
        title_size=18,
        body_size=15,
        line_h=7.8,
        pad=8,
    )
    text_card_paragraph(
        pdf,
        158,
        44,
        125,
        128,
        "GEWONE TAAL",
        ANTWOORD_FULL,
        title_size=18,
        body_size=16,
        line_h=8.4,
        pad=8,
    )
    pdf.set_xy(18, 178)
    pdf.set_font("DejaVu", "I", 11)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        261,
        5,
        "Voorbeeldantwoord (SeniorEase-demo). Geen nabootsing van een Gemini-scherm.",
    )
    _foot(pdf)

    # 7 Eén van de dingen
    pdf.concept_slide(
        "Dit is één van de dingen waarbij AI kan helpen.",
        [
            "Uitleggen in gewone taal.",
        ],
        label="",
    )

    # 8 Bijsturen
    pdf.concept_slide(
        "Nog korter, alstublieft.",
        [
            "Het eerste antwoord is niet het eindpunt.",
            "U mag AI vragen het antwoord aan te passen.",
        ],
        label="Vervolgvraag",
    )

    # 9 Korter resultaat — groot leesbaar
    _header(pdf, "Vervolgvraag")
    pdf.set_xy(22, 28)
    pdf.set_font("DejaVu", "B", 20)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 9, "Korter antwoord")
    text_card_paragraph(
        pdf,
        22,
        44,
        253,
        110,
        "NA BIJSTURING",
        KORTER_FULL,
        title_size=18,
        body_size=26,
        line_h=14.0,
        pad=14,
    )
    pdf.set_xy(22, 164)
    pdf.set_font("DejaVu", "", 18)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 9, "U kunt verder vragen tot het bruikbaarder is.")
    _foot(pdf)

    # 10 Korte uitleg
    pdf.concept_slide(
        "Een AI-assistent",
        [
            "Een programma waaraan u een vraag kunt stellen.",
            "Het kan een antwoord, uitleg of idee geven.",
            "AI denkt niet zoals een mens.",
            "Een antwoord kan handig zijn — en toch fout.",
        ],
        label="Kort",
    )

    # 11 Gemini-kader
    pdf.concept_slide(
        "In deze les gebruiken we Google Gemini als voorbeeld.",
        [
            "Andere AI-assistenten werken",
            "op veel punten vergelijkbaar.",
        ],
        note=NOTE,
        label="",
    )

    # 12 Veiligheid kort
    pdf.concept_slide(
        "Twee korte tips",
        [
            "Deel geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan fout zijn.",
        ],
        label="Tip",
    )

    # 13–16 Categorieën
    category_slide(
        pdf,
        "icon-uitleggen.png",
        "UITLEGGEN",
        "“Leg dit eenvoudiger uit.”",
    )
    category_slide(
        pdf,
        "icon-ideeen.png",
        "IDEEËN",
        "“Wat kan ik maken met aardappelen, broccoli en eieren?”",
    )
    category_slide(
        pdf,
        "icon-formuleren.png",
        "FORMULEREN",
        "“Maak dit vriendelijker: Ik kom morgen wat later.”",
    )
    category_slide(
        pdf,
        "icon-stappen.png",
        "STAPPEN / MOGELIJKHEDEN",
        "“Geef mij drie ideeën voor een eenvoudige verjaardag thuis.”",
    )

    # 17 Geheugensteun
    pdf.concept_slide(
        "VRAAG  →  KIJK  →  PROBEER",
        [
            "Vraag — Wat wilt u weten of gedaan krijgen?",
            "Kijk — Bekijk het antwoord.",
            "Probeer — Probeer één keer zelf.",
        ],
        label="",
    )

    # 18 Zelf ervaren
    pdf.concept_slide(
        "Nu probeert u het zelf",
        [
            "Kies A, B, C of D.",
            "Geen geheimen typen.",
        ],
        label="Zelf ervaren",
    )

    # 19 Keuze A–D overzicht
    _header(pdf, "Zelf ervaren")
    pdf.set_xy(22, 32)
    pdf.set_font("DejaVu", "B", 24)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 11, "Kies één")
    rows = [
        ("A", "Uitleggen"),
        ("B", "Ideeën"),
        ("C", "Formuleren"),
        ("D", "Stappen / mogelijkheden"),
    ]
    y = 55
    for letter, name in rows:
        pdf.set_fill_color(*CREAM)
        pdf.set_draw_color(*GOLD)
        pdf.rect(40, y, 217, 22, "DF")
        pdf.set_xy(52, y + 5)
        pdf.set_font("DejaVu", "B", 18)
        pdf.set_text_color(*NAVY)
        pdf.cell(30, 12, letter)
        pdf.set_font("DejaVu", "", 18)
        pdf.cell(0, 12, name)
        y += 28
    _foot(pdf)

    # 20 Bijsturen zelf
    pdf.concept_slide(
        "Nog één kleine verbetering",
        [
            "Nog korter · vriendelijker · drie mogelijkheden …",
            "Kies wat past bij uw oefening.",
        ],
        label="Vervolgvraag",
    )

    # 21 Eindmissie
    _header(pdf, "Eindmissie")
    pdf.set_xy(22, 32)
    pdf.set_font("DejaVu", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 10, "U wilt hulp bij een gewone dagelijkse vraag.")
    steps = [
        "1. Kies een situatie.",
        "2. Bepaal wat AI moet doen.",
        "3. Bekijk het antwoord.",
        "4. Vraag één kleine verbetering.",
        "5. Is het antwoord nu bruikbaarder?",
    ]
    y = 70
    for s in steps:
        pdf.set_xy(28, y)
        pdf.set_font("DejaVu", "", 18)
        pdf.multi_cell(240, 9, s)
        y = pdf.get_y() + 4
    pdf.set_xy(22, 168)
    pdf.set_font("DejaVu", "I", 14)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 7, "Geen antwoorden van tevoren · doe dit zelf")
    _foot(pdf)

    # 22 Succes
    pdf.concept_slide(
        "Hier kan AI mij bij helpen.",
        [
            "Dat is genoeg voor vandaag.",
        ],
        label="Afronding",
    )

    # 23 Vooruitblik
    pdf.concept_slide(
        "De volgende keer",
        [
            "leert u hoe u zelf een gesprek",
            "met een AI-assistent voert.",
        ],
        label="Vooruitblik",
    )

    pdf.output(str(OUT))
    print("wrote", OUT, "pages", pdf.page)
    return OUT


if __name__ == "__main__":
    build()
