#!/usr/bin/env python3
"""1-pagina deelnemerskaart Google & Maps."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT = ROOT / "pdf" / "SeniorEase-Deelnemerskaart-Google-Maps-v1.pdf"

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
    pdf.set_font("DejaVu", "B", 17)
    pdf.cell(0, 13, "  Google zoeken en Maps", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2.5, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)

    pdf.set_x(pdf.l_margin)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase lesmiddag  ·  seniorease.nl")
    pdf.ln(3)

    pdf.set_x(pdf.l_margin)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Deel A - Google")
    pdf.set_font("DejaVu", "", 11)
    pdf.set_text_color(*NAVY)
    for line in (
        "1. Open Chrome, Safari of de Google-app",
        "2. Tik in het zoekvak",
        "3. Typ uw vraag (meerdere woorden)",
        "4. Tik op zoeken of Enter",
        '5. Tik op een resultaat (liever geen "Gesponsord")',
    ):
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 6, line)

    pdf.ln(4)
    pdf.set_x(pdf.l_margin)
    pdf.set_font("DejaVu", "B", 13)
    pdf.set_text_color(*GOLD)
    pdf.multi_cell(0, 7, "Deel B - Google Maps")
    pdf.set_font("DejaVu", "", 11)
    pdf.set_text_color(*NAVY)
    for line in (
        "1. Open Maps (rode pin)",
        "2. Tik in de zoekbalk bovenaan",
        "3. Typ een adres of plaats",
        "4. Tik op het voorstel",
        "5. Tik op Route - kies lopen of auto",
        "6. Bekijk de route. Starten mag, hoeft niet",
    ):
        pdf.set_x(pdf.l_margin)
        pdf.multi_cell(0, 6, line)

    pdf.ln(5)
    y = pdf.get_y()
    pdf.set_draw_color(*GOLD)
    pdf.rect(16, y, 178, 22)
    pdf.set_xy(20, y + 4)
    pdf.set_font("DejaVu", "", 10)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(170, 5, "Tip: locatie aanzetten helpt Maps. Bij twijfel: hand opsteken.")

    pdf.set_y(-22)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, "SeniorEase - rustig en duidelijk  ·  seniorease.nl", align="C")

    pdf.output(str(OUT))
    return OUT


if __name__ == "__main__":
    print(f"PDF geschreven: {build()}")
