#!/usr/bin/env python3
"""D4 Veilig online betalen — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, MUTED, NAVY  # noqa: E402

D4_VERSION = "v2.0"
D4_TITLE = "Veilig online betalen"
D4_SUB = "Een betaalmoment controleren en bij twijfel niet bevestigen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D4-Veilig-Betalen-v2.pdf"


def room_left(pdf: DLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: DLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D4 {D4_TITLE}  |  Pakket D  |  {D4_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf._footer_version = D4_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"D4 - {D4_TITLE}",
        "Les circa 90 minuten",
        f"{D4_SUB}. "
        "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
        "VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Sluit Pakket D af",
            "Gidsen: seniorease.nl/uitleg/veiligheid · /uitleg/online-bankieren",
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
        "iPhone en Android gelijkwaardig. Alleen fictieve betaalkaarten. Geen echte betaling.",
    )

    # ── 1. START HIER (max. één A4) ────────────────────────────────────────
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst. Voorbereiding circa 10–15 minuten.")
    pdf.box(
        "U hoeft geen fraude te bewijzen",
        [
            "Doel: controleren of een betaling past — bij twijfel niet bevestigen.",
            "STOP → NIET VERDERGAAN → ZELF CONTROLEREN · "
            "VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN · "
            "bij twijfel: NIET BEVESTIGEN → ZELF CONTROLEREN.",
            "Zin: “Nee, dit bevestig ik niet.”",
        ],
    )
    pdf.box(
        "Vier betaalvragen",
        [
            "1. Verwacht ik deze betaling?",
            "2. Ben ik zelf met deze aankoop begonnen?",
            "3. Klopt het bedrag?",
            "4. Past de ontvanger of betaalcontext bij wat ik wilde betalen?",
            "Passen ≠ bewezen veilig. Handelsnaam/provider ≠ automatisch fraude.",
        ],
    )
    pdf.body(
        "Bankroute: uw eigen bank (app tot startscherm of zelf typen). "
        "Geen login · geen echte betaling · geen voorkeur/reclame."
    )
    pdf.body(
        "A: Boekwinkel · € 24,95 · vier vragen + nuance. "
        "B: Muziek → BetaalService XYZ · € 189 · eerst vraag, geen antwoord vooraf. "
        "C: Onverwacht / veilige rekening · kort. "
        "D: Eindmissie · Cadeau € 15 → GiftPay € 75 · open · 12 min."
    )
    pdf.body(
        "Niet: echte betaling · login · codes · schermdeling · bankreclame · "
        "D3-hoofdles · D1/D2 opnieuw."
    )
    pdf.body(
        "Vooraf: beamer (B/D zonder antwoorden) · hulp · kaarten · "
        "Helper: passen ≠ veilig · GiftPay ≠ fraude · €15→€75 beslissend bij D. "
        "Groep: max. ca. 8–10 · helper · iPhone én Android · eindmissie 12 min behouden."
    )

    # ── 2. Draaiboek ───────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, kaarten A–D, vier vragen.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "Een betaalmoment controleren of de betaling past; "
        "bij afwijking of twijfel niet bevestigen."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U wilt iets online kopen. U komt bij het betaalmoment. '
        'Hoe controleert u of u de juiste betaling gaat bevestigen?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.body("VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN")
    pdf.body("Bij twijfel: NIET BEVESTIGEN → ZELF CONTROLEREN")
    pdf.body("“Nee, dit bevestig ik niet.”")
    pdf.box(
        "Exacte begeleidersnuances",
        [
            "Vier vragen: verwacht? · zelf begonnen? · bedrag? · ontvanger/context?",
            "Passen ≠ bewezen veilig — alleen: past dit bij wat u zelf wilde?",
            "Handelsnaam/provider ≠ automatisch fraude — wel controleren.",
            "Bankroute: open zelf de route van uw eigen bank — niet via link/QR uit bericht.",
        ],
    )

    tijdlijn = [
        ("0–5", "Brug D1–D3 + centrale situatie"),
        ("5–14", "Kapstokken · vier vragen · nuance"),
        ("14–28", "Officiële bankroute"),
        ("28–45", "Betaalkaart A"),
        ("45–50", "“Nee, dit bevestig ik niet.”"),
        ("50–55", "Pauze"),
        ("55–68", "Betaalkaart B (zelf beoordelen)"),
        ("68–75", "Situatie C (kort)"),
        ("75–78", "Herhalen / hulp"),
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
    pdf.bullet("Bij uitloop: C inkorten. Niet schrappen: bankroute + vier vragen + eindmissie.")

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    pdf.add_page()
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen echte betaling · geen login verplicht · geen codes · geen schermdeling")
    pdf.bullet("Geen bankreclame · geen D3-hoofdles · geen D1/D2 opnieuw als hoofdles")

    blok(
        "Inloop (buiten 90)",
        [
            (
                "Zegt",
                "Welkom. Vandaag: bij een betaalmoment controleren of de betaling past. "
                "U hoeft niet in te loggen. Geen echte betaling. Geen codes delen.",
            ),
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
        "Brug + situatie (0–5)",
        [
            ("Zegt", "Brug D1–D3 in één zin. Situatie voorlezen. “Hoe controleert u?” — wacht."),
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
        "Kapstok + vier vragen (5–14)",
        [
            (
                "Zegt",
                "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
                "VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN. "
                "Vier vragen. Handelsnaam/provider ≠ automatisch fraude. Passen ≠ bewezen veilig.",
            ),
            ("Toont", "Kapstok · vier vragen (aparte dia’s)"),
            ("Voordoet", "—"),
            ("Deelnemer", "Leest mee"),
            ("Controleert", "—"),
            ("Helper", "—"),
            ("Doorgaan", "Na kapstok + vragen"),
            ("Inkorten", "Brug weglaten"),
        ],
    )
    blok(
        "Officiële bankroute (14–28)",
        [
            (
                "Zegt",
                "Open zelf de route van uw eigen bank: app of zelf typen. "
                "Geen login verplicht. Niet via link/QR uit onverwacht bericht. Geen voorkeur.",
            ),
            ("Toont", "Generiek “uw bank”"),
            ("Voordoet", "Kort tot startscherm"),
            ("Deelnemer", "Op eigen toestel"),
            ("Controleert", "Zelf geopend · geen login · geen betaling"),
            ("Helper", "“Wat ziet u nu?” · iPhone | Android"),
            ("Doorgaan", "Meeste zien startscherm/bekende route"),
            ("Inkorten", "Voordoen + enkele"),
        ],
    )

    pdf.add_page()
    blok(
        "Betaalkaart A (28–45)",
        [
            (
                "Zegt",
                "Fictief. Niet betalen. Vier vragen. "
                "Nuance: passen betekent niet dat wij bewijzen dat een betaling veilig is.",
            ),
            ("Toont", "Kaart A"),
            ("Voordoet", "Wijst de vier vragen"),
            ("Deelnemer", "Beantwoordt mee"),
            ("Controleert", "Geen echte betaling · begrijpt nuance"),
            ("Helper", "1-op-1"),
            ("Doorgaan", "Meeste kunnen vragen toepassen"),
            ("Inkorten", "Minder voorbeelden"),
        ],
    )
    blok(
        "Zin bij twijfel (45–50)",
        [
            ("Zegt", "“Nee, dit bevestig ik niet.” Daarna zelf controleren."),
            ("Toont", "Zin groot"),
            ("Voordoet", "Eén keer rustig"),
            ("Deelnemer", "Zegt de zin hardop"),
            ("Controleert", "Zin klopt"),
            ("Helper", "Softjes meeluisteren"),
            ("Doorgaan", "Meeste hebben de zin gezegd"),
            ("Inkorten", "Alleen klassikaal"),
        ],
    )

    pdf.add_page()
    pdf.h2("Pauze (50–55)")
    pdf.body("Korte pauze. Daarna betaalkaart B.")
    pdf.body(
        "Kaart B — volgorde vast: tonen → “Wat doet u nu?” → wachten → "
        "vier vragen → pas daarna “Nee…” → zelf controleren."
    )
    blok(
        "Betaalkaart B (55–68)",
        [
            (
                "Zegt",
                "Eerst alleen de kaart. “Wat doet u nu?” — wacht. Vier vragen. "
                "Pas daarna de zin. (U weet: bedrag én context wijken af — niet voorzeggen.)",
            ),
            ("Toont", "Kaart B zonder antwoord"),
            ("Voordoet", "Pas na reacties: de zin"),
            ("Deelnemer", "Beoordeelt zelf"),
            ("Controleert", "Geen antwoord vooraf · geen betaling"),
            ("Helper", "“Wat ziet u nu?”"),
            ("Doorgaan", "Meeste niet bevestigen"),
            ("Inkorten", "Wel vraag → wachten"),
        ],
    )
    blok(
        "Situatie C (68–75)",
        [
            (
                "Zegt",
                "Onverwacht / veilige rekening: niet betalen. "
                "Kort: geen code, software of scherm. (Geen D3-herhaling.)",
            ),
            ("Toont", "Situatie C"),
            ("Voordoet", "Stop · niet overmaken"),
            ("Deelnemer", "Benoemt stop"),
            ("Controleert", "Geen betaling"),
            ("Helper", "1-op-1"),
            ("Doorgaan", "Korte ronde"),
            ("Inkorten", "Eerste inkortblok"),
        ],
    )

    pdf.add_page()
    blok(
        "Herhalen / hulp (75–78)",
        [
            ("Zegt", "Waar liep het vast?"),
            ("Toont", "Kapstok / vier vragen indien nodig"),
            ("Voordoet", "Alleen op verzoek"),
            ("Deelnemer", "Extra oefening of rust"),
            ("Controleert", "—"),
            ("Helper", "Vastlopers"),
            ("Doorgaan", "Op tijd voor 12 min eindmissie"),
            ("Inkorten", "Zo kort mogelijk"),
        ],
    )

    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted("Deelnemersbeamer: kaart D + open opdracht. Geen antwoorden · geen checklist.")
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U komt bij een betaalmoment.",
            "Wat doet u nu?",
            "Laat zien hoe u controleert of de betaling past — en wat u doet bij twijfel.",
        ],
    )
    pdf.body("Begeleidersinfo: GiftPay ≠ fraude · beslissend is € 15 → € 75.")
    pdf.body("Observatiechecklist begeleider (niet op beamer):")
    for i, t in enumerate(
        [
            "Opent zelf bankroute (zonder login verplicht).",
            "Bekijkt kaart D.",
            "Past vier vragen toe of benoemt die.",
            "Herkent dat het niet past — minstens via het bedrag.",
            "“Nee, dit bevestig ik niet.”",
            "Bevestigt/betaalt niet.",
            "Geen code · geen scherm · geen klassikale login.",
        ],
        1,
    ):
        pdf.numbered(i, t)

    new_page_if_needed(pdf, 70)
    blok(
        "Eindmissie — rollen",
        [
            ("Zegt", "Dit doet u zelf. Geen antwoorden van tevoren."),
            ("Toont", "Open opdracht · kaart D"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Zelfstandig"),
            ("Controleert", "Checklist"),
            ("Helper", "Alleen “Wat ziet u nu?”"),
            ("Doorgaan", "Afsluiting"),
            ("Inkorten", "Nooit schrappen"),
        ],
    )
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u hoe u bij een betaalmoment controleert '
        "of de betaling past — en dat u bij twijfel niet bevestigt. "
        'Pakket D is compleet."'
    )

    # ── 3. Hulp ────────────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("3. D4 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → deelnemer zelf → pas als laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Moet ik inloggen?", "Nee · tot startscherm is genoeg in deze les"),
        ("Welke bank moet ik openen?", "Uw eigen bank · geen voorkeur · geen reclame"),
        (
            "Er staat een andere naam / betaalprovider",
            "Niet automatisch fraude · wel controleren · bij twijfel niet bevestigen",
        ),
        (
            "De vier vragen “kloppen” — is het dan veilig?",
            "Nee · dat bewijst geen veiligheid · alleen: past dit bij wat u zelf wilde?",
        ),
        ("Klopt het bedrag niet", "Niet bevestigen · “Nee, dit bevestig ik niet.”"),
        ("Ik heb deze aankoop niet zelf begonnen", "Niet bevestigen · stoppen"),
        ("Onverwacht betaalverzoek / QR", "Niet betalen omdat naam of logo vertrouwd lijkt"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("“Veilige rekening” — moet ik overmaken?", "Nee · stoppen · niet betalen"),
        ("Mag ik een code / pincode delen?", "Nee"),
        ("Mag ik mijn scherm delen?", "Nee · korte D3-brug · geen herhalingsles"),
        ("Ik vind mijn bank-app niet", "Helper 1-op-1 · iPhone | Android · “Uw scherm kan anders zijn”"),
        ("Mijn scherm ziet er anders uit", "Dat is normaal"),
        ("Ik wil echt betalen oefenen", "Niet in de les · alleen kijkkaarten"),
        ("Afwijkend toestel", "Helper 1-op-1 — groep niet stilleggen"),
        (
            "Echte verdachte betaling / bericht",
            "Niet op beamer · helper 1-op-1 · niet bevestigen · bij ernst: officiële hulp / organisatie",
        ),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)
    pdf.muted("Geen paniektaal. Geen schaamte. Geen volledige fraudeherstelprocedure.")

    # ── 4. Deelnemerskaart ─────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "Bij een betaalmoment",
        ["VERWACHT → CONTROLEER → PAS DAN BEVESTIGEN"],
    )
    pdf.body("Ook: STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.box(
        "Vier vragen",
        [
            "1. Verwacht ik deze betaling?",
            "2. Ben ik zelf met deze aankoop begonnen?",
            "3. Klopt het bedrag?",
            "4. Past de ontvanger of betaalcontext bij wat ik wilde betalen?",
        ],
    )
    pdf.box(
        "Bij afwijking of twijfel",
        ["→ NIET BEVESTIGEN → ZELF CONTROLEREN", "“Nee, dit bevestig ik niet.”"],
    )
    pdf.body(
        "Doe dit niet: NIET BETALEN bij twijfel · GEEN CODE DELEN · GEEN SOFTWARE · GEEN SCHERM"
    )
    pdf.body(
        "Let op: andere handelsnaam/provider is niet automatisch fraude — wel controleren. "
        "Vier vragen die “passen” is geen bewijs dat een betaling veilig is. "
        "Open zelf de route van uw eigen bank."
    )
    pdf.h2("Dit kan ik nu")
    for t in [
        "Mijn bankroute zelf openen (zonder te moeten inloggen)",
        "De vier vragen bij een betaalmoment gebruiken",
        "Bij twijfel niet bevestigen",
        "“Nee, dit bevestig ik niet” zeggen",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · D4 · v2.0 · seniorease.nl/uitleg/veiligheid")

    # ── 5. Zaalchecklist ───────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Betaalkaarten A/B/D gereed (fictief · niet-klikbaar · geen echte betaling)",
        "Kaart B: deelnemersbeeld zonder antwoord · volgorde tonen → vraag → vier vragen → “Nee…”",
        "Kaart D: open · GiftPay ≠ fraude · bedrag €15→€75 beslissend voor begeleider",
        "Situatie C gereed",
        "Vier betaalvragen + zin “Nee, dit bevestig ik niet.” zichtbaar",
        "Helper kent: vier vragen passen ≠ bewezen veilig",
        "Helper kent: handelsnaam/provider ≠ automatisch fraude",
        "Deelnemers mogen eigen bank tot startscherm (zonder login)",
        "Geen bankvoorkeur/reclame",
        "Geen echte betaling · geen codes · geen schermdeling",
        "D3 slechts korte brug",
        "Eindmissie: open opdracht · checklist bij begeleider · 12 min",
        "Beamer-PDF klaar · 8–10× deelnemerskaart",
        "Geen D1–D3 opnieuw als hoofdles",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
