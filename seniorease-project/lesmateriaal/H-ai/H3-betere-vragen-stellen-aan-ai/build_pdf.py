#!/usr/bin/env python3
"""H3 Betere vragen stellen aan AI — printpakket v2.0 (Pakket H)."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import GOLD, HLessonPDF, MUTED, NAVY  # noqa: E402

H3_VERSION = "v2.0"
H3_TITLE = "Betere vragen stellen aan AI"
H3_SUB = "Duidelijker vragen · bruikbaarder antwoord"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-H3-Betere-vragen-stellen-aan-AI-v2.pdf"

VOOR = "Wat kan ik koken?"
NA = (
    "Geef mij drie ideeën voor een eenvoudige avondmaaltijd. "
    "Ik heb aardappelen, broccoli en eieren in huis. "
    "Geef per idee maximaal drie korte stappen."
)


def room_left(pdf: HLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: HLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def estimate_box_mm(pdf: HLessonPDF, title: str, lines: list[str], *, pad: float = 4.0) -> float:
    """Hoogte van één box + lichte tussenruimte — voor page-break zonder orphan restpagina."""
    usable = pdf.epw - 2 * pad
    pdf.set_font("DejaVu", "B", 11)
    h = len(pdf.multi_cell(usable, 5.5, title, split_only=True)) * 5.5
    pdf.set_font("DejaVu", "", 10)
    for line in lines:
        h += max(1, len(pdf.multi_cell(usable, 5, line, split_only=True))) * 5
    # ln(1) vóór box + gap na box (~3) zoals in LessonPDF.box
    return h + 2 * pad + 1 + 3


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = HLessonPDF(
        f"SeniorEase  |  H3 {H3_TITLE}  |  Pakket H  |  {H3_VERSION}",
        package_label="Pakket H - AI in het dagelijks leven",
    )
    pdf._footer_version = H3_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"H3 - {H3_TITLE}",
        "Les circa 90 minuten",
        f"{H3_SUB}. "
        "WAT WILT U? → GEEF WAT INFORMATIE → ZEG HOE U HET WILT. "
        "Geen promptcollege. H2-bediening is voorkennis.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
        ],
        [
            "Versie 2.0 — september 2026",
            "Functie: VERBETEREN",
            "Rode draad: Ik kan betere antwoorden krijgen",
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
        "Geen H2-bedieningsles · geen H4-controleles.",
    )

    # START HIER
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Voorbereiding circa 10–15 minuten. U hoeft geen AI-expert te zijn.")
    pdf.box(
        "Belofte",
        [
            "Ik kan mijn vraag aan AI duidelijker maken zodat het antwoord beter bij mij past.",
        ],
    )
    pdf.box(
        "Doel vandaag",
        [
            "Functie: VERBETEREN · Rode draad: Ik kan betere antwoorden krijgen.",
            "Route: WAT WILT U? → GEEF WAT INFORMATIE → ZEG HOE U HET WILT",
            "Niet altijd alle drie nodig.",
            "VOOR/NA: vage vraag → duidelijkere vraag → bruikbaarder antwoord.",
            "H2-bediening is voorkennis — niet opnieuw geven.",
        ],
    )
    pdf.box(
        "Niet in H3",
        [
            "Geen promptcollege · geen perfecte prompts · geen jargon",
            "Geen openen/typvak/nieuw gesprek (H2) · geen broncontrole (H4)",
            "Geen account/loginles",
        ],
    )
    new_page_if_needed(pdf, 50)
    pdf.box(
        "Fallback A / B / C (H2-contract)",
        [
            "A — Eigen apparaat",
            "B — Zaaltoestel vooraf open",
            "C — Deelnemer formuleert en dicteert; u voert alleen noodzakelijke bediening uit",
        ],
    )
    pdf.box(
        "Helper",
        [
            "“Wat ziet u nu?” · “Wat wilt u precies?” · “Welke info?” · “Hoe wilt u het?”",
            "Formuleer niet meteen de hele vraag voor de deelnemer.",
        ],
    )
    pdf.box(
        "Privacy",
        [
            "Geef alleen informatie die nodig is.",
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan nog steeds fout zijn. (H4 = controleren.)",
        ],
    )

    # DRAAIBOEK
    pdf.add_page()
    pdf.h1("2. Draaiboek")
    pdf.muted("Circa 90 minuten · 85 + overgang · eindmissie 10–12 min beschermen.")
    pdf.box("VOOR", [VOOR])
    pdf.box("NA", [NA])
    pdf.box(
        "Oefenronde 1",
        [
            "Vage: Wat kan ik doen? · Situatie: het regent · thuis ontspannen.",
            "Samen bouwen: WAT / INFO / HOE (frozen zinnen).",
        ],
    )
    pdf.box(
        "Kaarten A–D",
        [
            "A Eten — Wat kan ik eten? · brood, ei, tomaat",
            "B Bericht — Schrijf een bericht. · buurman morgen niet thuis · vriendelijk",
            "C Uitleg — Wat is wifi? · gewone taal",
            "D Ideeën — Verjaardag · drie eenvoudige ideeën thuis",
        ],
    )

    blocks = [
        (
            "0–5 · H2-retrieval",
            [
                "Doel: vraag → antwoord → vervolg ophalen · geen bedieningsles",
                "Zegt u: “Waar typt u uw vraag?” · “Wat doet u als u nog iets wilt weten?”",
                "Deelnemer: antwoordt kort · Brug: “Vandaag: vraag duidelijker maken.”",
                "Helper: “Wat ziet u nu?” · Hulpkaart: A",
            ],
        ),
        (
            "5–10 · Startsituatie",
            [
                "Situatie: u wilt iets koken · Toont: “Wat kan ik koken?” + kort antwoord",
                "Vraagt: “Is dit antwoord bruikbaar?” · Check: AI weet nog weinig",
                "Wanneer doorgaan: groep merkt dat het nog weinig past",
            ],
        ),
        (
            "10–18 · WAT WILT U?",
            [
                "Doel: duidelijk zeggen waarvoor hulp",
                "Demonstreert: “Geef mij drie ideeën voor een eenvoudige avondmaaltijd.”",
                "Helper: “Wat wilt u precies weten?” · Hulpkaart: B",
            ],
        ),
        (
            "18–26 · GEEF WAT INFORMATIE",
            [
                "Doel: alleen veilige, nodige info",
                "Demonstreert: … aardappelen, broccoli en eieren",
                "Zegt u: “Niet alles delen. Geen geheimen.” · Helper: “Welke info heeft AI nodig?”",
                "Hulpkaart: C / H",
            ],
        ),
        (
            "26–34 · ZEG HOE U HET WILT",
            [
                "Doel: hoe het antwoord eruit mag zien",
                "Demonstreert: … maximaal drie korte stappen",
                "Regel: “Niet altijd alle drie nodig.” · Helper: “Hoe wilt u het antwoord?”",
                "Hulpkaart: D / E",
            ],
        ),
        (
            "34–40 · Voor/na",
            [
                "Toont: VOOR vs NA groot op beamer",
                "Vraagt: “Welke vraag helpt AI het meest?”",
                "Niet: “Dus het antwoord is waar” (H4)",
            ],
        ),
        (
            "40–49 · Oefenronde 1",
            [
                "Samen: regen / thuis ontspannen · mondeling bouwen · daarna AI",
                "WAT / INFO / HOE · Helper stelt vragen, formuleert niet vóór",
            ],
        ),
        (
            "49–60 · Oefenronde 2",
            [
                "Kaarten A–D · tweetallen / kleine groep",
                "Helper: WAT/INFO/HOE-vragen · geen gevoelige gegevens · Hulpkaart: A–H",
            ],
        ),
        (
            "60–68 · Oefenronde 3",
            [
                "Zelf: gewone vraag → verbeteren met minstens één element → vergelijken",
                "Geen toetsgevoel · Check: merkt verschil",
            ],
        ),
        (
            "68–80 · Eindmissie (10–12)",
            [
                "Zelfstandig: gewone vraag → minstens twee van WAT/INFO/HOE → vergelijken",
                "Zegt: “Dit antwoord past beter omdat…”",
                "Route B/C: deelnemer formuleert; bij C mag helper noodzakelijke bediening",
                "Altijd behouden bij tijdnood",
            ],
        ),
        (
            "80–85+ · Afronding",
            [
                "Thuis: één vraag duidelijker maken",
                "Brug H4: controleren komt later — niet vooruitlopen",
            ],
        ),
    ]
    for title, lines in blocks:
        # Exacte hoogte i.p.v. vaste 42 mm — voorkomt near-empty restpagina voor Afronding
        new_page_if_needed(pdf, estimate_box_mm(pdf, title, lines))
        pdf.box(title, lines)

    # HULP
    pdf.add_page()
    pdf.h1("3. Hulp bij vastlopen")
    pdf.muted("Helper formuleert niet meteen. Geen H4-broncontrole.")
    items = [
        ("A · Weet niet wat te vragen", "Kies kaart A–D · één voorbeeldzin."),
        ("B · Vraag te kort", "“Wat wilt u precies?” · WAT WILT U."),
        ("C · Welke info?", "Eén veilige zin · geen geheimen."),
        ("D · Alle drie verplicht?", "Nee — soms is één genoeg."),
        ("E · Nog niet handig", "Info of hoe · of doorvragen."),
        ("F · Alles opnieuw typen?", "Nee — vervolg mag."),
        ("G · Korter", "“Maak het korter.”"),
        ("H · Persoonlijke info", "Alleen veilig · geen wachtwoorden/codes."),
    ]
    for s, a in items:
        pdf.hulp_item(s, a)

    # DEELNEMERSKAART
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart (thuis)")
    pdf.muted("Neem mee · rustig thuis opnieuw gebruiken.")
    pdf.box(
        "BETERE VRAAG?",
        [
            "WAT WILT U?",
            "→ GEEF WAT INFORMATIE",
            "→ ZEG HOE U HET WILT",
        ],
    )
    pdf.box(
        "Klein voorbeeld",
        [
            "Geef mij drie ideeën voor een eenvoudige lunch.",
            "Ik heb brood, kaas en tomaat in huis.",
            "Geef drie korte ideeën.",
        ],
    )
    pdf.box(
        "Onthoud",
        [
            "U hoeft niet altijd alles te gebruiken.",
            "U kunt ook verder vragen in hetzelfde gesprek.",
        ],
    )
    pdf.box(
        "Veilig",
        [
            "Geef alleen informatie die nodig is.",
            "Geen wachtwoorden, codes of gevoelige gegevens.",
            "Een AI-antwoord kan nog steeds fout zijn.",
        ],
    )

    # ZAALCHECKLIST
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    checks = [
        "Wifi / internet werkt",
        "Beamer klaar",
        "Gemini bereikbaar (geen open-training)",
        "H2-fallback A/B/C indien nodig",
        "Kaarten A–D klaar",
        "Geen privégegevens in voorbeelden",
        "Helper kent WAT/INFO/HOE · formuleert niet vóór",
        "Eindmissie ca. 10–12 min beschermd",
        "H2 niet opnieuw geven",
        "H4 niet vooruitlopen",
        "Print + beamer bij de hand",
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
    pdf.multi_cell(0, 6, "Vast: H3 = verbeteren · geen promptcollege · geen H2-bedieningsles · geen H4.")

    pdf.output(str(OUT))
    print("wrote", OUT)
    return OUT


if __name__ == "__main__":
    build()
