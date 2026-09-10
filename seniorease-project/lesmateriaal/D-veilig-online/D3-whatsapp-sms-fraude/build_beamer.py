#!/usr/bin/env python3
"""D3 beamer — Oplichters aan de telefoon en via berichten v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DBeamerPDF, GOLD, NAVY  # noqa: E402

D3_VERSION = "v2.0"
D3_TITLE = "Oplichters aan de telefoon en via berichten"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-D3-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"D3 beamer vereist screenshot: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def eindmissie(pdf: DBeamerPDF) -> None:
    """Scenario D + open opdracht — geen checklist/antwoorden."""
    pdf._bar("")
    pdf.set_xy(22, 24)
    pdf.set_font("DejaVu", "B", 16)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(253, 7, "Eindmissie")

    pdf.set_xy(22, 40)
    pdf.set_font("DejaVu", "B", 20)
    pdf.multi_cell(155, 9, "U wordt onverwacht benaderd.")
    pdf.set_xy(22, pdf.get_y() + 4)
    pdf.set_font("DejaVu", "B", 22)
    pdf.multi_cell(155, 10, "Wat doet u nu?")
    pdf.set_xy(22, pdf.get_y() + 6)
    pdf.set_font("DejaVu", "", 15)
    pdf.multi_cell(
        155,
        7.5,
        "Laat zien hoe u stopt, niets deelt of installeert, "
        "en — indien nodig — zelf via een officiële route contact zoekt.",
    )
    pdf.set_xy(22, pdf.get_y() + 8)
    pdf.set_font("DejaVu", "I", 12)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(155, 6, "Geen antwoorden van tevoren · doe dit zelf")

    img = SHOTS / "shared/d3-scenario-d.png"
    if not img.exists():
        raise FileNotFoundError(img)
    pdf.image(str(img), x=185, y=36, w=90)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DBeamerPDF("D3", D3_TITLE)
    pdf._slide_version = D3_VERSION

    # Opening
    pdf.concept_slide(
        D3_TITLE,
        [
            "Gesprek stoppen, geen code of scherm delen,",
            "en zelf terugbellen",
        ],
        label="",
    )
    pdf.concept_slide(
        "U wordt gebeld.",
        [
            "Iemand zegt: bank of helpdesk.",
            "Er zou iets mis zijn.",
            "U moet snel een app installeren of uw scherm delen.",
            "Wat doet u?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Eerder stopte u bij een onverwacht verzoek.",
        [
            "Vandaag: bij een onverwachte beller of helpdesk.",
            "Eerst stoppen. Indien nodig: zelf controleren.",
        ],
        label="",
    )

    # Kapstok
    shot(pdf, "Bij een onverwachte beller", "shared/d3-kapstok.png", "ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN")
    pdf.concept_slide(
        "STOP → NIET VERDERGAAN",
        ["→ ZELF CONTROLEREN"],
        label="",
    )
    pdf.concept_slide(
        "NIET BETALEN · GEEN CODE DELEN",
        ["NIET OP EEN ONVERWACHTE LINK TIKKEN"],
        label="",
    )
    # Note: GEEN SOFTWARE slides come AFTER scenario A question in the lesson flow
    # for the A-sequence; kapstok may show overview but A-specific answers wait.
    # Per frozen timeline kapstok includes risks; A sequence still: show A → ask → then repeat.

    # Scenario A — NO answers first
    pdf.concept_slide(
        "We kijken naar dit oefengesprek.",
        ["SeniorEase-oefening.", "Geen echt gesprek."],
        label="",
    )
    shot(
        pdf,
        "Oefengesprek",
        "shared/d3-gesprek-a.png",
        "Oefening SeniorEase — geen echt gesprek",
    )
    pdf.concept_slide("Wat doet u nu?", [], label="")

    # PAS DAARNA answers
    pdf.concept_slide("STOP", ["Beëindig het onverwachte contact."], label="")
    pdf.concept_slide("GEEN CODE", ["Geef geen codes door."], label="")
    shot(
        pdf,
        "GEEN SOFTWARE · GEEN SCHERM",
        "shared/d3-geen-software-scherm.png",
        "Niet op verzoek van een onverwachte beller",
    )
    pdf.concept_slide(
        "Nu u",
        ["Oefen een veilige reactie.", "Ophangen of wegleggen."],
        label="",
    )

    # Terugbelzin
    shot(
        pdf,
        "Terugbelzin",
        "shared/d3-terugbelzin.png",
        "Ik bel u zelf terug via het officiële nummer.",
    )
    pdf.concept_slide(
        "Eerst beëindigen.",
        [
            "Alleen terugbellen als controleren nodig is.",
            "Niet ieder onverwacht gesprek.",
            "Nooit via het nummer uit het gesprek.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Nu u",
        ["Zeg de zin zelf — rustig.", "Alleen of met iemand naast u."],
        label="",
    )

    # Officiële route
    pdf.concept_slide(
        "Ik zoek zelf het officiële nummer",
        ["via een route die ik al vertrouw."],
        label="",
    )
    pdf.concept_slide(
        "Niet:",
        [
            "willekeurig contact omdat het in Contacten staat",
            "nummer of link uit het gesprek of bericht",
        ],
        label="",
    )
    shot(pdf, "iPhone — officiële app", "ios/d3-officiele-app.png", "App die u al gebruikt · tot startscherm")
    shot(pdf, "Android — officiële app", "android/d3-officiele-app.png", "App die u al gebruikt · tot startscherm")
    shot(
        pdf,
        "iPhone — gecontroleerd nummer",
        "ios/d3-gecontroleerd-nummer.png",
        "Eerder zelf gecontroleerd · niet Contacten = veilig",
    )
    shot(
        pdf,
        "Android — gecontroleerd nummer",
        "android/d3-gecontroleerd-nummer.png",
        "Eerder zelf gecontroleerd · niet Contacten = veilig",
    )
    pdf.concept_slide(
        "Nu u",
        [
            "Kies een officiële route die u al vertrouwt.",
            "Niet inloggen. Niet bellen in de les.",
        ],
        label="",
    )

    # Pauze
    pdf.concept_slide("Korte pauze", ["Daarna: een kort berichtvoorbeeld."], label="")

    # Bericht B
    pdf.concept_slide(
        "We kijken alleen naar dit voorbeeld.",
        ["Geen familie-scenario.", "Tik nergens."],
        label="",
    )
    shot(
        pdf,
        "Kijkvoorbeeld",
        "shared/d3-bericht-b.png",
        "SeniorEase-oefening — geen echt bericht",
    )
    pdf.concept_slide(
        "Eerst stoppen.",
        ["Alleen indien nodig: zelf via een officiële route."],
        label="",
    )

    # Situatie C
    shot(
        pdf,
        "“Veilige rekening”",
        "shared/d3-situatie-c.png",
        "STOP · niet overmaken",
    )
    pdf.concept_slide(
        "Niet overmaken.",
        ["Niet betalen.", "Eerst stoppen."],
        label="",
    )

    # Herhalen
    pdf.concept_slide(
        "Even herhalen",
        [
            "ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN",
            "GEEN SOFTWARE · GEEN SCHERM",
        ],
        label="",
    )

    # Eindmissie
    eindmissie(pdf)
    shot(
        pdf,
        "Eindmissie — scenario",
        "shared/d3-scenario-d.png",
        "Oefening SeniorEase — geen echt gesprek",
    )

    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u: eerst stoppen,",
            "geen code of scherm delen,",
            "en — als u wilt controleren —",
            "zelf contact zoeken via een officiële route",
            "die u al vertrouwt.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
