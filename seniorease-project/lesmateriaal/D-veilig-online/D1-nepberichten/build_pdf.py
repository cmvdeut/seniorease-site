#!/usr/bin/env python3
"""D1 Een verdacht bericht veilig controleren — printpakket v2.0 (leesbaarheidsfix)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, MUTED, NAVY, GOLD  # noqa: E402

D1_VERSION = "v2.0"
D1_TITLE = "Een verdacht bericht veilig controleren"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D1-Verdacht-Bericht-v2.pdf"


def room_left(pdf: DLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: DLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D1 {D1_TITLE}  |  Pakket D  |  {D1_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf._footer_version = D1_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"D1 - {D1_TITLE}",
        "Les circa 90 minuten",
        "Stoppen bij een onverwacht verzoek en zelf een officiële route kiezen. "
        "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Opent Pakket D",
            "Gids: seniorease.nl/uitleg/veiligheid",
        ],
        contents_title="Bij deze les ontvangt u",
    )
    pdf.set_font("DejaVu", "I", 10)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5.5,
        "Methode: ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN. "
        "Inloop telt niet mee. Geen apart oefenblad. Eindmissie altijd behouden (12 min). "
        "iPhone en Android gelijkwaardig. Alleen fictieve kijkvoorbeelden.",
    )

    # ── 1. START HIER — één rustige A4 ─────────────────────────────────────
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst. Voorbereiding circa 10–15 minuten.")
    pdf.box(
        "U hoeft geen fraude-expert te zijn",
        [
            "U begeleidt. Deelnemers oefenen op hun eigen toestel.",
            "Hoofdkapstok: STOP → NIET VERDERGAAN → ZELF CONTROLEREN.",
            "NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN.",
            "U hoeft niet te bewijzen dat iets fraude is.",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Stoppen bij een onverwacht bericht, niet via het bericht verdergaan, "
        "en zelf de passende officiële route kiezen van de dienst waarover het bericht gaat."
    )
    pdf.h2("A ≠ B — niet door elkaar")
    pdf.body(
        "A Navigatie: seniorease.nl/uitleg/veiligheid — controleroute geoefend."
    )
    pdf.body(
        "B Controle: account → DigiD/dienst · pakket → PostNL/vervoerder — zonder login."
    )
    pdf.bullet("Een willekeurige app is niet hetzelfde als controleren.")
    pdf.h2("Veiligheid in één oogopslag")
    pdf.body(
        "Alleen kijkvoorbeelden A/B/C · geen oefen-sms · geen klikbare verdachte links · "
        "geen verplichte login · echte casus: helper 1-op-1, niet op beamer."
    )
    pdf.h2("Vooraf (± 10–15 min)")
    pdf.numbered(1, "Bekijk de beamer-PDF.")
    pdf.numbered(2, "Test navigatie A: seniorease.nl/uitleg/veiligheid.")
    pdf.numbered(3, "DigiD- en PostNL-voorbeeld tot startscherm (zonder login).")
    pdf.numbered(4, "Lees Hulp bij vastlopen · kaarten A/B/C · print · beamer · kabels.")
    pdf.h2("Groep & afspraken")
    pdf.body(
        "Max. ca. 8–10 · helper sterk aanbevolen · inloop telt niet mee · "
        "iPhone én Android · eindmissie 12 min altijd behouden."
    )
    pdf.body(
        'Eerst “Wat ziet u nu?” · vragen → uitleggen → aanwijzen → zelf. '
        "Geen C4-herhaling · geen D2–D4 · eindmissie nooit schrappen."
    )

    # ── 2. Draaiboek ───────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, fictieve kijkvoorbeelden, demoscherm.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "Stoppen bij een onverwacht bericht; niet via het bericht verdergaan; "
        "zelf de passende officiële route kiezen."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U krijgt een bericht dat er iets mis is met uw account. '
        'U moet snel op een link tikken. Wat doet u?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.body("NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN")
    pdf.body("ONVERWACHT VERZOEK? → STOP → ZELF CONTROLEREN")
    pdf.box(
        "Controleroute (exact)",
        [
            "Ik open zelf de officiële route van de dienst waarover het bericht gaat "
            "en controleer daar of er werkelijk iets aan de hand is.",
        ],
    )

    new_page_if_needed(pdf, 90)
    pdf.h2("Vijf vragen (begeleidershulpmiddel — geen toets)")
    pdf.numbered(1, "Verwachtte ik dit?")
    pdf.numbered(2, "Wat wordt er gevraagd?")
    pdf.numbered(3, "Moet het snel?")
    pdf.numbered(4, "Via welke route moet ik handelen?")
    pdf.numbered(5, "Hoe kan ik zelf controleren?")
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen C4 (blokkeren / privacy / nieuw nummer)")
    pdf.bullet("Geen D2–D4-diepte")
    pdf.bullet("Geen echte links / login / codes · geen oefen-sms versturen")
    pdf.bullet("Geen privéberichten op beamer")

    tijdlijn = [
        ("0–5", "Situatie"),
        ("5–12", "Kapstok"),
        ("12–25", "Bericht A kijken + vijf vragen"),
        ("25–40", "Navigatieoefening A"),
        ("40–50", "Controleroute B (account → dienst)"),
        ("50–55", "Pauze"),
        ("55–70", "Bericht B (pakket → vervoerder)"),
        ("70–78", "Herhalen / hulp"),
        ("78–90", "Eindmissie (12 min · zonder voordoen)"),
    ]
    pdf.h2("Tijdlijn (90 minuten — inloop telt niet mee)")
    for when, what in tijdlijn:
        pdf._left()
        pdf.set_font("DejaVu", "B", 12)
        pdf.set_text_color(*NAVY)
        pdf.cell(24, 7, when)
        pdf.set_font("DejaVu", "", 12)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(0, 7, what)
        pdf.ln(0.5)
    pdf.bullet("Bij uitloop: eerst blok 40–50 en/of 55–70 inkorten. Eindmissie nooit schrappen.")

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        # Heel blok bij elkaar — voorkomt weesregels (bijv. alleen “Inkorten”)
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    # Inloop + Situatie; Kapstok start fris zodat Bericht A eronder past
    pdf.add_page()
    blok(
        "Inloop (buiten 90)",
        [
            ("Zegt", "Welkom. Vandaag: stoppen bij een vreemd bericht. Geen verdachte links."),
            ("Toont", "—"),
            ("Voordoet", "—"),
            ("Deelnemer", "Toestel aan"),
            ("Controleert", "Iedereen heeft telefoon/tablet"),
            ("Helper", "Wifi / volume"),
            ("Doorgaan", "Groep ongeveer klaar"),
            ("Inkorten", "—"),
        ],
    )
    blok(
        "Situatie (0–5)",
        [
            ("Zegt", "Situatie voorlezen. “Wat doet u?” — wacht."),
            ("Toont", "Beamer: beginsituatie"),
            ("Voordoet", "—"),
            ("Deelnemer", "Denkt mee"),
            ("Controleert", "Groep bij de vraag"),
            ("Helper", "—"),
            ("Doorgaan", "Na 1–2 antwoorden"),
            ("Inkorten", "—"),
        ],
    )

    pdf.add_page()
    blok(
        "Kapstok (5–12)",
        [
            (
                "Zegt",
                "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. Daarna de drie risico’s. "
                "Brug C4 in één zin: in WhatsApp oefende u dit al; vandaag bij account/pakket.",
            ),
            ("Toont", "Kapstok · risico’s (aparte dia’s)"),
            ("Voordoet", "—"),
            ("Deelnemer", "Leest mee"),
            ("Controleert", "—"),
            ("Helper", "—"),
            ("Doorgaan", "Na kapstok"),
            ("Inkorten", "Brug weglaten"),
        ],
    )

    blok(
        "Bericht A kijken (12–25)",
        [
            (
                "Zegt",
                "Dit is een kijkvoorbeeld op de beamer/kaart — niet op uw telefoon. "
                "Tik nergens. Logo bewijst niets.",
            ),
            ("Toont", "Bericht A"),
            ("Voordoet", "Wijst op kaart: haast · link — zonder tikken"),
            ("Deelnemer", "Leest · begeleidersvragen"),
            ("Controleert", "Geen oefen-sms gezocht · geen links"),
            ("Helper", "“Wat ziet u nu?”"),
            ("Doorgaan", "Iedereen gelezen zonder te tikken"),
            ("Inkorten", "Minder vragen"),
        ],
    )

    pdf.add_page()
    blok(
        "Navigatieoefening A (25–40)",
        [
            (
                "Zegt",
                "Eerst veilig navigeren. We claimen niet dat het fictieve accountprobleem "
                "is gecontroleerd.",
            ),
            ("Toont", "Kapstok"),
            (
                "Voordoet",
                "Op veilig demoscherm: terug · browser · typ seniorease.nl/uitleg/veiligheid",
            ),
            (
                "Deelnemer",
                "Vanuit neutrale situatie op eigen toestel: zelf typen naar die pagina",
            ),
            ("Controleert", "Via eigen navigatie · niet via verdachte link"),
            ("Helper", "Aanwijzen · niet overnemen"),
            ("Doorgaan", "Meeste zien de veiligheidspagina"),
            ("Inkorten", "Alleen voordoen + enkele deelnemers"),
        ],
    )
    pdf.body(
        "Afsluitzin: Zo oefent u veilig navigeren. Straks: de officiële route van de dienst."
    )

    pdf.add_page()
    blok(
        "Controleroute B — account (40–50)",
        [
            (
                "Zegt",
                "Bij een accountbericht: zelf de officiële route van die dienst. "
                "Willekeurige app is niet genoeg. Geen login. Exacte controleroute-formulering.",
            ),
            ("Toont", "DigiD / dienst-voorbeeld"),
            ("Voordoet", "DigiD-app of digid.nl tot startscherm · niet inloggen"),
            ("Deelnemer", "Opent passende dienst · geen login"),
            ("Controleert", "Passende dienst · zelf geopend"),
            ("Helper", "“Wat ziet u nu?”"),
            ("Doorgaan", "Korte ronde"),
            ("Inkorten", "Eerste inkortblok — verschil A/B wel benoemen"),
        ],
    )
    pdf.h2("Pauze (50–55)")
    pdf.body("Korte pauze. Daarna tweede situatie.")

    blok(
        "Bericht B → vervoerder (55–70)",
        [
            ("Zegt", "Nieuw kijkvoorbeeld. Pakketbericht → zelf route van de vervoerder."),
            ("Toont", "Bericht B"),
            ("Voordoet", "Kort: stop · PostNL/vervoerder · geen login"),
            ("Deelnemer", "Benoemt stop · wijst/opent passende route"),
            ("Controleert", "Geen willekeurige app als controle"),
            ("Helper", "1-op-1"),
            ("Doorgaan", "Meeste kunnen passende route"),
            ("Inkorten", "Tweede inkortblok — alleen benoemen zonder iedereen te laten openen"),
        ],
    )

    pdf.add_page()
    blok(
        "Herhalen / hulp (70–78)",
        [
            ("Zegt", "Waar liep het vast?"),
            ("Toont", "Kapstok / A≠B indien nodig"),
            ("Voordoet", "Alleen op verzoek"),
            ("Deelnemer", "Extra oefening of rust"),
            ("Controleert", "—"),
            ("Helper", "Vastlopers"),
            ("Doorgaan", "Op tijd voor 12 min eindmissie"),
            ("Inkorten", "Zo kort mogelijk"),
        ],
    )

    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted(
        "Deelnemersbeamer alleen: bericht C + open opdracht. "
        "Geen antwoorden · geen stappenlijst op de beamer."
    )
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U krijgt dit onverwachte bericht. Wat doet u nu?",
            "Laat zien hoe u veilig stopt en zelf controleert.",
        ],
    )
    pdf.body("Observatiechecklist begeleider (niet op beamer):")
    for i, t in enumerate(
        [
            "Leest het fictieve bericht.",
            "Benoemt waarom hij/zij stopt.",
            "Gaat niet via het bericht verder.",
            "Legt het kijkvoorbeeld weg / stopt ermee.",
            "Kiest de passende officiële route.",
            "Legt uit wat daar gecontroleerd zou worden (zonder login).",
            "Maakt duidelijk: niet via het bericht gehandeld.",
        ],
        1,
    ):
        pdf.numbered(i, t)

    new_page_if_needed(pdf, 75)
    blok(
        "Eindmissie — rollen",
        [
            ("Zegt", "Dit doet u zelf. Geen antwoorden van tevoren."),
            ("Toont", "Alleen C + open opdracht"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Zelfstandig"),
            ("Controleert", "Checklist · passende dienst"),
            ("Helper", "Alleen “Wat ziet u nu?”"),
            ("Doorgaan", "Afsluiting"),
            ("Inkorten", "Nooit schrappen"),
        ],
    )
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u wat u veilig kunt doen als een bericht '
        "onverwacht om actie vraagt: stoppen, niet verdergaan via het bericht, "
        'en zelf de officiële route van de juiste dienst kiezen."'
    )

    # ── 3. Hulp ────────────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("3. D1 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Ik weet niet of het bericht echt is", "U hoeft dat niet te bewijzen · STOP · zelf controleren"),
        ("Er staat een bekende naam of logo", "Bewijst niet wie het is · toch stoppen"),
        ("Er staat een link in", "Niet tikken · wegleggen · passende officiële route"),
        ("Om haast / account gevraagd", "Extra reden om te STOPPEN"),
        ("Ik heb al op iets getikt", "Stop vanaf nu · niet verder invullen · helper 1-op-1"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Berichten / browser niet gevonden", "iPhone | Android tonen · scherm kan anders zijn"),
        ("Staat dit bericht op mijn telefoon?", "Nee — kijkvoorbeeld op beamer/kaart"),
        ("Mag ik zomaar een andere app openen?", "A: SeniorEase-pagina · B: de passende dienst"),
        ("Ik wil DigiD/bank openen", "Mag als passende controleroute — niet inloggen"),
        ("Heb ik het probleem echt gecontroleerd?", "Bij alleen navigatie: nee — controleroute geoefend"),
        ("Mijn scherm ziet er anders uit", "Dat is normaal"),
        ("Echt verdacht bericht", "Niet op beamer · helper 1-op-1 · niet klikken"),
        ("Spelfouten = fraude?", "Spelfouten bewijzen niets · focus op stoppen en zelf controleren"),
        ("Afwijkend toestel", "Helper 1-op-1 — groep niet stilleggen"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)

    # ── 4. Deelnemerskaart ─────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "Klopt een bericht niet?",
        ["STOP → NIET VERDERGAAN → ZELF CONTROLEREN"],
    )
    pdf.box(
        "Doe dit niet",
        [
            "NIET BETALEN",
            "GEEN CODE DELEN",
            "NIET OP EEN ONVERWACHTE LINK TIKKEN",
        ],
    )
    pdf.h2("Onverwacht verzoek?")
    pdf.body("→ STOP EN OPEN ZELF DE OFFICIËLE ROUTE VAN DIE DIENST")
    pdf.body(
        "Ik open zelf de officiële route van de dienst waarover het bericht gaat "
        "en controleer daar of er werkelijk iets aan de hand is."
    )
    pdf.body("Voorbeelden: account → DigiD/dienst · pakket → PostNL/vervoerder")
    pdf.h2("Dit kan ik nu")
    for t in [
        "Stoppen bij een onverwacht bericht",
        "Geen link in het bericht openen",
        "Het verzoek wegleggen",
        "Zelf de passende officiële route kiezen",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · D1 · v2.0 · seniorease.nl/uitleg/veiligheid")

    # ── 5. Zaalchecklist ───────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Fictieve kijkvoorbeelden A/B/C gereed (geen klikbare links · geen oefen-sms)",
        "Navigatieoefening A getest (seniorease.nl/uitleg/veiligheid)",
        "Controleroute B-voorbeelden klaar (DigiD/dienst · PostNL/vervoerder · zonder login)",
        "Demoscherm klaar voor terug/verlaten",
        "Geen echte telefoonnummers op beamer",
        "Helper kent: STOP → NIET VERDERGAAN → ZELF CONTROLEREN",
        "Helper kent: A (navigatie) ≠ B (passende controle)",
        "Helper kent: bij echt verdacht bericht → niet projecteren",
        "Eindmissie: alleen bericht C + open opdracht op deelnemersbeamer",
        "Observatiechecklist (7 stappen) bij begeleider",
        "Beschermde 12 minuten eindmissie",
        "iPhone én Android even serieus",
        "Beamer-PDF klaar",
        "8–10× deelnemerskaart",
        "Geen C4-herhaling · geen D2–D4 naar voren",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
