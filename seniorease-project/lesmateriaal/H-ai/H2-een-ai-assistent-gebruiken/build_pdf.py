#!/usr/bin/env python3
"""H2 Een AI-assistent gebruiken — printpakket v2.0 (Pakket H)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HLessonPDF, MUTED, NAVY  # noqa: E402

H2_VERSION = "v2.0"
H2_TITLE = "Een AI-assistent gebruiken"
H2_SUB = "Zelf openen, vragen, lezen, doorvragen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-H2-Een-AI-assistent-gebruiken-v2.pdf"

DEMO_Q = (
    "Geef mij drie eenvoudige ideeën voor een maaltijd "
    "met aardappelen, broccoli en eieren."
)
OEFEN1_Q = "Geef mij drie ideeën voor een gezellige middag thuis."
OEFEN1_F = "Welke is het makkelijkst om te organiseren?"


def room_left(pdf: HLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: HLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HLessonPDF(
        f"SeniorEase  |  H2 {H2_TITLE}  |  Pakket H  |  {H2_VERSION}",
        package_label="Pakket H - AI in het dagelijks leven",
    )
    pdf._footer_version = H2_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"H2 - {H2_TITLE}",
        "Les circa 90 minuten",
        f"{H2_SUB}. "
        "OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN (+ nieuw gesprek). "
        "Browser → gemini.google.com. Geen AI-expertise nodig.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Functie: BEDIENEN",
            "Rode draad: Ik kan AI zelf gebruiken",
        ],
        contents_title="Bij deze les ontvangt u",
    )
    pdf.set_font("DejaVu", "I", 10)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5.5,
        "Methode: ZIEN → NADOEN → BEGRIJPEN → ZELF DOEN (niet op beamer). "
        "Inloop telt niet mee. Geen oefenblad. Eindmissie altijd behouden (ca. 10–12 min). "
        "Gemini-web is voorbeeld — geen Gemini-cursus.",
    )

    # --- START HIER ---
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst. Voorbereiding circa 10–15 minuten. U hoeft geen AI-expert te zijn.")
    pdf.box(
        "Belofte",
        [
            "Ik kan zelf een AI-assistent openen, een vraag stellen, het antwoord lezen, "
            "doorvragen en een nieuw gesprek beginnen.",
        ],
    )
    pdf.box(
        "Doel vandaag",
        [
            "Functie: BEDIENEN · Rode draad: Ik kan AI zelf gebruiken.",
            "Route: OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN",
            "Aanvullend: Nieuw onderwerp? → Start een nieuw gesprek",
            "URL: gemini.google.com · max. ca. 8–10 deelnemers · begeleider + helper",
        ],
    )
    pdf.box(
        "Kaderzin",
        [
            "In deze les gebruiken we Gemini.",
            "Andere AI-assistenten, zoals ChatGPT en Copilot, werken op een vergelijkbare manier.",
        ],
    )
    new_page_if_needed(pdf, 55)
    pdf.box(
        "Fallback A / B / C",
        [
            "A — Eigen apparaat (browser → Gemini-web)",
            "B — Vooraf open zaaltoestel (geen wachtwoord in de les)",
            "C — Stuur-meekijk: deelnemer dicteert; u bedient alleen wat nodig is",
            "Login is geen leerdoel. ~2 min → individueel / B of C · groep gaat verder.",
        ],
    )
    pdf.box(
        "Helper",
        [
            "“Wat ziet u nu?” → laten aanwijzen → één tip → deelnemer doet → pas laat overnemen.",
        ],
    )
    pdf.box(
        "Privacy (kort)",
        [
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan een fout bevatten. (Uitgebreide controle = H4.)",
        ],
    )
    new_page_if_needed(pdf, 70)
    pdf.box(
        "Woorden die u in deze les gebruikt",
        [
            "AI-assistent — Een programma waaraan u een vraag kunt stellen.",
            "Browser — Het programma waarmee u websites opent.",
            "Vraag — Wat u aan AI schrijft.",
            "Antwoord — Wat AI teruggeeft.",
            "Vervolgvraag — Nog iets vragen over hetzelfde onderwerp.",
            "Nieuw gesprek — Opnieuw beginnen met een ander onderwerp.",
        ],
    )
    pdf.box(
        "Niet in H2",
        [
            "Geen H3-promptmodel (WAT / INFO / HOE) · geen promptcollege",
            "Geen H4-controleprotocol · geen chatgeschiedenis-beheer",
            "Geen klassikale accountcreatie · geen app-installatie",
        ],
    )

    # --- DRAAIBOEK ---
    pdf.add_page()
    pdf.h1("2. Draaiboek")
    pdf.muted("Circa 90 minuten · inloop buiten de lestijd · max. ca. 8–10 deelnemers.")
    pdf.box(
        "Demo · exact",
        [
            f"Vraag: {DEMO_Q}",
            "Vervolgvraag: Welke is het makkelijkst?",
        ],
    )
    pdf.box(
        "Oefenronde 1 · frozen",
        [
            f"Startvraag: {OEFEN1_Q}",
            f"Vervolgvraag: {OEFEN1_F}",
        ],
    )
    pdf.box(
        "Keuzekaarten A–D",
        [
            "A ETEN — Geef mij drie ideeën voor een eenvoudige lunch. → Maak het korter.",
            "B UITJE — Wat kan ik op een regenachtige middag thuis doen? → Geef nog twee ideeën.",
            "C BERICHT — Maak deze zin iets vriendelijker: Ik kan donderdag niet komen. → Maak het korter.",
            "D UITLEG — Leg uit wat een QR-code is in eenvoudige woorden. → Leg het nog eenvoudiger uit.",
        ],
    )

    blocks = [
        (
            "0–8 · Welkom + H1-retrieval",
            [
                "Drie situaties: uitleg · ideeën · bericht. “Waar zou AI u bij kunnen helpen?”",
                "Geen bediening. Brug: “Vandaag gaat u het zelf bedienen.”",
            ],
        ),
        (
            "8–13 · Startsituatie",
            [
                "Makkelijk koken met aardappelen, broccoli en eieren — behoefte eerst.",
            ],
        ),
        (
            "13–23 · OPENEN",
            [
                "Browser · gemini.google.com · typvak: “Hier typ ik mijn vraag.”",
                "“Uw scherm kan er iets anders uitzien. Dat is normaal.”",
            ],
        ),
        (
            "23–33 · VRAGEN",
            [
                "Typvak · typen · vóór verzenden kijken · versturen.",
                "Geen prompt verbeteren (H3).",
            ],
        ),
        (
            "33–40 · ANTWOORD LEZEN",
            [
                "Antwoord herkennen · scrollen mag · “Een AI-antwoord kan een fout bevatten.”",
            ],
        ),
        (
            "40–50 · DOORVRAGEN",
            [
                "Vervolgvraag in hetzelfde gesprek. Geen WAT/INFO/HOE.",
            ],
        ),
        (
            "50–57 · NIEUW GESPREK",
            [
                "Ander onderwerp (cadeau) · nieuw gesprek · leeg typvak. Geen chatbeheer.",
            ],
        ),
        (
            "57–69 · Oefenronde 1",
            [
                f"{OEFEN1_Q} → {OEFEN1_F}",
                "Helper: “Wat ziet u nu?” · fallback B/C",
            ],
        ),
        (
            "69–81 · Oefenronde 2",
            [
                "Kaarten A–D · meer zelf · bij tijdnood inkorten · eindmissie beschermen",
            ],
        ),
        (
            "81–93 · Eindmissie (ca. 10–12 min)",
            [
                "Openen → vraag → versturen → lezen → vervolg → nieuw gesprek — zonder voordoen.",
                "Succes: “Hier typ ik mijn vraag.” Geen toets.",
            ],
        ),
        (
            "Afronding",
            [
                "Thuis: één vraag + één vervolg. Brug naar H3.",
            ],
        ),
    ]
    for title, lines in blocks:
        new_page_if_needed(pdf, 38)
        pdf.box(title, lines)

    pdf.box(
        "Als de tijd krap is",
        [
            "Niet schrappen: openen · vraag · antwoord · doorvragen · eindmissie.",
        ],
    )

    # --- HULP ---
    pdf.add_page()
    pdf.h1("3. Hulp bij vastlopen")
    pdf.muted("Alleen begeleider/helper. “Wat ziet u nu?” · geen wachtwoorden · ~2 min → B/C.")
    items = [
        ("A · Typvak niet gevonden", "Laten aanwijzen · één keer wijzen · anders B/C."),
        ("B · Geen verzendknop", "“Welk teken lijkt op versturen?” · scherm mag anders · B/C."),
        ("C · Er gebeurt niets", "Opnieuw versturen · internet · Route B."),
        ("D · Inloggen gevraagd", "Geen wachtwoord. Direct Route B of C."),
        ("E · Antwoord heel lang", "Scrollen · niet alles in één keer."),
        ("F · Weet niet hoe verder", "Korte vervolgvraag · voorbeeldzin geven."),
        ("G · Ander onderwerp", "Nieuw gesprek · leeg typvak."),
        ("H · Scherm anders", "“Dat is normaal.” Functie zoeken · anders B."),
    ]
    for s, a in items:
        pdf.hulp_item(s, a)

    # --- DEELNEMERSKAART ---
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart (thuis)")
    pdf.muted("Geen samenvatting van alle beamerdia's. Thuiswaarde · geen huiswerktoon.")
    pdf.box(
        "OPENEN → VRAGEN → ANTWOORD LEZEN → DOORVRAGEN",
        [
            "Nieuw onderwerp? → Start een nieuw gesprek",
        ],
    )
    pdf.box(
        "Woorden en tekens die u tegenkomt",
        [
            "Browser — Website openen.",
            "Vraag — Typen in het typvak.",
            "Antwoord — Lezen · eventueel scrollen.",
            "Vervolgvraag — Verder vragen in hetzelfde gesprek.",
            "Nieuw gesprek — Opnieuw beginnen met een ander onderwerp.",
        ],
    )
    pdf.box(
        "Tip",
        [
            "Uw scherm kan er iets anders uitzien. Dat is normaal.",
            "Gebruik geen wachtwoorden, codes of andere gevoelige privégegevens.",
            "Een AI-antwoord kan een fout bevatten.",
        ],
    )
    pdf.box(
        "Thuis (vrijblijvend)",
        [
            "Stel één veilige gewone vraag.",
            "Stel daarna één vervolgvraag.",
        ],
    )

    # --- ZAALCHECKLIST ---
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    pdf.muted("Praktisch afvinken vóór de les.")
    checks = [
        "Wifi / internet werkt",
        "Beamer / scherm klaar",
        "Browser beschikbaar",
        "gemini.google.com bereikbaar",
        "Actuele route vooraf getest / URL op A4",
        "Fallbackapparaat(en) indien mogelijk vooraf open",
        "Geen klassikale accountcreatie gepland",
        "Geen wachtwoorden of codes verzamelen / op beamer",
        "Deelnemers gebruiken geen privégegevens",
        "Helper kent “Wat ziet u nu?” + fallback A/B/C",
        "Accountproblemen niet klassikaal (~2 min → B/C)",
        "Keuzekaarten A–D klaar",
        "Eindmissie ca. 10–12 min beschermd",
        "Printpakket + beamer-PDF bij de hand",
        "Geen oefentakenblad · geen aparte nazorgkaart",
    ]
    for c in checks:
        new_page_if_needed(pdf, 10)
        pdf._left()
        pdf.set_font("DejaVu", "", 13)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 7, f"☐  {c}")
        pdf.ln(1)

    pdf.ln(4)
    pdf.set_font("DejaVu", "I", 11)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 6, "Vast: H2 = bedienen · geen H3-promptles · geen H4-controleles.")

    pdf.output(str(OUT))
    print("wrote", OUT)
    return OUT


if __name__ == "__main__":
    build()
