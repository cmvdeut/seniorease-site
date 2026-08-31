#!/usr/bin/env python3
"""1-pagina deelnemerskaart Foto's."""

from pathlib import Path

from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FONT_DIR = ROOT.parent / "fonts"
OUT = ROOT / "pdf" / "SeniorEase-Deelnemerskaart-Fotos-v1.pdf"

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
    pdf.cell(0, 13, "  Foto's maken, vinden en delen", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.set_fill_color(*GOLD)
    pdf.cell(0, 2.5, "", new_x="LMARGIN", new_y="NEXT", fill=True)
    pdf.ln(4)

    pdf.set_x(pdf.l_margin)
    pdf.set_text_color(*MUTED)
    pdf.set_font("DejaVu", "", 10)
    pdf.multi_cell(0, 5, "SeniorEase  ·  seniorease.nl/uitleg/fotos-maken")
    pdf.ln(3)

    sections = [
        (
            "1. Foto maken",
            [
                "Open de Camera",
                "Licht op uw onderwerp",
                "Houd stil (twee handen)",
                "Tik op het scherm om scherp te stellen",
                "Druk af - maak gerust 2 of 3 foto's",
            ],
        ),
        (
            "2. Foto terugvinden",
            [
                "Open Galerij of Foto's",
                "Zoek bij recente foto's",
                "Tik om groot te openen",
            ],
        ),
        (
            "3. Delen via WhatsApp",
            [
                "Open de foto - Delen - WhatsApp - contact - versturen",
                "Of: WhatsApp - gesprek - paperclip/camera - foto",
            ],
        ),
    ]
    for title, lines in sections:
        pdf.set_x(pdf.l_margin)
        pdf.set_font("DejaVu", "B", 13)
        pdf.set_text_color(*GOLD)
        pdf.multi_cell(0, 7, title)
        pdf.set_font("DejaVu", "", 11)
        pdf.set_text_color(*NAVY)
        for i, line in enumerate(lines, 1):
            pdf.set_x(pdf.l_margin)
            pdf.multi_cell(0, 6, f"{i}. {line}")
        pdf.ln(3)

    pdf.set_y(-22)
    pdf.set_font("DejaVu", "I", 9)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 5, "SeniorEase - rustig en duidelijk  ·  seniorease.nl", align="C")

    pdf.output(str(OUT))
    return OUT


if __name__ == "__main__":
    print(f"PDF geschreven: {build()}")
