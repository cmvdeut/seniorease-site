#!/usr/bin/env python3
"""Capture H3-S1 (vague) and H3-S2 (improved) from live Gemini — no personal login."""
from __future__ import annotations

from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
RAW.mkdir(parents=True, exist_ok=True)

Q1 = "Wat kan ik koken?"
Q2 = (
    "Geef mij drie ideeën voor een eenvoudige avondmaaltijd. "
    "Ik heb aardappelen, broccoli en eieren in huis. "
    "Geef per idee maximaal drie korte stappen."
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


def ask(page, text: str) -> None:
    editable = page.locator('div[contenteditable="true"]').first
    editable.click()
    page.wait_for_timeout(300)
    page.keyboard.type(text, delay=10)
    page.wait_for_timeout(400)
    page.keyboard.press("Enter")
    page.wait_for_timeout(8000)


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

        ask(page, Q1)
        page.screenshot(path=str(RAW / "h3-s1-voor.png"), full_page=False)
        print("S1 body", page.inner_text("body")[:500])

        # new chat for clean S2
        try:
            page.get_by_text("Nieuw gesprek").first.click(timeout=3000)
            page.wait_for_timeout(800)
            for name in ["Nieuwe chat", "New chat"]:
                btn = page.get_by_role("button", name=name)
                if btn.count():
                    btn.first.click()
                    break
            page.wait_for_timeout(2000)
        except Exception as exc:
            print("new chat", exc)

        ask(page, Q2)
        page.screenshot(path=str(RAW / "h3-s2-na.png"), full_page=False)
        print("S2 body", page.inner_text("body")[:600])
        browser.close()
    print("done", RAW)


if __name__ == "__main__":
    main()
