#!/usr/bin/env python3
"""E4 Berichten van de overheid vinden en lezen — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, MUTED, NAVY  # noqa: E402

E4_VERSION = "v2.0"
E4_TITLE = "Berichten van de overheid vinden en lezen"
E4_SUB = "Zelf de Berichtenbox openen, een bericht vinden en herkennen wat erbij hoort"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E4-Berichtenbox-Overheid-v2.pdf"
ROUTE = (
    "MELDING → ZELF MIJNOVERHEID OPENEN → BERICHTENBOX → BERICHT VINDEN → "
    "LEZEN → BIJLAGE HERKENNEN → TERUG → VEILIG AFSLUITEN"
)


def room_left(pdf: ELessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E4 {E4_TITLE}  |  Pakket E  |  {E4_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf._footer_version = E4_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"E4 - {E4_TITLE}",
        "Les circa 90 minuten",
        f"{E4_SUB}. {ROUTE}. "
        "MELDING ≠ BERICHT. Neutrale SeniorEase-oefenomgeving. "
        "Geen echte login nodig. Ook geschikt voor begeleiders zonder MijnOverheid-expertise.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Volgt op E3 · sluit Pakket E af",
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
        "Inloop telt niet mee. Eindmissie altijd behouden (12 min). "
        "Telefoon/tablet of computer. Geen echte DigiD-login klassikaal. "
        "Geen phishingles. Bijlage alleen herkennen.",
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
            "Na melding zelf MijnOverheid openen · Berichtenbox · bericht vinden/lezen · "
            "bijlage herkennen · terug · afsluiten.",
            "Situatie: melding gekregen — waar leest u het echte bericht?",
            f"Route: {ROUTE}",
        ],
    )
    pdf.box(
        "Vast in deze les",
        [
            "MELDING ≠ BERICHT · Ik open MijnOverheid zelf.",
            "E2 = waar staat de Berichtenbox? · E4 = bericht vinden/lezen + bijlage herkennen",
            "SeniorEase-oefenomgeving verplicht achter login · label permanent zichtbaar",
            "A: Gemeente Oefenstad · openingstijden bibliotheek · bijlage",
            "B (eindmissie): Waterschap Oefenwater · onderhoud fietspad · bijlage",
            "Geen echte berichten/login nodig · login alleen OPTIONEEL · PRIVÉ · 1-OP-1",
            "Bijlage alleen herkennen · E4 ≠ phishingles · ≠ downloadles",
            "Privacy tonen/zeggen — niet nazeggen · persoonlijk bericht hoeft u aan niemand te laten zien",
            "Niet ingelogd → sluiten · wel → eerst uitloggen",
        ],
    )
    pdf.body(
        "Helper: “Wat ziet u nu?” · leest geen persoonlijke berichten mee. "
        "Eindmissie: exact 12 min · bericht B · zonder voordoen. "
        "Doorverwijzen: IDO / Digisterker / bibliotheek / veiligheidslessen / organisatie. "
        "Start: https://www.mijnoverheid.nl"
    )

    # Draaiboek
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, MijnOverheid openen, oefenomgeving, eindmissie.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · leest geen berichten mee · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "Melding herkennen, zelf MijnOverheid openen, via oefenomgeving bericht vinden en lezen, "
        "bijlage herkennen, terug, veilig afsluiten — zonder verplichte login."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U krijgt een e-mail of melding dat er een bericht van de overheid voor u klaarstaat. '
        'Waar leest u het echte bericht?"'
    )
    pdf.h2("Brug vanuit E3")
    pdf.body(
        "Vorige keer begon u zelf bij een officiële overheidsroute. "
        "Vandaag gebruiken we hetzelfde idee: we beginnen zelf bij MijnOverheid."
    )
    pdf.h2("Gouden kapstok")
    pdf.body(ROUTE)
    pdf.box(
        "Kern",
        [
            "MELDING ≠ BERICHT",
            "Ik open MijnOverheid zelf.",
            "Bijlage herkennen — niet downloaden.",
        ],
    )

    tijdlijn = [
        ("0–5", "Retrieval / zelf openen (E3-brug)"),
        ("5–10", "Centrale situatie"),
        ("10–18", "Melding ≠ bericht"),
        ("18–28", "Zelf MijnOverheid openen + brug oefenomgeving"),
        ("28–40", "Berichtenbox → oefenbericht A vinden"),
        ("40–52", "Bericht A openen + lezen"),
        ("52–57", "Bijlage herkennen"),
        ("57–62", "Pauze"),
        ("62–72", "Terug + veilig afsluiten"),
        ("72–78", "Open herhaling"),
        ("78–90", "Eindmissie (12 min · bericht B · zonder voordoen)"),
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
        "Bij uitloop: leesdiepte / herhaling inkorten. "
        "Niet schrappen: melding ≠ bericht · openen · bericht · bijlage · terug · eindmissie."
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
    pdf.bullet("Geen phishing- / domein- / QR-les · geen download- / bestandsbeheerles")
    pdf.bullet("Geen DigiD-aanvraag · geen gemeente-/Belastingdiensttaak · geen echte brief interpreteren")

    blok(
        "Inloop (buiten 90)",
        [
            ("Zegt", "Welkom. Vandaag: berichten van de overheid vinden en lezen. We oefenen met een SeniorEase-oefenomgeving. Persoonlijke berichten hoeft u aan niemand te laten zien."),
            ("Toont", "—"),
            ("Voordoet", "—"),
            ("Deelnemer", "Toestel aan · browser beschikbaar"),
            ("Controleert", "Telefoon/tablet of computer aanwezig"),
            ("Helper", "Wifi / volume · privacyregel kent"),
            ("Doorgaan", "Groep ongeveer klaar"),
            ("Inkorten", "—"),
        ],
    )
    blok(
        "Retrieval / zelf openen (0–5)",
        [
            ("Zegt", "“U wilt iets regelen bij de digitale overheid. Laat zien hoe u zelf bij een officiële route begint.” Brug: vandaag beginnen we zelf bij MijnOverheid."),
            ("Toont", "— (geen antwoorden)"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Toont kort zelf openen · geen taak A/B"),
            ("Controleert", "Kort · geen DigiD-theorie"),
            ("Helper", "“Wat ziet u nu?” · groep niet stilleggen"),
            ("Doorgaan", "Na korte ronde"),
            ("Inkorten", "Alleen: waar begint u zelf?"),
        ],
    )

    pdf.add_page()
    blok(
        "Centrale situatie (5–10)",
        [
            ("Zegt", "Situatie voorlezen. Kort wachten."),
            ("Toont", "Beginsituatie / neutrale melding"),
            ("Voordoet", "—"),
            ("Deelnemer", "Denkt mee"),
            ("Controleert", "Groep bij de vraag"),
            ("Helper", "—"),
            ("Doorgaan", "Na 1–2 reacties"),
            ("Inkorten", "—"),
        ],
    )
    blok(
        "Melding ≠ bericht (10–18)",
        [
            ("Zegt", "“Een e-mail of melding kan u vertellen dat er iets klaarstaat. Het echte bericht leest u in MijnOverheid. Voor deze oefening openen we MijnOverheid zelf.”"),
            ("Toont", "Melding · kaart MELDING ≠ BERICHT"),
            ("Voordoet", "—"),
            ("Deelnemer", "Herkent: melding is niet het bericht"),
            ("Controleert", "Geen phishingles · geen “links altijd onveilig”"),
            ("Helper", "Softjes"),
            ("Doorgaan", "Na korte uitleg"),
            ("Inkorten", "Alleen kernzin + handelingsregel"),
        ],
    )

    pdf.add_page()
    blok(
        "Zelf MijnOverheid + oefenomgeving (18–28)",
        [
            ("Zegt", "“We openen MijnOverheid zelf.” Typ mijnoverheid.nl. Uw scherm kan anders uitzien. Inloggen met DigiD: kijken, niet invullen. Daarna: SeniorEase-oefenomgeving — geen echte account."),
            ("Toont", "Adresbalk · start · Inloggen herkennen · brug oefenomgeving"),
            ("Voordoet", "Eén keer tot MijnOverheid open · wijst Inloggen · overgang oefenomgeving"),
            ("Deelnemer", "Opent zelf · herkent Inloggen · volgt oefenomgeving"),
            ("Controleert", "Zelf geopend · geen login verplicht · geen begeleidersaccount"),
            ("Helper", "“Wat ziet u nu?” · iPhone | Android | computer"),
            ("Doorgaan", "Meeste bij oefenomgeving-start"),
            ("Inkorten", "Minder rondes · wel zelf openen + brug"),
        ],
    )
    blok(
        "Berichtenbox → bericht A vinden (28–40)",
        [
            ("Zegt", "“Dit is de Berichtenbox-oefening. Zoek het bericht van Gemeente Oefenstad over openingstijden bibliotheek.”"),
            ("Toont", "Oefenoverzicht met meerdere fictieve berichten"),
            ("Voordoet", "Eerste keer kort tot A zichtbaar"),
            ("Deelnemer", "Vindt bericht A zelf"),
            ("Controleert", "Juiste bericht · geen echte inhoud"),
            ("Helper", "“Wat ziet u nu?” · 1-op-1"),
            ("Doorgaan", "Meeste hebben A gevonden"),
            ("Inkorten", "Minder rondes · vinden behouden"),
        ],
    )

    pdf.add_page()
    blok(
        "Bericht A openen + lezen (40–52)",
        [
            ("Zegt", "“Open het oefenbericht. Kijk: van wie? Wat is het onderwerp? Waar gaat het in grote lijnen over?” Geen toets."),
            ("Toont", "Geopend bericht A · afzender / onderwerp / datum / tekst"),
            ("Voordoet", "Eerste keer openen · wijst oriëntatiepunten"),
            ("Deelnemer", "Opent · herkent hoofdinformatie"),
            ("Controleert", "Eenvoudig antwoord mogelijk · demobericht is oefenmateriaal"),
            ("Helper", "Softjes · “Wat ziet u nu?”"),
            ("Doorgaan", "Meeste kunnen zeggen waar het over gaat"),
            ("Inkorten", "Alleen afzender + onderwerp + waarover"),
        ],
    )
    blok(
        "Bijlage herkennen (52–57)",
        [
            ("Zegt", "“Bij een bericht kan een bijlage horen. Ziet u hier een bijlage? We herkennen hem — we downloaden niets.”"),
            ("Toont", "Bijlage bij A (Openingstijden-bibliotheek.pdf)"),
            ("Voordoet", "Wijst bijlage · stopt vóór download"),
            ("Deelnemer", "Herkent dat er een bijlage bij hoort"),
            ("Controleert", "Geen downloadles · geen print · geen bestandsbeheer"),
            ("Helper", "Grijpt in vóór downloaden"),
            ("Doorgaan", "Meeste herkennen bijlage"),
            ("Inkorten", "Alleen: hier hoort een bijlage bij"),
        ],
    )
    pdf.h2("Pauze (57–62)")
    pdf.body("Korte pauze. Daarna terug + afsluiten.")

    pdf.add_page()
    blok(
        "Terug + veilig afsluiten (62–72)",
        [
            ("Zegt", "“Ga terug naar de Berichtenbox. Daarna sluiten we veilig af.” Niet ingelogd: tabblad/app sluiten. Wel ingelogd: eerst uitloggen."),
            ("Toont", "Terug in oefenomgeving · afsluitkaart"),
            ("Voordoet", "Eerste keer kort terug · daarna deelnemer"),
            ("Deelnemer", "Gaat terug · sluit af (standaard: sluiten)"),
            ("Controleert", "Geen “uitloggen” vragen aan niet-ingelogden"),
            ("Helper", "“Wat ziet u nu?” · “Hoe sluit u af?”"),
            ("Doorgaan", "Meeste kunnen terug + sluiten"),
            ("Inkorten", "Eén ronde terug + afsluiten"),
        ],
    )
    blok(
        "Open herhaling (72–78)",
        [
            (
                "Zegt",
                "“U krijgt een melding dat er een bericht voor u klaarstaat. "
                "Laat zien waar u zelf begint en hoe u het bericht vindt.” Geen stappenlijst.",
            ),
            ("Toont", "Open herhaal-opdracht (geen antwoordpad)"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Bedenkt zelf de route"),
            ("Controleert", "Observeert · geen voordoen"),
            ("Helper", "“Wat ziet u nu?” · optioneel privé parallel"),
            ("Doorgaan", "Op tijd voor 12 min eindmissie"),
            ("Inkorten", "Korte open ronde behouden"),
        ],
    )

    pdf.add_page()
    pdf.h2("Eindmissie (78–90) — exact 12 minuten · zonder voordoen")
    pdf.body(
        "Andere melding · ander bericht (B: Waterschap Oefenwater · onderhoud fietspad). "
        "Geen antwoordstappen op deelnemersbeamer."
    )
    pdf.box(
        "Opdracht (richting)",
        [
            "U krijgt een melding dat er een nieuw bericht voor u klaarstaat.",
            "Laat zien hoe u zelf het bericht vindt.",
            "Bekijk waar het over gaat.",
            "Kijk of er een bijlage bij hoort.",
            "Ga daarna veilig terug en sluit af.",
        ],
    )
    pdf.box(
        "Observatie (niet op beamer)",
        [
            "1. Niet afhankelijk van meldinglink",
            "2. MijnOverheid zelf openen",
            "3. Berichtenbox (oefenomgeving)",
            "4. Nieuw bericht B vinden",
            "5. Openen",
            "6. Afzender / onderwerp / hoofdboodschap",
            "7. Bijlage herkennen",
            "8. Terug",
            "9. Correct afsluiten (sluiten tenzij echt ingelogd)",
            "10. Geen persoonlijke gegevens",
        ],
    )
    pdf.body(
        "Afsluitzin: Gelukt? Dan weet u waar u een overheidsbericht zelf kunt vinden — "
        "en u hoeft uw persoonlijke berichten aan niemand te laten zien."
    )

    # Hulp
    pdf.add_page()
    pdf.h1("3. Hulp bij vastlopen")
    pdf.muted('Start altijd: "Wat ziet u nu?" · Helper leest geen persoonlijke berichten mee.')
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → deelnemer zelf → pas als laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Ik heb een melding — wat nu?", "Open zelf MijnOverheid · zoek daar het bericht"),
        ("Moet ik op de link klikken?", "Voor deze oefening: nee · open MijnOverheid zelf"),
        ("Waar vind ik MijnOverheid?", "Typ mijnoverheid.nl · helper 1-op-1"),
        ("MijnOverheid opent niet", "Wifi · opnieuw typen · helper 1-op-1"),
        ("Ik zie Inloggen met DigiD", "Kijken · niet invullen in de groepsroute"),
        ("Ik heb geen DigiD", "Prima · les lukt via oefenomgeving"),
        ("Mijn DigiD werkt niet", "Niet klassikaal · doorverwijzen"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Waar staat de Berichtenbox?", "SeniorEase-oefenomgeving · helper wijst aan"),
        ("Ik zie het oefenbericht niet", "Helper 1-op-1 · daarna kort aanwijzen"),
        ("Hoe open ik een bericht?", "Tik/klik op het afgesproken oefenbericht"),
        ("Van wie / waarover?", "Afzender · onderwerp · korte tekst"),
        ("Ik zie een bijlage", "Herkennen · niet downloaden in de les"),
        ("Moet ik downloaden?", "Nee · alleen herkennen"),
        ("Hoe ga ik terug?", "Terug in de oefenomgeving"),
        ("Moet ik uitloggen?", "Alleen als u echt bent ingelogd · anders sluiten"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — afronding")
    hulp3 = [
        ("Echt persoonlijk bericht", "Niet tonen · helper leest niet mee"),
        ("Mag helper mijn bericht lezen?", "Nee · alleen bediening/route"),
        ("Ik wil mijn echte bericht", "OPTIONEEL · PRIVÉ · 1-OP-1 · groep wacht niet"),
        ("Ik begrijp mijn echte brief niet", "Niet gokken · IDO / Digisterker / bibliotheek"),
        ("Ik denk dat de melding nep is", "Open MijnOverheid zelf · meer → veiligheidslessen"),
        ("Mijn scherm ziet er anders uit", "Dat is normaal"),
    ]
    for situatie, actie in hulp3:
        pdf.hulp_item(situatie, actie)
    pdf.muted("Geen paniektaal. Geen schaamte.")

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Neem mee naar huis. Eén praktische route.")
    pdf.box(
        "Route",
        [
            "MELDING → ZELF MIJNOVERHEID OPENEN → BERICHTENBOX → BERICHT VINDEN",
            "→ LEZEN → BIJLAGE HERKENNEN → TERUG → VEILIG AFSLUITEN",
        ],
    )
    pdf.box(
        "Kernregel",
        [
            "MELDING ≠ BERICHT",
            "Ik open MijnOverheid zelf.",
        ],
    )
    pdf.box(
        "Privacy",
        [
            "Mijn DigiD-gegevens en codes houd ik voor mezelf.",
            "Mijn persoonlijke overheidsinformatie blijft privé.",
            "Een persoonlijk bericht hoeft u in de les aan niemand te laten zien.",
        ],
    )
    pdf.box(
        "Afsluiten",
        [
            "Niet ingelogd? → tabblad/app sluiten",
            "Wel ingelogd? → eerst uitloggen",
        ],
    )
    pdf.box(
        "Dit kan ik nu",
        [
            "MijnOverheid zelf openen",
            "Berichtenbox vinden",
            "Bericht vinden / openen",
            "Hoofdinformatie herkennen",
            "Bijlage herkennen",
            "Teruggaan",
            "Veilig afsluiten",
            "Persoonlijke informatie privé houden",
        ],
    )
    pdf.body("Start: mijnoverheid.nl · Uw scherm kan er iets anders uitzien. Dat is normaal.")

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    checks = [
        "Actuele openbare MijnOverheid-start gecontroleerd (mijnoverheid.nl)",
        "Inloggen met DigiD-label gecontroleerd",
        "Geen echte accounts nodig voor groepsles",
        "SeniorEase-oefenomgeving / demolaag beschikbaar",
        "Demoberichten zonder echte persoonsgegevens",
        "Oefenbericht A beschikbaar (Gemeente Oefenstad)",
        "Eindmissiebericht B beschikbaar (Waterschap Oefenwater)",
        "A en B duidelijk verschillend",
        "Oefenbijlagen neutraal (alleen herkennen)",
        "Geen echte persoonlijke berichten projecteren",
        "Helper kent privacyregel",
        "Telefoon/tablet én computer ondersteund",
        "Eindmissie exact 12 minuten beschermd",
        "Deelnemerskaarten aanwezig",
        "START HIER gelezen · hulpkaart · beamer-PDF gereed",
        "Doorverwijsinformatie paraat",
    ]
    for c in checks:
        pdf.bullet(c)

    pdf.add_page()
    pdf.h1("6. Beamer")
    pdf.body(
        "De beamer-PDF wordt apart geleverd: SeniorEase-E4-Beamer-v2.pdf. "
        "Deelnemersgericht · rustig · één handeling per dia. "
        "Geen methodenamen ZIEN/NADOEN/BEGRIJPEN/ZELF DOEN op deelnemersbeamer. "
        "Open herhaling en eindmissie zonder antwoordroute. "
        "Bericht B wordt niet vooraf verklapt."
    )
    pdf.box(
        "Oefenberichten (begeleidersinfo)",
        [
            "A — Gemeente Oefenstad · Informatie: openingstijden bibliotheek · 3 sep 2026 · bijlage Openingstijden-bibliotheek.pdf",
            "B — Waterschap Oefenwater · Informatie: onderhoud fietspad · 8 sep 2026 · bijlage Informatie-onderhoud-fietspad.pdf",
        ],
    )

    pdf.output(str(OUT))
    print(f"Print geschreven: {OUT} ({pdf.page_no()} pagina's)")
    return OUT


if __name__ == "__main__":
    build()
