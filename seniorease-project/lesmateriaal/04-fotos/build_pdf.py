#!/usr/bin/env python3
"""Genereer de printklare PDF voor Les 4 Foto's (SeniorEase)."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT_DIR = ROOT / "pdf"
OUT_FILE = OUT_DIR / "SeniorEase-Les-Fotos-v1.pdf"

NAVY = (46, 36, 28)
GOLD = (139, 94, 60)
CREAM = (245, 238, 230)
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
        self.cell(0, 4, "SeniorEase  |  Les 4: Foto's  |  v1.0", align="L")
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


def build() -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF()
    pdf.alias_nb_pages()

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
    pdf.multi_cell(170, 11, "Foto's maken, vinden en delen")
    pdf.set_x(18)
    pdf.set_font("DejaVu", "", 13)
    pdf.multi_cell(170, 7, "Camera, galerij en WhatsApp - 90 minuten")

    pdf.set_y(90)
    pdf.set_text_color(*NAVY)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(
        0,
        6,
        "Doe-middag op de eigen telefoon. Foto maken, terugvinden in de galerij, "
        "en optioneel delen via WhatsApp. Geen filters, geen computer.",
    )
    pdf.ln(3)
    pdf.box(
        "In dit document",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart",
            "3. Oefentaken",
            "4. Zaalchecklist",
            "5. Nazorgkaart",
        ],
    )
    pdf.muted("Versie 1.0 - augustus 2026")
    pdf.muted("Gids: seniorease.nl/uitleg/fotos-maken")
    pdf.muted("Prijs losse les (webshop): werkvoorstel EUR 6,95")

    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.muted("90 minuten (+ 15 inloop)  |  Max. 8-10  |  1 begeleider + 1 helper")

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "Camera openen en een scherpere foto maken",
            "Foto terugvinden in Galerij / Foto's",
            "Optioneel: een foto delen via WhatsApp",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Niet in deze les")
    pdf.bullet("Geen overzetten naar de computer")
    pdf.bullet("Geen filters of bewerken")
    pdf.bullet("Geen verplicht cloud-account")

    pdf.h2("Tijdlijn")
    pdf.muted("Voorbeeldrooster bij start 12:00. Begint u later? Schuif de tijden op.")
    pdf.h3("12:00-12:15 Inloop")
    pdf.body("Welkom. Camera check. Batterij.")
    pdf.h3("12:15-12:25 Kennismaking")
    pdf.body("Voornaam + Android/iPhone. Geen foto's van onbekenden zonder toestemming.")
    pdf.h3("12:25-12:45 Stap 1: Camera en drie tips")
    pdf.body("Licht op het onderwerp, stilhouden, tikken om scherp te stellen. Maak 2-3 foto's.")
    pdf.h3("12:45-13:05 Stap 2: Terugvinden")
    pdf.body("Galerij / Foto's openen. Recente foto's. Foto groot openen.")
    pdf.h3("13:05-13:10 Pauze")
    pdf.h3("13:10-13:30 Stap 3: Delen via WhatsApp")
    pdf.body("Delen-icoon of via WhatsApp-bijlage. Oefencontact. Geen WhatsApp? Stop na stap 2.")
    pdf.h3("13:30-13:45 Afronding")
    pdf.body("Nazorgkaart + gidsen op seniorease.nl.")

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Schrap WhatsApp-delen")
    pdf.bullet("Niet schrappen: maken + terugvinden")

    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 15)
    pdf.cell(0, 11, "  Foto's maken, vinden en delen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  ·  seniorease.nl/uitleg/fotos-maken")
    pdf.ln(2)

    pdf.h2("1. Foto maken")
    pdf.numbered(1, "Open de Camera")
    pdf.numbered(2, "Licht op uw onderwerp")
    pdf.numbered(3, "Houd stil (twee handen)")
    pdf.numbered(4, "Tik op het scherm om scherp te stellen")
    pdf.numbered(5, "Druk af - maak gerust 2 of 3 foto's")

    pdf.h2("2. Foto terugvinden")
    pdf.numbered(1, "Open Galerij of Foto's")
    pdf.numbered(2, "Zoek bij recente foto's")
    pdf.numbered(3, "Tik om groot te openen")

    pdf.h2("3. Delen via WhatsApp")
    pdf.numbered(1, "Open de foto - Delen - WhatsApp - contact - versturen")
    pdf.body("Of: WhatsApp - gesprek - paperclip/camera - foto - versturen")

    pdf.add_page()
    pdf.h1("3. Oefentaken")
    pdf.h2("Oefentaak 1 - Maken")
    pdf.body("Camera openen. Iets in de zaal (niet tegen licht in). Stil, tikken, 2-3 foto's.")
    pdf.h2("Oefentaak 2 - Terugvinden")
    pdf.body("Galerij / Foto's. Zoek de foto's van zojuist. Open er een groot.")
    pdf.h2("Oefentaak 3 - Delen (optioneel)")
    pdf.body("Delen via WhatsApp naar oefencontact. Geen WhatsApp? Stop na taak 2.")

    pdf.h2("Helper")
    pdf.bullet("Android: Galerij / Google Foto's; Delen-icoon")
    pdf.bullet("iPhone: Foto's; deelvierkant met pijl omhoog")

    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    for t in [
        "Genoeg licht om te oefenen",
        "Wifi handig voor delen, niet verplicht",
        "Stopcontacten",
        "8-10x deelnemerskaart en nazorgkaart",
        "Begeleider als oefenontvanger WhatsApp",
        "Max. 8-10 deelnemers + helper",
    ]:
        pdf.check(t)

    pdf.add_page()
    pdf.h1("5. Nazorgkaart")
    pdf.set_draw_color(*GOLD)
    y0 = pdf.get_y()
    pdf.rect(pdf.l_margin, y0, pdf.epw, 85, "D")
    pdf.set_xy(pdf.l_margin + 6, y0 + 6)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(pdf.epw - 12, 7, "Thuis nog eens oefenen")
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(
        pdf.epw - 12,
        5.5,
        "1. Maak 2 of 3 foto's  2. Zoek ze terug  3. Deel er een via WhatsApp",
    )
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "B", 11)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(pdf.epw - 12, 6, "seniorease.nl/uitleg/fotos-maken")
    pdf.set_x(pdf.l_margin + 6)
    pdf.multi_cell(pdf.epw - 12, 6, "seniorease.nl/uitleg/fotos-ordenen")
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(pdf.epw - 12, 5.5, "Tip: maak meerdere foto's en kies de beste.")
    pdf.set_y(y0 + 95)
    pdf.h2("Licentie")
    pdf.body(
        "Copyright SeniorEase. Printen voor uzelf of een lesgroep mag. "
        "Niet doorverkopen zonder toestemming."
    )

    pdf.output(str(OUT_FILE))
    return OUT_FILE


if __name__ == "__main__":
    print(f"PDF geschreven: {build()}")
