#!/usr/bin/env python3
"""C3 beamer — Bellen en videobellen met WhatsApp v2.0 (C1/C2-productiemal)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CBeamerPDF  # noqa: E402

C3_VERSION = "v2.0"
C3_TITLE = "Bellen en videobellen met WhatsApp"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-C3-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"C3 beamer vereist screenshot zonder placeholder: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CBeamerPDF("C3", C3_TITLE)
    pdf._slide_version = C3_VERSION

    pdf.concept_slide(
        C3_TITLE,
        ["Zelf bellen, opnemen en videobellen"],
        label="",
    )
    pdf.concept_slide(
        "U wilt iemand even spreken of zien.",
        [
            "Hoe belt u die persoon zelf via WhatsApp?",
            "Welke knoppen heeft u tijdens het gesprek nodig?",
        ],
        label="SITUATIE",
    )
    pdf.concept_slide(
        "KIEZEN → CONTROLEREN → BELLEN → PRATEN → OPHANGEN",
        ["Dat is de vaste route van vandaag."],
        label="ONTHOUD",
    )
    pdf.concept_slide(
        "KIJK EERST NAAR DE NAAM",
        ["Dan bellen."],
        label="LET OP",
    )

    # Terughaal
    pdf.concept_slide(
        "Eerst kort terug",
        [
            "Open WhatsApp.",
            "Kies het oefencontact.",
            "Controleer de naam.",
            "Stuur: Mag ik u even bellen?",
        ],
        label="",
    )
    pdf.concept_slide(
        "Brug",
        [
            "U heeft gevraagd of het uitkomt.",
            "Nu gaan we niet verder typen — we gaan bellen.",
        ],
        label="",
    )

    pdf.concept_slide(
        "Bellen via WhatsApp gaat via internet",
        [
            "Met wifi: meestal geen mobiele data.",
            "Zonder wifi: WhatsApp gebruikt uw mobiele internet.",
        ],
        label="",
    )

    # Audio
    pdf.concept_slide(
        "Audiogesprek",
        ["Controleer de naam.", "Tik op bellen.", "Hang zelf weer op."],
        label="",
    )
    shot(
        pdf,
        "Naam controleren",
        "shared/c3-naam-controleren.png",
        "KIJK EERST NAAR DE NAAM",
    )
    shot(
        pdf,
        "Bellen",
        "shared/c3-gesprek-knoppen.png",
        "Rechtsboven: telefoon = bellen",
    )
    shot(pdf, "Tijdens het gesprek", "shared/c3-audio-gesprek.png", "Microfoon · rode knop")
    shot(pdf, "Ophangen", "shared/c3-ophangen.png", "Rode knop = gesprek beëindigen")
    pdf.concept_slide(
        "Nu u",
        ["Kies uw oefenpersoon.", "Controleer de naam.", "Bel kort en hang zelf op."],
        label="",
    )

    # Inkomend
    pdf.concept_slide(
        "Iemand belt u terug",
        ["Kijk wie belt.", "Neem op.", "Hang zelf weer op."],
        label="",
    )
    shot(
        pdf,
        "Inkomende oproep",
        "shared/c3-inkomende-oproep.png",
        "Kijk wie belt → opnemen",
    )
    pdf.concept_slide(
        "Komt het niet uit?",
        ["U hoeft niet op te nemen."],
        label="",
    )

    # Microfoon
    pdf.concept_slide(
        "Microfoon uit / aan",
        ["Dempen is niet ophangen."],
        label="LET OP",
    )
    shot(
        pdf,
        "MICROFOON UIT",
        "shared/c3-microfoon.png",
        "De ander hoort u niet",
    )
    pdf.concept_slide(
        "Nu u",
        ["Zet de microfoon kort uit.", "Zet hem weer aan."],
        label="",
    )

    # Video
    pdf.concept_slide(
        "Videobellen",
        [
            "Vraag eerst of het uitkomt.",
            "Kijk wat er achter u in beeld komt.",
            "Daarna starten.",
        ],
        label="LET OP",
    )
    pdf.concept_slide(
        "Privacy",
        [
            "Alleen met uw afgesproken oefenpersoon.",
            "Richt de camera niet ongevraagd op anderen.",
        ],
        label="",
    )
    shot(
        pdf,
        "Videobellen starten",
        "shared/c3-video-starten.png",
        "Camera-knop = videobellen",
    )
    shot(
        pdf,
        "Videogesprek",
        "shared/c3-video-gesprek.png",
        "Microfoon · camera · ophangen",
    )
    shot(pdf, "Camera uit / aan", "shared/c3-camera.png", "Camera uit = ander ziet u niet")
    pdf.concept_slide(
        "Nu u",
        ["Start videobellen.", "Camera kort uit/aan.", "Hang zelf op."],
        label="",
    )

    # Camera wisselen
    pdf.concept_slide(
        "Camera wisselen",
        ["Ondersteunend — niet verplicht."],
        label="",
    )
    shot(
        pdf,
        "Camera wisselen",
        "shared/c3-camera-wisselen.png",
        "Alleen als het duidelijk is",
    )

    # Groep herkennen
    pdf.concept_slide(
        "KIJK BOVENAAN",
        ["Één persoon of een groep?"],
        label="ONTHOUD",
    )
    shot(
        pdf,
        "Persoon of groep",
        "shared/c3-persoon-vs-groep.png",
        "Alleen herkennen — geen groep maken",
    )

    shot(
        pdf,
        "Terug in WhatsApp",
        "shared/c3-terug-gesprek.png",
        "Na ophangen bent u terug in het gesprek",
    )

    # Eindmissie 9 stappen
    pdf.mission_slide(
        "Kunt u dit zelf? (1–5)",
        [
            "Open WhatsApp en kies uw oefenpersoon.",
            "Controleer de naam.",
            "Vraag: Mag ik u videobellen?",
            "Wacht op akkoord en start het videogesprek.",
            "Zet uw microfoon kort uit en weer aan.",
        ],
        label="",
        start=1,
    )
    pdf.mission_slide(
        "Ga verder (6–9)",
        [
            "Zet uw camera kort uit en weer aan.",
            "Beëindig zelf het gesprek.",
            "Wissel van rol: laat uw oefenpersoon u bellen.",
            "Kijk wie belt, neem op en beëindig zelf het gesprek.",
        ],
        label="",
        start=6,
    )
    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan kunt u zelf bellen, videobellen, opnemen en een WhatsApp-gesprek weer beëindigen.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
