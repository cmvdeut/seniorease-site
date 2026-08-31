#!/usr/bin/env python3
"""D4 Veilig betalen."""
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from _pdf_base import DLessonPDF, GOLD, LESSON_VERSION, MUTED, NAVY, WHITE  # noqa: E402

OUT = Path(__file__).resolve().parent / "pdf" / "SeniorEase-D4-Veilig-Betalen-v1.pdf"


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = DLessonPDF(
        f"SeniorEase  |  D4 Veilig betalen  |  Pakket D  |  {LESSON_VERSION}",
        package_label="Pakket D - Veilig online",
    )
    pdf.alias_nb_pages()

    pdf.cover(
        "D4 - Veilig betalen en bankieren",
        "Lesmiddag 90 minuten",
        "Officiële bank-app of zelf getypte site (geen groeps-login). iDEAL: verwacht, "
        "zelf begonnen, bedrag en betaalcontext. Nooit codes of scherm delen. "
        "Einde pakket D.",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken (op het toestel)",
            "4. iDEAL-voorbeeldkaart + zaalchecklist + nazorgkaart",
        ],
        [
            "Versie 1.1 - augustus 2026",
            "Pakket D compleet - EUR 19,95 voor 4 lessen",
            "Gids: seniorease.nl/uitleg/online-bankieren",
        ],
    )

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.rollen_docent_helper()
    pdf.stappenregel()
    pdf.h2("iDEAL - vier vragen")
    pdf.numbered(1, "Verwacht ik deze betaling?")
    pdf.numbered(2, "Ben ik zelf met deze aankoop begonnen?")
    pdf.numbered(3, "Klopt het bedrag?")
    pdf.numbered(4, "Past ontvanger/betaalcontext bij wat ik wilde betalen?")
    pdf.body("Een betaalprovider-naam kan anders zijn dan de webshop. Logo is geen bewijs.")
    pdf.h2("Nooit")
    pdf.bullet("Pincode, verificatiecode of beveiligingscode doorgeven")
    pdf.bullet("Geld naar een 'veilige rekening' overboeken (bank vraagt dat niet)")
    pdf.bullet("Scherm delen / remote-help op verzoek van een onverwachte beller")
    pdf.bullet("Onverwacht betaalverzoek of QR betalen omdat naam/logo vertrouwd lijkt")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Veilig betalen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.multi_cell(0, 5, f"SeniorEase  -  Pakket D  -  {LESSON_VERSION}")
    pdf.stappenregel()
    pdf.h2("Nooit")
    pdf.bullet("Codes doorgeven")
    pdf.bullet("Scherm delen")
    pdf.bullet("Naar een 'veilige rekening' overboeken")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    for title, body in [
        ("Oefentaak 1 - Bank-route", "App openen of adres zelf typen - geen login verplicht."),
        ("Oefentaak 2 - iDEAL-kaart", "Vier vragen - bij twijfel: niet bevestigen."),
        ("Oefentaak 3 - Onverwacht verzoek", "Niet betalen omdat logo vertrouwd lijkt."),
        ("Oefentaak 4 - Nooit doen", "Nee tegen code en scherm delen."),
        ("Oefentaak 5 - Zelfstandig", "Bank-route - iDEAL-vragen - nooit-zin."),
    ]:
        pdf.h2(title)
        pdf.body(body)

    pdf.add_page()
    pdf.h1("4. iDEAL-voorbeeldkaart (fictief)")
    pdf.box(
        "OEFENING - u betaalt vandaag niet",
        [
            "Bedrag: EUR 87,50",
            "Ontvanger / context: Webshop Bloemenhoek via betaalprovider X",
            "Vragen: verwacht? zelf begonnen? bedrag? past de context?",
            "Twijfel? Nee, dit bevestig ik niet.",
        ],
    )
    pdf.h2("Zaalchecklist")
    for t in [
        "Geen klassikale banklogin",
        "iDEAL-kaart geprint",
        "8-10x deelnemerskaart en oefentaken",
        "Helper 1-op-1 als iemand wél wil inloggen",
    ]:
        pdf.check(t)
    pdf.ln(4)
    pdf.nazorg_card(
        [
            "STOP - niet betalen - zelf de officiële app of site.",
            "Nooit codes of scherm delen. Bank vraagt geen veilige rekening.",
            "seniorease.nl/uitleg/veiligheid",
            "Pakket D is compleet. Opfrisser: les D1.",
        ]
    )

    pdf.output(str(OUT))
    print(f"PDF geschreven: {OUT}")
    return OUT


if __name__ == "__main__":
    build()
