#!/usr/bin/env python3
"""1-pagina deelnemerskaart WhatsApp — handig om 8–10× te printen."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT = ROOT / "pdf" / "SeniorEase-Deelnemerskaart-WhatsApp-v1.pdf"

NAVY = (46, 36, 28)
GOLD = (139, 94, 60)
MUTED = (90, 78, 68)
WHITE = (255, 255, 255)


def build() -> Path:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    pdf = FPDF(format="A4", unit="mm")
    pdf.set_auto_page_break(auto=True, margin=16)
    pdf.set_margins(16, 16, 16)
    pdf.add_font("DejaVu", "", str(FONT_DIR / "DejaVuSans.ttf"))
    pdf.add_font("DejaVu", "B", str(FONT_DIR / "DejaVuSans-Bold.ttf"))
    pdf.add_font("DejaVu", "I", str(FONT_DIR / "DejaVuSans-Oblique.ttf"))
    pdf.add_page()

    pdf.set_fill_color(*NAVY)
    pdf.set_text_color(*WHITE)
    pdf.set_font("DejaVu", "B", 18)
    pdf.cell(0, 14, "  WhatsApp - berichten en foto sturen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2.5, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(5)

    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(0, 6, "SeniorEase lesmiddag  ·  seniorease.nl/uitleg/whatsapp-basis")
    pdf.ln(2)
    pdf.set_text_color(*NAVY)
    pdf.set_font("DejaVu", "", 12)
    pdf.multi_cell(0, 6.5, "Neem uw tijd. Steek uw hand op als u vastzit.")
    pdf.ln(4)

    steps = [
        (
            "1. WhatsApp openen",
            "Zoek het groene icoon met het witte telefoontje. Tik erop.",
        ),
        (
            "2. Een gesprek openen",
            "Tik op een naam in de lijst. Nieuw gesprek: tik op de knop voor een nieuwe chat (groen icoon of plus).",
        ),
        (
            "3. Een bericht sturen",
            "Tik in het witte vak onderaan. Typ uw tekst. Tik op het verzend-icoon (pijl).",
        ),
        (
            "4. Een foto sturen",
            "Tik op paperclip, plus of camera. Kies Foto's of Galerij. Tik op een foto. Tik op Versturen.",
        ),
    ]
    for title, body in steps:
        pdf.set_x(pdf.l_margin)
        pdf.set_font("DejaVu", "B", 13)
        pdf.set_text_color(*GOLD)
        pdf.multi_cell(0, 7, title)
        pdf.set_x(pdf.l_margin)
        pdf.set_font("DejaVu", "", 12)
        pdf.set_text_color(*NAVY)
        pdf.multi_cell(0, 6.5, body)
        pdf.ln(3)

    pdf.ln(2)
    y = pdf.get_y()
    pdf.set_draw_color(*GOLD)
    pdf.rect(16, y, 178, 32)
    pdf.set_xy(20, y + 4)
    pdf.set_font("DejaVu", "B", 12)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(170, 6, "Let op")
    pdf.set_x(20)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(
        170,
        5.5,
        "Stuur nooit wachtwoorden of bankgegevens via WhatsApp. "
        "Klik niet op vreemde links.",
    )

    pdf.set_y(-22)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, "SeniorEase - rustig en duidelijk  ·  seniorease.nl", align="C")

    pdf.output(str(OUT))
    return OUT


if __name__ == "__main__":
    print(f"PDF geschreven: {build()}")
