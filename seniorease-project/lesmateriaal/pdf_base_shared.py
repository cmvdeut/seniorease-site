#!/usr/bin/env python3
"""Gedeelde PDF-helpers voor SeniorEase-lessen (v1.2 — print & leesbaarheid)."""

from pathlib import Path

from fpdf import FPDF

FONT_DIR = Path(__file__).resolve().parent / "fonts"
ASSETS_DIR = Path(__file__).resolve().parent / "assets"
LOGO_SMILE = ASSETS_DIR / "heart-logo-smile-transparent.png"
LOGO_SMILE_FALLBACK = ASSETS_DIR / "heart-logo-smile.png"

# SeniorEase print palette (warm, leesbaar)
NAVY = (46, 36, 28)
GOLD = (139, 94, 60)
CREAM = (245, 238, 230)
PAPER = (247, 242, 235)
SLATE = (224, 213, 202)
MUTED = (90, 78, 68)
WHITE = (255, 255, 255)

PDF_VERSION = "v1.6"

_LM_DIR = Path(__file__).resolve().parent
import sys

if str(_LM_DIR) not in sys.path:
    sys.path.insert(0, str(_LM_DIR))

from licentie_tekst import LICENSE_BOX_LINES, LICENSE_BOX_TITLE, LICENSE_FOOTER


