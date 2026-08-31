"""Doorverwijzing naar gedeelde PDF-base (lesmateriaal/pdf_base_shared.py)."""
import importlib.util
from pathlib import Path

_SHARED = Path(__file__).resolve().parent.parent / "pdf_base_shared.py"
_spec = importlib.util.spec_from_file_location("seniorease_pdf_base", _SHARED)
_mod = importlib.util.module_from_spec(_spec)
assert _spec.loader is not None
_spec.loader.exec_module(_mod)

LessonPDF = _mod.LessonPDF
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


LESSON_VERSION = "v1.1"


class FLessonPDF(LessonPDF):
    """Pakket F-computer: lesversie v1.1 in de footer."""

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self._footer_version = LESSON_VERSION

