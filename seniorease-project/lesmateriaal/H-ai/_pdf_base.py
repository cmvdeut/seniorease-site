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


class HLessonPDF(LessonPDF):
    """Pakket H print-PDF helpers."""

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._footer_version = LESSON_VERSION

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
        self.ensure_space(24)
        self._left()
        self.set_font("DejaVu", "B", 13)
        self.set_text_color(*NAVY)
        self.multi_cell(0, 7, situatie)
        self.ln(1)
        self._left()
        self.set_font("DejaVu", "", 12)
        self.set_text_color(*MUTED)
        self.multi_cell(0, 6.5, f"→ {actie}")
        self.ln(4)
        self._left()


class HBeamerPDF(BeamerPDF):
    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._slide_version = LESSON_VERSION
