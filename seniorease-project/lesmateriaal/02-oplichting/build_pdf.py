#!/usr/bin/env python3
"""Genereer de printklare PDF voor Les 2 Oplichting herkennen (SeniorEase)."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT_DIR = ROOT / "pdf"
OUT_FILE = OUT_DIR / "SeniorEase-Les-Oplichting-v1.pdf"

NAVY = (46, 36, 28)
GOLD = (139, 94, 60)
CREAM = (245, 238, 230)
PAPER = (247, 242, 235)
SLATE = (224, 213, 202)
MUTED = (90, 78, 68)
WHITE = (255, 255, 255)


class LessonPDF(FPDF):
    def __init__(self) -> None:
        super().__init__(format="A4", unit="mm")
        self.set_auto_page_break(auto=True, margin=18)
        self.set_margins(18, 18, 18)
        self.add_font("DejaVu", "", str(FONT_DIR / "DejaVuSans.ttf"))
        self.add_font("DejaVu", "B", str(FONT_DIR / "DejaVuSans-Bold.ttf"))
        self.add_font("DejaVu", "I", str(FONT_DIR / "DejaVuSans-Oblique.ttf"))

    def header(self) -> None:
        if self.page_no() == 1:
            return
        self.set_fill_color(*CREAM)
        self.rect(0, 0, 210, 12, "F")
        self.set_font("DejaVu", "", 8)
        self.set_text_color(*GOLD)
        self.set_y(4)
        self.cell(0, 4, "SeniorEase  |  Les 2: Oplichting herkennen  |  v1.0", align="L")
        self.set_text_color(*MUTED)
        self.cell(0, 4, "seniorease.nl", align="R", new_x="LMARGIN", new_y="NEXT")
        self.ln(6)

    def footer(self) -> None:
        self.set_y(-14)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 4, "Voor eigen gebruik of een lesgroep. Niet doorverkopen.", align="L")
        self.cell(0, 4, f"Pagina {self.page_no()}/{{nb}}", align="R")

    def h1(self, text: str) -> None:
        self.set_font("DejaVu", "B", 18)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 8, text)
        self.ln(2)

    def h2(self, text: str) -> None:
        self.ln(2)
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*GOLD)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def h3(self, text: str) -> None:
        self.ln(1)
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 6, text)
        self.ln(0.5)

    def body(self, text: str) -> None:
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 5.2, text)
        self.ln(1)

    def muted(self, text: str) -> None:
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 4.8, text)
        self.ln(1)

    def bullet(self, text: str) -> None:
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*NAVY)
        x = self.get_x()
        self.cell(6, 5.2, "-")
        self.multi_cell(0, 5.2, text)
        self.set_x(x)

    def numbered(self, n: int, text: str) -> None:
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*NAVY)
        x = self.get_x()
        self.cell(8, 5.2, f"{n}.")
        self.multi_cell(0, 5.2, text)
        self.set_x(x)

    def check(self, text: str) -> None:
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*NAVY)
        x = self.get_x()
        self.cell(8, 5.2, "[ ]")
        self.multi_cell(0, 5.2, text)
        self.set_x(x)

    def box(self, title: str, lines: list[str]) -> None:
        self.ln(1)
        start_y = self.get_y()
        x = self.l_margin
        w = self.epw
        self.set_xy(x + 3, start_y + 3)
        self.set_font("DejaVu", "B", 10)
        self.set_text_color(*NAVY)
        self.multi_cell(w - 6, 5, title)
        self.set_font("DejaVu", "", 9)
        for line in lines:
            self.set_x(x + 3)
            self.multi_cell(w - 6, 4.8, line)
        end_y = self.get_y() + 3
        self.set_draw_color(*GOLD)
        self.rect(x, start_y, w, end_y - start_y)
        self.set_y(end_y + 2)

    def example(self, letter: str, text: str) -> None:
        self.set_font("DejaVu", "B", 10)
        self.set_text_color(*GOLD)
        self.cell(0, 5, f"Voorbeeld {letter}", new_x="LMARGIN", new_y="NEXT")
        self.set_font("DejaVu", "I", 9)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 4.8, text)
        self.ln(1.5)


def build() -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF()
    pdf.alias_nb_pages()

    # Cover
    pdf.add_page()
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, 0, 210, 72, "F")
    pdf.set_fill_color(*GOLD)
    pdf.rect(0, 72, 210, 3, "F")
    pdf.set_xy(18, 22)
    pdf.set_font("DejaVu", "", 11)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 6, "SeniorEase lesmateriaal")
    pdf.ln(10)
    pdf.set_x(18)
    pdf.set_font("DejaVu", "B", 26)
    pdf.multi_cell(170, 11, "Oplichting herkennen")
    pdf.set_x(18)
    pdf.set_font("DejaVu", "", 13)
    pdf.multi_cell(170, 7, "Vijf alarmsignalen - lesmiddag 90 minuten")

    pdf.set_y(90)
    pdf.set_text_color(*NAVY)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(
        0,
        6,
        "Rustige doe-middag over phishing, nep-SMS en WhatsApp-fraude. "
        "Voorbeelden op papier - geen links aanklikken. Geschikt voor bibliotheek of buurthuis.",
    )
    pdf.ln(3)
    pdf.box(
        "In dit document",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken + antwoordsleutel",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
    )
    pdf.muted("Versie 1.0 - augustus 2026")
    pdf.muted("Online gids: https://www.seniorease.nl/uitleg/veiligheid")
    pdf.muted("Prijs losse les (webshop): werkvoorstel EUR 6,95")
    pdf.ln(4)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: volwassen, rustig, zonder paniek. Twijfel is verstandig.",
    )

    # Draaiboek
    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.muted("90 minuten (+ 15 inloop)  |  Max. 8-10  |  1 begeleider + 1 helper")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Vijf alarmsignalen herkennen",
            "Een bericht beoordelen: veilig of verdacht",
            "Weten wat te doen bij twijfel",
            "Echt webadres van nep-link onderscheiden",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Belangrijk")
    pdf.bullet("Geen echte phishing-links openen")
    pdf.bullet("Geen bank-apps of inloggen tijdens de les")
    pdf.bullet("Voorbeelden alleen op papier")

    pdf.h2("Tijdlijn (kort)")
    pdf.muted("Voorbeeldrooster bij start 12:00. Begint u later? Schuif de tijden op.")
    pdf.h3("12:00-12:15 Inloop")
    pdf.body("Welkom. Wifi niet nodig. Niets klikken op de telefoon.")
    pdf.h3("12:15-12:25 Kennismaking")
    pdf.body("Voornaam. Heeft u weleens een rare SMS gehad? Afspraken: geen schaamte.")
    pdf.h3("12:25-12:45 Vijf alarmsignalen")
    pdf.body("Druk, vreemd nummer, spelfouten, vreemde link, vraag om gegevens/geld.")
    pdf.h3("12:45-13:05 Oefentaak 1")
    pdf.body("Voorbeelden A-F: veilig (V) of verdacht (D). Klassikaal nabespreken.")
    pdf.h3("13:05-13:10 Pauze")
    pdf.h3("13:10-13:25 Oefentaak 2")
    pdf.body("Drie stappen bij twijfel: niet klikken, negeren/ophangen, zelf checken.")
    pdf.h3("13:25-13:35 Oefentaak 3")
    pdf.body("Welk webadres is echt? digid.nl / bank.nl versus nep-varianten.")
    pdf.h3("13:35-13:45 Afronding")
    pdf.body("Nazorgkaart + seniorease.nl/uitleg/veiligheid. IDO noemen indien nuttig.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap oefentaak 3")
    pdf.bullet("Bij oefentaak 1 alleen A, B, D")
    pdf.bullet("Niet schrappen: vijf signalen + wat bij twijfel")

    # Deelnemerskaart
    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Oplichting herkennen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  ·  seniorease.nl/uitleg/veiligheid")
    pdf.ln(2)

    pdf.h2("Vijf alarmsignalen")
    pdf.numbered(1, 'Druk - "Betaal nu", "anders geblokkeerd"')
    pdf.numbered(2, "Vreemd nummer of afzender")
    pdf.numbered(3, "Spelfouten of rare zinnen")
    pdf.numbered(4, "Vreemde link - het adres klopt niet")
    pdf.numbered(5, "Vraag om gegevens of geld - nooit via SMS/WhatsApp")

    pdf.h2("Bij twijfel - drie stappen")
    pdf.numbered(1, "Niet klikken en niet overmaken")
    pdf.numbered(2, "Negeren of ophangen")
    pdf.numbered(3, "Zelf checken via nummer of site die u al kende")

    pdf.ln(2)
    pdf.box(
        "Echte adressen (voorbeelden)",
        [
            "DigiD: digid.nl",
            "Belastingdienst: belastingdienst.nl",
            "Rabobank / ING: rabobank.nl / ing.nl (uw eigen bank)",
            "Typ het adres zelf - klik niet op een link in een SMS.",
        ],
    )

    # Oefentaken
    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.muted("Alle voorbeelden zijn verzonnen. Open geen links.")

    pdf.h2("Oefentaak 1 - Veilig (V) of verdacht (D)?")
    pdf.example(
        "A",
        "SMS: Uw pakket van PostNL staat klaar. Bevestig hier: postnl-pakket-nu.com/login - binnen 2 uur!",
    )
    pdf.example(
        "B",
        'WhatsApp "kleindochter": Oma, mijn telefoon is kapot. Stuur snel 200 euro via deze link. Vertel het mama niet.',
    )
    pdf.example(
        "C",
        "E-mail van een vriendin die u kent, over de koffie van volgende week. Geen link, geen haast.",
    )
    pdf.example(
        "D",
        "SMS: Rabobank - verdachte betaling. Log in via rabobank-veilig-inloggen.com of uw rekening wordt geblokkeerd.",
    )
    pdf.example(
        "E",
        "U typt zelf in de browser: digid.nl en logt in zoals u gewend bent.",
    )
    pdf.example(
        "F",
        "Telefoontje: Met de Belastingdienst. U krijgt geld terug. Ik heb uw DigiD-code nodig.",
    )

    pdf.h3("Antwoordsleutel (begeleider)")
    pdf.body("A D (druk + link) · B D (geheim + geld) · C V · D D (nep-adres) · E V · F D (ophangen)")

    pdf.h2("Oefentaak 2 - Wat doet u?")
    pdf.body(
        'SMS: "Betaal nu 1 euro om uw account te behouden. Tik op deze link." '
        "Schrijf drie stappen. Gewenst: niet klikken, negeren, zelf echte organisatie checken."
    )

    pdf.h2("Oefentaak 3 - Welk adres is echt?")
    pdf.bullet("ing-bank-secure.com  OF  ing.nl  →  ing.nl")
    pdf.bullet("digid.nl  OF  digid-check-nu.net  →  digid.nl")
    pdf.bullet("belastingdienst-teruggave.com  OF  belastingdienst.nl  →  belastingdienst.nl")

    # Zaalchecklist
    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    pdf.h2("Ruimte en print")
    for t in [
        "Stoelen in groep of U-vorm",
        "Bord voor de drie stappen bij twijfel",
        "Voorbeeldkaarten A-F geprint",
        "8-10x deelnemerskaart en nazorgkaart",
        "Wifi niet verplicht - liever geen links openen",
    ]:
        pdf.check(t)

    pdf.h2("Mensen en toon")
    for t in [
        "Begeleider + helper",
        "Max. 8-10 deelnemers",
        "Geen paniekzaaierij, geen schaamte",
        "Lange verhalen kort houden",
        "IDO/bibliotheek kunnen noemen",
    ]:
        pdf.check(t)

    # Nazorg
    pdf.add_page()
    pdf.h1("5. Nazorgkaart")
    pdf.set_draw_color(*GOLD)
    y0 = pdf.get_y()
    pdf.rect(pdf.l_margin, y0, pdf.epw, 100, "D")
    pdf.set_xy(pdf.l_margin + 6, y0 + 6)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(pdf.epw - 12, 7, "Onthoud dit")
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(
        pdf.epw - 12,
        5.5,
        "Vijf signalen: druk, vreemd nummer, spelfouten, vreemde link, vraag om gegevens/geld.",
    )
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "B", 11)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(pdf.epw - 12, 6, "Bij twijfel: niet klikken - negeren - zelf checken")
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "B", 11)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(pdf.epw - 12, 6, "seniorease.nl/uitleg/veiligheid")
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(
        pdf.epw - 12,
        5.5,
        "Hulp: IDO in veel bibliotheken. Bij fraude: bank + eventueel politie. "
        "Twijfel beschermt u.",
    )
    pdf.set_y(y0 + 110)
    pdf.h2("Licentie")
    pdf.body(
        "Copyright SeniorEase. Printen voor uzelf of een lesgroep mag. "
        "Niet doorverkopen of openbaar plaatsen zonder toestemming."
    )

    pdf.output(str(OUT_FILE))
    return OUT_FILE


if __name__ == "__main__":
    print(f"PDF geschreven: {build()}")
