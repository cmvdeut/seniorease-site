#!/usr/bin/env python3
"""Gedeelde PDF-helpers voor SeniorEase-lessen (v1.2 — print & leesbaarheid)."""

import textwrap
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
        self._footer_version = PDF_VERSION
        self.set_auto_page_break(auto=True, margin=20)
        self.set_margins(20, 20, 20)
        self.add_font("DejaVu", "", str(FONT_DIR / "DejaVuSans.ttf"))
        self.add_font("DejaVu", "B", str(FONT_DIR / "DejaVuSans-Bold.ttf"))
        self.add_font("DejaVu", "I", str(FONT_DIR / "DejaVuSans-Oblique.ttf"))

    def _left(self) -> None:
        self.set_x(self.l_margin)

    def ensure_space(self, needed_mm: float) -> None:
        """Nieuwe pagina als er te weinig ruimte is voor het volgende blok."""
        # Onderkant bruikbaar vlak ≈ paginahoogte − footer-marge
        if self.get_y() + needed_mm > self.h - self.b_margin:
            self.add_page()

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
        # Vaste breedtes i.p.v. cell(0): voorkomt dat de cursor rechts blijft hangen.
        self.set_xy(30, 4)
        self.cell(120, 4, self._header_label, align="L")
        self.set_text_color(*MUTED)
        self.cell(40, 4, "seniorease.nl", align="R")
        self.set_draw_color(*GOLD)
        self.line(20, 14, 190, 14)
        # Altijd onder de headerbalk beginnen (links uitgelijnd)
        self.set_y(22)
        self._left()

    def footer(self) -> None:
        self.set_y(-16)
        self.set_draw_color(*SLATE)
        self.line(20, self.get_y(), 190, self.get_y())
        self.ln(2)
        self.set_font("DejaVu", "", 8)
        self.set_text_color(*MUTED)
        self.set_x(self.l_margin)
        self.cell(120, 4, LICENSE_FOOTER, align="L")
        self.cell(
            50,
            4,
            f"Pagina {self.page_no()}/{{nb}}  |  {self._footer_version}",
            align="R",
        )
        self._left()

    def cover(
        self,
        title: str,
        subtitle: str,
        intro: str,
        contents: list[str],
        meta: list[str],
        contents_title: str = "In dit document",
    ) -> None:
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
        self.box(contents_title, contents)
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
        # Tijdlijn niet halverwege laten beginnen: liever bovenaan een nieuwe pagina.
        if text.lower().startswith("tijdlijn") and self.get_y() > 100:
            self.add_page()
        else:
            # Kop + minstens één inhoudsregel bij elkaar houden
            self.ensure_space(18)
        self.ln(2)
        self._left()
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*GOLD)
        self.multi_cell(0, 7, text)
        self.ln(1)
        self._left()

    def h3(self, text: str) -> None:
        # Voorkom wees-kopjes onderaan (tijdlijn-stappen + body eronder)
        self.ensure_space(16)
        self.ln(1)
        self._left()
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 6, text)
        self.ln(0.5)
        self._left()

    def body(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 5.5, text)
        self.ln(1)
        self._left()

    def muted(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 4.8, text)
        self.ln(0.5)
        self._left()

    def bullet(self, text: str) -> None:
        self.ensure_space(10)
        self._left()
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.cell(6, 5.5, "\u2022")
        self.multi_cell(self.epw - 6, 5.5, text)
        self._left()

    def numbered(self, n: int, text: str) -> None:
        self.ensure_space(10)
        self._left()
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*GOLD)
        self.cell(8, 5.5, f"{n}.")
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(self.epw - 8, 5.5, text)
        self._left()

    def check(self, text: str) -> None:
        self.ensure_space(10)
        self._left()
        self.set_font("DejaVu", "", 11)
        self.set_text_color(*NAVY)
        self.cell(8, 5.5, "\u2610")
        self.multi_cell(self.epw - 8, 5.5, text)
        self._left()

    def tijdlijn_item(self, when: str, what: str) -> None:
        """Compacte tijdlijnregel: tijdstip + wat, bij elkaar op één pagina."""
        self.ensure_space(14 if what.strip() else 10)
        self._left()
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 5.5, when)
        if what.strip():
            self._left()
            self.set_font("DejaVu", "", 10)
            self.set_text_color(*MUTED)
            self.multi_cell(0, 5, what)
        self.ln(1.2)
        self._left()

    def box(self, title: str, lines: list[str]) -> None:
        """Informatieblok: eerst hoogte meten, dan 1× vullen, dan 1× tekst (geen dubbele tekstlaag)."""
        self.ln(1)
        self._left()
        start_y = self.get_y()
        x = self.l_margin
        w = self.epw
        pad = 4
        usable = w - 2 * pad

        self.set_font("DejaVu", "B", 11)
        title_lines = self.multi_cell(usable, 5.5, title, split_only=True)
        h = len(title_lines) * 5.5
        self.set_font("DejaVu", "", 10)
        for line in lines:
            body_lines = self.multi_cell(usable, 5, line, split_only=True)
            h += max(1, len(body_lines)) * 5
        box_h = h + 2 * pad

        self.set_fill_color(*PAPER)
        self.set_draw_color(*GOLD)
        self.rect(x, start_y, w, box_h, style="FD")

        self.set_xy(x + pad, start_y + pad)
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*NAVY)
        self.multi_cell(usable, 5.5, title)
        self.set_font("DejaVu", "", 10)
        for line in lines:
            self.set_x(x + pad)
            self.multi_cell(usable, 5, line)
        self.set_y(start_y + box_h + 3)
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
        """Citaatblok: vulling eerst, tekst één keer (geen bedekte/dubbele laag)."""
        self._left()
        y0 = self.get_y()
        usable = self.epw - 8
        self.set_font("DejaVu", "I", 10)
        lines = self.multi_cell(usable, 5, text, split_only=True)
        box_h = max(1, len(lines)) * 5 + 2
        self.set_fill_color(*CREAM)
        self.rect(self.l_margin, y0, self.epw, box_h, style="F")
        self.set_xy(self.l_margin + 4, y0 + 1)
        self.set_text_color(*NAVY)
        self.multi_cell(usable, 5, text)
        self.set_y(y0 + box_h + 2)
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
    """Liggende slides voor begeleider. Print blijft op tafel; beamer ondersteunt kijken → doen."""

    def __init__(self, lesson_code: str, lesson_title: str) -> None:
        super().__init__(orientation="L", format="A4", unit="mm")
        self._lesson_code = lesson_code
        self._lesson_title = lesson_title
        self._slide_version = PDF_VERSION
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

    def title_slide(
        self,
        subtitle: str = "Beamer voor de begeleider — daarna oefenen op eigen toestel",
    ) -> None:
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
        self.set_xy(22, 120)
        self.set_font("DejaVu", "", 16)
        self.set_text_color(*CREAM)
        self.multi_cell(
            253,
            8,
            "Kijken op de beamer → begrijpen → zelf doen op eigen toestel → samen controleren.\n"
            "Geen beamer? Print op tafel + voordoen op eigen toestel.",
        )
        self.set_xy(22, 168)
        self.set_font("DejaVu", "I", 12)
        self.cell(0, 6, "Page Down / spatie = volgende dia")

    def concept_slide(
        self,
        title: str,
        lines: list[str],
        note: str | None = None,
        label: str = "Uitleg",
    ) -> None:
        """Korte uitleg-/demodia vóór of tussen oefentaken."""
        self.add_page()
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 297, 22, "F")
        self._logo_mark(22, 4, 14)
        self.set_xy(42, 7)
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*WHITE)
        header = f"{self._lesson_code}  —  {label}" if label.strip() else self._lesson_code
        self.cell(0, 8, header)

        self.set_xy(22, 36)
        self.set_font("DejaVu", "B", 26)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 15, title)

        y = self.get_y() + 12
        self.set_text_color(*NAVY)
        for line in lines:
            self.set_xy(22, y)
            self.set_font("DejaVu", "", 20)
            self.multi_cell(253, 12, line)
            y = self.get_y() + 8
            if y > 170:
                break

        if note:
            self.set_xy(22, 175)
            self.set_font("DejaVu", "I", 13)
            self.set_text_color(*MUTED)
            self.multi_cell(253, 6, note)

        self.set_y(198)
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.cell(0, 4, f"SeniorEase  |  {self._lesson_title}  |  Beamer {self._slide_version}", align="C")

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
        self.cell(0, 4, f"SeniorEase  |  {self._lesson_title}  |  Beamer {self._slide_version}", align="C")

    def _bar(self, label: str, right: str = "") -> None:
        """Bovenbalk. Geen vaste slogans rechts — labels (ZIEN/NADOEN/…) volstaan."""
        self.add_page()
        self.set_fill_color(*NAVY)
        self.rect(0, 0, 297, 22, "F")
        self._logo_mark(22, 4, 14)
        self.set_xy(42, 7)
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*WHITE)
        if right:
            header = f"{self._lesson_code}  —  {label}" if label.strip() else self._lesson_code
            self.cell(120, 8, header)
            self.set_font("DejaVu", "", 10)
            self.set_text_color(*CREAM)
            self.cell(0, 8, right, align="R")
        else:
            header = f"{self._lesson_code}  —  {label}" if label.strip() else self._lesson_code
            self.cell(0, 8, header)

    def _foot(self) -> None:
        self.set_y(198)
        self.set_font("DejaVu", "", 9)
        self.set_text_color(*MUTED)
        self.cell(0, 4, f"SeniorEase  |  {self._lesson_title}  |  Beamer {self._slide_version}", align="C")

    def _badge(self, x: float, y: float, n: int) -> None:
        self.set_fill_color(*GOLD)
        self.set_draw_color(*GOLD)
        self.ellipse(x - 4.5, y - 4.5, 9, 9, "F")
        self.set_font("DejaVu", "B", 11)
        self.set_text_color(*WHITE)
        self.set_xy(x - 4.5, y - 3.5)
        self.cell(9, 7, str(n), align="C")

    def zaal_shot_slide(
        self,
        title: str,
        image: Path,
        caption: str,
        label: str = "ZIEN",
        note: str | None = None,
    ) -> None:
        """Volledig telefoonscherm, zo groot mogelijk — niets afknippen.

        Portretbeeld rechts/gecentreerd op maximale hoogte.
        Korte caption links, zodat boven- en onderrand van het scherm zichtbaar blijven.
        """
        self._bar(label)
        self.set_xy(22, 26)
        self.set_font("DejaVu", "B", 18)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 7, title)

        # Maximale beeldhoogte: onder titel tot boven footer
        top = 36.0
        bottom = 188.0
        max_h = bottom - top

        img_x = img_y = img_w = img_h = 0.0
        if image.exists():
            try:
                from PIL import Image as _PILImage

                with _PILImage.open(image) as _im:
                    aspect = _im.height / max(_im.width, 1)
            except Exception:
                aspect = 2.0

            img_h = max_h
            img_w = img_h / aspect
            # Cap breedte; schuif naar rechts zodat links ruimte blijft voor tekst
            max_w = 95.0
            if img_w > max_w:
                img_w = max_w
                img_h = img_w * aspect
            img_x = 297 - 22 - img_w  # rechts uitlijnen met marge
            img_y = top + (max_h - img_h) / 2
            self.image(str(image), x=img_x, y=img_y, w=img_w, h=img_h)

        # Caption links, groot
        text_w = max(70.0, img_x - 30) if img_x else 100.0
        self.set_xy(22, 55)
        self.set_font("DejaVu", "B", 20)
        self.set_text_color(*NAVY)
        self.multi_cell(text_w, 9, caption)

        if note:
            self.set_xy(22, 175)
            self.set_font("DejaVu", "I", 11)
            self.set_text_color(*MUTED)
            self.multi_cell(text_w, 5, note)
        self._foot()

    def mission_slide(
        self,
        title: str,
        steps: list[str],
        label: str = "ZELF DOEN",
        start: int = 1,
    ) -> None:
        """Eindmissie: zo groot mogelijk, vanaf 3 meter leesbaar.

        start: eerste stapnummer (bijv. 6 bij deel 2 van een lange missie).
        Max. ca. 7 stappen per dia — daarna y-limiet.
        """
        self._bar(label)
        self.set_xy(22, 30)
        self.set_font("DejaVu", "B", 26)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 11, title)

        y = 52
        for i, step in enumerate(steps):
            n = start + i
            self.set_xy(28, y)
            self.set_font("DejaVu", "B", 28)
            self.set_text_color(*GOLD)
            self.cell(22, 14, f"{n}")
            self.set_font("DejaVu", "B", 22)
            self.set_text_color(*NAVY)
            # multi_cell zodat lange stappen niet afkappen
            x_text = 52
            self.set_xy(x_text, y)
            before = self.get_y()
            self.multi_cell(224, 10, step)
            after = self.get_y()
            y = max(before + 16, after + 4)
            if y > 185:
                break
        self._foot()

    def shot_slide(
        self,
        title: str,
        image: Path,
        points: list[str],
        label: str = "UITLEG",
        note: str | None = None,
        badges: list[tuple[float, float, int]] | None = None,
        big: bool = False,
    ) -> None:
        """Echte screenshot + korte aanwijzingen. Geen nagetekende interface.

        big=True: uitsnede vult bijna de rechterhelft — voor typvak/versturen
        achter in de zaal.
        """
        self._bar(label)
        self.set_xy(22, 28)
        self.set_font("DejaVu", "B", 22 if big else 24)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 9 if big else 10, title)

        if big:
            img_x, img_y, img_w = 95, 44, 178
            text_w = 66
            max_h = 138.0
        else:
            img_x, img_y, img_w = 128, 48, 147
            text_w = 86
            max_h = 130.0

        if image.exists():
            try:
                from PIL import Image as _PILImage

                with _PILImage.open(image) as _im:
                    aspect = _im.height / max(_im.width, 1)
                img_h = img_w * aspect
                if img_h > max_h:
                    img_h = max_h
                    img_w = img_h / aspect
                    img_x = 95 + (178 - img_w) / 2 if big else 128 + (147 - img_w) / 2
            except Exception:
                img_h = 0
            if img_h:
                self.image(str(image), x=img_x, y=img_y, w=img_w, h=img_h)
            else:
                self.image(str(image), x=img_x, y=img_y, w=img_w)
            if badges:
                for bx, by, n in badges:
                    self._badge(img_x + bx, img_y + by, n)

        y = 50 if big else 52
        self.set_text_color(*NAVY)
        for i, point in enumerate(points, 1):
            self._badge(27, y + 4, i)
            self.set_xy(36, y)
            self.set_font("DejaVu", "", 15 if big else 16)
            self.set_text_color(*NAVY)
            self.multi_cell(text_w, 7, point)
            y = self.get_y() + 8
            if y > 170:
                break

        if note:
            self.set_xy(22, 184)
            self.set_font("DejaVu", "I", 11)
            self.set_text_color(*MUTED)
            self.multi_cell(70 if big else 100, 5, note)
        self._foot()

    def screenshot_needed_slide(
        self,
        title: str,
        needed: list[str],
        points: list[str] | None = None,
        label: str = "DEMO",
        note: str | None = None,
    ) -> None:
        """Tijdelijke dia zolang een echt screenshot ontbreekt. Geen nep-UI."""
        self._bar(label)
        self.set_xy(22, 28)
        self.set_font("DejaVu", "B", 22)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 9, title)

        box_x, box_y, box_w, box_h = 100, 48, 175, 120
        self.set_fill_color(*SLATE)
        self.set_draw_color(*GOLD)
        self.set_line_width(0.6)
        self.rect(box_x, box_y, box_w, box_h, "FD")
        self.set_xy(box_x + 8, box_y + 10)
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(*NAVY)
        self.multi_cell(box_w - 16, 7, "[SCREENSHOT NODIG]")
        self.set_xy(box_x + 8, self.get_y() + 4)
        self.set_font("DejaVu", "", 13)
        self.set_text_color(*NAVY)
        for line in needed:
            self.set_x(box_x + 8)
            self.multi_cell(box_w - 16, 6, line)
            if self.get_y() > box_y + box_h - 12:
                break

        y = 52
        self.set_text_color(*NAVY)
        for i, point in enumerate(points or [], 1):
            self._badge(27, y + 4, i)
            self.set_xy(36, y)
            self.set_font("DejaVu", "", 15)
            self.multi_cell(58, 7, point)
            y = self.get_y() + 8
            if y > 170:
                break

        self.set_xy(22, 184)
        self.set_font("DejaVu", "I", 11)
        self.set_text_color(*MUTED)
        self.multi_cell(
            253,
            5,
            note
            or "Nog geen echt schermbeeld. Begeleider toont live op eigen toestel.",
        )
        self._foot()

    def example_slide(
        self,
        app_name: str,
        line: str,
        extra: str | None = None,
        image: Path | None = None,
        label: str = "SAMEN DOEN",
        note: str | None = None,
    ) -> None:
        """Eén herkenbaar voorbeeld per dia. Geen lijst van zes punten."""
        self._bar(label)
        self.set_xy(22, 30)
        self.set_font("DejaVu", "", 14)
        self.set_text_color(*GOLD)
        self.cell(0, 7, "Herkenbaar voorbeeld")
        self.set_xy(22, 40)
        self.set_font("DejaVu", "B", 32)
        self.set_text_color(*NAVY)
        show_img = image is not None and image.exists()
        self.multi_cell(110 if show_img else 253, 12, app_name)
        self.set_xy(22, 62)
        self.set_font("DejaVu", "", 18)
        self.set_text_color(*NAVY)
        self.multi_cell(110 if show_img else 253, 8, line)
        if extra:
            self.set_xy(22, self.get_y() + 6)
            self.set_font("DejaVu", "", 16)
            self.set_text_color(*MUTED)
            self.multi_cell(110 if show_img else 253, 7, extra)
        if show_img:
            self.image(str(image), x=138, y=42, w=136)
        if note:
            self.set_xy(22, 184)
            self.set_font("DejaVu", "I", 11)
            self.set_text_color(*MUTED)
            self.multi_cell(253, 5, note)
        self._foot()

    def scene_slide(
        self,
        scene: str,
        label: str = "SAMEN DOEN",
        follow: str | None = None,
    ) -> None:
        """Eerst de situatie, daarna de oefening. Geen vaste AI-tekst."""
        self._bar(label)
        self.set_xy(22, 48)
        self.set_font("DejaVu", "", 16)
        self.set_text_color(*GOLD)
        self.cell(0, 8, "Stel…")
        self.set_xy(22, 72)
        self.set_font("DejaVu", "B", 28)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 13, scene)
        self.set_xy(22, 168)
        self.set_font("DejaVu", "I", 14)
        self.set_text_color(*MUTED)
        self.multi_cell(
            253,
            7,
            follow or "Daarna oefent u dit zelf op uw eigen toestel.",
        )
        self._foot()

    def chat_slide(
        self,
        title: str,
        turns: list[tuple[str, str]],
        label: str = "DEMO",
        note: str | None = None,
        scene: str | None = None,
    ) -> None:
        """Gewoon gesprek: U / AI. Geen nagetekende Gemini-interface."""
        self._bar(label)
        y = 28
        if scene:
            self.set_xy(22, y)
            self.set_font("DejaVu", "I", 14)
            self.set_text_color(*GOLD)
            self.multi_cell(253, 6, scene)
            y = self.get_y() + 2
        self.set_xy(22, y)
        self.set_font("DejaVu", "B", 22)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 9, title)
        y = self.get_y() + 4

        for who, text in turns:
            is_user = who.lower() in {"u", "user"}
            lines = textwrap.wrap(text, width=52) or [text]
            h = 9 + len(lines) * 6.5
            if y + h > 188:
                break
            if is_user:
                x, bw = 88, 186
                self.set_fill_color(*NAVY)
                self.rect(x, y, bw, h, style="F")
                self.set_text_color(*WHITE)
            else:
                x, bw = 22, 186
                self.set_fill_color(*SLATE)
                self.rect(x, y, bw, h, style="F")
                self.set_text_color(*NAVY)
            self.set_xy(x + 4, y + 1.5)
            self.set_font("DejaVu", "B", 11)
            self.cell(20, 5, "U" if is_user else "AI")
            self.set_xy(x + 4, y + 7)
            self.set_font("DejaVu", "", 13)
            self.multi_cell(bw - 8, 6.5, text)
            y += h + 3.5

        if note:
            self.set_xy(22, 186)
            self.set_font("DejaVu", "I", 10)
            self.set_text_color(*MUTED)
            self.multi_cell(253, 5, note)
        self._foot()

    def devices_slide(
        self,
        title: str,
        phone_image: Path,
        desktop_image: Path,
        label: str = "UITLEG",
    ) -> None:
        self._bar(label)
        self.set_xy(22, 30)
        self.set_font("DejaVu", "B", 24)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 10, title)

        self.set_xy(22, 48)
        self.set_font("DejaVu", "", 16)
        self.set_text_color(*NAVY)
        self.multi_cell(
            253,
            7,
            "iPhone/iPad: Safari     ·     Android: Chrome     ·     Computer: browser",
        )
        self.set_xy(22, 64)
        self.set_font("DejaVu", "I", 13)
        self.set_text_color(*MUTED)
        self.multi_cell(253, 6, "Uw scherm kan er iets anders uitzien. De stappen blijven ongeveer hetzelfde.")

        if phone_image.exists():
            self.image(str(phone_image), x=36, y=78, h=108)
        if desktop_image.exists():
            self.image(str(desktop_image), x=118, y=88, w=156)
        self._foot()

