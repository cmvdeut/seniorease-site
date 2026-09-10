#!/usr/bin/env python3
"""E2 MijnOverheid gebruiken — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, MUTED, NAVY  # noqa: E402

E2_VERSION = "v2.0"
E2_TITLE = "MijnOverheid gebruiken"
E2_SUB = "Zelf MijnOverheid openen en de Berichtenbox vinden"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E2-MijnOverheid-v2.pdf"


def room_left(pdf: ELessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: ELessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E2 {E2_TITLE}  |  Pakket E  |  {E2_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf._footer_version = E2_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"E2 - {E2_TITLE}",
        "Les circa 90 minuten",
        f"{E2_SUB}. "
        "ZELF OPENEN → INLOGGEN HERKENNEN → BERICHTENBOX VINDEN → TERUG → AFSLUITEN. "
        "Geen verplichte login. Neutrale SeniorEase-demolaag. "
        "Ook geschikt voor begeleiders zonder MijnOverheid-expertise.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Volgt op E1 DigiD",
            "Site: mijnoverheid.nl",
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
        "Telefoon/tablet of computer. iPhone en Android gelijkwaardig. "
        "Geen echte DigiD-login klassikaal. Geen bericht openen (E4).",
    )

    # START HIER
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted(
        "Lees dit blad eerst. Voorbereiding circa 10–15 minuten. "
        "De begeleider hoeft geen MijnOverheid-expert te zijn."
    )
    pdf.box(
        "Doel",
        [
            "Deelnemer weet wat MijnOverheid is, opent MijnOverheid zelf, "
            "herkent Inloggen, vindt de Berichtenbox via demolaag, oefent terug, sluit af.",
            "Situatie: bericht klaar in MijnOverheid — waar vind ik het / de Berichtenbox?",
            "Route: ZELF OPENEN → INLOGGEN HERKENNEN → BERICHTENBOX VINDEN → TERUG → AFSLUITEN",
        ],
    )
    pdf.box(
        "Vast in deze les",
        [
            "DigiD ≠ MijnOverheid · Berichtenbox = onderdeel van MijnOverheid",
            "Geen verplichte login · les lukt zonder DigiD · demolaag verplicht",
            "Nooit: begeleidersaccount · klassikale echte login · persoonlijke berichten tonen",
            "E2 ≠ E4: geen bericht openen · geen inhoud lezen · geen bijlage",
            "Privacy tonen/zeggen — niet nazeggen",
            "Niet ingelogd → sluiten · wel ingelogd → eerst uitloggen",
            "Twee niveaus: iedereen (demolaag) · optioneel privé 1-op-1 · groep wacht nooit",
        ],
    )
    pdf.body(
        "Helper: “Wat ziet u nu?” · vragen → uitleggen → aanwijzen → deelnemer zelf → "
        "pas laatste kort overnemen. Eindmissie: exact 12 min · zonder voordoen · zonder login. "
        "DigiD werkt niet / echt bericht / herstel → IDO / Digisterker / bibliotheek / organisatie."
    )

    # Draaiboek
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, MijnOverheid openen, demolaag-route, eindmissie.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "MijnOverheid openen, Inloggen/DigiD herkennen, Berichtenbox via demolaag vinden, "
        "terug oefenen, correct afsluiten — zonder verplichte login."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U hoort dat er een bericht van de overheid voor u klaarstaat in MijnOverheid. '
        'Waar vindt u MijnOverheid — en waar staat de Berichtenbox?"'
    )
    pdf.h2("Brug vanuit E1")
    pdf.body(
        "Vorige keer leerde u waar u bij DigiD begint. "
        "Vandaag gebruiken we die herkenning om MijnOverheid te leren kennen."
    )
    pdf.h2("Gouden kapstok")
    pdf.body("ZELF OPENEN → INLOGGEN HERKENNEN → BERICHTENBOX VINDEN → TERUG → AFSLUITEN")
    pdf.box(
        "DigiD ≠ MijnOverheid",
        [
            "DigiD = waarmee u zich digitaal kunt identificeren / inloggen",
            "MijnOverheid = persoonlijke digitale omgeving voor zaken met de overheid",
            "Berichtenbox = onderdeel van MijnOverheid",
        ],
    )

    tijdlijn = [
        ("0–5", "Retrieval E1 (kort · zelf doen)"),
        ("5–10", "Centrale situatie + brug"),
        ("10–20", "DigiD versus MijnOverheid"),
        ("20–35", "MijnOverheid zelf openen"),
        ("35–45", "Inloggen / DigiD herkennen"),
        ("45–55", "Demolaag: overzicht + Berichtenbox"),
        ("55–60", "Pauze"),
        ("60–70", "Berichtenbox + terug oefenen"),
        ("70–78", "Open herhaling · optioneel privé parallel"),
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
    pdf.bullet(
        "Bij uitloop: optionele login / herhaling inkorten. "
        "Niet schrappen: MijnOverheid openen + Inloggen + demolaag + eindmissie."
    )

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    pdf.add_page()
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen verplichte login · geen begeleidersaccount · geen persoonlijke berichten klassikaal")
    pdf.bullet("Geen bericht lezen / bijlage (E4) · geen DigiD-aanvraag · geen phishing-/browserles")

    blok(
        "Inloop (buiten 90)",
        [
            ("Zegt", "Welkom. Vandaag: MijnOverheid en de Berichtenbox. U hoeft niet in te loggen. Persoonlijke informatie blijft privé."),
            ("Toont", "—"),
            ("Voordoet", "—"),
            ("Deelnemer", "Toestel aan · browser beschikbaar"),
            ("Controleert", "Telefoon/tablet of computer aanwezig"),
            ("Helper", "Wifi / volume"),
            ("Doorgaan", "Groep ongeveer klaar"),
            ("Inkorten", "—"),
        ],
    )
    blok(
        "Retrieval E1 (0–5)",
        [
            ("Zegt", "“Even zelf: open digid.nl, vind Inloggen, sluit weer. Zoals vorige keer.”"),
            ("Toont", "— (geen antwoorden)"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Browser → digid.nl → Inloggen herkennen → sluiten"),
            ("Controleert", "Kort · geen login"),
            ("Helper", "“Wat ziet u nu?” · groep niet stilleggen"),
            ("Doorgaan", "Na korte ronde"),
            ("Inkorten", "Alleen digid.nl openen + sluiten"),
        ],
    )

    pdf.add_page()
    blok(
        "Centrale situatie + brug (5–10)",
        [
            ("Zegt", "Situatie voorlezen. Kort wachten. Brugzin E1 → E2."),
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
        "DigiD versus MijnOverheid (10–20)",
        [
            ("Zegt", "Vaste zinnen DigiD ≠ MijnOverheid. Berichtenbox = onderdeel van MijnOverheid."),
            ("Toont", "Vergelijkingskaart"),
            ("Voordoet", "—"),
            ("Deelnemer", "Luistert / knikt mee"),
            ("Controleert", "Geen toets"),
            ("Helper", "Softjes"),
            ("Doorgaan", "Na korte uitleg"),
            ("Inkorten", "Alleen DigiD ≠ MijnOverheid"),
        ],
    )

    pdf.add_page()
    blok(
        "MijnOverheid zelf openen (20–35)",
        [
            ("Zegt", "“We openen MijnOverheid zelf.” Typ mijnoverheid.nl in de adresbalk. Uw scherm kan anders uitzien."),
            ("Toont", "Waar typt u (telefoon of computer)"),
            ("Voordoet", "Eén keer tot MijnOverheid open is"),
            ("Deelnemer", "Opent MijnOverheid zelf"),
            ("Controleert", "Zelf geopend · geen login verplicht"),
            ("Helper", "“Wat ziet u nu?” · iPhone | Android | computer"),
            ("Doorgaan", "Meeste hebben MijnOverheid open"),
            ("Inkorten", "Minder rondes · wel zelf openen"),
        ],
    )
    blok(
        "Inloggen / DigiD herkennen (35–45)",
        [
            ("Zegt", "“MijnOverheid gebruikt DigiD voor persoonlijke toegang. Zoek Inloggen met DigiD. We kijken alleen. We vullen niets in.”"),
            ("Toont", "Inloggen met DigiD · KIJKEN / HERKENNEN"),
            ("Voordoet", "Wijst Inloggen · stopt vóór persoonsgegevens"),
            ("Deelnemer", "Herkent Inloggen / DigiD · vult niets in"),
            ("Controleert", "Geen wachtwoord/code · geen hardop · geen begeleiderslogin"),
            ("Helper", "Grijpt in vóór invullen · optioneel privé apart"),
            ("Doorgaan", "Meeste herkennen Inloggen"),
            ("Inkorten", "Minder rondes"),
        ],
    )
    pdf.body("Optioneel privé: OPTIONEEL · PRIVÉ · 1-OP-1 MET HELPER — groep wacht niet.")

    pdf.add_page()
    blok(
        "Demolaag: overzicht + Berichtenbox (45–55)",
        [
            ("Zegt", "“We kijken naar een SeniorEase-oefenbeeld — geen echte account. Zo ziet MijnOverheid er ongeveer uit. Hier is de Berichtenbox.”"),
            ("Toont", "Neutraal MijnOverheid-overzicht · Berichtenbox-locatie"),
            ("Voordoet", "Wijst Berichtenbox aan op demobeeld"),
            ("Deelnemer", "Wijst / benoemt Berichtenbox op demobeeld"),
            ("Controleert", "Begrijpt: demobeeld · geen echte inhoud · geen login nodig"),
            ("Helper", "Softjes · “Wat ziet u nu?”"),
            ("Doorgaan", "Meeste herkennen Berichtenbox op demolaag"),
            ("Inkorten", "Locatie alleen · minder overzicht-detail"),
        ],
    )
    pdf.h2("Pauze (55–60)")
    pdf.body("Korte pauze. Daarna Berichtenbox-overzicht + terug oefenen.")

    blok(
        "Berichtenbox + terug (60–70)",
        [
            ("Zegt", "“Zo kan een overzicht eruitzien — fictief.” Daarna: “Waar gaat u nu terug?” Geen bericht openen (E4)."),
            ("Toont", "Demolaag-route: overzicht → Berichtenbox → overzicht → terug → overzicht"),
            ("Voordoet", "Eerste keer kort de demokaarten · daarna deelnemer zelf"),
            ("Deelnemer", "Oefent demolaag-route · kiest zelf waar terug"),
            ("Controleert", "Deelnemer oefent terug (niet alleen kijken) · geen E4"),
            ("Helper", "1-op-1 · “Wat ziet u nu?” · “Waar gaat u terug?”"),
            ("Doorgaan", "Meeste kunnen zelf terug"),
            ("Inkorten", "Minder rondes · terug oefenen behouden"),
        ],
    )

    pdf.add_page()
    blok(
        "Open herhaling · optioneel privé (70–78)",
        [
            (
                "Zegt",
                "“Probeer het nog een keer. U wilt weten waar berichten van de overheid voor u kunnen staan. "
                "Laat zien hoe u zelf begint. Gebruik het oefenbeeld waar dat nodig is.” Geen stappenlijst.",
            ),
            ("Toont", "Open herhaal-opdracht (geen antwoordpad)"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Bedenkt zelf: beginnen · Inloggen · Berichtenbox · terug · afsluiten"),
            ("Controleert", "Observeert · geen voordoen · geen inhoud delen"),
            ("Helper", "Privépad 1-op-1 · “Wat ziet u nu?”"),
            ("Doorgaan", "Op tijd voor 12 min eindmissie"),
            ("Inkorten", "Privépad schrappen · korte open herhaling behouden"),
        ],
    )

    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted("Deelnemersbeamer: alleen open opdracht. Geen antwoorden · geen checklist.")
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U wilt kijken waar berichten van de overheid voor u kunnen staan.",
            "Wat doet u nu?",
            "Laat zien waar u zelf begint en waar u de Berichtenbox kunt vinden.",
            "U hoeft niet in te loggen.",
        ],
    )
    pdf.add_page()
    pdf.h2("Observatiechecklist begeleider (niet op beamer)")
    for i, t in enumerate(
        [
            "Opent zelf MijnOverheid.",
            "Vindt / herkent Inloggen (of DigiD als toegang).",
            "Vult geen wachtwoord/code in · noemt niets hardop.",
            "Gebruikt demolaag om Berichtenbox te vinden/herkennen.",
            "Oefent zelf terug op demolaag tot weer bij MijnOverheid-overzicht.",
            "Sluit tabblad/app af (of eerst uitloggen indien optioneel echt ingelogd).",
            "Geen persoonlijke berichten klassikaal · geen berichtinhoud / bijlage (E4).",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u wat MijnOverheid is, opent u MijnOverheid zelf, '
        "en weet u waar de Berichtenbox te vinden is — ook zonder in te loggen. "
        'Volgende keer: iets regelen bij de digitale overheid."'
    )

    # Hulp
    pdf.add_page()
    pdf.h1("3. E2 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → deelnemer zelf → pas als laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Ik weet niet hoe ik MijnOverheid open", "Typ mijnoverheid.nl zelf · helper 1-op-1 · geen Google-les"),
        ("MijnOverheid opent niet", "Wifi · opnieuw typen · helper 1-op-1 · groep niet stilleggen"),
        ("Ik zie Inloggen niet", "Zoek “Inloggen met DigiD” · scherm kan anders zijn · helper wijst aan"),
        ("Mijn scherm ziet er anders uit", "Dat is normaal"),
        ("Ik heb geen DigiD", "Prima · les lukt via demolaag · geen aanvraag"),
        ("Ik wil niet inloggen", "Prima · niet verplicht"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Ik weet mijn DigiD-wachtwoord niet", "Niet klassikaal · niet hardop · helper apart of later IDO"),
        ("Er wordt om een code gevraagd", "Stop · vul niets in · groepsroute gaat niet zo ver"),
        ("Ik zie de Berichtenbox niet", "Gebruik het SeniorEase-oefenbeeld · “Wat ziet u nu?”"),
        ("Ik ben niet ingelogd — hoe oefenen?", "Via de demolaag · dat is genoeg voor deze les"),
        ("Mijn persoonlijke MijnOverheid ziet er anders uit", "Dat kan · demolaag = groepsroute · echt alleen privé"),
        ("Hoe ga ik terug?", "Demolaag: kies zelf waar terug · “Waar gaat u terug?” · niet alleen pijl aanwijzen"),
        ("Hoe sluit ik af?", "Niet ingelogd: tabblad/app sluiten"),
        ("Moet ik uitloggen?", "Alleen als u echt bent ingelogd · anders sluiten"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — afronding")
    hulp3 = [
        ("Mijn DigiD werkt niet", "Niet klassikaal · doorverwijzen naar passende ondersteuning"),
        ("Vraag over echt overheidsbericht", "Niet klassikaal · E4 / individueel / IDO — geen inhoud projecteren"),
    ]
    for situatie, actie in hulp3:
        pdf.hulp_item(situatie, actie)
    pdf.muted("Echte persoonlijke inhoud nooit klassikaal. Geen paniektaal. Geen schaamte.")

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "Bij MijnOverheid",
        [
            "ZELF OPENEN → INLOGGEN HERKENNEN → BERICHTENBOX VINDEN → TERUG → VEILIG AFSLUITEN",
        ],
    )
    pdf.body("MijnOverheid: persoonlijke digitale omgeving voor zaken met de overheid.")
    pdf.body("DigiD: uw manier om u digitaal te identificeren / in te loggen.")
    pdf.body("Berichtenbox: onderdeel van MijnOverheid waar digitale berichten kunnen staan.")
    pdf.body("Begin hier: mijnoverheid.nl (zelf typen in de adresbalk)")
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
        "MijnOverheid zelf openen",
        "Inloggen / DigiD herkennen",
        "Berichtenbox vinden (met oefenbeeld of zelf)",
        "Teruggaan",
        "Correct afsluiten",
        "Persoonlijke informatie privé houden",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · E2 · v2.0 · mijnoverheid.nl")

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "mijnoverheid.nl vooraf bereikbaar · interface gecontroleerd",
        "Neutrale demolaag beschikbaar (geen echte accounts/gegevens)",
        "Geen begeleidersaccount · geen klassikale echte login",
        "Telefoon/tablet én computer ondersteund",
        "Helper kent privacyregels · leest geen berichten · vraagt geen code",
        "DigiD ≠ MijnOverheid zichtbaar",
        "Afsluitregel bekend (sluiten vs uitloggen)",
        "E2 ≠ E4 (geen bericht lezen / bijlage)",
        "Eindmissie exact 12 minuten beschermd",
        "Doorverwijsinformatie paraat (IDO / Digisterker / bibliotheek)",
        "START HIER gelezen · hulpkaart bij de hand · 8–10× deelnemerskaart",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
