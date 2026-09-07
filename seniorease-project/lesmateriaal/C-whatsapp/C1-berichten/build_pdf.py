#!/usr/bin/env python3
"""C1 Een WhatsApp-bericht sturen — printpakket v2.0 (B1-productstructuur)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, MUTED, NAVY, GOLD  # noqa: E402

C1_VERSION = "v2.0"
C1_TITLE = "Een WhatsApp-bericht sturen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C1-Berichten-v2.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C1 {C1_TITLE}  |  Pakket C  |  {C1_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf._footer_version = C1_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"C1 - {C1_TITLE}",
        "Les circa 90 minuten",
        "KIEZEN → TYPEN → CONTROLEREN → VERSTUREN → ANTWOORDEN. "
        "Gesprek openen, bericht sturen en beantwoorden. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Volgende: C2 Foto's en documenten via WhatsApp",
        ],
        contents_title="Bij deze les ontvangt u",
    )
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Methode: ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN. "
        "Inloop telt niet mee. Geen apart oefenblad. Eindmissie altijd behouden. "
        "iPhone en Android gelijkwaardig.",
    )

    # --- START HIER ---
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst.")
    pdf.box(
        "U hoeft geen technisch expert te zijn",
        [
            "U begeleidt. Deelnemers oefenen op hun eigen telefoon of tablet.",
            "Route: KIEZEN → TYPEN → CONTROLEREN → VERSTUREN → ANTWOORDEN.",
            "Regel: KIJK EERST NAAR DE NAAM → DAN VERSTUREN.",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Na C1 kan de deelnemer zelf een WhatsApp-gesprek openen, "
        "een bericht sturen en antwoorden."
    )
    pdf.h2("Oefencontact (vast)")
    pdf.body(
        "Begeleider of helper = veilig oefencontact. Eigen bekende mag ook. "
        "Geen telefoonnummers op de beamer. Geen nummers door de zaal roepen. "
        "Begeleider/helper antwoordt echt (bijv. Prima, tot zo!)."
    )
    pdf.h2("Vooraf (± 10–15 min)")
    pdf.numbered(1, "Bekijk de beamer-PDF.")
    pdf.numbered(
        2,
        "Zelf kort: WhatsApp → oefencontact → naam → kort bericht → antwoord.",
    )
    pdf.numbered(3, "Lees Hulp bij vastlopen.")
    pdf.numbered(4, "Controleer of het oefencontact herkenbaar is voor deelnemers.")
    pdf.numbered(5, "Print, beamer, deelnemerskaarten, oplaadkabels.")
    pdf.h2("Groep")
    pdf.bullet("Max. ongeveer 8–10 · helper sterk aanbevolen")
    pdf.bullet("Inloop vóór de les — telt niet mee in de 90 minuten")
    pdf.bullet("iPhone én Android gelijkwaardig")
    pdf.h2("Afspraken")
    pdf.bullet('Eerst: "Wat ziet u nu?"')
    pdf.bullet("Vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.")
    pdf.bullet("Uw scherm kan er iets anders uitzien. Dat is normaal.")
    pdf.bullet("Geen berichten verwijderen als lesdoel.")
    pdf.bullet("Eindmissie nooit schrappen — verkort liever emoji of herhalen.")

    # --- Draaiboek ---
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, voorbeeld.")
    pdf.body("Helper: alleen 1-op-1. Max. 8–10 | Wat ziet u nu?")
    pdf.h2("Leerdoel")
    pdf.body("Gesprek openen, bericht sturen en antwoorden.")
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U wilt iemand even laten weten dat u later komt. '
        "Hoe stuurt u zelf een WhatsApp-bericht — "
        'en hoe ziet u of het is aangekomen?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("KIEZEN → TYPEN → CONTROLEREN → VERSTUREN → ANTWOORDEN")
    pdf.body("KIJK EERST NAAR DE NAAM → DAN VERSTUREN")
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen foto's/documenten (C2) · geen bellen (C3) · geen fraude/privacy (C4)")
    pdf.bullet("Geen verwijderen · geen WhatsApp Web · geen installatie als groepsles")

    pdf.ln(2)
    pdf._left()
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Tijdlijn (90 minuten — inloop telt niet mee)")
    pdf.ln(1)
    for when, what in [
        ("0–5", "Welkom + centrale situatie"),
        ("5–15", "WhatsApp openen"),
        ("15–25", "Gesprek kiezen + naam controleren"),
        ("25–40", "Typen + typefout herstellen"),
        ("40–50", "Emoji + controleren + versturen"),
        ("50–55", "Pauze"),
        ("55–65", "Vinkjes kort + antwoord ontvangen"),
        ("65–75", "Zelf kort antwoord sturen"),
        ("75–82", "Herhalen / hulp bij vastlopen"),
        ("82–90", "Eindmissie (altijd behouden)"),
    ]:
        pdf.ensure_space(7)
        pdf._left()
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.cell(22, 4.8, when)
        pdf.set_font("DejaVu", "", 10)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(0, 4.8, what)

    pdf.add_page()

    def blok(titel, situatie, doel, zegt, extra):
        pdf.h2(titel)
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, "Situatie")
        pdf.body(situatie)
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, "Doel")
        pdf.body(doel)
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, "Zegt u ongeveer")
        pdf.body(zegt)
        for line in extra:
            pdf.bullet(line)

    pdf.h2("Welkom + situatie (0–5)")
    pdf.body(
        'Situatie: "U wilt iemand even laten weten dat u later komt." '
        "Kapstokken kort tonen. Niet openen met alleen: WhatsApp openen."
    )
    blok(
        "WhatsApp openen (5–15)",
        "Deelnemer zoekt de app op het eigen toestel.",
        "WhatsApp openen.",
        "Zoek WhatsApp. Open de app. Uw scherm kan er iets anders uitzien.",
        ["iPhone | Android alleen tonen als openen duidelijk verschilt", "Helper: 1-op-1"],
    )
    blok(
        "Kiezen + naam (15–25)",
        "Juiste persoon of oefencontact.",
        "Gesprek openen; naam bovenaan controleren.",
        "Heeft u een eigen oefenpersoon? Kies die. Anders het afgesproken oefencontact. "
        "Stop. Kijk eerst naar de naam bovenaan.",
        ["Regel: KIJK EERST NAAR DE NAAM → DAN VERSTUREN"],
    )
    blok(
        "Typen + herstellen (25–40)",
        "Doorlopende oefening: later komen.",
        "Typen; fout vóór verzenden herstellen.",
        "Typ bewust: Ik kom 10 minnten later. Herstel naar: Ik kom 10 minuten later.",
        ["Herstellen vóór verzenden", "Geen verwijderen als lesdoel"],
    )

    pdf.add_page()
    blok(
        "Emoji + versturen (40–50)",
        "Bericht afronden en versturen.",
        "Optioneel emoji; controleren; versturen.",
        "Wilt u een emoji? Lees nog één keer. Controleer de naam. Verstuur.",
        ["Verzendknop iPhone | Android 1-op-1 als die verschilt"],
    )
    blok(
        "Vinkjes + antwoord (55–65)",
        "Na versturen: kort kijken; antwoord lezen.",
        "Vinkjes praktisch herkennen; antwoord lezen.",
        "Eén vinkje: verzonden. Twee grijs: afgeleverd. Blauw: gelezen als leesbewijzen aan staan. "
        "Geen blauwe vinkjes? Dat betekent niet automatisch dat uw bericht niet is gelezen.",
        ["Begeleider/helper stuurt: Prima, tot zo!", "Geen instellingenles"],
    )
    blok(
        "Zelf antwoorden (65–75)",
        "Korte uitwisseling afronden.",
        "Zelf een kort antwoord sturen.",
        "Stuur bijvoorbeeld: Bedankt! Weer: klopt de naam?",
        ["Naam check → versturen"],
    )

    pdf.h2("Eindmissie (82–90) — zonder voordoen — altijd behouden")
    for i, t in enumerate(
        [
            "Open WhatsApp.",
            "Kies het afgesproken oefencontact (of uw eigen oefenpersoon).",
            "Controleer de naam.",
            "Typ: Bedankt voor uw bericht.",
            "Voeg eventueel één emoji toe.",
            "Controleer uw bericht.",
            "Verstuur.",
            "Wacht op een antwoord.",
            "Lees het antwoord.",
            "Stuur zelf een kort antwoord terug.",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan kunt u zelf een WhatsApp-bericht sturen en beantwoorden."'
    )
    pdf.muted("Tijd krap: verkort emoji of herhalen — eindmissie niet schrappen.")

    # --- Hulp ---
    pdf.add_page()
    pdf.h1("3. C1 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
            "Toestel zo weinig mogelijk uit handen nemen.",
        ],
    )
    for titel, bullets in [
        (
            "Ik vind WhatsApp niet",
            [
                "Startscherm / appbibliotheek / map",
                "iPhone | Android 1-op-1 als nodig",
                "Geen WhatsApp? Individueel vóór/naast de les — niet de groepsles",
            ],
        ),
        (
            "Verkeerde persoon",
            ["STOP · naam bovenaan · terug · opnieuw kiezen"],
        ),
        (
            "Typfout na verzenden",
            [
                "C1 leert herstellen vóór verzenden",
                "Verwijderen is geen lesdoel",
            ],
        ),
        (
            "Geen antwoord",
            [
                "Helper checkt oefencontact",
                "Eventueel zelf Prima, tot zo! sturen",
            ],
        ),
        (
            "Scherm ziet er anders uit",
            [
                "Dat is normaal.",
                "Zoek hetzelfde soort scherm (lijst · gesprek · typvak · verzendknop)",
            ],
        ),
        (
            "Geen blauwe vinkjes",
            [
                "Betekent niet automatisch dat het bericht niet is gelezen",
                "Daarna door — geen instellingenles",
            ],
        ),
    ]:
        pdf.h2(titel)
        for b in bullets:
            pdf.bullet(b)

    # --- Deelnemerskaart ---
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Niet de hele les.")
    pdf.box(
        "Kapstok",
        [
            "KIEZEN → TYPEN → CONTROLEREN → VERSTUREN → ANTWOORDEN",
            "KIJK EERST NAAR DE NAAM → DAN VERSTUREN",
        ],
    )
    pdf.h2("Dit oefende u vandaag")
    for i, t in enumerate(
        [
            "WhatsApp openen",
            "Juiste gesprek kiezen",
            "Naam bovenaan controleren",
            "Korte tekst typen",
            "Typefout vóór verzenden herstellen",
            "Eventueel één emoji",
            "Versturen",
            "Antwoord lezen en kort terugsturen",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.h2("Dit kan ik nu")
    for t in [
        "Gesprek openen",
        "Typen",
        "Corrigeren vóór versturen",
        "Emoji (als ik wil)",
        "Versturen",
        "Antwoord lezen",
        "Kort antwoorden",
    ]:
        pdf.check(t)
    pdf.h2("Thuis nog eens")
    pdf.body(
        "Open WhatsApp → kies een bekende → controleer de naam → "
        "stuur een kort bericht → lees het antwoord."
    )

    # --- Zaalchecklist ---
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Oefencontact getest en herkenbaar voor deelnemers",
        "Geen telefoonnummers op beamer / door de zaal",
        "Begeleider/helper klaar om echt te antwoorden",
        "Beamer-PDF klaar",
        "8–10× deelnemerskaart",
        "Helper aanwezig of kleinere groep",
        "Oplaadkabels beschikbaar",
        "Zelf kort de lesroute geoefend",
        "iPhone + Android globaal bekeken waar knoppen verschillen",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
