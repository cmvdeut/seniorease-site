#!/usr/bin/env python3
"""C4 Veilig en privé WhatsApp — printpakket v2.0 (C1–C3-productiemal)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, MUTED, NAVY, GOLD  # noqa: E402

C4_VERSION = "v2.0"
C4_TITLE = "Veilig en privé WhatsApp gebruiken"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C4-Veilig-Prive-v2.pdf"


def room_left(pdf: CLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: CLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 55 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C4 {C4_TITLE}  |  Pakket C  |  {C4_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf._footer_version = C4_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"C4 - {C4_TITLE}",
        "Les circa 90 minuten",
        "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
        "Verdachte berichten herkennen, controleren en ongewenst contact stoppen. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Sluit Pakket C af",
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
        "iPhone en Android gelijkwaardig. Alleen fictieve oefenvoorbeelden.",
    )

    # START HIER
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst.")
    pdf.box(
        "U hoeft geen fraude-expert te zijn",
        [
            "U begeleidt. Deelnemers oefenen op hun eigen telefoon.",
            "Hoofdkapstok: STOP → NIET VERDERGAAN → ZELF CONTROLEREN.",
            "NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN.",
            "U hoeft niet te bewijzen dat iets fraude is.",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Na C4 weet de deelnemer wat te doen als een WhatsApp-bericht niet klopt "
        "en kan ongewenst contact stoppen."
    )
    pdf.h2("Oefenveiligheid")
    pdf.bullet("Alleen fictieve SeniorEase-voorbeelden.")
    pdf.bullet("Geen echte nummers, codes, verdachte links of privégesprekken op beamer.")
    pdf.bullet("Blokkeren: route vinden — stop vóór bevestiging.")
    pdf.bullet("Echte casus: niet projecteren — helper 1-op-1.")
    pdf.h2("Vooraf controleren")
    pdf.numbered(1, "Bekijk de beamer-PDF.")
    pdf.numbered(2, "Privacy-menu controleren op iPhone én Android.")
    pdf.numbered(3, "Lees Hulp bij vastlopen.")
    pdf.numbered(4, "Fictieve berichten en blokkeer-/rapporteervoorbeeld klaarzetten.")
    pdf.numbered(5, "Print, beamer, deelnemerskaarten, oplaadkabels.")
    pdf.ensure_space(45)
    pdf.h2("Groep")
    pdf.bullet("Max. ongeveer 8–10 · helper sterk aanbevolen")
    pdf.bullet("Inloop vóór de les — telt niet mee in de 90 minuten")
    pdf.bullet("iPhone én Android gelijkwaardig")
    pdf.h2("Afspraken")
    pdf.bullet('Eerst: "Wat doet u nu?" / "Wat ziet u nu?"')
    pdf.bullet("Vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.")
    pdf.bullet("Uw scherm kan er iets anders uitzien. Dat is normaal.")
    pdf.bullet("Geen Pakket D (QR · URL · DigiD · bankieren).")
    pdf.bullet("Eindmissie nooit schrappen.")

    # Draaiboek
    if room_left(pdf) < 100:
        pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, fictieve voorbeelden.")
    pdf.body("Helper: alleen 1-op-1. Max. 8–10 | Wat ziet u nu?")
    pdf.h2("Leerdoel")
    pdf.body(
        "Stoppen bij een vreemd bericht; zelf controleren via een nummer dat u al had; "
        "blokkeren vinden; privacyplekken vinden."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U krijgt via WhatsApp een bericht van iemand die zegt dat hij een bekende is '
        'en dringend hulp nodig heeft. Wat doet u?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.body("NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN")
    pdf.body("GELD · CODE · HAAST · NIEUW NUMMER? → STOP EN CONTROLEER")
    pdf.body("GEBRUIK EEN NUMMER DAT U ZELF AL HAD")
    pdf.body("NIET VERDER → BLOKKEREN → EVENTUEEL RAPPORTEREN")
    pdf.body("DEEL ALLEEN WAT U WILT DELEN")
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen Pakket D · geen groep maken · geen echte fraudehandelingen")
    pdf.bullet("Geen simplistische kenmerken (spelfout = fraude, enz.)")

    tijdlijn = [
        ("0–5", "Terughaal + brug"),
        ("5–12", "Situatie + STOP"),
        ("12–25", "Nieuw nummer → zelf controleren"),
        ("25–35", "Geld + haast"),
        ("35–43", "Code + link (kort)"),
        ("43–50", "Blokkeren (stop vóór bevestiging)"),
        ("50–55", "Pauze"),
        ("55–62", "Rapporteren + verschil"),
        ("62–75", "Privacy: foto · online · groepen"),
        ("75–80", "Herhalen / hulp"),
        ("80–90", "Eindmissie (altijd behouden)"),
    ]
    pdf.ensure_space(12 + len(tijdlijn) * 5.2)
    pdf.ln(2)
    pdf._left()
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Tijdlijn (90 minuten — inloop telt niet mee)")
    pdf.ln(1)
    for when, what in tijdlijn:
        pdf._left()
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        pdf.cell(22, 4.8, when)
        pdf.set_font("DejaVu", "", 10)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(0, 4.8, what)

    def blok(titel, situatie, doel, zegt, extra):
        est = 36 + 6 * max(1, len(extra))
        new_page_if_needed(pdf, est)
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

    new_page_if_needed(pdf, 55)
    pdf.h2("Terughaal (0–5)")
    pdf.body(
        "WhatsApp → oefencontact → naam → kort veilig bericht. "
        "Brug: Tot nu toe oefenden we met mensen die we kenden. "
        "Maar wat doet u als een bericht vreemd of onverwacht is?"
    )
    blok(
        "Nieuw nummer (12–25)",
        "Hoi mam, dit is mijn nieuwe nummer. Mijn telefoon is kapot. Kun je me even helpen?",
        "STOP · niet meteen antwoorden · zelf controleren via nummer dat u al had.",
        "Wat doet u nu? Niet: is dit fraude?",
        ["GEBRUIK EEN NUMMER DAT U ZELF AL HAD"],
    )
    blok(
        "Geld + haast (25–35)",
        "Kun je 350 euro voor me betalen? Ik betaal het vanavond terug.",
        "Geld · haast · onverwacht = reden om te STOPPEN.",
        "Niet betalen. Stop en controleer zelf.",
        ["Niet: geld vragen is altijd fraude"],
    )
    blok(
        "Code + link (35–43)",
        "Ik heb per ongeluk een code naar jouw telefoon laten sturen. Kun je die even doorgeven?",
        "Geen code delen. Onverwachte link: niet tikken.",
        "Krijgt u een code? Geef die niet door via WhatsApp.",
        ["ONVERWACHTE LINK? → NIET TIKKEN → EERST CONTROLEREN"],
    )
    blok(
        "Blokkeren (43–50)",
        "Het contact blijft doorgaan.",
        "Route vinden · stop vóór bevestiging · niemand echt blokkeren.",
        "Hier vindt u Blokkeren. We bevestigen niet in deze les.",
        [
            "Geblokkeerd contact kan u normaal niet meer via WhatsApp berichten of bellen.",
            "NIET VERDER → BLOKKEREN → EVENTUEEL RAPPORTEREN",
        ],
    )
    blok(
        "Rapporteren (55–62)",
        "Verschil met blokkeren.",
        "Blokkeren stopt contact. Rapporteren meldt bij WhatsApp.",
        "Rapporteren is niet hetzelfde als aangifte bij de politie.",
        ["Niet altijd verplicht"],
    )
    blok(
        "Privacy (62–75)",
        "Wat kunnen anderen van u zien?",
        "Profielfoto · laatst gezien/online · wie aan groepen kan toevoegen.",
        "U kiest zelf wie uw informatie kan zien. Geen voorschrift Niemand.",
        ["DEEL ALLEEN WAT U WILT DELEN", "Bekijken mag zonder te wijzigen"],
    )

    pdf.ensure_space(100)
    pdf.h2("Eindmissie (80–90) — 10 stappen — zonder voordoen — altijd behouden")
    pdf.muted("Fictief accountbericht. Geen bank of overheid noemen. Geen echte code.")
    for i, t in enumerate(
        [
            "Lees het fictieve WhatsApp-bericht.",
            "Benoem wat u laat stoppen (code / haast / onverwacht).",
            "Reageer niet op het bericht.",
            "Geef geen code door.",
            "Leg uit hoe u zelf zou controleren.",
            "Gebruik geen contactgegeven uit het verdachte bericht.",
            "Wijs aan waar u dit contact zou blokkeren.",
            "Leg kort uit wanneer rapporteren passend kan zijn.",
            "Ga naar de privacy-instellingen van WhatsApp.",
            "Zoek waar u kunt kiezen wie uw profielfoto mag zien.",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u wat u veilig kunt doen als een WhatsApp-bericht '
        'niet klopt en waar u uw privacy kunt regelen."'
    )

    # Hulp
    pdf.add_page()
    pdf.h1("3. C4 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Ik weet niet of het bericht echt is", ["STOP · zelf controleren via nummer dat u al had"]),
        ("Naam of foto lijkt bekend", ["Profielfoto bewijst niet wie het is", "Toch controleren"]),
        ("Nieuw nummer", ["Niet meteen antwoorden", "Bel via nummer dat u al had"]),
        ("Om geld gevraagd", ["Niet betalen", "Stop → zelf controleren"]),
        ("Om een code gevraagd", ["Code niet doorgeven"]),
        ("Er staat een link in", ["Niet tikken", "Eerst controleren"]),
        ("Ik heb al geantwoord", ["Stop vanaf nu", "Geen geld/code"]),
        ("Ik heb al op een link getikt", ["Niet verder invullen", "Sluit de pagina · individueel"]),
        ("Blokkeren niet gevonden", ["Wat ziet u nu?", "iPhone | Android · stop vóór bevestiging"]),
        ("Twijfel over rapporteren", ["Blokkeren stopt contact", "Rapporteren ≠ aangifte"]),
        ("Privacy ziet er anders uit", ["Dat is normaal.", "iPhone | Android"]),
        ("Welke privacykeuze?", ["Geen voorschrift", "U kiest zelf"]),
        ("Echt verdacht bericht", ["Niet op beamer", "Helper 1-op-1 · niet klikken"]),
    ]
    for idx, (titel, bullets) in enumerate(hulp):
        # Eén compacte regel per situatie — voorkomt wees-pagina's
        line = f"{titel}: " + " · ".join(bullets)
        pdf.ensure_space(9)
        pdf._left()
        pdf.set_font("DejaVu", "B", 10)
        pdf.set_text_color(*NAVY)
        # titel + tekst in één multi_cell via body-stijl
        pdf.set_font("DejaVu", "", 10)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 5, line)
        pdf.ln(0.8)

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "Klopt een WhatsApp-bericht niet?",
        [
            "STOP → NIET VERDERGAAN → ZELF CONTROLEREN",
        ],
    )
    pdf.box(
        "Doe dit niet",
        [
            "NIET BETALEN",
            "GEEN CODE DELEN",
            "NIET OP EEN ONVERWACHTE LINK TIKKEN",
        ],
    )
    pdf.h2("Extra reden om te stoppen")
    pdf.body("GELD · CODE · HAAST · NIEUW NUMMER? → STOP EN CONTROLEER")
    pdf.h2("Zelf controleren")
    pdf.body("BEL ZELF VIA EEN NUMMER DAT U AL HAD")
    pdf.h2("Ongewenst contact")
    pdf.body("BLOKKEREN → indien passend: RAPPORTEREN")
    pdf.h2("Privacy")
    pdf.body("U KIEST ZELF WIE UW INFORMATIE KAN ZIEN")
    pdf.h2("Dit kan ik nu")
    for t in [
        "Stoppen bij een vreemd bericht",
        "Zelfstandig controleren",
        "Geen code delen",
        "Blokkeren vinden",
        "Privacyinstellingen vinden",
    ]:
        pdf.check(t)

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Fictieve oefenberichten gereed",
        "Geen echte telefoonnummers",
        "Geen klikbare verdachte links",
        "Blokkeerroute gecontroleerd (stop vóór bevestiging)",
        "Niemand daadwerkelijk blokkeren in de standaardles",
        "Rapporteerroute gecontroleerd",
        "Privacyroute gecontroleerd op iPhone",
        "Privacyroute gecontroleerd op Android",
        "Geen privégesprekken projecteren",
        "Echte casussen individueel behandelen",
        "Helper kent: STOP → NIET VERDERGAAN → ZELF CONTROLEREN",
        "Helper kent: NIET BETALEN · GEEN CODE DELEN · NIET OP LINK TIKKEN",
        "Beamer-PDF klaar",
        "8–10× deelnemerskaart",
        "Eindmissie-materiaal klaar (fictief accountbericht)",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
