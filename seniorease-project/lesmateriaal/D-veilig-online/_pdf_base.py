"""Doorverwijzing naar gedeelde PDF-base (lesmateriaal/pdf_base_shared.py)."""
import importlib.util
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
import sys

if str(_LM_DIR) not in sys.path:
    sys.path.insert(0, str(_LM_DIR))

LESSON_VERSION = "v2.0"


class DLessonPDF(LessonPDF):
    """Pakket D: lesversie v2.0 + rustigere leesbaarheid voor print."""

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._footer_version = LESSON_VERSION

    def stappenregel(self) -> None:
        self.box(
            "STOP → NIET VERDERGAAN → ZELF CONTROLEREN",
            [
                "NIET BETALEN · GEEN CODE DELEN · NIET OP EEN ONVERWACHTE LINK TIKKEN",
                "Controleren via een officiële route die u zelf kiest.",
            ],
        )

    def h2(self, text: str) -> None:
        # Tijdlijn liever bij vragen houden; alleen nieuwe pagina als bijna vol
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
        """Scanbare draaiboekregel: Zegt / Toont / …"""
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
        """Situatie + korte vervolgstap, goed scanbaar."""
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


class DBeamerPDF(BeamerPDF):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._slide_version = LESSON_VERSION

    def eindmissie_open_slide(self, image: Path, note: str | None = None) -> None:
        """Bericht C + open opdracht op één dia — geen stappenlijst."""
        self._bar("")
        self.set_xy(22, 26)
        self.set_font("DejaVu", "B", 16)
        self.set_text_color(*NAVY)
        self.multi_cell(253, 7, "Eindmissie")

        top = 36.0
        bottom = 188.0
        max_h = bottom - top
        try:
            from PIL import Image as _PILImage

            with _PILImage.open(image) as _im:
                aspect = _im.height / max(_im.width, 1)
        except Exception:
            aspect = 2.0

        img_h = max_h
        img_w = img_h / aspect
        max_w = 88.0
        if img_w > max_w:
            img_w = max_w
            img_h = img_w * aspect
        img_x = 297 - 22 - img_w
        img_y = top + (max_h - img_h) / 2
        self.image(str(image), x=img_x, y=img_y, w=img_w, h=img_h)

        text_w = max(110.0, img_x - 34)
        self.set_xy(22, 48)
        self.set_font("DejaVu", "B", 22)
        self.set_text_color(*NAVY)
        self.multi_cell(text_w, 10, "U krijgt dit onverwachte bericht. Wat doet u nu?")
        self.set_xy(22, self.get_y() + 8)
        self.set_font("DejaVu", "", 18)
        self.multi_cell(text_w, 9, "Laat zien hoe u veilig stopt en zelf controleert.")
        self.set_xy(22, self.get_y() + 10)
        self.set_font("DejaVu", "I", 12)
        self.set_text_color(*GOLD)
        self.multi_cell(text_w, 6, "SeniorEase-oefening — geen echt bericht")
        if note:
            self.set_xy(22, 175)
            self.set_font("DejaVu", "I", 11)
            self.set_text_color(*MUTED)
            self.multi_cell(text_w, 5, note)
        self._foot()
