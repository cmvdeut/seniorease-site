#!/usr/bin/env python3
"""Complete Gemini capture: confirm new chat → empty typvak (S6)."""
from pathlib import Path

from playwright.sync_api import sync_playwright

RAW = Path(__file__).resolve().parent / "raw"
RAW.mkdir(parents=True, exist_ok=True)
Q = (
    "Geef mij drie eenvoudige ideeën voor een maaltijd "
    "met aardappelen, broccoli en eieren."
)


def dismiss_cookies(page) -> None:
    for label in ["Alles accepteren", "Accept all"]:
        try:
            btn = page.get_by_role("button", name=label)
            if btn.count() and btn.first.is_visible():
                btn.first.click(timeout=2000)
                page.wait_for_timeout(1200)
                return
        except Exception:
            pass


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_context(
            viewport={"width": 1440, "height": 900}, locale="nl-NL"
        ).new_page()
        page.goto("https://gemini.google.com/app", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(3000)
        dismiss_cookies(page)
        page.wait_for_timeout(1500)
        page.locator('div[contenteditable="true"]').first.click()
        page.keyboard.type(Q, delay=8)
        page.keyboard.press("Enter")
        page.wait_for_timeout(7000)
        page.get_by_text("Nieuw gesprek").first.click()
        page.wait_for_timeout(1000)
        page.screenshot(path=str(RAW / "full-s5-dialog.png"), full_page=False)
        # confirm
        for name in ["Nieuwe chat", "New chat"]:
            btn = page.get_by_role("button", name=name)
            if btn.count():
                btn.first.click()
                print("confirmed", name)
                break
        page.wait_for_timeout(2500)
        page.screenshot(path=str(RAW / "full-s6-empty.png"), full_page=False)
        print("body", page.inner_text("body")[:400])
        browser.close()


if __name__ == "__main__":
    main()
