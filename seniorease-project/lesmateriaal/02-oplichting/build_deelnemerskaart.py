#!/usr/bin/env python3
"""1-pagina deelnemerskaart Oplichting — handig om 8–10× te printen."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT = ROOT / "pdf" / "SeniorEase-Deelnemerskaart-Oplichting-v1.pdf"

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
    pdf.cell(0, 14, "  Oplichting herkennen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2.5, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(5)

    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 11)
    pdf.multi_cell(0, 6, "SeniorEase lesmiddag  ·  seniorease.nl/uitleg/veiligheid")
    pdf.ln(3)

    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Vijf alarmsignalen")
    pdf.set_font("DejaVu", "", 12)
    pdf.set_text_color(*NAVY)
    for i, t in enumerate(
        [
            'Druk - "Betaal nu", "anders geblokkeerd"',
            "Vreemd nummer of afzender",
            "Spelfouten of rare zinnen",
            "Vreemde link - het adres klopt niet",
            "Vraag om gegevens of geld - nooit via SMS of WhatsApp",
        ],
        1,
    ):
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 6.5, f"{i}. {t}")
        pdf.ln(1)

    pdf.ln(3)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Bij twijfel - drie stappen")
    pdf.set_font("DejaVu", "", 12)
    pdf.set_text_color(*NAVY)
    for line in (
        "1. Niet klikken en niet overmaken",
        "2. Negeren of ophangen",
        "3. Zelf checken via een nummer of site die u al kende",
    ):
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 6.5, line)

    pdf.ln(6)
    y = pdf.get_y()
    pdf.set_draw_color(*GOLD)
    pdf.rect(16, y, 178, 28)
    pdf.set_xy(20, y + 4)
    pdf.set_font("DejaVu", "B", 11)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(170, 6, "Twijfel is verstandig. U hoeft niet snel te zijn.")
    pdf.set_x(20)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(170, 5, "Typ adressen zelf: digid.nl · belastingdienst.nl · uw bank.nl")

    pdf.set_y(-22)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, "SeniorEase - rustig en duidelijk  ·  seniorease.nl", align="C")

    pdf.output(str(OUT))
    return OUT


if __name__ == "__main__":
    print(f"PDF geschreven: {build()}")
