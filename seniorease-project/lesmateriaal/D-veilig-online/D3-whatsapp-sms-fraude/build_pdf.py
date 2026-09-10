#!/usr/bin/env python3
"""D3 Oplichters aan de telefoon en via berichten — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, MUTED, NAVY  # noqa: E402

D3_VERSION = "v2.0"
D3_TITLE = "Oplichters aan de telefoon en via berichten"
D3_SUB = "Gesprek stoppen, geen code of scherm delen, en zelf terugbellen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D3-Telefoon-Helpdesk-v2.pdf"


def room_left(pdf: DLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: DLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D3 {D3_TITLE}  |  Pakket D  |  {D3_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf._footer_version = D3_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"D3 - {D3_TITLE}",
        "Les circa 90 minuten",
        f"{D3_SUB}. "
        "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
        "ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Bouwt voort op D1",
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
        "iPhone en Android gelijkwaardig. Alleen fictieve scenario’s.",
    )

    # ── 1. START HIER ──────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst. Voorbereiding circa 10–15 minuten.")
    pdf.box(
        "U hoeft niet te bewijzen dat iemand een fraudeur is",
        [
            "U begeleidt. Doel: veilig gedrag bij twijfel.",
            "Pakketkapstok: STOP → NIET VERDERGAAN → ZELF CONTROLEREN.",
            "D3-kapstok: ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN.",
            "GEEN SOFTWARE INSTALLEREN · GEEN SCHERM DELEN.",
            "Terugbelzin: “Ik bel u zelf terug via het officiële nummer.”",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Stoppen bij een onverwachte beller of helpdesk, geen code/software/scherm toestaan, "
        "en — indien nodig — zelf een officiële contactroute kiezen."
    )
    pdf.h2("Scenario’s A–D")
    pdf.body(
        "A: eerst tonen · “Wat doet u nu?” · daarna STOP. "
        "B: kort helpdeskbericht (geen familie). "
        "C: veilige rekening · niet overmaken. "
        "D: eindmissie 12 min · zonder voordoen."
    )
    pdf.h2("Officiële route & absoluut niet")
    pdf.body(
        "“Ik zoek zelf het officiële nummer via een route die ik al vertrouw.” "
        "Niet: Contacten = veilig. "
        "Niet: echte bank · software · scherm · codes · betalingen · C4-familie · D4."
    )
    pdf.h2("Vooraf (± 10–15 min)")
    pdf.numbered(1, "Bekijk beamer (A: tonen → vraag → later antwoord).")
    pdf.numbered(2, "Hulp · kaarten A–D · print · beamer · kabels.")
    pdf.numbered(3, "Helper: Contacten ≠ veilig · niet ieder gesprek terugbellen.")
    pdf.h2("Groep")
    pdf.body(
        "Max. ca. 8–10 · helper sterk aanbevolen · iPhone én Android · "
        "eindmissie 12 min altijd behouden."
    )

    # ── 2. Draaiboek ───────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, scenario’s A–D, terugbelzin.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "Stoppen bij een onverwachte beller of helpdesk; geen code/software/scherm; "
        "indien nodig zelf een officiële contactroute kiezen."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U wordt gebeld door iemand die zegt van uw bank of een helpdesk te zijn. '
        'Er zou iets mis zijn. U moet meteen een app installeren of uw scherm delen. Wat doet u?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.body("ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN")
    pdf.body("GEEN SOFTWARE INSTALLEREN · GEEN SCHERM DELEN")
    pdf.body("NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN")
    pdf.box(
        "Exacte begeleiderszinnen",
        [
            "Terugbelzin: “Ik bel u zelf terug via het officiële nummer.”",
            "Nuance: eerst beëindigen; alleen indien nodig zelf controleren; "
            "nooit via nummer uit gesprek/bericht; niet ieder gesprek terugbellen.",
            "Route: “Ik zoek zelf het officiële nummer via een route die ik al vertrouw.”",
        ],
    )

    tijdlijn = [
        ("0–5", "Brug D1/D2 + centrale situatie"),
        ("5–12", "Kapstokken"),
        ("12–28", "Gesprek A (tonen → vraag → daarna STOP)"),
        ("28–40", "Terugbelzin"),
        ("40–50", "Officiële route"),
        ("50–55", "Pauze"),
        ("55–65", "Bericht B"),
        ("65–72", "Situatie C"),
        ("72–78", "Herhalen / hulp"),
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
    pdf.bullet("Bij uitloop: B en/of C inkorten. Niet schrappen: terugbelzin + eindmissie.")

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    pdf.add_page()
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen C4-familie/blokkeren · geen D1/D2 opnieuw als hoofdles · geen D4")
    pdf.bullet("Geen echte bank · geen software/scherm/code/betaling in de les")

    blok(
        "Inloop (buiten 90)",
        [
            (
                "Zegt",
                "Welkom. Eerst stoppen bij onverwachte beller/helpdesk. "
                "Als u wilt controleren: zelf via officiële route. "
                "In deze les installeren we niets en delen we geen scherm.",
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
            ("Zegt", "Brug D1/D2 in één zin. Situatie voorlezen. “Wat doet u?” — wacht."),
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
                "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
                "ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN. "
                "GEEN SOFTWARE · GEEN SCHERM. Nummer of bekende naam bewijst niet wie belt.",
            ),
            ("Toont", "Kapstokken · risico’s (aparte dia’s)"),
            ("Voordoet", "—"),
            ("Deelnemer", "Leest mee"),
            ("Controleert", "—"),
            ("Helper", "—"),
            ("Doorgaan", "Na kapstok"),
            ("Inkorten", "Brug weglaten"),
        ],
    )

    pdf.body(
        "Gesprek A — volgorde vast: tonen → “Wat doet u nu?” → wachten → "
        "pas daarna STOP / GEEN CODE / GEEN SOFTWARE / GEEN SCHERM → voordoen → oefenen."
    )
    blok(
        "Gesprek A (12–28)",
        [
            (
                "Zegt",
                "Eerst: “Dit is een SeniorEase-oefening — geen echt gesprek.” "
                "“Wat doet u nu?” — wacht. Pas na reacties: STOP · GEEN CODE · "
                "GEEN SOFTWARE · GEEN SCHERM.",
            ),
            ("Toont", "Fictief gesprek A"),
            ("Voordoet", "Na de reacties: één veilige reactie"),
            ("Deelnemer", "Reageert eerst zelf · daarna oefent stop / weigeren"),
            ("Controleert", "Niemand heeft werkelijk software/scherm/code gebruikt"),
            ("Helper", "“Wat ziet u nu?” · grijpt in vóór echte installatie/deling"),
            ("Doorgaan", "Meeste kunnen stop + weigeren benoemen"),
            ("Inkorten", "Minder naspelen · wel vraag → wachten → dan herhalen"),
        ],
    )

    pdf.add_page()
    blok(
        "Terugbelzin (28–40)",
        [
            (
                "Zegt",
                "Exact: “Ik bel u zelf terug via het officiële nummer.” "
                "Eerst beëindigen; alleen indien nodig; nooit via nummer uit gesprek; "
                "niet ieder gesprek terugbellen.",
            ),
            ("Toont", "Terugbelzin groot op beamer"),
            ("Voordoet", "Zegt de zin één keer rustig"),
            ("Deelnemer", "Zegt de zin hardop (alleen of in tweetallen)"),
            ("Controleert", "Zin klopt · geen nummer uit scenario"),
            ("Helper", "Softjes meeluisteren"),
            ("Doorgaan", "Meeste hebben de zin gezegd"),
            ("Inkorten", "Alleen klassikaal herhalen"),
        ],
    )

    blok(
        "Officiële route (40–50)",
        [
            (
                "Zegt",
                "“Ik zoek zelf het officiële nummer via een route die ik al vertrouw.” "
                "Niet Contacten = veilig. Niet nummer uit gesprek. Geen login. Geen echte bank bellen.",
            ),
            ("Toont", "Officiële app / gecontroleerd nummer / zelf geopende site"),
            ("Voordoet", "Kort tot startscherm of aanwijzen"),
            ("Deelnemer", "Op eigen toestel"),
            ("Controleert", "Zelf gekozen officiële route · geen scenario-nummer"),
            ("Helper", "“Wat ziet u nu?” · iPhone | Android"),
            ("Doorgaan", "Korte ronde"),
            ("Inkorten", "Voordoen + enkele deelnemers"),
        ],
    )

    # Pauze + B samen
    pdf.add_page()
    pdf.h2("Pauze (50–55)")
    pdf.body("Korte pauze. Daarna bericht B.")
    blok(
        "Bericht B (55–65)",
        [
            (
                "Zegt",
                "Kort kijkvoorbeeld: helpdeskbericht (geen familie). Tik niet. "
                "Eerst stoppen; alleen indien nodig zelf controleren.",
            ),
            ("Toont", "Fictief bericht B"),
            ("Voordoet", "Wegleggen"),
            ("Deelnemer", "Alleen kijken · benoemt stop"),
            ("Controleert", "Geen link · geen familie-hoofdles"),
            ("Helper", "1-op-1"),
            ("Doorgaan", "Korte ronde"),
            ("Inkorten", "Eerste inkortblok"),
        ],
    )

    blok(
        "Situatie C (65–72)",
        [
            ("Zegt", "“Maak over naar een veilige rekening” = stop · niet overmaken · niet betalen."),
            ("Toont", "Situatie C"),
            ("Voordoet", "Stop · geen overboeking"),
            ("Deelnemer", "Benoemt stop · niet overmaken"),
            ("Controleert", "Geen betaling"),
            ("Helper", "1-op-1"),
            ("Doorgaan", "Meeste herkennen stopreden"),
            ("Inkorten", "Tweede inkortblok"),
        ],
    )

    pdf.add_page()
    blok(
        "Herhalen / hulp (72–78)",
        [
            ("Zegt", "Waar liep het vast?"),
            ("Toont", "Kapstok / terugbelzin indien nodig"),
            ("Voordoet", "Alleen op verzoek"),
            ("Deelnemer", "Extra oefening of rust"),
            ("Controleert", "—"),
            ("Helper", "Vastlopers"),
            ("Doorgaan", "Op tijd voor 12 min eindmissie"),
            ("Inkorten", "Zo kort mogelijk"),
        ],
    )

    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted("Deelnemersbeamer: scenario D + open opdracht. Geen antwoorden · geen checklist.")
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U wordt onverwacht benaderd door iemand die zegt van de bank of helpdesk te zijn.",
            "Wat doet u nu?",
            "Laat zien hoe u stopt, niets deelt of installeert, en — indien nodig — "
            "zelf via een officiële route contact zoekt.",
        ],
    )
    pdf.body("Observatiechecklist begeleider (niet op beamer):")
    for i, t in enumerate(
        [
            "Onderbreekt / beëindigt het onverwachte verzoek.",
            "Weigert code.",
            "Weigert software.",
            "Weigert scherm delen.",
            "Benoemt: eerst stoppen; alleen indien nodig zelf controleren (terugbelzin mag).",
            "Kiest zelf officiële route (niet Contacten = veilig · geen scenario-nummer).",
            "Geen login · geen betaling · geen echte bank.",
        ],
        1,
    ):
        pdf.numbered(i, t)

    new_page_if_needed(pdf, 70)
    blok(
        "Eindmissie — rollen",
        [
            ("Zegt", "Dit doet u zelf. Geen antwoorden van tevoren."),
            ("Toont", "Open opdracht · scenario D"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Zelfstandig"),
            ("Controleert", "Checklist"),
            ("Helper", "Alleen “Wat ziet u nu?”"),
            ("Doorgaan", "Afsluiting"),
            ("Inkorten", "Nooit schrappen"),
        ],
    )
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u: eerst stoppen, geen code of scherm delen, '
        "en — als u wilt controleren — zelf contact zoeken via een officiële route "
        'die u al vertrouwt."'
    )

    # ── 3. Hulp ────────────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("3. D3 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Is deze beller echt van de bank?", "U hoeft dat niet te bewijzen · eerst STOP · alleen indien nodig zelf controleren"),
        ("Er staat een bekende naam of nummer", "Bewijst niet wie belt · toch stoppen"),
        ("Mag ik de code doorgeven?", "Nee bij onverwachte beller/helpdesk"),
        ("Mag ik die app installeren / scherm delen?", "Nee · GEEN SOFTWARE · GEEN SCHERM"),
        ("Welk nummer moet ik bellen?", "Zoek zelf via een route die u al vertrouwt — niet uit gesprek/bericht"),
        ("Staat het nummer al in Contacten?", "Nee · Contacten ≠ automatisch officiële route"),
        ("Moet ik ieder onverwacht telefoontje terugbellen?", "Nee · eerst beëindigen · alleen als u dat nodig vindt"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Ik vind mijn bank-app niet", "Helper 1-op-1 · iPhone | Android · scherm kan anders zijn"),
        ("Mag ik echt de bank bellen in de les?", "Nee — oefen de zin en de officiële route"),
        ("Dit lijkt op familie met nieuw nummer", "Dat hoort bij C4 · vandaag helpdesk/beller"),
        ("“Veilige rekening” — moet ik overmaken?", "Nee · stoppen · niet betalen"),
        ("Ik heb al iets gezegd / bijna gedaan", "Stop vanaf nu · helper 1-op-1 · geen schaamte"),
        ("Afwijkend toestel", "Helper 1-op-1 — groep niet stilleggen"),
        ("Echt verdacht telefoontje / bericht", "Niet op beamer · helper 1-op-1 · bij ernst: officiële hulp"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)

    # ── 4. Deelnemerskaart ─────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "ONVERWACHTE HULP?",
        ["→ STOP", "→ ZELF TERUGBELLEN"],
    )
    pdf.box(
        "Doe dit niet",
        [
            "NIET BETALEN · GEEN CODE DELEN",
            "NIET OP EEN ONVERWACHTE LINK TIKKEN",
            "GEEN SOFTWARE INSTALLEREN · GEEN SCHERM DELEN",
        ],
    )
    pdf.h2("Zeg dit")
    pdf.body("“Ik bel u zelf terug via het officiële nummer.”")
    pdf.h2("Let op")
    pdf.body("Eerst beëindigen. Niet ieder gesprek hoeft te worden teruggebeld.")
    pdf.body("Alleen terugbellen als controleren nodig is. Nooit via nummer uit gesprek/bericht.")
    pdf.h2("Zelf")
    pdf.body("Zoek zelf het officiële nummer via een route die u al vertrouwt.")
    pdf.body("Niet: willekeurig contact omdat het in Contacten staat.")
    pdf.h2("Dit kan ik nu")
    for t in [
        "Een onverwacht gesprek of helpdeskbericht stopzetten",
        "Geen code / software / scherm toestaan",
        "De terugbelzin zeggen (als controleren nodig is)",
        "Zelf een officiële route kiezen die ik al vertrouw",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · D3 · v2.0 · seniorease.nl/uitleg/veiligheid")

    # ── 5. Zaalchecklist ───────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Scenario’s A–D gereed (fictief · geen echte nummers · geen klikbare links)",
        "Beamer: scenario A eerst tonen → “Wat doet u nu?” → pas daarna antwoorden",
        "Geen familie-/nieuw-nummer-hoofdscenario · geen C4-blokkeren/privacy",
        "Terugbelzin op A4 / beamer",
        "Officiële app / gecontroleerd nummer / zelf geopende site (zonder login)",
        "Helper: Contacten ≠ veilig · niet ieder gesprek terugbellen · eerst beëindigen",
        "Geen software · geen schermdeling · geen echte bank · geen overboeking",
        "Helper: ONVERWACHTE HULP? → STOP → ZELF TERUGBELLEN",
        "Eindmissie: open opdracht · checklist bij begeleider · 12 min",
        "Beamer-PDF klaar · 8–10× deelnemerskaart",
        "Geen D1/D2 opnieuw · geen D4 naar voren",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
