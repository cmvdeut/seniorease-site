#!/usr/bin/env python3
"""H4 beamer — AI-antwoorden controleren en veilig gebruiken v2.0.

Beslisles: fictieve SeniorEase AI-kaarten · geen Gemini · geen browser.
Hoofdroute: DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS.
"""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HBeamerPDF, MUTED, NAVY, PAPER, WHITE  # noqa: E402

H4_VERSION = "v2.0"
H4_TITLE = "AI-antwoorden controleren en veilig gebruiken"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-H4-Beamer-v2.pdf"

REGEL = (
    "Bij belangrijke beslissingen over gezondheid, geld, recht of overheid: "
    "controleer bij een deskundige of officiële bron."
)
FICTIEF = "U heeft hiervoor alleen uw identiteitsbewijs nodig."
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
    header = f"H4  —  {label}" if label.strip() else "H4"
    pdf.cell(0, 8, header)


def _foot(pdf: HBeamerPDF) -> None:
    pdf.set_y(198)
    pdf.set_font("DejaVu", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 4, f"SeniorEase  |  {H4_TITLE}  |  Beamer {H4_VERSION}", align="C")


def route_slide(pdf: HBeamerPDF) -> None:
    _header(pdf, "Hoofdroute")
    steps = ["DEEL NIET ALLES", "CONTROLEER WAT BELANGRIJK IS"]
    y = 55
    for i, step in enumerate(steps):
        pdf.set_fill_color(*PAPER)
        pdf.set_draw_color(*GOLD)
        pdf.set_line_width(1.2)
        pdf.rect(30, y, 237, 36, "DF")
        pdf.set_xy(30, y + 10)
        pdf.set_font("DejaVu", "B", 24)
        pdf.set_text_color(*NAVY)
        pdf.cell(237, 16, step, align="C")
        y += 48
        if i == 0:
            pdf.set_xy(30, y - 16)
            pdf.set_font("DejaVu", "B", 22)
            pdf.set_text_color(*GOLD)
            pdf.cell(237, 10, "↓", align="C")
    _foot(pdf)


