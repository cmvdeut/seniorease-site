#!/usr/bin/env python3
"""Capture current Gemini UI screens for H2 (no personal login stored)."""
from __future__ import annotations

from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
RAW = ROOT / "raw"
RAW.mkdir(parents=True, exist_ok=True)

Q = (
    "Geef mij drie eenvoudige ideeën voor een maaltijd "
    "met aardappelen, broccoli en eieren."
)
FOLLOW = "Welke is het makkelijkst?"


def dismiss_overlays(page) -> None:
    labels = [
        "Alles accepteren",
        "Accept all",
        "Alle accepteren",
        "Ik ga akkoord",
        "Aanvaard alles",
        "Agree",
        "OK",
    ]
    for label in labels:
        try:
            btn = page.get_by_role("button", name=label)
            if btn.count() and btn.first.is_visible():
                btn.first.click(timeout=2000)
                page.wait_for_timeout(1200)
                print("clicked role", label)
                return
        except Exception:
            pass
    for t in labels:
        loc = page.locator(f'button:has-text("{t}")')
        if loc.count():
            try:
                loc.first.click(timeout=2000)
                page.wait_for_timeout(1200)
                print("clicked text", t)
                return
            except Exception:
                pass
    # scroll cookie dialog "Meer lezen" then look for accept
    meer = page.get_by_role("button", name="Meer lezen")
    if meer.count():
        try:
            meer.first.click(timeout=2000)
            page.wait_for_timeout(800)
        except Exception:
            pass
    for label in ["Alles accepteren", "Accept all", "Afwijzen", "Alleen noodzakelijke"]:
        loc = page.locator(f'button:has-text("{label}")')
        if loc.count():
            try:
                loc.first.click(timeout=2000)
                page.wait_for_timeout(1200)
                print("clicked after meer", label)
                return
            except Exception:
                pass


def main() -> None:
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        ctx = browser.new_context(
            viewport={"width": 1440, "height": 900},
            locale="nl-NL",
        )
        page = ctx.new_page()
        page.goto("https://gemini.google.com/app", wait_until="domcontentloaded", timeout=60000)
        page.wait_for_timeout(3500)
        page.screenshot(path=str(RAW / "00-before-cookies.png"), full_page=False)
        dismiss_overlays(page)
        page.wait_for_timeout(2000)
        page.screenshot(path=str(RAW / "01-after-cookies.png"), full_page=False)
        print("url", page.url)
        print("nieuw gesprek", page.get_by_text("Nieuw gesprek").count())

        # S1 empty
        page.screenshot(path=str(RAW / "full-s1.png"), full_page=False)

        # focus typvak
        editable = page.locator('div[contenteditable="true"]').first
        editable.click()
        page.wait_for_timeout(400)
        page.screenshot(path=str(RAW / "full-s1-focused.png"), full_page=False)

        # type question for S2
        page.keyboard.type(Q, delay=12)
        page.wait_for_timeout(700)
        page.screenshot(path=str(RAW / "full-s2.png"), full_page=False)

        # try send
        sent = False
        for sel in [
            'button[aria-label*="Verzend"]',
            'button[aria-label*="Send"]',
            'button[aria-label*="Indienen"]',
            'button[aria-label*="Submit"]',
            'button[aria-label*=" versturen" i]',
        ]:
            loc = page.locator(sel)
            print(sel, loc.count())
            if loc.count():
                try:
                    loc.last.click(timeout=3000)
                    sent = True
                    print("sent", sel)
                    break
                except Exception as exc:
                    print("fail", sel, exc)
        if not sent:
            page.keyboard.press("Enter")
            print("Enter pressed")
        page.wait_for_timeout(8000)
        page.screenshot(path=str(RAW / "full-after-send.png"), full_page=False)
        print("after url", page.url)
        body = page.inner_text("body")
        print("body[:900]")
        print(body[:900])

        # try follow-up if chat worked
        if "Inloggen" in body and "maaltijd" not in body.lower():
            print("LIKELY_BLOCKED_BY_LOGIN")
        else:
            editable = page.locator('div[contenteditable="true"]').first
            editable.click()
            page.keyboard.type(FOLLOW, delay=12)
            page.wait_for_timeout(500)
            page.screenshot(path=str(RAW / "full-s4a.png"), full_page=False)
            page.keyboard.press("Enter")
            page.wait_for_timeout(8000)
            page.screenshot(path=str(RAW / "full-s4.png"), full_page=False)

        # nieuw gesprek
        ng = page.get_by_text("Nieuw gesprek")
        if ng.count():
            page.screenshot(path=str(RAW / "full-s5-before.png"), full_page=False)
            try:
                ng.first.click(timeout=3000)
                page.wait_for_timeout(2000)
                page.screenshot(path=str(RAW / "full-s6.png"), full_page=False)
            except Exception as exc:
                print("nieuw gesprek click failed", exc)

        browser.close()
    print("done", RAW)


if __name__ == "__main__":
    main()
