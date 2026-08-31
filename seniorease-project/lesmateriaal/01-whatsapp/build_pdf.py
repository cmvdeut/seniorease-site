#!/usr/bin/env python3
"""Genereer de printklare PDF voor Les 1 WhatsApp (SeniorEase)."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT_DIR = ROOT / "pdf"
OUT_FILE = OUT_DIR / "SeniorEase-Les-WhatsApp-v1.pdf"

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
        self.cell(0, 4, "SeniorEase  |  Les 1: WhatsApp  |  v1.0", align="L")
        self.set_text_color(*MUTED)
        self.cell(0, 4, "seniorease.nl", align="R", new_x="LMARGIN", new_y="NEXT")
        self.ln(6)

    def footer(self) -> None:
        self.set_y(-14)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 4, "Voor eigen gebruik of een lesgroep. Niet doorverkopen.", align="L")
        self.cell(0, 4, f"Pagina {self.page_no()}/{{nb}}", align="R")

    def cover_band(self) -> None:
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 210, 72, "F")
        self.set_fill_color(*GOLD)
        self.rect(0, 72, 210, 3, "F")

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

    def table_row(self, left: str, right: str, header: bool = False) -> None:
        self.set_font("DejaVu", "B" if header else "", 9)
        self.set_text_color(*NAVY)
        self.set_fill_color(*(SLATE if header else PAPER))
        y = self.get_y()
        x = self.l_margin
        w1, w2 = 50, self.epw - 50
        # Wrap-aware height for right cell
        self.set_xy(x + w1 + 2, y + 1.5)
        # Measure roughly: use fixed row height 10 for safety
        h = 10
        self.rect(x, y, w1, h, "DF")
        self.rect(x + w1, y, w2, h, "DF")
        self.set_xy(x + 2, y + 2.5)
        self.cell(w1 - 4, 5, left)
        self.set_xy(x + w1 + 2, y + 2.5)
        self.cell(w2 - 4, 5, right)
        self.set_y(y + h)


def build() -> Path:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    pdf = LessonPDF()
    pdf.alias_nb_pages()

    # --- Cover ---
    pdf.add_page()
    pdf.cover_band()
    pdf.set_xy(18, 22)
    pdf.set_font("DejaVu", "", 11)
    pdf.set_text_color(*WHITE)
    pdf.cell(0, 6, "SeniorEase lesmateriaal")
    pdf.ln(10)
    pdf.set_x(18)
    pdf.set_font("DejaVu", "B", 28)
    pdf.multi_cell(170, 12, "WhatsApp basis")
    pdf.set_x(18)
    pdf.set_font("DejaVu", "", 14)
    pdf.multi_cell(170, 7, "Berichten en foto sturen - lesmiddag 90 minuten")

    pdf.set_y(90)
    pdf.set_text_color(*NAVY)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(
        0,
        6,
        "Kant-en-klaar printpakket voor bibliotheek, buurthuis of thuis. "
        "Een begeleider + een helper. Deelnemers oefenen op hun eigen telefoon of tablet.",
    )
    pdf.ln(4)
    pdf.box(
        "In dit document",
        [
            "1. Draaiboek voor de begeleider",
            "2. Deelnemerskaart (print per persoon)",
            "3. Oefentaken",
            "4. Zaalchecklist",
            "5. Nazorgkaart (mee naar huis)",
        ],
    )
    pdf.ln(2)
    pdf.muted("Versie 1.0 - augustus 2026")
    pdf.muted("Online gids: https://www.seniorease.nl/uitleg/whatsapp-basis")
    pdf.muted("Prijs losse les (webshop): werkvoorstel EUR 6,95")
    pdf.ln(6)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        0,
        5,
        "Toon: volwassen, rustig, duidelijk. Geen kindertaal. "
        "Principe: kijken, doen, controleren, pauzeren.",
    )

    # --- Draaiboek ---
    pdf.add_page()
    pdf.h1("1. Draaiboek - begeleider")
    pdf.muted(
        "Duur: 90 minuten (+ 15 min inloop)  |  Max. 8-10 deelnemers  |  1 begeleider + 1 helper"
    )

    pdf.h2("Wat deelnemers na afloop kunnen")
    for i, t in enumerate(
        [
            "WhatsApp openen",
            "Een gesprek openen of starten",
            "Een kort tekstbericht sturen",
            "Een foto sturen uit de galerij",
        ],
        1,
    ):
        pdf.numbered(i, t)

    pdf.h2("Wat u niet doet in deze les")
    for t in [
        "Geen groepen aanmaken, status of videobellen",
        "Geen account nieuw aanmaken tenzij iemand echt vastzit (helper 1-op-1)",
        "Geen wedstrijd, quiz of stickers",
    ]:
        pdf.bullet(t)

    pdf.h2("Didactiek (elke stap)")
    pdf.numbered(1, "Kijken - u toont een handeling")
    pdf.numbered(2, "Doen - iedereen dezelfde handeling")
    pdf.numbered(3, "Controleren - helper loopt rond")
    pdf.numbered(4, "Pauzeren - wacht tot driekwart klaar is")

    pdf.h2("Tijdlijn")
    pdf.muted("Voorbeeldrooster bij start 12:00. Begint u later? Schuif de tijden op.")

    pdf.h3("12:00-12:15 - Inloop")
    pdf.body(
        "Welkom, wifi, volume. Vraag of WhatsApp erop staat. "
        "Zegt u: Welkom. Vandaag oefenen we rustig: een bericht en een foto. "
        "U werkt op uw eigen telefoon. We wachten op elkaar."
    )

    pdf.h3("12:15-12:25 - Kennismaking en afspraken")
    pdf.body(
        "Voornaam + Android of iPhone. Afspraken: een stap tegelijk, hand opsteken, "
        "nooit bankgegevens via WhatsApp."
    )

    pdf.h3("12:25-12:35 - Stap 1: WhatsApp openen")
    pdf.body(
        "Toon het groene icoon. Iedereen opent de app. "
        "Ziet iemand het icoon niet: helper zoekt of installeert."
    )

    pdf.h3("12:35-12:50 - Stap 2: Gesprek openen")
    pdf.body(
        "Tik op een naam, of start een nieuwe chat. "
        "Aanbevolen: oefenbericht naar de begeleider (nummer op het bord) "
        "of naar een buur in de zaal."
    )

    pdf.h3("12:50-13:05 - Stap 3: Bericht sturen")
    pdf.body(
        'Typvak, typ: "Hallo, dit is een oefening van de lesmiddag." '
        "Daarna de verstuurknop (pijl)."
    )

    pdf.h3("13:05-13:10 - Korte pauze")
    pdf.body("Stoel rekken, toilet, losse vragen naar de helper.")

    pdf.h3("13:10-13:30 - Stap 4: Foto sturen")
    pdf.body(
        "Paperclip, plus of camera. Kies Foto's of Galerij. Kies een foto. Versturen. "
        "Als er tijd is: foto groot openen door erop te tikken."
    )

    pdf.h3("13:30-13:40 - Afronding")
    pdf.body(
        "Herhaal: openen, bericht, foto. Deel nazorgkaart. "
        "Wijs op seniorease.nl/uitleg/whatsapp-basis."
    )

    pdf.h2("Als de tijd krap is")
    pdf.bullet("Eerst schrappen: foto groot bekijken")
    pdf.bullet("Daarna: voorstelrondje of pauze inkorten")
    pdf.bullet("Niet schrappen: bericht sturen en foto sturen")

    # --- Deelnemerskaart ---
    pdf.add_page()
    pdf.h1("2. Deelnemerskaart")
    pdf.muted("Print per deelnemer (A4). Lettertype groot houden bij afdrukken.")
    pdf.ln(2)

    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 16)
    pdf.cell(0, 12, "  WhatsApp - berichten en foto sturen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase lesmiddag  ·  seniorease.nl/uitleg/whatsapp-basis")
    pdf.ln(2)

    pdf.h3("1. WhatsApp openen")
    pdf.body("Zoek het groene icoon met het witte telefoontje. Tik erop.")

    pdf.h3("2. Een gesprek openen")
    pdf.body(
        "Tik op een naam in de lijst. Nieuw gesprek: tik op de knop voor een nieuwe chat "
        "(vaak een groen icoon of een plus)."
    )

    pdf.h3("3. Een bericht sturen")
    pdf.numbered(1, "Tik onderaan in het witte vak")
    pdf.numbered(2, "Typ uw tekst")
    pdf.numbered(3, "Tik op het verzend-icoon (pijl of vliegtuigje)")

    pdf.h3("4. Een foto sturen")
    pdf.numbered(1, "Open het gesprek")
    pdf.numbered(2, "Tik op paperclip-, plus- of camera-icoon")
    pdf.numbered(3, "Kies Foto's of Galerij")
    pdf.numbered(4, "Tik op een foto")
    pdf.numbered(5, "Tik op Versturen")

    pdf.ln(3)
    pdf.box(
        "Let op",
        [
            "Stuur nooit wachtwoorden, pin-codes of bankgegevens via WhatsApp.",
            "Klik niet op vreemde links. Twijfelt u? Bel op een nummer dat u kent.",
        ],
    )

    # --- Oefentaken ---
    pdf.add_page()
    pdf.h1("3. Oefentaken")

    pdf.h2("Oefentaak 1 - Bericht sturen")
    pdf.numbered(1, "Open WhatsApp.")
    pdf.numbered(2, "Open een gesprek (buur of begeleider).")
    pdf.numbered(3, 'Typ: Hallo, dit is een oefening van de lesmiddag.')
    pdf.numbered(4, "Tik op versturen.")
    pdf.body("Klaar als: u het bericht in de chat ziet staan.")

    pdf.h2("Oefentaak 2 - Foto sturen")
    pdf.numbered(1, "Blijf in het gesprek.")
    pdf.numbered(2, "Tik op paperclip, plus of camera.")
    pdf.numbered(3, "Kies Foto's / Galerij.")
    pdf.numbered(4, "Kies een foto.")
    pdf.numbered(5, "Tik op Versturen.")
    pdf.body("Klaar als: de foto in de chat verschijnt.")

    pdf.h2("Oefentaak 3 - Foto bekijken (als er tijd is)")
    pdf.numbered(1, "Tik in de chat op de foto.")
    pdf.numbered(2, "De foto wordt groter.")
    pdf.numbered(3, "Terug: pijl terug of buiten de foto tikken.")

    pdf.h2("Apparaatverschillen (voor de helper)")
    pdf.table_row("Situatie", "Android / iPhone", header=True)
    pdf.table_row("Nieuwe chat", "Android: rechtsonder · iPhone: vaak rechtsboven")
    pdf.table_row("Bijlage", "Android: paperclip of + · iPhone: + of camera")
    pdf.table_row("Geen WhatsApp", "Play Store of App Store, zoek WhatsApp")
    pdf.ln(3)
    pdf.muted("Helper: leg verschillen niet klassikaal uit - alleen bij wie vastzit.")

    # --- Zaalchecklist ---
    pdf.add_page()
    pdf.h1("4. Zaalchecklist")
    pdf.muted("Print 1x voor de begeleider. Afvinken voor start.")

    pdf.h2("Ruimte")
    for t in [
        "Stoelen/tafels zodat iedereen bij zijn telefoon kan",
        "Genoeg licht; wifi-wachtwoord op bord of A4",
        "Beamer handig, niet verplicht",
        "Koffie/thee optioneel bij inloop",
    ]:
        pdf.check(t)

    pdf.h2("Techniek")
    for t in [
        "Wifi werkt; 8-10 telefoons aankan",
        "Stopcontacten of stekkerdozen",
        "Begeleider-telefoon opgeladen + WhatsApp werkt",
        "Helper aanwezig",
    ]:
        pdf.check(t)

    pdf.h2("Printwerk")
    for t in [
        "1x dit draaiboek / deze PDF voor begeleider",
        "8-10x deelnemerskaart (pagina uit dit document)",
        "8-10x nazorgkaart",
        "Extra pennen",
    ]:
        pdf.check(t)

    pdf.h2("Mensen")
    for t in [
        "Begeleider 20 min voor start",
        "Helper 15 min voor start",
        "Max. 8-10 deelnemers",
        "Na afloop: 30 min evaluatie",
    ]:
        pdf.check(t)

    # --- Nazorgkaart ---
    pdf.add_page()
    pdf.h1("5. Nazorgkaart")
    pdf.muted("Print per deelnemer - mee naar huis.")
    pdf.ln(2)

    pdf.set_draw_color(*GOLD)
    y0 = pdf.get_y()
    pdf.rect(pdf.l_margin, y0, pdf.epw, 115, "D")
    pdf.set_xy(pdf.l_margin + 6, y0 + 6)
    pdf.set_font("DejaVu", "B", 14)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(pdf.epw - 12, 7, "Thuis nog eens oefenen")
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(
        pdf.epw - 12,
        6,
        "U heeft geoefend met: WhatsApp openen, een bericht sturen, een foto sturen.",
    )
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "B", 12)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(pdf.epw - 12, 7, "seniorease.nl/uitleg/whatsapp-basis")
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(
        pdf.epw - 12,
        5.5,
        "Tip: oefen met iemand die u vertrouwt. Stuur een bericht en een foto. "
        "Lukt het niet meteen? Doe morgen alleen openen en bericht opnieuw.",
    )
    pdf.ln(2)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "B", 10)
    pdf.multi_cell(pdf.epw - 12, 5.5, "Veiligheid")
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(
        pdf.epw - 12,
        5.5,
        "Geen wachtwoorden of bankgegevens via WhatsApp. "
        "Geen geld overmaken omdat iemand erom vraagt in een chat. "
        "Twijfel? Bel op een nummer dat u al kende.",
    )
    pdf.ln(3)
    pdf.set_x(pdf.l_margin + 6)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(pdf.epw - 12, 5, "SeniorEase - rustig en duidelijk  ·  seniorease.nl")

    pdf.set_y(y0 + 125)
    pdf.h2("Licentie")
    pdf.body(
        "Copyright SeniorEase. U mag deze PDF printen voor uzelf of voor een lesgroep. "
        "U mag het bestand niet doorverkopen of openbaar plaatsen zonder toestemming. "
        "Vragen: via seniorease.nl."
    )

    pdf.output(str(OUT_FILE))
    return OUT_FILE


if __name__ == "__main__":
    path = build()
    print(f"PDF geschreven: {path}")