def fictief_kaart(pdf: HBeamerPDF, label: str, body: str, follow: str = "") -> None:
    """SeniorEase fictieve AI-antwoordkaart — geen Gemini-imitatie."""
    _header(pdf, label)
    pdf.set_fill_color(*PAPER)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(1.0)
    pdf.rect(28, 36, 241, 120, "DF")
    pdf.set_xy(36, 46)
    pdf.set_font("DejaVu", "B", 14)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(225, 8, "OEFENVOORBEELD — FICTIEF AI-ANTWOORD")
    pdf.set_xy(36, 72)
    pdf.set_font("DejaVu", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(225, 12, body)
    if follow:
        pdf.set_xy(28, 168)
        pdf.set_font("DejaVu", "B", 18)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(241, 9, follow)
    _foot(pdf)


def compare_two(
    pdf: HBeamerPDF,
    label: str,
    left_title: str,
    left_items: list[str],
    right_title: str,
    right_items: list[str],
    note: str = "",
) -> None:
    _header(pdf, label)
    pdf.set_xy(22, 28)
    pdf.set_font("DejaVu", "B", 14)
    pdf.set_text_color(*GOLD)
    pdf.cell(120, 8, left_title)
    pdf.set_xy(155, 28)
    pdf.cell(120, 8, right_title)

    pdf.set_fill_color(*PAPER)
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(0.8)
    pdf.rect(18, 40, 125, 115, "DF")
    pdf.rect(154, 40, 125, 115, "DF")

    y = 50
    for item in left_items:
        pdf.set_xy(24, y)
        pdf.set_font("DejaVu", "B", 16)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(113, 9, item)
        y = pdf.get_y() + 4

    y = 50
    for item in right_items:
        pdf.set_xy(160, y)
        pdf.set_font("DejaVu", "B", 16)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(113, 9, item)
        y = pdf.get_y() + 4

    if note:
        pdf.set_xy(22, 168)
        pdf.set_font("DejaVu", "I", 12)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(253, 6, note)
    _foot(pdf)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HBeamerPDF("H4", H4_TITLE)
    pdf._slide_version = H4_VERSION

    # 1 Titel
    pdf.concept_slide(
        H4_TITLE,
        [
            "Ik gebruik AI verstandig",
            "Deel niet alles · controleer wat belangrijk is",
        ],
        label="",
    )

    # 2 Retrieval VOOR
    pdf.concept_slide(
        "VOOR",
        [VOOR],
        label="Terugblik",
        note="Korte terugblik op H3. Geen nieuwe promptles.",
    )

    # 3 Retrieval NA
    _header(pdf, "Terugblik")
    pdf.set_xy(22, 32)
    pdf.set_font("DejaVu", "B", 20)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 10, "NA")
    y = 52
    for line in NA_LINES:
        pdf.set_xy(22, y)
        pdf.set_font("DejaVu", "B", 20)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(253, 11, line)
        y = pdf.get_y() + 5
    _foot(pdf)

    # 4 Welke helpt
    pdf.concept_slide(
        "Welke vraag helpt AI beter?",
        ["WAT WILT U? · INFO · HOE"],
        label="Terugblik",
    )

    # 5 Brug
    pdf.concept_slide(
        "Een duidelijkere vraag kan een bruikbaarder antwoord geven.",
        ["Maar betekent dat ook dat het antwoord altijd klopt?"],
        label="Brug",
    )

    # 6 Hoofdroute
    route_slide(pdf)

    # 7 Situatie
    pdf.concept_slide(
        "U wilt weten of u voor een officiële aanvraag",
        ["een bepaald document nodig heeft."],
        label="Situatie",
        note="Dit is een oefensituatie.",
    )

    # 8 Fictief antwoord
    fictief_kaart(
        pdf,
        "Situatie",
        FICTIEF,
        follow="Zou u dit meteen aannemen?",
    )

    # 9 Controleren?
    pdf.concept_slide(
        "Of zou u dit controleren",
        ["bij de organisatie die de aanvraag behandelt?"],
        label="Situatie",
    )

    # 10 Zeker klinken
    pdf.concept_slide(
        "Een antwoord dat zeker klinkt,",
        ["hoeft niet altijd te kloppen."],
        label="Let op",
        note="Duidelijk · netjes · zeker — maar mogelijk fout · verouderd · onvolledig",
    )

    # 11 DEEL NIET ALLES intro via route already; privacy vraag
    pdf.concept_slide(
        "MOET AI DIT ECHT WETEN?",
        [
            "Geef alleen informatie die nodig is.",
            "Laat gevoelige gegevens weg als AI die niet nodig heeft.",
        ],
        label="Privacy",
    )

    # 12 HARD GEHEIM
    pdf.concept_slide(
        "Dit deelt u niet in oefeningen",
        [
            "Wachtwoorden · codes · DigiD · BSN",
            "Bankgegevens · medische dossiers",
        ],
        label="Privacy",
        note="Alleen als voorbeeld van NIET DELEN.",
    )

    # 13 Privacy oefening situatie
    pdf.concept_slide(
        "U wilt AI vragen een nette afspraak-afzegging te schrijven.",
        ["Wat heeft AI echt nodig?"],
        label="Oefenen",
        note="Kies: NODIG of NIET NODIG. Geen punten.",
    )

    # 14 Privacy keuzes
    compare_two(
        pdf,
        "Oefenen",
        "NODIG",
        [
            "Ik kan donderdag niet",
            "Ik wil vriendelijk afzeggen",
            "Korte reden (optioneel)",
        ],
        "NIET NODIG",
        [
            "Mijn volledige naam",
            "Mijn BSN",
            "Mijn bankrekeningnummer",
        ],
    )

    # 15 Controlegraad
    compare_two(
        pdf,
        "Controleren",
        "MEESTAL GEBRUIKEN NA ZELF LEZEN",
        [
            "Maaltijdidee",
            "Vriendelijk bericht",
            "Verjaardagidee",
            "Eenvoudige brainstorm",
        ],
        "EERST CONTROLEREN",
        [
            "Gezondheid",
            "Geld",
            "Recht",
            "Overheid",
            "Serieuze gevolgen",
        ],
    )

    # 16 Frozen regel
    _header(pdf, "Controleren")
    pdf.set_xy(22, 50)
    pdf.set_font("DejaVu", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 14, REGEL)
    _foot(pdf)

    # 17 Belangrijkste vraag
    pdf.concept_slide(
        "WAAR KAN IK DIT NOG CONTROLEREN?",
        ["Dit is de belangrijkste praktische vraag vandaag."],
        label="Controleren",
    )

    # 18 AI ≠ onafhankelijke controle
    _header(pdf, "Controleren")
    pdf.set_xy(40, 40)
    pdf.set_fill_color(*PAPER)
    pdf.set_draw_color(*GOLD)
    pdf.rect(40, 40, 217, 28, "DF")
    pdf.set_xy(40, 48)
    pdf.set_font("DejaVu", "B", 18)
    pdf.set_text_color(*NAVY)
    pdf.cell(217, 12, "AI: “Weet u het zeker?” → “Ja.”", align="C")

    pdf.set_xy(22, 90)
    pdf.set_font("DejaVu", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 12, "AI OPNIEUW VRAGEN")
    pdf.set_xy(22, 118)
    pdf.set_font("DejaVu", "B", 28)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(253, 14, "≠")
    pdf.set_xy(22, 140)
    pdf.set_font("DejaVu", "B", 20)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 11, "CONTROLEREN BIJ EEN ANDERE BETROUWBARE BRON")
    _foot(pdf)

    # 19 Waar — gemeente
    pdf.concept_slide(
        "AI zegt iets over uw gemeentelijke aanvraag.",
        ["Waar controleren? → gemeente / officiële overheidsinformatie"],
        label="Oefenen",
        note="Niet: de website nu openen.",
    )

    # 20 Waar — medicijnen
    pdf.concept_slide(
        "AI geeft informatie over uw medicijnen.",
        ["Waar controleren? → arts / apotheek"],
        label="Oefenen",
    )

    # 21 Waar — verzekering
    pdf.concept_slide(
        "AI zegt iets over voorwaarden van uw verzekering.",
        ["Waar controleren? → verzekeraar / polisvoorwaarden"],
        label="Oefenen",
    )

    # 22 Waar — winkel
    pdf.concept_slide(
        "AI zegt hoeveel iets kost bij een winkel.",
        ["Waar controleren? → winkel zelf"],
        label="Oefenen",
    )

    # 23 Moet ik controleren intro
    pdf.concept_slide(
        "KAN IK GEBRUIKEN",
        ["of", "EERST CONTROLEREN"],
        label="Oefenen",
        note="Geen advies. Alleen herkennen.",
    )

    # 24 Voorbeelden licht
    pdf.concept_slide(
        "Meestal gebruiken",
        [
            "Drie ideeën voor een eenvoudige lunch",
            "Vriendelijk bericht: morgen niet kunnen komen",
            "Wat kan ik thuis doen op een regenachtige middag?",
        ],
        label="Oefenen",
    )

    # 25 Voorbeelden belangrijk
    pdf.concept_slide(
        "Eerst controleren",
        [
            "Stoppen met een geneesmiddel?",
            "Document nodig voor overheidsaanvraag?",
            "Moet ik deze belasting betalen?",
        ],
        label="Oefenen",
        note="Geen echt medisch, juridisch of financieel advies.",
    )

    # 26 Is het belangrijk
    pdf.concept_slide(
        "IS HET BELANGRIJK ALS DIT FOUT IS?",
        ["Zo ja: waar kunt u dit nog controleren?"],
        label="Beslissen",
    )

    # 27 Eindmissie
    pdf.concept_slide(
        "Eindmissie — doe dit zelf",
        [
            "Drie fictieve situaties",
            "Laag risico · privacy · belangrijk",
        ],
        label="Eindmissie",
        note="Geen toets. Geen punten.",
    )

    # 28 Eindmissie vragen
    pdf.concept_slide(
        "Per situatie",
        [
            "Wat deel ik niet?",
            "Is het belangrijk als het fout is?",
            "Moet ik controleren? Zo ja: waar?",
        ],
        label="Eindmissie",
    )

    # 29 Succes
    pdf.concept_slide(
        "Zeg bijvoorbeeld:",
        [
            "“Dit hoeft AI niet te weten.”",
            "“Dit controleer ik nog bij …”",
        ],
        label="Eindmissie",
    )

    # 30 Pakket H afronding
    _header(pdf, "Afronding")
    lines = [
        ("H1", "AI kan mij helpen."),
        ("H2", "Ik kan AI zelf gebruiken."),
        ("H3", "Ik kan mijn vraag duidelijker maken."),
        ("H4", "Ik gebruik AI verstandig."),
    ]
    y = 36
    for code, text in lines:
        pdf.set_xy(28, y)
        pdf.set_font("DejaVu", "B", 16)
        pdf.set_text_color(*GOLD)
        pdf.cell(28, 10, code)
        pdf.set_font("DejaVu", "B", 18)
        pdf.set_text_color(*NAVY)
        pdf.cell(200, 10, text)
        y += 22
    _foot(pdf)

    # 31 Slotzin
    pdf.concept_slide(
        "Ik kan AI gebruiken,",
        ["maar ik blijf zelf nadenken."],
        label="Afronding",
    )

    pdf.output(str(OUT))
    print("wrote", OUT, "pages", pdf.page)
    return OUT


if __name__ == "__main__":
    build()
