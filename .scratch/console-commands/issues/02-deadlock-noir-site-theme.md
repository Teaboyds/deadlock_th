# 02: Deadlock noir site-wide theme

**What to build:** Every page (home, tab menu, Commands) looks like Deadlock's art-deco noir style and reads well on a phone. The theme belongs to the shared layout, not the Commands page, so future tabs get it for free.

See the spec's "Theme", "Fonts" and "No official assets" decisions.

**Blocked by:** 01

**Status:** done

- [x] Dark theme only; every colour comes from the five-colour palette, used in the roles set in the spec (Charcoal page background, Dark Slate cards, Deep Pine borders and ornament, Sage secondary text on Charcoal only, Cream primary text)
- [x] The cheat badge is inverted (Charcoal on Cream)
- [x] Fonts: a decorative art-deco face for Latin headings, Noto Serif Thai for Thai headings, Anuphan for body text, JetBrains Mono for command names
- [x] Art-deco frames, corners and rules are CSS-only, with a faint noise texture; no logos, hero art or icons from the game, deadlock.wiki or Valve
- [x] The practice note is visually distinct from the translation
- [x] No page scrolls horizontally at phone width (360px), with a 16px side gutter; a Playwright test checks this
- [x] Existing tests still pass
