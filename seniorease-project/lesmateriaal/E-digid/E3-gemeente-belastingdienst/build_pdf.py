#!/usr/bin/env python3
"""E3 Iets regelen bij de digitale overheid — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, MUTED, NAVY  # noqa: E402

E3_VERSION = "v2.0"
E3_TITLE = "Iets regelen bij de digitale overheid"
E3_SUB = "Een officiële overheidsroute openen en vinden waar u moet beginnen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E3-Iets-Regelen-v2.pdf"
ROUTE = "OFFICIËLE ROUTE OPENEN → TAAK VINDEN → PERSOONLIJK DEEL HERKENNEN → NIETS AFRONDEN"


def room_left(pdf: ELessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E3 {E3_TITLE}  |  Pakket E  |  {E3_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf._footer_version = E3_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"E3 - {E3_TITLE}",
        "Les circa 90 minuten",
        f"{E3_SUB}. {ROUTE}. "
        "Geen echte aanvraag. Oefenvoorbeeld Gemeente Utrecht. "
        "Ook geschikt voor begeleiders zonder gemeente-expertise.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Volgt op E2 MijnOverheid",
            "Oefenvoorbeeld: utrecht.nl",
        ],
        contents_title="Bij deze les ontvangt u",
    )
    pdf.set_font("DejaVu", "I", 10)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5.5,
        "Methode: ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN. "
        "Inloop telt niet mee. Eindmissie altijd behouden (12 min). "
        "Telefoon/tablet of computer. Geen echte DigiD-login. Geen echte aanvraag. "
        "Controleer kort vóór iedere les of de gemeentelijke website nog hetzelfde werkt.",
    )

    # START HIER
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted(
        "Lees dit blad eerst. Voorbereiding circa 10–15 minuten. "
        "De begeleider hoeft geen gemeente- of Belastingdienstexpert te zijn. "
        "De begeleider begeleidt een route — geen regeling."
    )
    pdf.box(
        "Doel",
        [
            "Officiële overheidsroute openen · taak vinden · persoonlijk deel herkennen · bewust stoppen.",
            "Situatie: iets regelen bij uw gemeente — waar begin ik?",
            f"Route: {ROUTE}",
        ],
    )
    pdf.box(
        "Oefenomgeving (geverifieerd 2026-09-10)",
        [
            "Gemeente Utrecht · utrecht.nl (oefenvoorbeeld · geen voorkeur)",
            "Taak A: Verhuizing doorgeven · stop vóór DigiD/online aanvraag",
            "Taak B (eindmissie): Paspoort of identiteitskaart · stop vóór afspraak vastleggen",
            "Stopzin: “U heeft gevonden waar u moet zijn. Hier stopt de oefening.”",
        ],
    )
    pdf.body(
        "Geen echte aanvraag · geen verplichte DigiD · geen begeleidersaccount. "
        "Eigen gemeente alleen OPTIONEEL · 1-OP-1. Belastingdienst alleen korte transfer. "
        "Helper: “Wat ziet u nu?” Eindmissie: exact 12 min · zonder voordoen."
    )

    # Draaiboek
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, Utrecht-route, stoppunten, eindmissie.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "Officiële overheidsroute openen, taak vinden, persoonlijk deel herkennen, "
        "bewust niets afronden — zonder echte login of aanvraag."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U wilt iets regelen bij uw gemeente. Waar begint u — en hoe vindt u de juiste plek?"'
    )
    pdf.h2("Gouden kapstok")
    pdf.body(ROUTE)
    pdf.box(
        "Stopzin",
        ["“U heeft gevonden waar u moet zijn. Hier stopt de oefening.”"],
    )

    tijdlijn = [
        ("0–5", "Retrieval E2"),
        ("5–10", "Centrale situatie + brug"),
        ("10–18", "Wat betekent iets regelen?"),
        ("18–30", "utrecht.nl zelf openen"),
        ("30–45", "Taak A: Verhuizing doorgeven vinden"),
        ("45–55", "Persoonlijk deel herkennen + stoppen"),
        ("55–60", "Pauze"),
        ("60–70", "Open herhaling + stoppen"),
        ("70–78", "Transfer Belastingdienst / optioneel eigen gemeente"),
        ("78–90", "Eindmissie taak B (12 min · zonder voordoen)"),
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

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    pdf.add_page()
    pdf.h2("Begeleiderroutes (niet op deelnemersbeamer)")
    pdf.body(
        "Taak A: utrecht.nl → zoek Verhuizing doorgeven → productpagina → "
        "herken Met DigiD → stop · sluit. (Check: utrecht.nl/verhuizen)"
    )
    pdf.body(
        "Taak B: deelnemer vindt zelf vanaf utrecht.nl. Product: "
        "Paspoort of identiteitskaart aanvragen. Stop vóór afspraak. "
        "(Check: utrecht.nl/paspoort — niet op beamer vóór/tijdens missie.)"
    )

    blok(
        "Inloop (buiten 90)",
        [
            ("Zegt", "Welkom. Iets regelen bij de digitale overheid. We vinden waar u moet beginnen. We vragen niets echt aan."),
            ("Toont", "—"),
            ("Voordoet", "—"),
            ("Deelnemer", "Toestel aan · browser beschikbaar"),
            ("Controleert", "Telefoon/tablet of computer"),
            ("Helper", "Wifi / volume"),
            ("Doorgaan", "Groep ongeveer klaar"),
            ("Inkorten", "—"),
        ],
    )
    blok(
        "Retrieval E2 (0–5)",
        [
            ("Zegt", "“U wilt weten waar berichten van de overheid voor u kunnen staan. Laat zien waar u zelf begint.”"),
            ("Toont", "—"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "MijnOverheid openen · persoonlijke toegang herkennen · sluiten"),
            ("Controleert", "Kort · geen login"),
            ("Helper", "“Wat ziet u nu?”"),
            ("Doorgaan", "Na korte ronde"),
            ("Inkorten", "Alleen openen + sluiten"),
        ],
    )

    pdf.add_page()
    blok(
        "Centrale situatie + brug (5–10)",
        [
            ("Zegt", "Situatie voorlezen. Brug: vorige keer MijnOverheid — vandaag waar beginnen bij een overheidstaak."),
            ("Toont", "Beginsituatie"),
            ("Voordoet", "—"),
            ("Deelnemer", "Denkt mee"),
            ("Controleert", "Groep bij de vraag"),
            ("Helper", "—"),
            ("Doorgaan", "Na 1–2 reacties"),
            ("Inkorten", "—"),
        ],
    )
    blok(
        "Wat betekent iets regelen? (10–18)",
        [
            ("Zegt", "Route vinden ≠ taak afronden. Utrecht = oefenvoorbeeld. Eigen gemeente kan anders uitzien."),
            ("Toont", "Hoofdroute"),
            ("Voordoet", "—"),
            ("Deelnemer", "Luistert"),
            ("Controleert", "Geen toets"),
            ("Helper", "Softjes"),
            ("Doorgaan", "Na korte uitleg"),
            ("Inkorten", "Alleen: vinden ≠ afronden"),
        ],
    )

    pdf.add_page()
    blok(
        "utrecht.nl zelf openen (18–30)",
        [
            ("Zegt", "“We openen de officiële website van de voorbeeldgemeente zelf. Typ utrecht.nl.”"),
            ("Toont", "Adresbalk telefoon/computer"),
            ("Voordoet", "Eén keer tot site open"),
            ("Deelnemer", "Opent zelf"),
            ("Controleert", "Zelf geopend · geen Google-les"),
            ("Helper", "“Wat ziet u nu?” · iPhone | Android | computer"),
            ("Doorgaan", "Meeste hebben utrecht.nl open"),
            ("Inkorten", "Minder rondes · wel zelf openen"),
        ],
    )
    blok(
        "Taak A vinden (30–45)",
        [
            ("Zegt", "“Zoek op deze website: Verhuizing doorgeven. Nog niets invullen.” Zoekvak mag."),
            ("Toont", "Zoeken / productpagina A"),
            ("Voordoet", "Eerste keer kort tot pagina zichtbaar"),
            ("Deelnemer", "Vindt taak A"),
            ("Controleert", "Juiste openbare pagina · geen aanvraag"),
            ("Helper", "“Wat ziet u nu?”"),
            ("Doorgaan", "Meeste hebben taak A"),
            ("Inkorten", "Minder rondes"),
        ],
    )

    pdf.add_page()
    blok(
        "Persoonlijk deel + stoppen (45–55)",
        [
            ("Zegt", "“Wat ziet u nu?” “Hier begint het persoonlijke deel.” “U heeft gevonden waar u moet zijn. Hier stopt de oefening.”"),
            ("Toont", "Met DigiD / persoonlijk vervolg · STOP-kaart"),
            ("Voordoet", "Wijst stoppunt · stopt"),
            ("Deelnemer", "Herkent · stopt · vult niets in"),
            ("Controleert", "Geen DigiD-login · geen versturen"),
            ("Helper", "Grijpt in vóór invullen"),
            ("Doorgaan", "Meeste herkennen stoppunt"),
            ("Inkorten", "Persoonlijk deel + stop behouden"),
        ],
    )
    pdf.h2("Pauze (55–60)")
    pdf.body("Korte pauze. Daarna open herhaling.")

    blok(
        "Open herhaling (60–70)",
        [
            ("Zegt", "“U wilt opnieuw weten waar u deze taak kunt regelen. Laat zien waar u zelf begint. Stop wanneer de oefening klaar is.”"),
            ("Toont", "Open herhaal-opdracht (geen antwoordpad)"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Openen · taak vinden · persoonlijk deel · stoppen · sluiten"),
            ("Controleert", "Observeert · geen voordoen"),
            ("Helper", "“Wat ziet u nu?”"),
            ("Doorgaan", "Op tijd voor transfer + missie"),
            ("Inkorten", "Korte ronde"),
        ],
    )

    pdf.add_page()
    blok(
        "Transfer · optioneel eigen gemeente (70–78)",
        [
            ("Zegt", "Kort Belastingdienst: openen · herkennen waar persoonlijk begint · stoppen. Optioneel eigen gemeente 1-op-1 · groep wacht niet."),
            ("Toont", "Eventueel korte Belastingdienst-start"),
            ("Voordoet", "Alleen indien kort nodig"),
            ("Deelnemer", "Herkent principe · of eigen gemeente met helper"),
            ("Controleert", "Geen aangifte · geen login"),
            ("Helper", "Eigen gemeente 1-op-1"),
            ("Doorgaan", "Op tijd voor 12 min missie"),
            ("Inkorten", "Transfer schrappen"),
        ],
    )

    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted("Deelnemersbeamer: alleen open opdracht. Geen antwoordroute · geen stappen.")
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U wilt bij dezelfde gemeente weten waar u een paspoort of identiteitskaart kunt regelen.",
            "Laat zien waar u zelf begint en vind waar u moet zijn.",
            "Stop voordat u persoonlijke gegevens invult, een afspraak vastlegt of iets verstuurt.",
        ],
    )
    pdf.body("Observatiechecklist begeleider (niet op beamer):")
    for i, t in enumerate(
        [
            "Opent zelf utrecht.nl.",
            "Vindt paspoort/ID-taak (niet alleen verhuizing uit geheugen).",
            "Herkent persoonlijk deel (afspraak / DigiD / gegevens).",
            "Vult niets in · boekt geen afspraak · betaalt niets.",
            "Stopt bewust · sluit tabblad/app.",
            "Geen persoonsgegevens klassikaal · geen advies over de regeling.",
        ],
        1,
    ):
        pdf.numbered(i, t)

    # Afsluitblok volledig bij elkaar — geen weesregel op volgende pagina
    if room_left(pdf) < 42:
        pdf.add_page()
    pdf.box(
        "Afsluiting",
        [
            "Gelukt? Dan kunt u zelf een officiële overheidsroute openen, "
            "een taak vinden en herkennen waar u moet beginnen — zonder iets af te ronden. "
            "Volgende keer: berichten van de overheid vinden en lezen.",
        ],
    )

    # Hulp: geen lege tussenpagina na afsluiting
    if room_left(pdf) < 95:
        pdf.add_page()
    else:
        pdf.ln(3)
    pdf.h1("3. E3 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → deelnemer zelf → pas als laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Ik weet niet waar ik moet beginnen", "Open utrecht.nl · helper 1-op-1 · geen Google-les"),
        ("De website opent niet", "Wifi · opnieuw typen · helper 1-op-1 · groep niet stilleggen"),
        ("Mijn scherm ziet er anders uit", "Dat is normaal"),
        ("Ik zie de afgesproken taak niet", "Zoek taaknaam op de site · of Online loket · “Wat ziet u nu?”"),
        ("Ik kom op een andere pagina", "Terug naar utrecht.nl · opnieuw zoeken binnen de site"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Ik zie een zoekvak", "Mag · zoek alleen de afgesproken taaknaam · geen zoekles"),
        ("Ik zie Inloggen / DigiD", "Hier begint het persoonlijke deel · stop · niet invullen"),
        ("Er wordt om persoonlijke informatie / BSN gevraagd", "Stop · vul niets in · nooit hardop"),
        ("Er wordt om een betaling gevraagd", "Stop · niet betalen"),
        ("Moet ik nu verder?", "Nee — u heeft gevonden waar u moet zijn · hier stopt de oefening"),
        ("Ik wil dit echt aanvragen", "Niet in de les · thuis / IDO / gemeente"),
        ("Mijn eigen gemeente ziet er anders uit", "Dat is normaal · Utrecht is oefenvoorbeeld"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — afronding")
    hulp3 = [
        ("Taak bij eigen gemeente vinden", "OPTIONEEL · 1-op-1 · groep wacht niet · geen echte aanvraag"),
        ("Geen DigiD / DigiD werkt niet", "Prima zonder DigiD · problemen niet klassikaal · doorverwijzen"),
        ("Inhoudelijke vraag over de regeling", "Niet gokken · officiële organisatie / IDO / Digisterker"),
    ]
    for situatie, actie in hulp3:
        pdf.hulp_item(situatie, actie)
    pdf.muted("Geen paniektaal. Geen schaamte.")

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box("Bij de digitale overheid", [ROUTE])
    pdf.body("Begin hier (oefenvoorbeeld): utrecht.nl")
    pdf.body(
        "Dit is een oefenvoorbeeld. Uw eigen gemeente kan er anders uitzien. Dat is normaal. "
        "De manier van zoeken naar waar u moet beginnen is vergelijkbaar."
    )
    pdf.box(
        "Persoonlijk deel",
        ["Bijvoorbeeld DigiD, gegevens of een formulier. In de oefening: stoppen."],
    )
    pdf.box(
        "Privacy",
        [
            "“Mijn DigiD-gegevens en codes houd ik voor mezelf.”",
            "“Mijn persoonlijke overheidsinformatie blijft privé.”",
        ],
    )
    pdf.box(
        "Afsluiten",
        [
            "Niet ingelogd? → tabblad/app sluiten",
            "Wel ingelogd? → eerst uitloggen",
        ],
    )
    pdf.h2("Dit kan ik nu")
    for t in [
        "Officiële overheidsroute zelf openen",
        "Een taak vinden",
        "Persoonlijk deel herkennen",
        "Stoppen vóór invullen / versturen",
        "Correct afsluiten",
        "Persoonlijke informatie privé houden",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · E3 · v2.0 · utrecht.nl")

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "utrecht.nl bereikbaar · route A en B vooraf gecontroleerd",
        "Exacte labels gecontroleerd (Met DigiD · Afspraak · Online loket)",
        "Beide stoppunten gecontroleerd · geen persoonsgegevens nodig tot stoppunt",
        "Geen echte accounts · geen begeleidersaccount",
        "Helper kent routes A en B",
        "Telefoon/tablet én computer ondersteund",
        "Privacyregels bekend · doorverwijsinformatie paraat",
        "Eindmissie exact 12 minuten beschermd",
        "START HIER gelezen · hulpkaart · 8–10× deelnemerskaart",
        "Controleer kort vóór iedere les of de gemeentelijke website nog hetzelfde werkt",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
