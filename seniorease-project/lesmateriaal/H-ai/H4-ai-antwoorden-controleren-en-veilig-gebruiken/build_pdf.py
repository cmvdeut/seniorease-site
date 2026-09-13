#!/usr/bin/env python3
"""H4 AI-antwoorden controleren en veilig gebruiken — printpakket v2.0 (Pakket H)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HLessonPDF, MUTED, NAVY  # noqa: E402

H4_VERSION = "v2.0"
H4_TITLE = "AI-antwoorden controleren en veilig gebruiken"
H4_SUB = "Deel niet alles · controleer wat belangrijk is"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-H4-AI-antwoorden-controleren-en-veilig-gebruiken-v2.pdf"

REGEL = (
    "Bij belangrijke beslissingen over gezondheid, geld, recht of overheid: "
    "controleer bij een deskundige of officiële bron."
)
FICTIEF = "U heeft hiervoor alleen uw identiteitsbewijs nodig."


def room_left(pdf: HLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: HLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def estimate_box_mm(pdf: HLessonPDF, title: str, lines: list[str], *, pad: float = 4.0) -> float:
    usable = pdf.epw - 2 * pad
    pdf.set_font("DejaVu", "B", 11)
    h = len(pdf.multi_cell(usable, 5.5, title, split_only=True)) * 5.5
    pdf.set_font("DejaVu", "", 10)
    for line in lines:
        h += max(1, len(pdf.multi_cell(usable, 5, line, split_only=True))) * 5
    return h + 2 * pad + 1 + 3


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HLessonPDF(
        f"SeniorEase  |  H4 {H4_TITLE}  |  Pakket H  |  {H4_VERSION}",
        package_label="Pakket H - AI in het dagelijks leven",
    )
    pdf._footer_version = H4_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"H4 - {H4_TITLE}",
        "Les circa 90 minuten",
        f"{H4_SUB}. "
        "DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS. "
        "Geen angstles. Geen factcheckopleiding. Geen Gemini-screenshots.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Functie: CONTROLEREN / VEILIG BESLISSEN",
            "Rode draad: Ik gebruik AI verstandig",
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
        "Sluit Pakket H af. Geen H1–H3 herles · geen live bron openen.",
    )

    # START HIER
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Voorbereiding circa 10–15 minuten. U hoeft geen AI-expert te zijn.")
    pdf.box(
        "Belofte",
        [
            "Ik weet welke informatie ik beter niet met AI deel",
            "en wanneer ik een belangrijk antwoord ergens anders moet controleren.",
        ],
    )
    pdf.box(
        "Doel vandaag",
        [
            "Functie: CONTROLEREN / VEILIG BESLISSEN · geen angstles.",
            "Route: DEEL NIET ALLES → CONTROLEER WAT BELANGRIJK IS",
            "Kernvragen: Moet AI dit echt weten? · Is het belangrijk als dit fout is?",
            "Waar kan ik dit nog controleren?",
            "Zeker klinken ≠ kloppen · AI opnieuw vragen ≠ onafhankelijke controle.",
        ],
    )
    pdf.box("Belangrijke beslissingen (exact)", [REGEL])
    pdf.box(
        "Privacy",
        [
            "Geef alleen informatie die nodig is.",
            "HARD GEHEIM nooit: wachtwoorden, codes, DigiD, BSN, bank, medische dossiers.",
        ],
    )
    new_page_if_needed(pdf, 48)
    pdf.box(
        "Voorbeelden & Route D",
        [
            "Fictief · kop: OEFENVOORBEELD — FICTIEF AI-ANTWOORD",
            "Route D: beamer + kaarten · geen login · geen internet verplicht",
            "A/B/C alleen indien toch veilig met AI wordt geoefend",
        ],
    )
    pdf.box(
        "Helper",
        [
            "“Wat ziet u nu?” · “Moet AI dit echt weten?”",
            "“Is dit belangrijk als het fout is?” · “Waar zou u dit nog kunnen controleren?”",
            "Niet meteen: “Dit is veilig.” Bij gevoelige info: STOP vóór invoeren.",
        ],
    )
    pdf.box(
        "Niet in H4",
        [
            "Geen H1–H3 herles · geen Gemini-screenshots · geen browser/zoekles",
            "Geen factcheckopleiding · geen echte medische/juridische/financiële adviezen",
        ],
    )

    # DRAAIBOEK
    pdf.add_page()
    pdf.h1("2. Draaiboek")
    pdf.muted("Circa 90 minuten · 85 + overgang · eindmissie 10–12 min beschermen.")
    pdf.box(
        "OEFENVOORBEELD — FICTIEF AI-ANTWOORD",
        [
            "Situatie: officiële aanvraag · document nodig?",
            FICTIEF,
            "Vraag: Zou u dit meteen aannemen?",
        ],
    )
    pdf.box(
        "Oefeningen (frozen)",
        [
            "Privacy: afzegging · NODIG / NIET NODIG",
            "Controleren A–F · KAN IK GEBRUIKEN / EERST CONTROLEREN",
            "Waar: gemeente · arts/apotheek · verzekeraar · winkel — geen browser",
        ],
    )

    blocks = [
        (
            "0–5 · Welkom + H3-retrieval",
            [
                "Toont: VOOR “Wat kan ik koken?” · NA (avondmaaltijd · aardappelen/broccoli/eieren)",
                "Zegt u: “Welke vraag helpt AI beter?” · kort WAT / INFO / HOE",
                "Brug: bruikbaarder ≠ altijd juist · Helper: “Wat ziet u nu?”",
            ],
        ),
        (
            "5–11 · Startsituatie",
            [
                "Toont: fictief AI-antwoord (identiteitsbewijs)",
                "Vraagt: meteen aannemen? · of controleren bij de organisatie?",
                "Doel: overtuigend kan toch onvolledig of fout zijn",
            ],
        ),
        (
            "11–17 · AI kan overtuigend klinken",
            [
                "Kernzin: Een antwoord dat zeker klinkt, hoeft niet altijd te kloppen.",
                "Duidelijk / netjes / zeker — maar mogelijk fout / verouderd / onvolledig",
                "Geen technische AI-theorie",
            ],
        ),
        (
            "17–25 · DEEL NIET ALLES",
            [
                "Kernvraag: Moet AI dit echt weten?",
                "Alleen wat nodig is · HARD GEHEIM noemen (niet invoeren)",
                "Helper: “Moet AI dit echt weten?”",
            ],
        ),
        (
            "25–33 · Privacy-oefening",
            [
                "Situatie: nette afspraak-afzegging schrijven",
                "Kaartjes: NODIG / NIET NODIG · geen quiz · geen punten",
                "Helper laat deelnemer kiezen · formuleert niet vóór",
            ],
        ),
        (
            "33–42 · CONTROLEER WAT BELANGRIJK IS",
            [
                "Vergelijking: meestal gebruiken na zelf lezen · vs · eerst controleren",
                "Toont exact: " + REGEL,
                "Helper: “Is dit belangrijk als het fout is?”",
            ],
        ),
        (
            "42–51 · Moet ik controleren?",
            [
                "Kaarten A–F · KAN IK GEBRUIKEN / EERST CONTROLEREN",
                "Geen medisch/juridisch/financieel advies · alleen herkennen",
            ],
        ),
        (
            "51–59 · Waar controleer ik?",
            [
                "Richting noemen · geen website openen · geen URL · geen zoekles",
                "Helper: “Welke organisatie of deskundige gaat hierover?”",
            ],
        ),
        (
            "59–66 · Zelfstandig oefenen",
            [
                "Deelnemer: moet AI dit weten? · belangrijk als fout? · waar controleren?",
                "Geen toetsgevoel · helper alleen beslisvragen",
            ],
        ),
        (
            "66–78 · Eindmissie (10–12)",
            [
                "Drie fictieve situaties: laag risico · privacy · belangrijk",
                "Succes: “Dit hoeft AI niet te weten.” · “Dit controleer ik nog bij …”",
                "Altijd behouden bij tijdnood · geen punten",
            ],
        ),
        (
            "78–83+ · Afronding Pakket H",
            [
                "H1 AI kan mij helpen · H2 Ik kan AI zelf gebruiken",
                "H3 Ik kan mijn vraag duidelijker maken · H4 Ik gebruik AI verstandig",
                "Slotzin: Ik kan AI gebruiken, maar ik blijf zelf nadenken.",
            ],
        ),
    ]
    for title, lines in blocks:
        new_page_if_needed(pdf, estimate_box_mm(pdf, title, lines))
        pdf.box(title, lines)

    # HULP
    pdf.add_page()
    pdf.h1("3. Hulp bij vastlopen")
    pdf.muted("Helper beslist niet vóór. Geen live bron. Geen H1–H3 herles.")
    items = [
        ("A · Weet niet of controleren", "“Wat gebeurt er als dit antwoord fout is?”"),
        ("B · AI klinkt heel zeker", "Zeker klinken ≠ automatisch kloppen."),
        ("C · AI gevraagd of het zeker weet", "Dat is nog geen onafhankelijke controle."),
        ("D · Waar controleren?", "“Welke organisatie of deskundige gaat hierover?”"),
        ("E · Mag ik deze info invoeren?", "“Moet AI dit echt weten om u te helpen?”"),
        ("F · Wachtwoord / code / BSN", "NIET invoeren / verwijderen."),
    ]
    for s, a in items:
        pdf.hulp_item(s, a)
    pdf.ln(2)
    pdf.set_font("DejaVu", "I", 11)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(0, 6, "Kort: verdacht bericht/link → Pakket D · DigiD/MijnOverheid → Pakket E.")

    # DEELNEMERSKAART
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart (thuis)")
    pdf.muted("Neem mee · rustig thuis opnieuw gebruiken.")
    pdf.box(
        "AI VERSTANDIG GEBRUIKEN",
        [
            "DEEL NIET ALLES",
            "→ CONTROLEER WAT BELANGRIJK IS",
        ],
    )
    pdf.box(
        "MOET AI DIT ECHT WETEN?",
        [
            "Geef alleen informatie die nodig is.",
            "Geen wachtwoorden, codes, BSN, bankgegevens of andere gevoelige gegevens.",
        ],
    )
    pdf.box("IS HET BELANGRIJK ALS DIT FOUT IS?", [REGEL])
    pdf.box(
        "WAAR KAN IK DIT NOG CONTROLEREN?",
        ["AI opnieuw vragen is geen onafhankelijke controle."],
    )

    # ZAALCHECKLIST
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    checks = [
        "Beamer klaar",
        "Internet niet verplicht (geen live bron · geen Gemini)",
        "Fictieve AI-antwoordkaarten + situatiekaarten klaar",
        "Geen echte privégegevens in voorbeelden",
        "Controlerichtingen vooraf bepaald (geen URL’s)",
        "Helper kent drie beslisvragen",
        "Geen login noodzakelijk (Route D)",
        "Fallback A/B/C beschikbaar indien toch AI",
        "Eindmissie ca. 10–12 min beschermd",
        "Geen echte medische/juridische/financiële casussen oplossen",
        "Print + beamer bij de hand",
        "H1–H3 niet opnieuw geven",
        "Geen live browsercontrole",
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
    pdf.multi_cell(
        0,
        6,
        "Vast: H4 = controleren · geen angstles · geen factcheckopleiding · geen Gemini-imitatie.",
    )

    pdf.output(str(OUT))
    print("wrote", OUT, "pages", pdf.page)
    return OUT


if __name__ == "__main__":
    build()
