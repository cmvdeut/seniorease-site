"""Doorverwijzing naar gedeelde PDF-base (lesmateriaal/pdf_base_shared.py)."""
import importlib.util
import sys
from pathlib import Path

_SHARED = Path(__file__).resolve().parent.parent / "pdf_base_shared.py"
_spec = importlib.util.spec_from_file_location("seniorease_pdf_base", _SHARED)
_mod = importlib.util.module_from_spec(_spec)
assert _spec.loader is not None
_spec.loader.exec_module(_mod)

LessonPDF = _mod.LessonPDF
BeamerPDF = _mod.BeamerPDF
GOLD = _mod.GOLD
NAVY = _mod.NAVY
CREAM = _mod.CREAM
PAPER = _mod.PAPER
SLATE = _mod.SLATE
MUTED = _mod.MUTED
WHITE = _mod.WHITE
PDF_VERSION = _mod.PDF_VERSION

_LM_DIR = Path(__file__).resolve().parent.parent
if str(_LM_DIR) not in sys.path:
    sys.path.insert(0, str(_LM_DIR))

LESSON_VERSION = "v2.0"


class ELessonPDF(LessonPDF):
    """Pakket E: lesversie v2.0 + rustigere leesbaarheid voor print."""

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._footer_version = LESSON_VERSION

    def h2(self, text: str) -> None:
        if text.lower().startswith("tijdlijn") and self.get_y() > 175:
            self.add_page()
        else:
            self.ensure_space(22)
        self.ln(3)
        self._left()
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(*GOLD)
        self.multi_cell(0, 8, text)
        self.ln(2)
        self._left()

    def body(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 12)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 6.5, text)
        self.ln(2)
        self._left()

    def muted(self, text: str) -> None:
        self._left()
        self.set_font("DejaVu", "", 10)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 5.5, text)
        self.ln(1)
        self._left()

    def bullet(self, text: str) -> None:
        self.ensure_space(12)
        self._left()
        self.set_font("DejaVu", "", 12)
        self.set_text_color(*NAVY)
        self.cell(7, 6.5, "\u2022")
        self.multi_cell(self.epw - 7, 6.5, text)
        self.ln(1)
        self._left()

    def numbered(self, n: int, text: str) -> None:
        self.ensure_space(12)
        self._left()
        self.set_font("DejaVu", "B", 12)
        self.set_text_color(*GOLD)
        self.cell(9, 6.5, f"{n}.")
        self.set_font("DejaVu", "", 12)
        self.set_text_color(*NAVY)
        self.multi_cell(self.epw - 9, 6.5, text)
        self.ln(1)
        self._left()

    def check(self, text: str) -> None:
        self.ensure_space(12)
        self._left()
        self.set_font("DejaVu", "", 12)
        self.set_text_color(*NAVY)
        self.cell(9, 6.5, "\u2610")
        self.multi_cell(self.epw - 9, 6.5, text)
        self.ln(1)
        self._left()

    def field(self, label: str, text: str, *, allow_break: bool = True) -> None:
        if allow_break:
            self.ensure_space(16)
        self._left()
        self.set_font("DejaVu", "B", 12)
        self.set_text_color(*GOLD)
        self.cell(32, 7.5, label)
        self.set_font("DejaVu", "", 13)
        self.set_text_color(*NAVY)
        self.multi_cell(self.epw - 32, 7.5, text)
        self.ln(2.2)
        self._left()

    def hulp_item(self, situatie: str, actie: str) -> None:
        self.ensure_space(32)
        self._left()
        self.set_font("DejaVu", "B", 14)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 8, situatie)
        self.ln(2)
        self._left()
        self.set_font("DejaVu", "", 13)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 7.5, f"→ {actie}")
        self.ln(6)
        self._left()

    def box(self, title: str, lines: list[str]) -> None:
        self.ln(2)
        self._left()
        start_y = self.get_y()
        x = self.l_margin
        w = self.epw
        pad = 5
        usable = w - 2 * pad
        lh_title, lh_body = 6.5, 6.2

        self.set_font("DejaVu", "B", 12)
        title_lines = self.multi_cell(usable, lh_title, title, split_only=True)
        h = len(title_lines) * lh_title
        self.set_font("DejaVu", "", 11)
        for line in lines:
            body_lines = self.multi_cell(usable, lh_body, line, split_only=True)
            h += max(1, len(body_lines)) * lh_body
        box_h = h + 2 * pad

        self.ensure_space(box_h + 6)
        start_y = self.get_y()
        self.set_fill_color(*PAPER)
        self.set_draw_color(*GOLD)
        self.rect(x, start_y, w, box_h, style="FD")

        self.set_xy(x + pad, start_y + pad)
        self.set_font("DejaVu", "B", 12)
        self.set_text_color(*NAVY)
        self.multi_cell(usable, lh_title, title)
        self.set_font("DejaVu", "", 11)
        for line in lines:
            self.set_x(x + pad)
            self.multi_cell(usable, lh_body, line)
        self.set_y(start_y + box_h + 4)
        self._left()


class EBeamerPDF(BeamerPDF):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._slide_version = LESSON_VERSION
