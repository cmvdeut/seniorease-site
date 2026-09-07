#!/usr/bin/env python3
"""C4 beamer — Veilig en privé WhatsApp gebruiken v2.0 (C1–C3-productiemal)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CBeamerPDF  # noqa: E402

C4_VERSION = "v2.0"
C4_TITLE = "Veilig en privé WhatsApp gebruiken"
OUT = Path(__file__).resolve().parent / "beamer" / "SeniorEase-C4-Beamer-v2.pdf"
SHOTS = Path(__file__).resolve().parent / "assets" / "screenshots"
NOTE = "Uw scherm kan er iets anders uitzien. Dat is normaal."


def shot(pdf, title: str, filename: str, caption: str) -> None:
    image = SHOTS / filename
    if not image.exists():
        raise FileNotFoundError(f"C4 beamer vereist screenshot zonder placeholder: {image}")
    pdf.zaal_shot_slide(title, image, caption=caption, label="", note=NOTE)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CBeamerPDF("C4", C4_TITLE)
    pdf._slide_version = C4_VERSION

    pdf.concept_slide(C4_TITLE, ["Verdachte berichten herkennen, controleren en stoppen"], label="")
    pdf.concept_slide(
        "U krijgt een bericht van iemand die zegt dat hij een bekende is.",
        ["Hij zegt dat hij dringend hulp nodig heeft.", "Wat doet u?"],
        label="SITUATIE",
    )
    pdf.concept_slide(
        "STOP → NIET VERDERGAAN → ZELF CONTROLEREN",
        ["Dat is de hoofdkapstok van vandaag."],
        label="ONTHOUD",
    )
    pdf.concept_slide(
        "NIET BETALEN · GEEN CODE DELEN",
        ["NIET OP EEN ONVERWACHTE LINK TIKKEN"],
        label="LET OP",
    )

    # Terughaal
    pdf.concept_slide(
        "Eerst kort terug",
        ["Open WhatsApp.", "Kies het oefencontact.", "Controleer de naam."],
        label="",
    )
    pdf.concept_slide(
        "Brug",
        [
            "Tot nu toe oefenden we met mensen die we kenden.",
            "Maar wat doet u als een bericht vreemd of onverwacht is?",
        ],
        label="",
    )

    pdf.concept_slide(
        "Wat doet u nu?",
        [
            "Niet: is dit echt of nep?",
            "U hoeft niet zeker te weten of het nep is.",
            "U weet wat u veilig kunt doen.",
        ],
        label="",
    )

    shot(pdf, "Kapstok", "shared/c4-kapstok.png", "STOP → NIET VERDERGAAN → ZELF CONTROLEREN")

    # Nieuw nummer
    pdf.concept_slide(
        "Nieuw nummer",
        ["Niet meteen antwoorden.", "Zelf controleren via een nummer dat u al had."],
        label="LET OP",
    )
    shot(
        pdf,
        "Fictief bericht",
        "shared/c4-bericht-nieuw-nummer.png",
        "SeniorEase-oefening — geen echt bericht",
    )
    pdf.concept_slide(
        "GELD · CODE · HAAST · NIEUW NUMMER?",
        ["→ STOP EN CONTROLEER"],
        label="ONTHOUD",
    )
    pdf.concept_slide(
        "GEBRUIK EEN NUMMER DAT U ZELF AL HAD",
        [
            "Bel het oude bekende nummer.",
            "Niet via het nummer uit het verdachte bericht.",
        ],
        label="",
    )

    # Geld
    shot(
        pdf,
        "Geld + haast",
        "shared/c4-bericht-geld.png",
        "Niet betalen — stop en controleer",
    )
    pdf.concept_slide("Nu u", ["Wat doet u nu?", "Niet betalen."], label="")

    # Code + link
    shot(pdf, "Om een code gevraagd", "shared/c4-bericht-code.png", "GEEN CODE DELEN")
    pdf.concept_slide(
        "ONVERWACHTE LINK?",
        ["→ NIET TIKKEN", "→ EERST CONTROLEREN"],
        label="LET OP",
    )

    # Blokkeren — contactinfo openen → Blokkeren vinden (iPhone | Android)
    pdf.concept_slide(
        "Ongewenst contact stoppen",
        ["Contactinformatie openen.", "Blokkeren vinden.", "Stop vóór bevestiging."],
        label="",
    )
    shot(
        pdf,
        "iPhone — contactinformatie openen",
        "ios/c4-contactinfo-openen.png",
        "Tik op de naam bovenaan",
    )
    shot(
        pdf,
        "Android — contactinformatie openen",
        "android/c4-contactinfo-openen.png",
        "Tik op de naam bovenaan",
    )
    shot(
        pdf,
        "iPhone — Blokkeren vinden",
        "ios/c4-blokkeren.png",
        "Niemand daadwerkelijk blokkeren in deze les",
    )
    shot(
        pdf,
        "Android — Blokkeren vinden",
        "android/c4-blokkeren.png",
        "Niemand daadwerkelijk blokkeren in deze les",
    )
    shot(
        pdf,
        "iPhone — stop vóór bevestiging",
        "ios/c4-blokkeren-stop.png",
        "Hier stopt u. Bevestig niet in de les.",
    )
    shot(
        pdf,
        "Android — stop vóór bevestiging",
        "android/c4-blokkeren-stop.png",
        "Hier stopt u. Bevestig niet in de les.",
    )
    pdf.concept_slide(
        "Wat doet blokkeren?",
        [
            "Een geblokkeerd contact kan u normaal niet meer",
            "via WhatsApp berichten of bellen.",
        ],
        label="",
    )

    # Rapporteren
    shot(
        pdf,
        "iPhone — Rapporteren",
        "ios/c4-rapporteren.png",
        "Melden bij WhatsApp — niet hetzelfde als aangifte",
    )
    shot(
        pdf,
        "Android — Rapporteren",
        "android/c4-rapporteren.png",
        "Melden bij WhatsApp — niet hetzelfde als aangifte",
    )
    pdf.concept_slide(
        "Blokkeren of rapporteren?",
        ["Blokkeren stopt het contact.", "Rapporteren meldt bij WhatsApp."],
        label="",
    )

    # Privacy — open-route verschilt; submenu's gelijkwaardig
    pdf.concept_slide(
        "DEEL ALLEEN WAT U WILT DELEN",
        ["Privacy is een keuze.", "Geen voorschrift voor iedereen."],
        label="ONTHOUD",
    )
    shot(
        pdf,
        "iPhone — Privacy openen",
        "ios/c4-privacy-openen.png",
        "Instellingen → Privacy",
    )
    shot(
        pdf,
        "Android — Privacy openen",
        "android/c4-privacy-openen.png",
        "Menu → Instellingen → Privacy",
    )
    shot(pdf, "Privacy-instellingen", "shared/c4-privacy-menu.png", "Open Privacy")
    shot(
        pdf,
        "Profielfoto",
        "shared/c4-profielfoto.png",
        "U kiest wie uw foto mag zien",
    )
    shot(
        pdf,
        "Laatst gezien / online",
        "shared/c4-laatst-gezien.png",
        "Bekijken mag — wijzigen hoeft niet",
    )
    shot(
        pdf,
        "Groepen toevoegen",
        "shared/c4-groepen-toevoegen.png",
        "Alleen herkennen — geen groep maken",
    )

    # Eindmissie
    shot(
        pdf,
        "Eindmissie — fictief bericht",
        "shared/c4-eindmissie-bericht.png",
        "Geen echte code · geen echte organisatie",
    )
    pdf.mission_slide(
        "Kunt u dit zelf? (1–5)",
        [
            "Lees het fictieve WhatsApp-bericht.",
            "Benoem wat u laat stoppen.",
            "Reageer niet op het bericht.",
            "Geef geen code door.",
            "Leg uit hoe u zelf zou controleren.",
        ],
        label="",
        start=1,
    )
    pdf.mission_slide(
        "Ga verder (6–10)",
        [
            "Gebruik geen contactgegeven uit het bericht.",
            "Wijs aan waar u zou blokkeren.",
            "Leg kort uit wanneer rapporteren passend kan zijn.",
            "Ga naar de privacy-instellingen.",
            "Zoek wie uw profielfoto mag zien.",
        ],
        label="",
        start=6,
    )
    pdf.concept_slide(
        "Gelukt?",
        [
            "Dan weet u wat u veilig kunt doen als een WhatsApp-bericht niet klopt",
            "en waar u uw privacy kunt regelen.",
        ],
        label="",
    )

    pdf.output(str(OUT))
    print(f"Beamer geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
