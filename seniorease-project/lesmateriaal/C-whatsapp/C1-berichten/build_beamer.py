#!/usr/bin/env python3
"""C1 beamer — Een WhatsApp-bericht sturen v2.0 (deelnemergericht, B1-stijl)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CBeamerPDF, MUTED, NAVY  # noqa: E402

C1_VERSION = "v2.0"
C1_TITLE = "Een WhatsApp-bericht sturen"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-C1-Beamer-v2.pdf"
ASSETS = Path(__file__).resolve().parents[1] / "beamer-assets"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str, *, asset_fallback: str | None = None) -> None:
    """Echt beeld uit assets/screenshots; anders beamer-assets; anders placeholder."""
    image = SHOTS / filename
    if not image.exists() and asset_fallback:
        alt = ASSETS / asset_fallback
        if alt.exists():
            image = alt
    if not image.exists():
        pdf.screenshot_needed_slide(
            title,
            [f"[BEELD NODIG — {filename}]"],
            points=[caption] if caption else None,
            label="",
            note=NOTE,
        )
        return
    pdf.zaal_shot_slide(
        title,
        image,
        caption=caption,
        label="",
        note=NOTE,
    )


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    SHOTS.mkdir(parents=True, exist_ok=True)
    pdf = CBeamerPDF("C1", C1_TITLE)
    pdf._slide_version = C1_VERSION

    # Opening — geen methodezin op beamer
    pdf.concept_slide(
        C1_TITLE,
        [
            "Een gesprek openen, typen en antwoorden",
        ],
        label="",
    )

    pdf.concept_slide(
        "U wilt iemand even laten weten dat u later komt.",
        [
            "Hoe stuurt u dat zelf via WhatsApp?",
            "En hoe ziet u of het is aangekomen?",
        ],
        label="SITUATIE",
    )

    pdf.concept_slide(
        "KIEZEN → TYPEN → CONTROLEREN → VERSTUREN → ANTWOORDEN",
        [
            "Dat is de vaste route van vandaag.",
        ],
        label="ONTHOUD",
    )

    pdf.concept_slide(
        "KIJK EERST NAAR DE NAAM",
        [
            "Dan versturen.",
        ],
        label="LET OP",
    )

    # Openen
    pdf.concept_slide(
        "WhatsApp openen",
        [
            "Zoek WhatsApp.",
            "Open de app.",
        ],
        label="",
    )
    shot(
        pdf,
        "iPhone — WhatsApp openen",
        "ios/c1-whatsapp-openen.png",
        "Zoek het WhatsApp-icoon",
    )
    shot(
        pdf,
        "Android — WhatsApp openen",
        "android/c1-whatsapp-openen.png",
        "Zoek het WhatsApp-icoon",
    )
    pdf.concept_slide(
        "Nu u",
        [
            "Open WhatsApp op uw eigen toestel.",
        ],
        label="",
    )

    # Kiezen + naam
    pdf.concept_slide(
        "Kies het juiste gesprek",
        [
            "Eigen oefenpersoon — of het afgesproken oefencontact.",
        ],
        label="",
    )
    shot(
        pdf,
        "Gesprek open — naam bovenaan",
        "shared/c1-gesprek-naam.png",
        "Stop. Klopt de naam?",
        asset_fallback="voorbeeld-chat.png",
    )
    pdf.concept_slide(
        "STOP",
        [
            "Kijk eerst naar de naam bovenaan.",
            "Dan pas typen.",
        ],
        label="LET OP",
    )

    # Typen + herstellen
    pdf.concept_slide(
        "Typ dit — met een fout",
        [
            "Ik kom 10 minnten later.",
        ],
        label="",
    )
    shot(
        pdf,
        "Typvak",
        "shared/c1-typvak.png",
        "Typ onderaan in het typvak",
        asset_fallback="voorbeeld-typvak.png",
    )
    pdf.concept_slide(
        "Herstel de fout",
        [
            "Ik kom 10 minuten later.",
            "Herstellen vóór versturen.",
        ],
        label="",
    )

    # Emoji + versturen
    pdf.concept_slide(
        "Emoji — als u wilt",
        [
            "Voeg eventueel één emoji toe.",
            "Bijvoorbeeld een lachend gezicht.",
        ],
        label="",
    )
    pdf.concept_slide(
        "Nog één keer controleren",
        [
            "Klopt de tekst?",
            "Klopt de naam?",
            "Dan versturen.",
        ],
        label="ONTHOUD",
    )
    shot(
        pdf,
        "Versturen — voorbeeld",
        "shared/c1-versturen.png",
        "Tik op de verzendknop",
        asset_fallback="voorbeeld-typvak.png",
    )
    pdf.concept_slide(
        "Nu u",
        [
            "Controleer de naam.",
            "Verstuur uw bericht.",
        ],
        label="",
    )

    # Vinkjes
    pdf.concept_slide(
        "Vinkjes — kort",
        [
            "Eén vinkje: verzonden",
            "Twee grijze: afgeleverd",
            "Twee blauwe: gelezen — als leesbewijzen aan staan",
        ],
        label="",
    )
    shot(
        pdf,
        "Vinkjes — voorbeeld",
        "shared/c1-vinkjes.png",
        "Kijk kort · daarna verder",
        asset_fallback="voorbeeld-vinkjes.png",
    )
    pdf.concept_slide(
        "Geen blauwe vinkjes?",
        [
            "Dat betekent niet automatisch dat uw bericht niet is gelezen.",
        ],
        label="ONTHOUD",
    )

    # Antwoord
    pdf.chat_slide(
        "U krijgt een antwoord",
        [
            ("u", "Ik kom 10 minuten later."),
            ("ai", "Prima, tot zo!"),
        ],
        label="",
        note="Voorbeeldtekst. Op WhatsApp staat rechts uw bericht — links dat van de ander.",
    )
    pdf.concept_slide(
        "Nu u",
        [
            "Lees het antwoord.",
            "Stuur zelf een kort antwoord terug.",
            "Bijvoorbeeld: Bedankt!",
        ],
        label="",
    )

    # Eindmissie — twee dia’s (10 stappen; niet afkappen)
    pdf.mission_slide(
        "Kunt u dit zelf?",
        [
            "Open WhatsApp.",
            "Kies het oefencontact of uw oefenpersoon.",
            "Controleer de naam.",
            "Typ: Bedankt voor uw bericht.",
            "Eventueel één emoji.",
        ],
        label="",
        start=1,
    )
    pdf.mission_slide(
        "Ga verder",
        [
            "Controleer uw bericht.",
            "Verstuur.",
            "Wacht op een antwoord.",
            "Lees het antwoord.",
            "Stuur zelf een kort antwoord terug.",
        ],
        label="",
        start=6,
    )
    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan kunt u zelf een WhatsApp-bericht sturen en beantwoorden.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
