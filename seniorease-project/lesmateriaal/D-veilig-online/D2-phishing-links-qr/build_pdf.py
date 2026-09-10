#!/usr/bin/env python3
"""D2 Veilig omgaan met links en QR-codes — printpakket v2.0."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, MUTED, NAVY  # noqa: E402

D2_VERSION = "v2.0"
D2_TITLE = "Veilig omgaan met links en QR-codes"
D2_SUB = "Zelf een webadres kiezen en de bestemming van een QR eerst bekijken"
OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D2-Links-QR-v2.pdf"


def room_left(pdf: DLessonPDF) -> float:
    return pdf.h - pdf.b_margin - pdf.get_y()


def new_page_if_needed(pdf: DLessonPDF, min_mm: float) -> None:
    if pdf.get_y() > 50 and room_left(pdf) < min_mm:
        pdf.add_page()


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D2 {D2_TITLE}  |  Pakket D  |  {D2_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf._footer_version = D2_VERSION
    pdf.alias_nb_pages()

    pdf.cover(
        f"D2 - {D2_TITLE}",
        "Les circa 90 minuten",
        f"{D2_SUB}. "
        "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. "
        "SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER. "
        "Ook geschikt voor begeleiders zonder technische achtergrond.",
        [
            "START HIER · Draaiboek · Beamer · Hulp bij vastlopen · Deelnemerskaart · Zaalchecklist",
            "De Beamer hoort bij deze les en wordt als apart PDF-bestand geleverd.",
            "QR-1 en QR-2 als printklare veilige oefencodes (aparte bestanden).",
        ],
        [
            "Versie 2.0 — september 2026",
            "Bouwt voort op D1",
            "Gidsen: seniorease.nl/uitleg/veiligheid · /uitleg/qr-code",
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
        "iPhone en Android gelijkwaardig. Alleen kijkkaarten en veilige SeniorEase-QR’s.",
    )

    # ── 1. START HIER — één rustige A4 ─────────────────────────────────────
    pdf.add_page()
    pdf.h1("1. START HIER — voor de begeleider")
    pdf.muted("Lees dit blad eerst. Voorbereiding circa 10–15 minuten.")
    pdf.box(
        "U hoeft geen URL-expert te zijn",
        [
            "U begeleidt. Deelnemers oefenen op hun eigen toestel.",
            "Pakketkapstok: STOP → NIET VERDERGAAN → ZELF CONTROLEREN.",
            "D2-kapstok: SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER.",
            "NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN.",
        ],
    )
    pdf.h2("Wat leert de deelnemer?")
    pdf.body(
        "Zelf een bekend webadres typen, op eenvoudige kaarten herkennen welke website "
        "het adres noemt, en bij een QR eerst de bestemming bekijken vóór verdergaan."
    )
    pdf.h2("Kern van vandaag")
    pdf.body(
        "Typen: digid.nl (opt. postnl.nl) · geen login. "
        "Domein: kaarten 1–2 · vóór de / · rechts→links. "
        "QR-1 → /uitleg/veiligheid · QR-2 eindmissie → /uitleg/qr-code. "
        "Eindmissie 12 min · zonder voordoen · kaart 3 + QR-2."
    )
    pdf.h2("Veiligheid")
    pdf.body(
        "Alleen kijkkaarten · alleen veilige SeniorEase-QR’s · geen verdachte links · "
        "geen long-press verplicht · slotje ≠ bewijs · QR op vertrouwde plek ≠ automatisch veilig."
    )
    pdf.h2("Vooraf (± 10–15 min)")
    pdf.numbered(1, "Bekijk de beamer-PDF.")
    pdf.numbered(2, "Test digid.nl (zonder login) op iPhone én Android.")
    pdf.numbered(3, "Scan QR-1 en QR-2 — bestemmingen moeten verschillen.")
    pdf.numbered(4, "Hulp · kaarten 1–3 · print · beamer · kabels.")
    pdf.h2("Groep & afspraken")
    pdf.body(
        "Max. ca. 8–10 · helper sterk aanbevolen · inloop telt niet mee · "
        "iPhone én Android · eindmissie 12 min altijd behouden. "
        'Eerst “Wat ziet u nu?” · vragen → uitleggen → aanwijzen → zelf. '
        "Geen D1 als hoofdles · geen D3/D4 · geen C4."
    )

    # ── 2. Draaiboek ───────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("2. Draaiboek — begeleider")
    pdf.h2("Rollen")
    pdf.body("Begeleider: tempo, groep, kijkkaarten, QR-1/QR-2.")
    pdf.body('Helper: alleen 1-op-1. "Wat ziet u nu?" · groep niet stilleggen.')
    pdf.h2("Leerdoel")
    pdf.body(
        "Zelf een webadres kiezen; op eenvoudige kaarten herkennen welke website het adres noemt; "
        "bij een QR eerst de bestemming bekijken."
    )
    pdf.h2("Centrale situatie")
    pdf.body(
        '"U krijgt een bericht met een link naar een website. '
        'Hoe weet u waar u terechtkomt — en wat doet u als u twijfelt?"'
    )
    pdf.h2("Gouden kapstokken")
    pdf.body("STOP → NIET VERDERGAAN → ZELF CONTROLEREN")
    pdf.body("SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER")
    pdf.body("NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN")

    tijdlijn = [
        ("0–5", "Brug D1 + centrale situatie"),
        ("5–12", "Kapstokken · slotje is geen bewijs"),
        ("12–25", "Adres zelf typen (digid.nl)"),
        ("25–40", "Domein vergelijken (kaarten 1–2)"),
        ("40–50", "Link in bericht — alleen kijken"),
        ("50–55", "Pauze"),
        ("55–70", "QR-1 begeleid"),
        ("70–78", "Herhalen / hulp"),
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
    pdf.bullet("Bij uitloop: typed adres 2 inkorten. Niet schrappen: domein + QR-regel + eindmissie.")

    pdf.add_page()
    pdf.box(
        "Exacte begeleiderszinnen",
        [
            "Zelf typen: Ik typ zelf een webadres dat ik ken — niet via de link in het bericht.",
            "Domein: Ik kijk eerst naar het deel vóór de eerste /, dan van rechts naar links — "
            "een bekende naam ervoor maakt de website niet automatisch officieel.",
            "QR: Scan de QR. Kijk naar de melding die verschijnt. "
            "Bekijk welke website of bestemming wordt genoemd voordat u erop tikt.",
        ],
    )
    pdf.h2("Wat u niet doet")
    pdf.bullet("Geen D1 opnieuw als hoofdles · geen D3/D4 · geen C4")
    pdf.bullet("Geen echte verdachte links/QR’s · geen login · geen long-press verplicht")
    pdf.bullet("Geen technische URL-les · geen certificaatles")

    def blok(titel: str, rows: list[tuple[str, str]]) -> None:
        est = 30 + 11.5 * len(rows)
        if room_left(pdf) < est:
            pdf.add_page()
        pdf.h2(titel)
        for label, text in rows:
            pdf.field(label, text, allow_break=False)

    pdf.add_page()
    blok(
        "Inloop (buiten 90)",
        [
            (
                "Zegt",
                "Welkom. Vandaag: zelf typen en bij QR eerst kijken waar u terechtkomt. "
                "Geen verdachte links openen.",
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
            ("Zegt", "Brug D1 in één zin. Situatie voorlezen. “Wat doet u?” — wacht."),
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
                "STOP → NIET VERDERGAAN → ZELF CONTROLEREN. Daarna QR-kapstok: "
                "SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER. "
                "Slotje/HTTPS is geen bewijs.",
            ),
            ("Toont", "Kapstokken · risico’s (aparte dia’s)"),
            ("Voordoet", "—"),
            ("Deelnemer", "Leest mee"),
            ("Controleert", "—"),
            ("Helper", "—"),
            ("Doorgaan", "Na kapstok"),
            ("Inkorten", "Brug D1 weglaten"),
        ],
    )

    blok(
        "Zelf typen (12–25)",
        [
            (
                "Zegt",
                "Open de browser. Typ zelf digid.nl. Kijk in de adresbalk. Niet inloggen.",
            ),
            ("Toont", "Adresbalk iPhone | Android (apart waar nodig)"),
            ("Voordoet", "Browser · typen · adresbalk aanwijzen"),
            ("Deelnemer", "Zelf typen · adresbalk bekijken"),
            ("Controleert", "Zelf getypt · niet via een link"),
            ("Helper", "“Wat ziet u nu?” · aanwijzen · niet overnemen"),
            ("Doorgaan", "Meeste zien digid.nl in de balk"),
            ("Inkorten", "Alleen voordoen + enkele deelnemers"),
        ],
    )

    pdf.add_page()
    blok(
        "Domein vergelijken (25–40)",
        [
            (
                "Zegt",
                "Alleen kijken — niets openen. Eerst het deel vóór de eerste /. "
                "Dan van rechts naar links. Een bekende naam ervoor maakt de website "
                "niet automatisch officieel. Kaart 1 en 2.",
            ),
            ("Toont", "Domeinkaarten 1 en 2 (niet-klikbaar · niet openen)"),
            ("Voordoet", "Wijst aan op kaart — zonder te openen"),
            ("Deelnemer", "Wijst aan / zegt welke website het is"),
            ("Controleert", "Geen nep-URL’s geopend · bekende naam ervoor ≠ officiële site"),
            ("Helper", "1-op-1 · “Wat ziet u nu?”"),
            ("Doorgaan", "Meeste kunnen kaart 2 (nepsite.com)"),
            ("Inkorten", "Alleen kaart 2 behandelen"),
        ],
    )
    pdf.body("Optioneel bij tijd (niet verplicht): zelf postnl.nl typen en adresbalk checken.")

    blok(
        "Link in bericht (40–50)",
        [
            (
                "Zegt",
                "Fictief kijkvoorbeeld met “link”. Tik niet. "
                "Bij twijfel: wegleggen · zelf bekend adres typen.",
            ),
            ("Toont", "Fictief bericht met niet-klikbare “link”-regel"),
            ("Voordoet", "Kort: stop · zelf typen (geen lang indrukken)"),
            ("Deelnemer", "Alleen kijken · eventueel zelf digid.nl/postnl.nl typen"),
            ("Controleert", "Niemand heeft op een verdachte link getikt"),
            ("Helper", "Mag 1-op-1 tonen hoe een link eruitziet — geen groepsverplichting long-press"),
            ("Doorgaan", "Korte ronde"),
            ("Inkorten", "Alleen benoemen"),
        ],
    )

    # Pauze + QR-1 samen — voorkomt bijna lege pauzepagina
    pdf.add_page()
    pdf.h2("Pauze (50–55)")
    pdf.body("Korte pauze. Daarna QR-1 begeleid.")
    blok(
        "QR-1 begeleid (55–70)",
        [
            (
                "Zegt",
                "Alleen de QR van de begeleider. "
                "“Scan de QR. Kijk naar de melding die verschijnt. "
                "Bekijk welke website of bestemming wordt genoemd voordat u erop tikt.” "
                "QR op een vertrouwde plek is niet automatisch veilig. "
                "“Uw scherm kan er iets anders uitzien. Dat is normaal.”",
            ),
            ("Toont", "QR-1 (naar SeniorEase-veiligheidspagina)"),
            ("Voordoet", "Scannen · melding/bestemming tonen vóór tikken"),
            ("Deelnemer", "Zelf scannen · bestemming bekijken · dan pas openen of stoppen"),
            ("Controleert", "Bestemming bekeken · juiste QR · niet doortikken om beamer te volgen"),
            ("Helper", "Camera-rechten · “Wat ziet u nu?” · melding mag per toestel anders"),
            ("Doorgaan", "Meeste hebben bestemming gezien"),
            ("Inkorten", "Voordoen + enkele deelnemers"),
        ],
    )

    blok(
        "Herhalen / hulp (70–78)",
        [
            ("Zegt", "Waar liep het vast?"),
            ("Toont", "Kapstok / domeinkaart indien nodig"),
            ("Voordoet", "Alleen op verzoek"),
            ("Deelnemer", "Extra oefening of rust"),
            ("Controleert", "—"),
            ("Helper", "Vastlopers"),
            ("Doorgaan", "Op tijd voor 12 min eindmissie"),
            ("Inkorten", "Zo kort mogelijk"),
        ],
    )

    pdf.add_page()
    pdf.h2("Eindmissie (78–90) — 12 min — zonder voordoen — altijd behouden")
    pdf.muted(
        "Deelnemersbeamer: open opdracht · kaart 3 · QR-2. "
        "Geen antwoorden · geen stappenlijst op de beamer."
    )
    pdf.box(
        "Open opdracht (beamer)",
        [
            "U krijgt een link-voorbeeld en een QR.",
            "Wat doet u nu?",
            "Laat zien hoe u zelf typt, het echte domein aanwijst, en de QR-bestemming eerst bekijkt.",
        ],
    )
    pdf.body("Observatiechecklist begeleider (niet op beamer):")
    for i, t in enumerate(
        [
            "Typt zelf een bekend adres (bijv. digid.nl of postnl.nl).",
            "Wijst op nieuwe domeinkaart 3 (postnl.nl.pakket-controle.example) aan: "
            "website is pakket-controle.example — postnl.nl staat wel in het adres, "
            "maar dit is niet de officiële PostNL-website.",
            "Scant QR-2 (andere bestemming dan QR-1).",
            "Bekijkt de melding/bestemming vóór erop te tikken.",
            "Gaat niet via een verdachte link verder.",
            "Benoemt kort: bij twijfel stop ik / controleer ik zelf.",
            "Geen login · geen betalen · geen code.",
        ],
        1,
    ):
        pdf.numbered(i, t)

    new_page_if_needed(pdf, 75)
    blok(
        "Eindmissie — rollen",
        [
            ("Zegt", "Dit doet u zelf. Geen antwoorden van tevoren."),
            ("Toont", "Open opdracht · kaart 3 · QR-2"),
            ("Voordoet", "Nee"),
            ("Deelnemer", "Zelfstandig"),
            ("Controleert", "Checklist"),
            ("Helper", "Alleen “Wat ziet u nu?”"),
            ("Doorgaan", "Afsluiting"),
            ("Inkorten", "Nooit schrappen"),
        ],
    )
    pdf.bullet(
        'Afsluiting: "Gelukt? Dan weet u hoe u zelf een webadres kiest, '
        "waar u naar de echte websitenaam kijkt, en hoe u bij een QR eerst "
        'de bestemming bekijkt vóór u verdergaat."'
    )

    # ── 3. Hulp ────────────────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("3. D2 — Hulp bij vastlopen")
    pdf.muted("Voor begeleider en helper. Niet op de beamer.")
    pdf.box(
        "Centrale vraag + volgorde",
        [
            'Eerst: "Wat ziet u nu?"',
            "Daarna: vragen → uitleggen → aanwijzen → zelf → pas laatste kort overnemen.",
        ],
    )
    hulp = [
        ("Ik vind de browser / adresbalk niet", "iPhone | Android tonen · “Uw scherm kan anders zijn”"),
        ("Mag ik op de link in het bericht tikken?", "Nee bij twijfel · zelf typen"),
        (
            "Er staat DigiD / PostNL in de lange link",
            "Eerst vóór de / · van rechts naar links · bekende naam ervoor ≠ officiële site · kaartvoorbeeld",
        ),
        ("Slotje = veilig?", "Nee · slotje is geen bewijs"),
        ("QR doet niets / camera mag niet", "Helper 1-op-1 · toestemming · andere scanner-app indien nodig"),
        ("Mijn QR-scherm lijkt niet op de beamer", "Dat is normaal · kijk naar de bestemming op úw melding"),
    ]
    for situatie, actie in hulp:
        pdf.hulp_item(situatie, actie)

    pdf.add_page()
    pdf.h2("Hulp bij vastlopen — vervolg")
    hulp2 = [
        ("Mag ik doortikken om verder te kijken?", "Nee · eerst bestemming · dan bewust openen of stoppen"),
        ("Is elke QR op een poster veilig?", "Nee · eerst bestemming bekijken"),
        ("Ik heb per ongeluk geopend", "Stop · niet inloggen · helper 1-op-1"),
        ("Verschil QR-1 en QR-2?", "Twee verschillende veilige SeniorEase-pagina’s · eindmissie is QR-2"),
        ("Afwijkend toestel", "Helper 1-op-1 — groep niet stilleggen"),
    ]
    for situatie, actie in hulp2:
        pdf.hulp_item(situatie, actie)

    # ── 4. Deelnemerskaart ─────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("4. Deelnemerskaart")
    pdf.muted("Mee naar huis. Thuis binnen enkele seconden bruikbaar.")
    pdf.box(
        "Bij een link of QR",
        ["STOP → NIET VERDERGAAN → ZELF CONTROLEREN"],
    )
    pdf.box(
        "QR",
        ["SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER"],
    )
    pdf.box(
        "Doe dit niet",
        [
            "NIET BETALEN",
            "GEEN CODE DELEN",
            "NIET OP EEN ONVERWACHTE LINK TIKKEN",
        ],
    )
    pdf.h2("Zelf")
    pdf.body("Typ zelf een adres dat u kent.")
    pdf.body("Kijk waar de echte websitenaam eindigt.")
    pdf.body("Bij QR: eerst kijken waar u terechtkomt.")
    pdf.body("Bij twijfel: stoppen.")
    pdf.h2("Dit kan ik nu")
    for t in [
        "Zelf een webadres typen",
        "Het echte domein aanwijzen",
        "Een QR-bestemming eerst bekijken",
        "Bij twijfel stoppen",
    ]:
        pdf.check(t)
    pdf.muted("SeniorEase · D2 · v2.0 · seniorease.nl/uitleg/veiligheid")

    # ── 5. Zaalchecklist ───────────────────────────────────────────────────
    pdf.add_page()
    pdf.h1("5. Zaalchecklist")
    for t in [
        "START HIER gelezen; hulpkaart bij de hand",
        "Domeinkaarten 1–3 gereed (niet-klikbaar · niet-werkend · kaart 3 = postnl.nl.pakket-controle.example)",
        "QR-1 getest → seniorease.nl/uitleg/veiligheid",
        "QR-2 getest → seniorease.nl/uitleg/qr-code (andere bestemming)",
        "digid.nl / postnl.nl tot startscherm zonder login (iPhone én Android)",
        "Geen echte verdachte links of QR’s",
        "Geen verplicht lang indrukken",
        "Helper kent: SCANNEN → BESTEMMING BEKIJKEN → CONTROLEREN → PAS DAN VERDER",
        "Helper kent: QR-melding verschilt per toestel · niet doortikken om beamer te volgen",
        "Helper kent: slotje ≠ bewijs · QR op vertrouwde plek ≠ automatisch veilig",
        "Eindmissie: open opdracht · checklist bij begeleider · 12 min beschermd",
        "Beamer-PDF klaar",
        "8–10× deelnemerskaart",
        "Geen D1 als hoofdles · geen D3/D4 naar voren",
    ]:
        pdf.check(t)

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
