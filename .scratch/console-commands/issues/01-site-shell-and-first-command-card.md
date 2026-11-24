# 01: Site shell and first command card (tracer bullet)

**What to build:** A reader opens the site and sees a home page listing the Commands tab as a card. Clicking it goes to the Commands page, which shows a tab menu (with Commands marked as current) and a handful of real console command cards. Each card shows its name, cheat badge, values and default, Thai translation, source badge and, where present, a practice note. This proves the whole path works end to end: content schema → page → browser test. Every later ticket builds on it.

Setup that belongs here:

- initialise git (no commits until the user asks)
- rename the saved Valve Developer Wiki page in the source folder from its browser-given name to `vdc-deadlock-commands` (the page and its assets folder)

See the spec's "Multi-tab site shell", "Content is data" and "Schema rules" decisions.

**Blocked by:** None (can start immediately)

**Status:** done

- [x] The project is a git repository with no commits made by the agent
- [x] The saved Valve page and its assets folder are renamed to `vdc-deadlock-commands`
- [x] An Astro + TypeScript project builds to fully static output
- [x] One shared layout holds the site title and tab menu, and every page uses it
- [x] The tab list is defined in one place; the menu shows only tabs with a page (only Commands), and marks the current tab
- [x] The home page (`/`) shows the site name and a card for each available tab, linking to it
- [x] The Commands tab lives at `/commands`
- [x] A content schema for console commands has every field listed in the spec, and the build fails when any schema rule is broken (duplicate name, unknown command group, missing Thai translation, missing English original for sourced content, non-wiki or disagreeing entry not marked untested)
- [x] 2–3 real commands from deadlock.wiki (including `citadel_ability_cooldown_max`) render as cards inside their command group, and at least one has a practice note shown apart from the translation
- [x] Playwright runs against the built site, with passing tests for: home page card → Commands link, the tab menu on every page, and the card contents of a known command
- [x] A short README note explains how to run dev, build and tests
