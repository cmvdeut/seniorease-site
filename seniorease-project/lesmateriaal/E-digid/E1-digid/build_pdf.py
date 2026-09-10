#!/usr/bin/env python3
"""E1 DigiD begrijpen en openen — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import ELessonPDF, MUTED, NAVY  # noqa: E402

E1_VERSION = "v2.0"
E1_TITLE = "DigiD begrijpen en openen"
E1_SUB = "Zelf digid.nl openen en Inloggen herkennen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-E1-DigiD-v2.pdf"


def room_left(pdf: ELessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: ELessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = ELessonPDF(
        f"SeniorEase  |  E1 {E1_TITLE}  |  Pakket E  |  {E1_VERSION}",
        package_label="Pakket E - DigiD & digitale overheid",
    )
    pdf._footer_version = E1_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"E1 - {E1_TITLE}",
        "Les circa 90 minuten",
        f"{E1_SUB}. "
        "ZELF OPENEN → INLOGGEN HERKENNEN → DIGID HERKENNEN → VEILIG AFSLUITEN. "
        "Geen verplichte login. Ook geschikt voor begeleiders zonder DigiD-expertise.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Opent Pakket E",
            "Site: digid.nl",
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
        "Telefoon/tablet of computer. iPhone en Android gelijkwaardig. Geen echte DigiD-login klassikaal.",
    )

    # START HIER — max één A4
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst. Voorbereiding circa 10–15 minuten. U hoeft geen DigiD-expert te zijn.")
    pdf.box(
        "Doel",
        [
            "Deelnemer weet wat DigiD is, opent digid.nl zelf, herkent Inloggen — "
            "en weet dat echte login privé is.",
            "Situatie: “Inloggen met DigiD — waar begin ik?”",
            "Route: ZELF OPENEN → INLOGGEN HERKENNEN → DIGID HERKENNEN → VEILIG AFSLUITEN",
        ],
    )
    pdf.box(
        "Vast in deze les",
        [
            "Geen verplichte DigiD-login · geen verplichte DigiD-app",
            "Wachtwoord/code privé · helper vraagt nooit om een code",
            "Geen eigen DigiD-account van begeleider klassikaal",
            "Privacyzin: tonen + één keer zeggen — niet nazeggen",
            "Niet ingelogd → sluiten · wel ingelogd → eerst uitloggen",
        ],
    )
    pdf.body(
        "Helper: “Wat ziet u nu?” · optioneel privé-login 1-op-1 · groep gaat door bij vastlopen. "
        "Eindmissie: 12 min · zonder voordoen · lukt zonder DigiD en zonder app. "
        "Aanvraag/herstel/DigiD werkt niet → IDO / Digisterker / bibliotheek / organisatie."
    )

    # Draaiboek
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, digid.nl, Inloggen herkennen.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "DigiD begrijpen, digid.nl zelf openen, Inloggen herkennen, veilig afsluiten — "
        "zonder verplichte login."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U wilt online iets regelen bij de overheid. Er staat: Inloggen met DigiD. '
        'Wat is DigiD — en hoe weet u waar u moet beginnen?"'
    )
    pdf.h2("Gouden kapstok")
    pdf.body("ZELF OPENEN → INLOGGEN HERKENNEN → DIGID HERKENNEN → VEILIG AFSLUITEN")
    pdf.box(
        "DigiD — korte uitleg",
        [
            "Persoonlijke digitale inlogmethode.",
            "Voor de overheid — en andere organisaties die DigiD gebruiken.",
            "Niet hetzelfde als MijnOverheid (E2).",
        ],
    )

    tijdlijn = [
        ("0–5", "Brug + centrale situatie"),
        ("5–20", "DigiD kort begrijpen (geen 15 min theorie)"),
        ("20–40", "digid.nl zelf openen"),
        ("40–55", "Inloggen herkennen (stop vóór persoonsgegevens)"),
        ("55–60", "Pauze"),
        ("60–72", "DigiD herkennen + hoofdroute herhalen"),
        ("72–78", "Afsluiten + privacy"),
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
    pdf.bullet("Bij uitloop: app-herkenning inkorten. Niet schrappen: digid.nl + Inloggen + eindmissie.")

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    pdf.add_page()
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen DigiD-aanvraag · geen verplichte login · geen codes hardop")
    pdf.bullet("Geen eigen DigiD-account klassikaal · geen MijnOverheid · geen phishing-/browserles")

    blok(
        "Inloop (buiten 90)",
        [
            ("Zegt", "Welkom. DigiD begrijpen en digid.nl zelf openen. U hoeft niet in te loggen. Codes zeggen we niet hardop."),
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
        "Brug + situatie (0–5)",
        [
            ("Zegt", "Situatie voorlezen. Kort wachten. Brug: vandaag DigiD — wat het is, waar u begint, niet verplicht inloggen."),
            ("Toont", "Beginsituatie"),
            ("Voordoet", "—"),
            ("Deelnemer", "Denkt mee"),
            ("Controleert", "Groep bij de vraag"),
            ("Helper", "—"),
            ("Doorgaan", "Na 1–2 reacties"),
            ("Inkorten", "—"),
        ],
    )

    pdf.add_page()
    blok(
        "DigiD kort begrijpen (5–20)",
        [
            ("Zegt", "DigiD = persoonlijke digitale inlogmethode. Overheid én andere organisaties. Niet MijnOverheid (E2)."),
            ("Toont", "Definitiekaart"),
            ("Voordoet", "—"),
            ("Deelnemer", "Luistert / knikt mee"),
            ("Controleert", "Geen toets"),
            ("Helper", "Softjes"),
            ("Doorgaan", "Na korte uitleg"),
            ("Inkorten", "Alleen de vaste zinnen"),
        ],
    )
    blok(
        "digid.nl zelf openen (20–40)",
        [
            ("Zegt", "“We openen DigiD zelf. Typ digid.nl in de adresbalk.” Uw scherm kan anders uitzien."),
            ("Toont", "Waar typt u (telefoon of computer)"),
            ("Voordoet", "Eén keer tot digid.nl open is"),
            ("Deelnemer", "Opent digid.nl zelf"),
            ("Controleert", "Zelf getypt · site open · geen login"),
            ("Helper", "“Wat ziet u nu?” · iPhone | Android | computer"),
            ("Doorgaan", "Meeste hebben digid.nl open"),
            ("Inkorten", "Minder rondes · wel zelf openen"),
        ],
    )

    pdf.add_page()
    blok(
        "Inloggen herkennen (40–55)",
        [
            ("Zegt", "Zoek Inloggen of Mijn DigiD. We kijken alleen. We vullen niets in."),
            ("Toont", "Inloggen · DigiD-inlogomgeving · KIJKEN / HERKENNEN"),
            ("Voordoet", "Wijst Inloggen · tot herkenning · stopt"),
            ("Deelnemer", "Vindt Inloggen · herkent omgeving · vult niets in"),
            ("Controleert", "Geen wachtwoord/code · geen hardop"),
            ("Helper", "Grijpt in vóór invullen · optioneel privé apart"),
            ("Doorgaan", "Meeste herkennen Inloggen"),
            ("Inkorten", "Minder rondes"),
        ],
    )
    pdf.body("Optioneel privé: OPTIONEEL · PRIVÉ · 1-OP-1 — groep wacht niet.")

    pdf.h2("Pauze (55–60)")
    pdf.body("Korte pauze. Daarna DigiD herkennen + hoofdroute herhalen.")

    blok(
        "DigiD herkennen + hoofdroute herhalen (60–72)",
        [
            (
                "Zegt",
                "App kort herkennen indien aanwezig · niet openen/activeren. Zonder app: prima. "
                "Computer: geen app. Daarna iedereen: digid.nl → Inloggen → DigiD-omgeving → sluiten.",
            ),
            ("Toont", "DigiD-app-icoon (kort) · herhaal-opdracht"),
            ("Voordoet", "Alleen kort bij app · herhaling niet voordoen"),
            ("Deelnemer", "App herkennen indien aanwezig · daarna zelfstandig herhalen"),
            ("Controleert", "Geen installatie · herhaling gelukt · niets ingevuld"),
            ("Helper", "1-op-1"),
            ("Doorgaan", "Meeste hebben herhaald"),
            ("Inkorten", "App-deel weglaten · herhaling behouden"),
        ],
    )

    pdf.add_page()
    blok(
        "Afsluiten + privacy (72–78)",
        [
            (
                "Zegt",
                "Niet ingelogd → sluiten. Wel → eerst uitloggen. "
                "Toont privacyzin · zegt hem één keer. Geen nazeggen.",
            ),
            ("Toont", "Afsluitregel + privacyzin"),
            ("Voordoet", "Zin één keer · toont sluiten"),
            ("Deelnemer", "Niet nazeggen · sluit tabblad/app · vult niets in"),
            ("Controleert", "Geen “uitloggen” aan niet-ingelogden"),
            ("Helper", "Wie optioneel was ingelogd: uitloggen"),
            ("Doorgaan", "Meeste hebben gesloten"),
            ("Inkorten", "Alleen tonen + één keer zeggen"),
        ],
    )

    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted("Deelnemersbeamer: alleen open opdracht. Geen antwoorden · geen checklist.")
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U wilt iets regelen bij de overheid en ziet DigiD.",
            "Wat doet u nu?",
            "Laat zien hoe u zelf begint bij DigiD — tot Inloggen herkennen — en hoe u veilig afsluit.",
            "U hoeft niet in te loggen.",
        ],
    )
    pdf.body("Observatiechecklist begeleider (niet op beamer):")
    for i, t in enumerate(
        [
            "Browser zelfstandig openen.",
            "digid.nl zelf openen.",
            "Inloggen vinden.",
            "DigiD-/inlogomgeving herkennen.",
            "App indien aanwezig herkennen OF zonder app doorgaan (computer: geen app).",
            "Niets persoonlijks invullen/noemen.",
            "Correct sluiten (of eerst uitloggen indien optioneel echt ingelogd).",
        ],
        1,
    ):
        pdf.numbered(i, t)

    new_page_if_needed(pdf, 70)
    blok(
        "Eindmissie — rollen",
        [
            ("Zegt", "Dit doet u zelf. Geen antwoorden van tevoren."),
            ("Toont", "Open opdracht"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Zelfstandig"),
            ("Controleert", "Checklist"),
            ("Helper", "Alleen “Wat ziet u nu?”"),
            ("Doorgaan", "Afsluiting"),
            ("Inkorten", "Nooit schrappen"),
        ],
    )
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u wat DigiD is, opent u digid.nl zelf, '
        'herkent u Inloggen — en weet u dat echte login privé is. Volgende keer: MijnOverheid."'
    )

    # Hulp
    pdf.add_page()
    pdf.h1("3. E1 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → deelnemer zelf → pas als laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Welke browser heb ik?", "Open de browser die u al gebruikt · geen browserles"),
        ("digid.nl opent niet", "Wifi · typ opnieuw digid.nl · helper 1-op-1 · groep niet stilleggen"),
        ("Ik zie Inloggen niet", "Kijk ook bij Mijn DigiD · scherm kan anders zijn · helper wijst aan"),
        ("Mijn scherm ziet er anders uit", "Dat is normaal"),
        ("Ik heb geen DigiD", "Prima · les lukt zonder DigiD · geen aanvraag in de les"),
        ("Ik heb geen DigiD-app", "Prima · app is niet verplicht · digid.nl is genoeg"),
        ("Ik weet mijn wachtwoord niet", "Niet klassikaal · niet hardop · helper apart of later IDO"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Er wordt om een code gevraagd", "Stop · vul niets in · groepsroute gaat niet zo ver"),
        ("Ik wil niet inloggen", "Prima · niet verplicht"),
        ("Ik ben per ongeluk verder gegaan", "Stop · ga terug · vul niets in · helper 1-op-1"),
        ("Hoe sluit ik af?", "Niet ingelogd: tabblad/app sluiten"),
        ("Moet ik uitloggen?", "Alleen als u echt bent ingelogd · anders sluiten"),
        ("Ik wil DigiD aanvragen", "Niet in deze les · IDO / Digisterker / bibliotheek / organisatie"),
        ("Mijn DigiD werkt niet", "Niet klassikaal oplossen · doorverwijzen naar passende ondersteuning"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)
    pdf.muted("Een uitzonderlijk toestel mag de groep niet stilleggen. Geen paniektaal. Geen schaamte.")

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "Bij DigiD",
        [
            "ZELF OPENEN → INLOGGEN HERKENNEN → DIGID HERKENNEN → VEILIG AFSLUITEN",
        ],
    )
    pdf.body(
        "DigiD: persoonlijke digitale inlogmethode voor de overheid en andere organisaties "
        "die DigiD gebruiken. (Niet hetzelfde als MijnOverheid.)"
    )
    pdf.body("Begin hier: digid.nl (zelf typen in de adresbalk)")
    pdf.box(
        "Privacy",
        ["“Mijn DigiD-gegevens en codes houd ik voor mezelf.”"],
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
        "digid.nl zelf openen",
        "Inloggen vinden",
        "DigiD-/inlogomgeving herkennen",
        "DigiD-app herkennen als ik die heb",
        "Correct afsluiten",
        "Wachtwoord/code voor mezelf houden",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · E1 · v2.0 · digid.nl")

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "digid.nl vooraf bereikbaar",
        "Beamer getest · instructiebeelden gecontroleerd (actueel)",
        "Telefoon/tablet én computer ondersteund",
        "Geen begeleidersaccount nodig · geen klassikale echte DigiD-login",
        "Helper kent privacyregels · vraagt geen code",
        "DigiD-app niet verplicht · geen installatie nodig",
        "Afsluitregel bekend (sluiten vs uitloggen)",
        "Privacyzin: tonen + één keer zeggen · niet nazeggen",
        "Eindmissie 12 minuten beschermd",
        "Doorverwijsinformatie paraat (IDO / Digisterker / bibliotheek)",
        "START HIER gelezen · hulpkaart bij de hand · 8–10× deelnemerskaart",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
