#!/usr/bin/env python3
"""H1 Wat kan AI voor mij doen — printpakket v2.0 (Pakket H)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HLessonPDF, MUTED, NAVY  # noqa: E402

H1_VERSION = "v2.0"
H1_TITLE = "Wat kan AI voor mij doen?"
H1_SUB = "Ontdek waar een AI-assistent u bij gewone vragen kan helpen"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-H1-Wat-kan-AI-voor-mij-doen-v2.pdf"

DEMO = (
    "Geachte bezoeker, Vanwege werkzaamheden is de leeszaal van 12 tot en met 16 mei "
    "beperkt toegankelijk. Wij adviseren u vóór uw bezoek op onze website te controleren "
    "of de leeszaal geopend is. De overige ruimtes van de bibliotheek blijven volgens de "
    "normale openingstijden toegankelijk."
)


def room_left(pdf: HLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: HLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HLessonPDF(
        f"SeniorEase  |  H1 {H1_TITLE}  |  Pakket H  |  {H1_VERSION}",
        package_label="Pakket H - AI in het dagelijks leven",
    )
    pdf._footer_version = H1_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"H1 - {H1_TITLE}",
        "Les circa 90 minuten",
        f"{H1_SUB}. "
        "SITUATIE → ANTWOORD ZIEN → KORT BIJSTUREN → ZELF ERVAREN. "
        "Telefoon, tablet of computer. Geen AI-expertise nodig.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Opent Pakket H · functie: ONTDEKKEN",
            "Rode draad: AI kan mij helpen",
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
            "Ik weet bij welke gewone vragen AI mij kan helpen — "
            "en ik heb ervaren dat ik een antwoord kan laten aanpassen.",
        ],
    )
    pdf.box(
        "Doel vandaag",
        [
            "Functie: ONTDEKKEN · Rode draad: AI kan mij helpen.",
            "Route: SITUATIE → ANTWOORD ZIEN → KORT BIJSTUREN → ZELF ERVAREN",
            "Geheugensteun (optioneel): VRAAG → KIJK → PROBEER — geen bedieningscursus.",
            "Opening: fictieve bibliotheektekst · “Wat zou u hiermee willen?”",
            "Demo: “Leg deze tekst uit in gewone taal.” · TEKST → GEWONE TAAL",
            "Bijsturing: “Nog korter, alstublieft.”",
        ],
    )
    pdf.box(
        "Niet in H1 (beschermt H2–H4)",
        [
            "Geen volledige Gemini-bediening · nieuw gesprek · interface (H2)",
            "Geen drie-vragenstructuur (H3) · geen uitgebreide privacy/controle (H4)",
            "Geen klassikale accountcreatie · geen wachtwoorden · geen app-installatie",
            "Geen “Wat is AI?” als opening",
        ],
    )
    new_page_if_needed(pdf, 55)
    pdf.box(
        "Fallback A / B / C",
        [
            "A — Eigen apparaat (browser → Gemini-web) wanneer beschikbaar",
            "B — Vooraf getest zaaltoestel (al open · geen wachtwoord in de les)",
            "C — Stuur-meekijk: deelnemer kiest en dicteert; u bedient alleen wat nodig is",
            "Les slaagt zonder dat iedereen kan inloggen.",
        ],
    )
    pdf.box(
        "Helper",
        [
            "“Wat ziet u nu?” → uitleggen → aanwijzen → deelnemer doet/stuurt → pas laat overnemen.",
            "Na ca. 2 minuten individueel probleem: helper 1-op-1 of parkeren — groep gaat verder.",
        ],
    )
    pdf.box(
        "Privacy (kort)",
        [
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan fout zijn. (Uitgebreide controle = H4.)",
        ],
    )
    new_page_if_needed(pdf, 85)
    pdf.box(
        "Woorden die u in deze les gebruikt",
        [
            "AI-assistent — Een programma waaraan u een vraag kunt stellen.",
            "Vraag — Wat u aan AI schrijft of zegt.",
            "Antwoord — Wat AI teruggeeft.",
            "Vervolgvraag — Nog iets vragen over hetzelfde onderwerp.",
            "Vooraf: wifi · beamer · Gemini-web getest · URL op A4 · demotekst · kaarten A–D · zaaltoestel(len) · helper.",
            "Volgende les: H2 — Een AI-assistent gebruiken.",
        ],
    )

    # --- DRAAIBOEK ---
    pdf.add_page()
    pdf.h1("2. Draaiboek")
    pdf.muted("Circa 90 minuten · inloop buiten de lestijd · max. ca. 8–10 deelnemers.")
    pdf.box(
        "Demotekst (exact · fictief)",
        [DEMO],
    )
    pdf.box(
        "Demo · bijsturing",
        [
            "Vraag: Leg deze tekst uit in gewone taal.",
            "Bijsturing: Nog korter, alstublieft.",
            "Alternatief indien al heel kort: Leg het uit in drie eenvoudige zinnen.",
        ],
    )
    pdf.box(
        "Oefenkaarten A–D",
        [
            "A Uitleggen — Leg dit eenvoudiger uit. → Nog korter, alstublieft.",
            "B Ideeën — Wat kan ik maken met aardappelen, broccoli en eieren? → Geef mij drie mogelijkheden.",
            "C Formuleren — Maak dit vriendelijker: Ik kom morgen wat later. → Nog iets vriendelijker.",
            "D Stappen/mogelijkheden — Geef mij drie ideeën voor een eenvoudige verjaardag thuis. → Maak ze korter.",
        ],
    )

    blocks = [
        (
            "0–10 · Welkom + situatie",
            [
                "Doel: behoefte eerst — geen “Wat is AI?”",
                "Zegt u: tekst die u niet meteen duidelijk vindt · toont demotekst · “Wat zou u hiermee willen?”",
                "Deelnemer: reageert kort · Helper: luistert",
            ],
        ),
        (
            "10–20 · Eerste AI-ervaring",
            [
                "Doel: TEKST → GEWONE TAAL zien",
                "Zegt u: “Leg deze tekst uit in gewone taal.” Daarna: “Dit is één van de dingen waarbij AI kan helpen.”",
                "Demonstreert: Gemini-web (voorbeeld) · vraag · antwoord · Deelnemer kijkt en leest",
            ],
        ),
        (
            "20–25 · Kort bijsturen",
            [
                "“Nog korter, alstublieft.” · Eerste antwoord ≠ eindpunt",
                "Niet: nieuw gesprek of knoppen uitleggen (H2)",
            ],
        ),
        (
            "25–30 · Korte uitleg AI",
            [
                "Max. ca. 5 min · ná ervaring",
                "AI-assistent = programma voor antwoord/uitleg/idee · denkt niet als mens · kan fout zijn",
                "Gemini-kaderzin: voorbeeld · andere assistenten werken op veel punten vergelijkbaar",
            ],
        ),
        (
            "30–42 · Vier soorten hulp",
            [
                "A Uitleggen · B Ideeën · C Formuleren · D Stappen/mogelijkheden",
                "Kort voorbeeld per categorie · koelkast als lichte brug bij B",
            ],
        ),
        (
            "42–57 · Zelf ervaren ronde 1",
            [
                "“Kies A, B, C of D. Geen geheimen.” · Tip: antwoord kan fout zijn",
                "Route A/B/C · Helper: “Wat ziet u nu?” · bij C dicteert deelnemer",
            ],
        ),
        (
            "57–62 · Kort delen",
            ["“Wat vond u bruikbaar?” — geen schoolse rondvraag"],
        ),
        (
            "62–72 · Ronde 2 / bijsturing",
            ["Eén kleine verbetering · bij tijdnood inkorten · eindmissie beschermen"],
        ),
        (
            "72–84 · Eindmissie (ca. 10–12 min)",
            [
                "Situatie: U wilt hulp bij een gewone dagelijkse vraag.",
                "1 Kies · 2 Bepaal · 3 Bekijk · 4 Eén verbetering · 5 Bruikbaarder?",
                "Succes: “Hier kan AI mij bij helpen.” · Geen voordoen · geen voorbeeldantwoord op beamer",
            ],
        ),
        (
            "84–90 · Afronding",
            [
                "“Vandaag hebt u gezien en ervaren dat AI kan helpen bij gewone vragen en taken.”",
                "“De volgende keer leert u hoe u zelf een gesprek met een AI-assistent voert.”",
            ],
        ),
    ]
    for title, lines in blocks:
        new_page_if_needed(pdf, 42)
        pdf.box(title, lines)

    pdf.box(
        "Als de tijd krap is",
        [
            "Niet schrappen: situatie + TEKST→GEWONE TAAL + één bijsturing + zelf ervaren + eindmissie.",
        ],
    )

    # --- HULP ---
    pdf.add_page()
    pdf.h1("3. Hulp bij vastlopen")
    pdf.muted("Alleen begeleider/helper. Volgorde: “Wat ziet u nu?” → … → deelnemer doet.")
    items = [
        ("Kan niet inloggen / geen account", "Route B (zaaltoestel) of C (stuur-meekijk). Geen account aanmaken. Geen wachtwoorden."),
        ("Weet niet wat te vragen", "“Kies A, B, C of D.” Toon oefenkaarten."),
        ("Cookievenster", "“Dit hoort niet bij onze oefening.” Help weg · deelnemer tikt zelf · geen cookieles."),
        ("Scherm ziet er anders uit", "“Uw scherm kan er iets anders uitzien. Dat is normaal.”"),
        ("Antwoord is erg lang", "“Vraag: Nog korter, alstublieft.”"),
        ("Antwoord is vreemd / onbruikbaar", "Niet uitgebreid corrigeren. Eenvoudige bijstuurvraag of andere kaart."),
        ("Route C — wie bepaalt?", "Deelnemer kiest vraag én bijsturing en dicteert. U bedient alleen wat nodig is."),
        ("Vastloper > ca. 2 minuten", "Helper individueel of parkeren. Groep gaat verder."),
        ("Wil privéprobleem typen", "“Kies vandaag een veilige oefening van de kaart. Geen geheimen.”"),
        ("Wil app installeren", "“Niet nodig in deze les. We gebruiken de browser.”"),
    ]
    for s, a in items:
        pdf.hulp_item(s, a)

    # --- DEELNEMERSKAART ---
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart (thuis)")
    pdf.muted("Geen samenvatting van alle beamerdia's. Thuiswaarde · geen huiswerktoon.")
    pdf.box(
        "VRAAG → KIJK → PROBEER",
        [
            "1. Vraag — Wat wilt u weten of gedaan krijgen?",
            "2. Kijk — Bekijk het antwoord.",
            "3. Probeer — Probeer één keer zelf (of met hulp).",
        ],
    )
    pdf.box(
        "AI kan helpen met",
        [
            "Uitleggen — “Leg dit eenvoudiger uit.”",
            "Ideeën — “Wat kan ik maken met …?”",
            "Formuleren — “Maak dit vriendelijker …”",
            "Stappen / mogelijkheden — “Geef mij drie ideeën …”",
            "Nog niet tevreden? Bijvoorbeeld: “Nog korter, alstublieft.”",
        ],
    )
    pdf.box(
        "Tip",
        [
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan fout zijn.",
        ],
    )
    pdf.box(
        "Dit kan ik nu",
        [
            "Ik weet waar AI mij bij kan helpen.",
            "Ik heb ervaren dat ik een antwoord kan laten aanpassen.",
        ],
    )
    pdf.box(
        "Thuis (vrijblijvend)",
        [
            "Stel één veilige gewone vraag.",
            "Vraag daarna bijvoorbeeld: “Nog korter, alstublieft.”",
        ],
    )

    # --- ZAALCHECKLIST ---
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    pdf.muted("Praktisch afvinken vóór de les.")
    checks = [
        "Wifi werkt",
        "Beamer / scherm klaar",
        "Browser beschikbaar (telefoon · tablet · computer)",
        "Gemini-web vooraf getest",
        "Exacte URL op A4 beschikbaar",
        "Demotekst klaar (exact in draaiboek)",
        "Oefenkaarten A–D klaar",
        "Zaaltoestel(len) voor Route B — vooraf open, geen wachtwoord in de les",
        "Geen klassikale accountcreatie gepland",
        "Geen wachtwoorden verzamelen / op beamer",
        "Helper aanwezig",
        "Route C begrepen (deelnemer stuurt · u bedient alleen)",
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
    pdf.multi_cell(0, 6, "Vast: H1 = ontdekken · geen H2-bedieningscursus.")

    pdf.output(str(OUT))
    print("wrote", OUT)
    return OUT


if __name__ == "__main__":
    build()