class LessonPDF(FPDF):
    def __init__(
        self,
        header_label: str,
        package_label: str = "Pakket A - Telefoon & tablet",
    ) -> None:
        super().__init__(format="A4", unit="mm")
        self._header_label = header_label
        self._package_label = package_label
        self.set_auto_page_break(auto=True, margin=20)
        self.set_margins(20, 20, 20)
        self.add_font("DejaVu", "", str(FONT_DIR / "DejaVuSans.ttf"))
        self.add_font("DejaVu", "B", str(FONT_DIR / "DejaVuSans-Bold.ttf"))
        self.add_font("DejaVu", "I", str(FONT_DIR / "DejaVuSans-Oblique.ttf"))

    def _left(self) -> None:
        self.set_x(self.l_margin)

    def _logo_path(self) -> Path | None:
        if LOGO_SMILE.exists():
            return LOGO_SMILE
        if LOGO_SMILE_FALLBACK.exists():
            return LOGO_SMILE_FALLBACK
        return None

    def _logo_mark(self, x: float, y: float, size: float = 12) -> None:
        """SeniorEase hartlogo (transparant) of fallback S-mark."""
        logo = self._logo_path()
        if logo is not None:
            self.image(str(logo), x=x, y=y, h=size)
            return
        self.set_fill_color(*GOLD)
        self.rect(x, y, size, size, style="F")
        self.set_font("DejaVu", "B", size * 0.55)
        self.set_text_color(*WHITE)
        self.set_xy(x, y + size * 0.22)
        self.cell(size, size * 0.5, "S", align="C")

    def header(self) -> None:
        if self.page_no() == 1:
            return
        self.set_fill_color(*CREAM)
        self.rect(0, 0, 210, 14, "F")
        self._logo_mark(20, 2.5, 8)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(*GOLD)
        self.set_xy(30, 4)
        self.cell(0, 4, self._header_label, align="L")
        self.set_text_color(*MUTED)
        self.cell(0, 4, "seniorease.nl", align="R", new_x="LMARGIN", new_y="NEXT")
        self.set_draw_color(*GOLD)
        self.line(20, 14, 190, 14)
        self.ln(8)

    def footer(self) -> None:
        self.set_y(-16)
        self.set_draw_color(*SLATE)
        self.line(20, self.get_y(), 190, self.get_y())
        self.ln(2)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(*MUTED)
        self.cell(0, 4, LICENSE_FOOTER, align="L")
        self.cell(0, 4, f"Pagina {self.page_no()}/{{nb}}  |  {PDF_VERSION}", align="R")

    def cover(self, title: str, subtitle: str, intro: str, contents: list[str], meta: list[str]) -> None:
        self.add_page()
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 210, 78, "F")
        self.set_fill_color(*GOLD)
        self.rect(0, 78, 210, 3, "F")
        logo_h = 11
        self._logo_mark(20, 18, logo_h)
        self.set_xy(20 + logo_h + 4, 19)
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*CREAM)
        self.cell(0, 5, f"SeniorEase lesmateriaal  |  {self._package_label}")
        self.ln(12)
        self.set_x(20)
        self.set_font("DejaVu", "B", 26)
        self.set_text_color(*WHITE)
        self.multi_cell(170, 11, title)
        self.set_x(20)
        self.set_font("DejaVu", "", 13)
        self.multi_cell(170, 6.5, subtitle)
        self.set_y(92)
        self._left()
        self.set_text_color(*NAVY)
        self.set_font("DejaVu", "", 11)
        self.multi_cell(0, 5.5, intro)
        self.ln(3)
        self.box("In dit document", contents)
        for line in meta:
            self.muted(line)
        self.ln(2)
        self.box(LICENSE_BOX_TITLE, LICENSE_BOX_LINES)

    def h1(self, text: str) -> None:
        self.ln(2)
        self._left()
        self.set_font("DejaVu", "B", 18)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 8, text)
        y = self.get_y()
        self.set_draw_color(*GOLD)
        self.set_line_width(0.6)
        self.line(self.l_margin, y, self.l_margin + 40, y)
        self.set_line_width(0.2)
        self.ln(4)

    def h2(self, text: str) -> None:
        self.ln(2)
        self._left()
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*GOLD)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def h3(self, text: str) -> None:
        self.ln(1)
        self._left()
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 6, text)
        self.ln(0.5)

    def body(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def muted(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 4.8, text)
        self.ln(0.5)

    def bullet(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.cell(6, 5.5, "\u2022")
        self.multi_cell(self.epw - 6, 5.5, text)
        self._left()

    def numbered(self, n: int, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*GOLD)
        self.cell(8, 5.5, f"{n}.")
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(self.epw - 8, 5.5, text)
        self._left()

    def check(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.cell(8, 5.5, "\u2610")
        self.multi_cell(self.epw - 8, 5.5, text)
        self._left()

    def box(self, title: str, lines: list[str]) -> None:
        self.ln(1)
        self._left()
        start_y = self.get_y()
        x = self.l_margin
        w = self.epw
        pad = 4
        self.set_xy(x + pad, start_y + pad)
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(w - 2 * pad, 5.5, title)
        self.set_font("DejaVu", "", 10)
        for line in lines:
            self.set_x(x + pad)
            self.multi_cell(w - 2 * pad, 5, line)
        end_y = self.get_y() + pad
        self.set_fill_color(*PAPER)
        self.set_draw_color(*GOLD)
        self.rect(x, start_y, w, end_y - start_y, style="FD")
        # Tekst opnieuw bovenop (fill bedekte inhoud)
        self.set_xy(x + pad, start_y + pad)
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(w - 2 * pad, 5.5, title)
        self.set_font("DejaVu", "", 10)
        for line in lines:
            self.set_x(x + pad)
            self.multi_cell(w - 2 * pad, 5, line)
        self.set_y(end_y + 3)
        self._left()

    def example(self, letter: str, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "B", 10)
        self.set_text_color(*GOLD)
        self.multi_cell(0, 5, f"Voorbeeld {letter}")
        self._left()
        self.set_font("DejaVu", "I", 10)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 5, text)
        self.ln(2)

    def quote(self, text: str) -> None:
        self.set_fill_color(*CREAM)
        y0 = self.get_y()
        self.set_x(self.l_margin + 4)
        self.set_font("DejaVu", "I", 10)
        self.set_text_color(*NAVY)
        self.multi_cell(self.epw - 8, 5, text)
        end_y = self.get_y() + 2
        self.rect(self.l_margin, y0, self.epw, end_y - y0, style="F")
        self.set_y(end_y + 2)
        self._left()

    def deelnemerskaart_banner(self, title: str, subtitle: str = "") -> None:
        """Standaard kop voor de deelnemerskaart-pagina."""
        self.set_fill_color(*NAVY)
        self.set_text_color(*WHITE)
        self.set_font("DejaVu", "B", 16)
        self.cell(0, 12, f"  {title}", new_x="LMARGIN", new_y="NEXT", fill=True)
        self.set_fill_color(*GOLD)
        self.cell(0, 2.5, "", new_x="LMARGIN", new_y="NEXT", fill=True)
        self.ln(5)
        if subtitle:
            self.set_text_color(*MUTED)
            self.set_font("DejaVu", "", 10)
            self.multi_cell(0, 5, subtitle)
            self.ln(2)

    def rollen_docent_helper(self) -> None:
        self.box(
            "Rollen: docent en helper",
            [
                "Begeleider: voorbeeld geven, tempo bepalen, groep begeleiden.",
                "Helper (vrijwilliger): 1-op-1 helpen bij vastlopers — geen les voor de hele groep.",
                "Bent u zelf ook senior? U hoeft niet alles te weten. Eén stap tegelijk.",
                "Max. 8-10 deelnemers | hand opsteken | codes nooit hardop | we wachten op elkaar.",
            ],
        )

    def nazorg_card(self, lines: list[str]) -> None:
        pad = 10
        x = self.l_margin
        w = self.epw
        inner_x = x + pad
        inner_w = w - 2 * pad
        logo_h = 11

        self.ln(2)
        self._left()
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.cell(w, 5, "— — —  knip of scheur hier  — — —", align="C", new_x="LMARGIN", new_y="NEXT")
        self.ln(5)

        y0 = self.get_y()
        text_lines = [line for line in lines if not line.startswith("seniorease")]
        has_logo_line = any(line.startswith("seniorease") for line in lines)

        est_h = pad + 8 + 6 + 4 + len(text_lines) * 7 + 6 + logo_h + pad
        self.set_fill_color(*PAPER)
        self.set_draw_color(*GOLD)
        self.rect(x, y0, w, est_h, style="FD")

        self.set_xy(inner_x, y0 + pad)
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(*NAVY)
        self.multi_cell(inner_w, 7, "Thuis nog eens nalezen")

        self.set_x(inner_x)
        self.set_font("DejaVu", "I", 10)
        self.set_text_color(*MUTED)
        self.multi_cell(inner_w, 5, "Neem deze kaart mee naar huis.")
        self.ln(4)

        for line in text_lines:
            self.set_x(inner_x)
            self.set_font("DejaVu", "", 11)
            self.set_text_color(*NAVY)
            self.multi_cell(inner_w, 6, line)
            self.ln(1.5)

        if has_logo_line:
            self.ln(2)
            logo_y = self.get_y()
            self._logo_mark(inner_x, logo_y, logo_h)
            self.set_xy(inner_x + logo_h + 5, logo_y + 4)
            self.set_font("DejaVu", "B", 12)
            self.set_text_color(*GOLD)
            self.cell(inner_w - logo_h - 5, 6, "seniorease.nl")

        self.set_y(y0 + est_h + 6)
        self._left()

    def table_row(self, left: str, right: str, header: bool = False) -> None:
        """Twee kolommen (helper-tabellen)."""
        self.set_font("DejaVu", "B" if header else "", 10)
        self.set_text_color(*NAVY)
        fill = SLATE if header else PAPER
        self.set_fill_color(*fill)
        y = self.get_y()
        x = self.l_margin
        w1, w2 = 52, self.epw - 52
        h = 11
        self.rect(x, y, w1, h, "DF")
        self.rect(x + w1, y, w2, h, "DF")
        self.set_xy(x + 3, y + 3)
        self.cell(w1 - 6, 5, left)
        self.set_xy(x + w1 + 3, y + 3)
        self.multi_cell(w2 - 6, 5, right)
        self.set_y(y + h)


class BeamerPDF(FPDF):
    """Liggende slides: 1 oefentaak per pagina. Optioneel — print blijft de basis."""

    def __init__(self, lesson_code: str, lesson_title: str) -> None:
        super().__init__(orientation="L", format="A4", unit="mm")
        self._lesson_code = lesson_code
        self._lesson_title = lesson_title
        self.set_auto_page_break(auto=False)
        self.set_margins(22, 18, 22)
        self.add_font("DejaVu", "", str(FONT_DIR / "DejaVuSans.ttf"))
        self.add_font("DejaVu", "B", str(FONT_DIR / "DejaVuSans-Bold.ttf"))
        self.add_font("DejaVu", "I", str(FONT_DIR / "DejaVuSans-Oblique.ttf"))

    def _logo_path(self) -> Path | None:
        if LOGO_SMILE.exists():
            return LOGO_SMILE
        if LOGO_SMILE_FALLBACK.exists():
            return LOGO_SMILE_FALLBACK
        return None

    def _logo_mark(self, x: float, y: float, size: float = 12) -> None:
        logo = self._logo_path()
        if logo is not None:
            self.image(str(logo), x=x, y=y, h=size)
            return
        self.set_fill_color(*GOLD)
        self.rect(x, y, size, size, style="F")

    def title_slide(self, subtitle: str = "Oefentaken — optioneel op beamer") -> None:
        self.add_page()
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 297, 210, "F")
        self.set_fill_color(*GOLD)
        self.rect(0, 200, 297, 3, "F")
        self._logo_mark(22, 28, 18)
        self.set_xy(48, 32)
        self.set_font("DejaVu", "", 14)
        self.set_text_color(*CREAM)
        self.cell(0, 8, f"SeniorEase  |  {self._lesson_code}  |  {subtitle}")
        self.set_xy(22, 70)
        self.set_font("DejaVu", "B", 36)
        self.set_text_color(*WHITE)
        self.multi_cell(253, 14, self._lesson_title)
        self.set_xy(22, 130)
        self.set_font("DejaVu", "", 16)
        self.set_text_color(*CREAM)
        self.multi_cell(
            253,
            8,
            "Geen beamer in de zaal? Geen probleem — deelnemers volgen hun print op tafel.",
        )
        self.set_xy(22, 168)
        self.set_font("DejaVu", "I", 12)
        self.cell(0, 6, "Volgende pagina = oefentaak 1  |  Page Down / spatie in PDF-viewer")

    def oefentaak_slide(
        self,
        num: int,
        title: str,
        goal: str,
        steps: list[str],
        klaar: str,
        note: str | None = None,
    ) -> None:
        self.add_page()
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 297, 22, "F")
        self._logo_mark(22, 4, 14)
        self.set_xy(42, 7)
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*WHITE)
        self.cell(120, 8, f"{self._lesson_code}  —  Oefentaak {num}")
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*CREAM)
        self.cell(0, 8, "Vast? Hand opsteken", align="R")

        self.set_xy(22, 32)
        self.set_font("DejaVu", "B", 26)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 12, title)

        self.set_xy(22, 52)
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(*GOLD)
        self.multi_cell(253, 7, f"Doel: {goal}")

        y = 68
        self.set_font("DejaVu", "", 18)
        self.set_text_color(*NAVY)
        for i, step in enumerate(steps, 1):
            self.set_xy(22, y)
            self.set_font("DejaVu", "B", 18)
            self.cell(10, 9, f"{i}.")
            self.set_font("DejaVu", "", 18)
            self.multi_cell(243, 9, step)
            y = self.get_y() + 3
            if y > 145:
                break

        self.set_fill_color(*PAPER)
        self.set_draw_color(*GOLD)
        self.rect(22, 155, 253, 22, "DF")
        self.set_xy(28, 160)
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(*NAVY)
        self.multi_cell(241, 7, f"Klaar als: {klaar}")

        if note:
            self.set_xy(22, 182)
            self.set_font("DejaVu", "I", 11)
            self.set_text_color(*MUTED)
            self.multi_cell(253, 5, note)

        self.set_y(198)
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.cell(0, 4, f"SeniorEase  |  {self._lesson_title}  |  Beamer {PDF_VERSION}", align="C")
