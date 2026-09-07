#!/usr/bin/env python3
"""C3 Bellen en videobellen met WhatsApp — printpakket v2.0 (C1/C2-productiemal)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import CLessonPDF, MUTED, NAVY, GOLD  # noqa: E402

C3_VERSION = "v2.0"
C3_TITLE = "Bellen en videobellen met WhatsApp"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-C3-Bellen-Videobellen-v2.pdf"
PRIVACY = (
    "Tijdens de oefening videobellen deelnemers alleen met hun afgesproken "
    "oefenpersoon. Richt de camera niet bewust op andere deelnemers zonder hun toestemming."
)
INTERNET = (
    "Bellen via WhatsApp gaat via internet. Met wifi gebruikt WhatsApp hiervoor "
    "meestal geen mobiele data. Zonder wifi gebruikt WhatsApp uw mobiele internet."
)


def room_left(pdf: CLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: CLessonPDF, min_mm: float = 55) -> None:
    """Alleen nieuwe pagina als huidige al voldoende inhoud heeft én te weinig ruimte."""
    if pdf.get_y() > 55 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = CLessonPDF(
        f"SeniorEase  |  C3 {C3_TITLE}  |  Pakket C  |  {C3_VERSION}",
        package_label="Pakket C - WhatsApp",
    )
    pdf._footer_version = C3_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"C3 - {C3_TITLE}",
        "Les circa 90 minuten",
        "KIEZEN → CONTROLEREN → BELLEN → PRATEN → OPHANGEN. "
        "Zelf bellen, opnemen en videobellen. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Volgende: C4 Veilig en privé WhatsApp",
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

    # START HIER — één doorlopend blok; Afspraken niet als weesregels
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst.")
    pdf.box(
        "U hoeft geen technisch expert te zijn",
        [
            "U begeleidt. Deelnemers oefenen op hun eigen telefoon.",
            "Route: KIEZEN → CONTROLEREN → BELLEN → PRATEN → OPHANGEN.",
            "KIJK EERST NAAR DE NAAM → DAN BELLEN.",
            "MICROFOON UIT = DE ANDER HOORT U NIET.",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Na C3 kan de deelnemer zelf iemand bellen of videobellen via WhatsApp "
        "en weet hoe het gesprek weer te beëindigen."
    )
    pdf.h2("Privacy-afspraak (vast)")
    pdf.body(PRIVACY)
    pdf.h2("Oefenorganisatie — tweetallen")
    pdf.bullet("A belt B → wissel. Geen partner? → helper.")
    pdf.bullet("Niet 8–10 telefoons tegelijk vrij door elkaar laten bellen.")
    pdf.bullet("Begeleider bepaalt belmoment. Helper helpt 1-op-1.")
    pdf.h2("Oefencontact")
    pdf.body(
        "Begeleider of helper = veilig oefencontact. Eigen bekende mag ook. "
        "Geen telefoonnummers op de beamer. Geen nummers door de zaal roepen."
    )
    pdf.h2("Vooraf controleren")
    pdf.numbered(1, "Bekijk de beamer-PDF.")
    pdf.numbered(2, "Test WhatsApp-bellen, videobellen, camera en microfoon.")
    pdf.numbered(3, "Lees Hulp bij vastlopen.")
    pdf.numbered(4, "Oefencontact bereikbaar · volume · internet · oproepen komen door.")
    pdf.numbered(5, "Print, beamer, deelnemerskaarten, oplaadkabels, tweetallen plannen.")
    # Groep + Afspraken bij elkaar houden (voorkomt bijna lege vervolgpagina)
    pdf.ensure_space(62)
    pdf.h2("Groep")
    pdf.bullet("Max. ongeveer 8–10 · helper sterk aanbevolen")
    pdf.bullet("Inloop vóór de les — telt niet mee in de 90 minuten")
    pdf.bullet("iPhone én Android gelijkwaardig")
    pdf.h2("Afspraken")
    pdf.bullet('Eerst: "Wat ziet u nu?"')
    pdf.bullet("Vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.")
    pdf.bullet("Uw scherm kan er iets anders uitzien. Dat is normaal.")
    pdf.bullet("Geen groep maken · geen C4 (privacy-instellingen / fraude).")
    pdf.bullet("Eindmissie nooit schrappen — verkort liever camera wisselen of groepenblok.")

    # Draaiboek — geen nieuwe pagina als START HIER net een ruime pagina opende
    if room_left(pdf) < 100:
        pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, kort voordoen; bepaalt belmoment.")
    pdf.body("Helper: alleen 1-op-1. Max. 8–10 | Wat ziet u nu?")
    pdf.h2("Leerdoel")
    pdf.body(
        "Zelf bellen of videobellen via WhatsApp; opnemen; gesprek zelf beëindigen; "
        "persoon versus groep bovenaan herkennen."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U wilt iemand niet typen, maar even spreken of zien. '
        "Hoe belt u die persoon zelf via WhatsApp — "
        'en welke knoppen heeft u tijdens het gesprek nodig?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("KIEZEN → CONTROLEREN → BELLEN → PRATEN → OPHANGEN")
    pdf.body("KIJK EERST NAAR DE NAAM → DAN BELLEN")
    pdf.body("MICROFOON UIT = DE ANDER HOORT U NIET")
    pdf.body("KIJK OOK EVEN WAT ER ACHTER U IN BEELD KOMT")
    pdf.body("KIJK BOVENAAN: ÉÉN PERSOON OF EEN GROEP?")
    pdf.h2("Privacy-afspraak (vast)")
    pdf.body(PRIVACY)
    pdf.h2("Internet (klein)")
    pdf.body(INTERNET)
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen groep maken · geen echte oefengroep · geen groepsbeheer")
    pdf.bullet("Geen privacy-instellingen / fraude (C4) · geen WhatsApp Web")

    # Tijdlijn: altijd als geheel (geen laatste regel alleen op volgende pagina)
    tijdlijn = [
        ("0–5", "Terughaal: Mag ik u even bellen?"),
        ("5–10", "Situatie + bellen/videobellen + internet"),
        ("10–22", "Audiogesprek starten en zelf ophangen"),
        ("22–32", "Oproep ontvangen → opnemen → ophangen"),
        ("32–40", "Microfoon dempen / weer aan"),
        ("40–50", "Videobellen voorbereiden + starten"),
        ("50–55", "Pauze"),
        ("55–67", "Videogesprek → camera uit/aan"),
        ("67–72", "Camera wisselen (ondersteunend)"),
        ("72–78", "Persoon versus groep herkennen"),
        ("78–90", "Eindmissie (altijd behouden)"),
    ]
    tijdlijn_h = 12 + len(tijdlijn) * 5.2
    pdf.ensure_space(tijdlijn_h)
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
        # Schatting: kop + 3 labels + teksten + bullets
        est = 38 + 6 * max(1, len(extra))
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

    new_page_if_needed(pdf, 70)
    pdf.h2("Terughaal (0–5)")
    pdf.body(
        "WhatsApp → oefencontact → naam → Mag ik u even bellen? → Ja. "
        "Brug: Nu gaan we niet verder typen — we gaan bellen."
    )
    blok(
        "Audiogesprek (10–22)",
        "Tweetallen: A belt B.",
        "Naam controleren → bellen → kort praten → zelf ophangen.",
        "Kijk eerst naar de naam. Tik op bellen. Hang zelf op met de rode knop.",
        ["Begeleider bepaalt belmoment"],
    )
    blok(
        "Oproep ontvangen (22–32)",
        "Maatje / oefencontact belt terug.",
        "Herkennen wie belt → opnemen → zelf ophangen.",
        "Kijk wie belt. Neem op. Hang zelf weer op.",
        ['Kort: "Komt het niet uit? U hoeft niet op te nemen."'],
    )
    blok(
        "Microfoon dempen (32–40)",
        "Tijdens lopend gesprek.",
        "Microfoon uit → weer aan. Dempen is niet ophangen.",
        "Microfoon uit: de ander hoort u niet. Dit is niet ophangen.",
        [],
    )
    blok(
        "Videobellen (40–50 + 55–67)",
        "Na akkoord en korte privacycheck.",
        "Videogesprek starten · camera uit/aan · microfoon · zelf ophangen.",
        "Komt videobellen uit? Kijk wat er achter u in beeld komt. Daarna starten.",
        [PRIVACY],
    )
    blok(
        "Camera wisselen (67–72) — ondersteunend",
        "Optioneel.",
        "Wisselknop kort tonen. Overslaan bij tijdnood.",
        "Ik wil even laten zien wat er voor mij staat.",
        ["Geen eindmissie-eis"],
    )
    blok(
        "Persoon versus groep (72–78)",
        "Alleen herkennen.",
        "KIJK BOVENAAN: één persoon of een groep?",
        "Kijk bovenaan. Ziet u één naam of een groepsnaam?",
        ["Geen groep maken · voorbeeld: SeniorEase oefengroep"],
    )

    # Eindmissie bij elkaar
    pdf.ensure_space(95)
    pdf.h2("Eindmissie (78–90) — 9 stappen — zonder voordoen — altijd behouden")
    pdf.muted("Geen voordoen. Camera wisselen en groepen niet verplicht.")
    for i, t in enumerate(
        [
            "Open WhatsApp en kies uw oefenpersoon.",
            "Controleer de naam.",
            "Vraag: Mag ik u videobellen?",
            "Wacht op akkoord en start het videogesprek.",
            "Zet uw microfoon kort uit en weer aan.",
            "Zet uw camera kort uit en weer aan.",
            "Beëindig zelf het gesprek.",
            "Wissel daarna van rol: laat uw oefenpersoon u bellen.",
            "Kijk wie belt, neem op en beëindig zelf het gesprek.",
        ],
        1,
    ):
        pdf.numbered(i, t)
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan kunt u zelf bellen, videobellen, opnemen '
        'en een WhatsApp-gesprek weer beëindigen."'
    )
    pdf.muted("Tijd krap: verkort camera wisselen of groepenblok — eindmissie niet schrappen.")

    # Hulp — items niet als weesregel onderaan
    pdf.add_page()
    pdf.h1("3. C3 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Belknop niet zichtbaar", ["Wat ziet u nu?", "iPhone | Android tonen"]),
        ("Juiste persoon?", ["STOP · naam bovenaan", "Niet bellen tot naam klopt"]),
        ("Oproep komt niet tot stand", ["Internet?", "Oefencontact bereikbaar?"]),
        ("Ik hoor / word niet gehoord", ["Volume", "Microfoon uit?"]),
        ("Microfoon staat uit", ["Weer aan", "Dempen ≠ ophangen"]),
        ("Geen beeld / camera uit", ["Cameraknop", "Geen instellingenles"]),
        ("Weet niet hoe ophangen", ["Rode knop"]),
        ("Inkomende oproep anders", ["Dat is normaal.", "Kijk wie belt"]),
        ("Persoon of groep?", ["Kijk bovenaan", "Geen groep maken"]),
        ("Internet werkt niet", ["Wifi of mobiel data · kort"]),
        ("Te veel geluid", ["Tweetallen · belmoment · helper"]),
    ]
    for titel, bullets in hulp:
        # Compacte hulpkoppen (h3) zodat alles op één of twee volle pagina's past
        pdf.ensure_space(12 + 5.5 * len(bullets))
        pdf.h3(titel)
        for b in bullets:
            pdf.bullet(b)

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Niet de hele les.")
    pdf.box(
        "Bellen",
        ["KIEZEN → NAAM CONTROLEREN → BELLEN → OPHANGEN"],
    )
    pdf.box(
        "Videobellen",
        [
            "EERST VRAGEN OF HET UITKOMT",
            "→ KIJK WAT ER ACHTER U IN BEELD KOMT",
            "→ VIDEOBELLEN",
        ],
    )
    pdf.h2("Tijdens het gesprek")
    pdf.body("MICROFOON UIT = de ander hoort u niet")
    pdf.body("CAMERA UIT = de ander ziet u niet")
    pdf.body("Rode knop = gesprek beëindigen")
    pdf.body("Dempen is niet hetzelfde als ophangen.")
    pdf.h2("Groep herkennen")
    pdf.body("KIJK BOVENAAN → één persoon of een groep?")
    pdf.h2("Dit kan ik nu")
    for t in [
        "Zelf bellen",
        "Oproep opnemen",
        "Ophangen",
        "Videobellen",
        "Microfoon uit/aan",
        "Camera uit/aan",
        "Persoon / groep herkennen",
    ]:
        pdf.check(t)

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Wifi / internet getest",
        "Telefoons voldoende opgeladen",
        "WhatsApp aanwezig",
        "Oefencontact beschikbaar / bereikbaar",
        "WhatsApp-bellen getest",
        "Videobellen getest",
        "Camera- en microfoontoegang beschikbaar",
        "Volume hoorbaar genoeg",
        "Oproepen komen door op oefentoestellen",
        "Tweetallen / helper-rollen gepland",
        "Geluidsniveau beheersbaar",
        "Geen telefoonnummers op beamer",
        "Geen privé-videobeelden projecteren",
        "Privacy-afspraak camera bekend",
        "Helper weet wie extra hulp nodig heeft",
        "Beamer-PDF klaar",
        "8–10× deelnemerskaart",
        "Eindmissie-materiaal / rollen klaar (9 stappen)",
    ]:
        pdf.check(t)
    pdf.ensure_space(28)
    pdf.box("Privacy-afspraak (vast)", [PRIVACY])

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
