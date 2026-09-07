#!/usr/bin/env python3
"""C2 beamer — Foto's en documenten via WhatsApp v2.0 (C1-productiemal)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CBeamerPDF  # noqa: E402

C2_VERSION = "v2.0"
C2_TITLE = "Foto's en documenten via WhatsApp"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-C2-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"C2 beamer vereist screenshot zonder placeholder: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CBeamerPDF("C2", C2_TITLE)
    pdf._slide_version = C2_VERSION

    pdf.concept_slide(
        C2_TITLE,
        ["Een foto of document ontvangen, terugvinden en veilig versturen"],
        label="",
    )
    pdf.concept_slide(
        "U krijgt een foto en een document via WhatsApp.",
        [
            "Hoe bekijkt u die later opnieuw?",
            "En hoe stuurt u zelf de juiste foto naar de juiste persoon?",
        ],
        label="SITUATIE",
    )
    pdf.concept_slide(
        "ONTVANGEN → OPENEN → TERUGVINDEN → KIEZEN → CONTROLEREN → VERSTUREN",
        ["Dat is de vaste route van vandaag."],
        label="ONTHOUD",
    )

    # C1 terughaal
    pdf.concept_slide(
        "Eerst kort terug",
        [
            "Open WhatsApp.",
            "Kies het oefencontact.",
            "Controleer de naam.",
            "Stuur: Ik ben klaar om te oefenen.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Brug",
        [
            "Vorige keer stuurde u een tekstbericht.",
            "Vandaag krijgt en verstuurt u ook een foto en een document.",
        ],
        label="",
    )

    # Foto ontvangen
    pdf.concept_slide(
        "U krijgt zo een oefenfoto",
        ["Open de foto.", "Ga daarna terug naar het gesprek."],
        label="",
    )
    shot(pdf, "Ontvangen foto", "shared/c2-foto-ontvangen.png", "Tik op de foto om te openen")
    shot(pdf, "Foto geopend", "shared/c2-foto-geopend.png", "Daarna terug naar het gesprek")
    pdf.concept_slide(
        "Nu u",
        ["Open de ontvangen foto.", "Ga terug naar het gesprek."],
        label="",
    )

    # Terugvinden
    pdf.concept_slide(
        "Kunt u de foto nu zelf weer terugvinden?",
        [
            "Ga even verder in het gesprek.",
            "Zoek dezelfde foto opnieuw.",
            "Open hem opnieuw.",
        ],
        label="KERN",
    )
    pdf.concept_slide(
        "Nu u",
        ["Vind de ontvangen foto opnieuw in het gesprek."],
        label="",
    )

    # Zelf versturen
    pdf.concept_slide(
        "Zelf een foto versturen",
        ["Tik op toevoegen of bijlage.", "Kies Foto's of Galerij."],
        label="",
    )
    shot(pdf, "iPhone — toevoegen", "ios/c2-toevoegen.png", "Tik op + links bij het typvak")
    shot(pdf, "Android — bijlage", "android/c2-toevoegen.png", "Tik op de paperclip / bijlage")
    shot(pdf, "iPhone — Foto's", "ios/c2-fotos-galerij.png", "Kies Foto's")
    shot(
        pdf,
        "Android — Foto's en video's",
        "android/c2-fotos-galerij.png",
        "Kies Foto's en video's / Galerij",
    )
    pdf.concept_slide(
        "Kies de afgesproken oefenfoto",
        ["Nog niet versturen."],
        label="",
    )
    pdf.concept_slide(
        "STOP — juiste foto?",
        ["Is dit de juiste foto?"],
        label="LET OP",
    )
    pdf.concept_slide(
        "STOP — juiste persoon?",
        ["Klopt de naam bovenaan?"],
        label="LET OP",
    )
    shot(
        pdf,
        "FOTO + PERSOON",
        "shared/c2-foto-persoon.png",
        "Beide goed? Dan pas versturen",
    )
    pdf.concept_slide(
        "FOTO + PERSOON",
        ["Dan pas VERSTUREN."],
        label="ONTHOUD",
    )
    pdf.concept_slide(
        "Nu u",
        ["Controleer foto en naam.", "Verstuur."],
        label="",
    )

    # Document
    pdf.concept_slide(
        "U krijgt zo een oefendocument",
        ["Stop vóór u opent."],
        label="",
    )
    shot(
        pdf,
        "Document ontvangen",
        "shared/c2-document-ontvangen.png",
        "Verwachtte u dit document?",
    )
    pdf.concept_slide(
        "VERWACHT U DIT DOCUMENT?",
        [
            "Ja → dan pas openen.",
            "Twijfel → niet openen → eerst controleren.",
        ],
        label="LET OP",
    )
    shot(pdf, "Document geopend", "shared/c2-document-geopend.png", "Herkenbare titel")
    shot(
        pdf,
        "Terug naar WhatsApp",
        "shared/c2-document-terug.png",
        "Tik op < om terug te gaan",
    )
    pdf.concept_slide(
        "Nu u",
        ["Open het afgesproken oefendocument."],
        label="",
    )
    pdf.concept_slide(
        "Kunt u het document later zelf weer terugvinden?",
        [
            "Terug naar WhatsApp.",
            "Zoek het document opnieuw in het gesprek.",
        ],
        label="KERN",
    )
    shot(
        pdf,
        "Document terugvinden",
        "shared/c2-document-terugvinden.png",
        "In hetzelfde gesprek",
    )

    # Eindmissie — 18 stappen (definitief) in 4 dia's
    pdf.mission_slide(
        "Kunt u dit zelf? (1–5)",
        [
            "Open WhatsApp.",
            "Kies het oefencontact of uw oefenpersoon.",
            "Controleer de naam.",
            "Kies de tweede oefenfoto.",
            "Controleer: juiste foto?",
        ],
        label="",
        start=1,
    )
    pdf.mission_slide(
        "Ga verder (6–10)",
        [
            "Controleer: juiste persoon?",
            "Verstuur de foto.",
            "Wacht op een neutrale foto terug.",
            "Open de ontvangen foto.",
            "Ga terug naar het gesprek.",
        ],
        label="",
        start=6,
    )
    pdf.mission_slide(
        "Nog even (11–15)",
        [
            "Verander kort van positie in het gesprek.",
            "Zoek de ontvangen foto opnieuw.",
            "Wacht op SeniorEase-eindmissie-C2.pdf.",
            "Stop vóór u opent.",
            "Verwachtte ik dit document?",
        ],
        label="",
        start=11,
    )
    pdf.mission_slide(
        "Afronden (16–18)",
        [
            "Open het document.",
            "Ga terug naar WhatsApp.",
            "Zoek het document opnieuw in het gesprek.",
        ],
        label="",
        start=16,
    )
    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan kunt u zelf een foto via WhatsApp versturen en een verwacht document openen en terugvinden.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
