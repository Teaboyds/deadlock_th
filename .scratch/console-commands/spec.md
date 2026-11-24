# Spec: Console commands page (Thai)

Status: ready-for-agent

## Problem Statement

I play Deadlock and want to get better at it. The developer console has commands that make practice much easier (shorter cooldowns, spawning bots, damage meters, binds), but the only references are in English. They're long and spread across two sites: deadlock.wiki lists about 52 commands alphabetically, and the Valve Developer Wiki dumps over 2,300 cvars with terse descriptions. Reading them slows me down. I can't quickly tell which commands help me practise, which need cheats, or what to type exactly. I want a short, clear Thai page I can keep open while I play. It's for my own use for now, but it may be published later.

## Solution

Build a static, client-side-only website. The site is organised into **tabs**: Commands, Items, Heroes and Patch notes. This spec delivers the site shell (home page, tab menu, site-wide theme) and the first tab, Commands, which is a single Thai page about Deadlock console commands. The page covers:

- the whole deadlock.wiki Console commands page, which is the primary **source**
- extra material from the Valve Developer Wiki command list, which is the secondary **source**: binds, autoexec-style settings, and up to about 10 extra practice commands

Each **console command** is shown as a card with:

- the exact command name
- a one-line Thai **translation**
- its values and default
- a badge when it is a **cheat command**
- its **source**
- an optional **practice note**

Cards are organised into six **command groups**. You can search them in Thai or English, filter them by whether they need cheats, and copy a command with one click.

Everything that doesn't come from the primary source is marked **untested** until it's confirmed in-game. When the two sources disagree, the primary source wins and the secondary source is ignored for that point. The page uses a Deadlock-inspired art-deco noir theme built from a fixed five-colour palette, with no official game assets.

## User Stories

1. As a player, I want a Thai explanation of every command on the deadlock.wiki Console commands page, so that I understand them without reading English.
2. As a player, I want each translation to be one short line, so that I can scan the page quickly while playing.
3. As a player, I want command names, values, map names and file paths shown exactly as in the source, so that what I copy works in the console.
4. As a player, I want game terms like Trooper, Hideout, Sandbox and Flex slot left in English, so that they match what I see in the game.
5. As a player, I want a one-click copy button on every command, so that I don't make typos.
6. As a player, I want a clear badge on every cheat command, so that I know it won't work in a normal match.
7. As a player, I want to be told that cheat commands need `sv_cheats true` in a custom lobby, and where commands work (Hideout, Sandbox, Explore NYC, cheat-enabled custom games), so that I know where to use them.
8. As a player, I want to filter the list to cheat-only or non-cheat commands, so that I see only what works in my current mode.
9. As a player, I want commands grouped by purpose (ฝึกซ้อม, Bot / NPC / Trooper, แมพ / ล็อบบี้ / เซิร์ฟเวอร์, HUD / ข้อมูล, Bind / ตั้งปุ่ม, อื่น ๆ), so that I find what I need by goal instead of alphabet.
10. As a player, I want to search by English command name, so that I can find a command I already know.
11. As a player, I want to search by Thai words in the translation, so that I can find a command by what it does.
12. As a player, I want to see each command's accepted values and default, so that I know what to type and how to reset it.
13. As a player, I want commands that the wiki lists as separate rows per value (e.g. `citadel_rapid_stamina_regen` true/false) shown as one card, so that the list isn't repetitive.
14. As a player, I want a practice note on commands that clearly help training (e.g. max cooldown for combo practice), so that I know how to use them to improve.
15. As a player, I want practice notes visibly separated from the translation, so that I can tell the wiki's content from the site's own advice.
16. As a player, I want a translated section on opening the console (enabling "Dev command console" and pressing F7), so that I can start using commands.
17. As a player, I want a translated section on autoexec (where to create the file, and the `-console -exec autoexec` launch options), so that my settings load every time the game starts.
18. As a player, I want a translated section on hosting a custom game (`map dl_midtown`, `status`, `connect`, `changeteam`, `changelevel`), so that I can practise with friends.
19. As a player, I want a translated section on adding bots (the botmatch practice exec and the practice bot commands), so that I can practise against bots.
20. As a player, I want a Bind group with a short syntax guide (`bind`, `unbind`, `toggle`, chaining with `;`, `alias`, keeping binds in `autoexec.cfg`), so that I can make my own key binds.
21. As a player, I want 5–8 ready-made useful binds (e.g. `bind m "toggle volume 0 0.5"`), so that I can copy them straight into my autoexec.
22. As a player, I want common autoexec-style settings from the Valve list (FPS display, `fps_max`, HUD telemetry for ping and packet loss, HUD visibility), so that I can tune my setup.
23. As a player, I want up to about 10 extra useful `citadel_*` practice commands from the Valve list that the wiki lacks, so that I have more training tools.
24. As a player, I want every card to show its source (deadlock.wiki, Valve Developer Wiki, or written by this site), so that I know how far to trust it.
25. As a player, I want everything not from deadlock.wiki marked untested, so that I know it might not work in the current game.
26. As a player, I want the page to follow deadlock.wiki whenever the Valve list says something different, so that each card gives one clear answer instead of competing claims.
27. As the maintainer, I want to clear a command's untested status once I've tried it in-game, so that the page reflects what I've verified.
28. As the maintainer, I want each command's original English description stored next to the Thai one, so that I can see what changed when the wiki updates.
29. As the maintainer, I want the page footer to list each source with its revision (deadlock.wiki `oldid=236265`, Valve Developer Wiki `oldid=509699`) and the translation date, so that I can tell when content is out of date.
30. As the maintainer, I want to add my own binds to the data without touching the UI, so that the page grows with my setup.
31. As the maintainer, I want the build to fail when a command entry is malformed, so that mistakes never reach the page.
32. As the maintainer, I want translations Claude was unsure about marked for my review, so that I can fix them before relying on them.
33. As a reader, I want a dark art-deco noir theme in Deadlock's colours, so that the site feels like the game.
34. As a reader, I want body text in a highly readable Thai font, with decorative type only in headings, so that long Thai text stays easy to read.
35. As a reader on a phone, I want cards that fit a narrow screen without sideways scrolling, so that I can read on my phone beside the PC.
36. As a reader, I want a home page that lists the site's tabs as cards, so that I can see what the site covers and jump in.
37. As a reader, I want a tab menu on every page, so that I can move between tabs once more exist.
38. As a reader, I want the menu to show only tabs that have real content, so that I never land on an empty placeholder.
39. As the maintainer, I want the layout, menu and theme shared by every tab, so that adding Items, Heroes or Patch notes later means adding a page and a menu entry, not reworking the site.
40. As a future visitor, I want the site to contain no official logos or game art, so that it can be published without asset-licensing problems.

## Implementation Decisions

- **Stack:** Astro with TypeScript. The output is fully static HTML/CSS/JS, with no backend and no runtime data fetching. It must be hostable on any static host (e.g. GitHub Pages), though hosting is not part of this spec.
- **Multi-tab site shell:**
  - one shared layout holds the site title, the tab menu and the theme, and every page uses it
  - each tab has its own URL; Commands lives at `/commands`
  - the tab list is defined in one place, and the menu shows only tabs that have a page (only Commands for now)
  - the home page (`/`) shows the site name and one card per available tab, instead of redirecting
  - the theme is site-wide, not specific to Commands
  - the site header is a full-width header bar that sticks to the top while scrolling: site name on the left, tabs on the right; on narrow screens the tabs scroll sideways instead of collapsing into a menu (decided after ticket 06)
- **Content is data, separate from UI.** Commands live in a typed content collection with a schema that is enforced at build time. Each command entry has:
  - the command name (exact)
  - accepted values (exact, may be empty)
  - default (may be empty)
  - whether it requires cheats
  - its command group (one of the six)
  - its source: deadlock.wiki, Valve Developer Wiki, or site-written
  - whether it is untested
  - the Thai translation
  - the original English description
  - an optional Thai practice note
  - an optional "needs review" flag
- **Prose sections** (opening the console, autoexec, hosting custom games, adding bots, and the bind syntax guide) are authored content kept with the data, not hard-coded in UI components. Each section records its source.
- **Schema rules, so the build fails if any is broken:**
  - command names are unique
  - the group is one of the six defined groups
  - a Thai translation is present
  - an English original is present for anything taken from a source
  - anything whose source is not deadlock.wiki is untested
- **Conflict rule (decided by the user after ticket 01):** when the two sources disagree, the page follows deadlock.wiki only. It shows no disagreement note and doesn't mark the entry untested because of the conflict.
- **Command groups** (Thai labels as shown): ฝึกซ้อม, Bot / NPC / Trooper, แมพ / ล็อบบี้ / เซิร์ฟเวอร์, HUD / ข้อมูล, Bind / ตั้งปุ่ม, อื่น ๆ. Each command belongs to exactly one group. Claude assigns groups during translation and the user reviews them. The Bind group starts with the syntax guide box.
- **Merging rows:** wiki rows that differ only in value become one entry listing all values.
- **Translation rules:**
  - Thai, short but clear, one line per command
  - command names, values, paths and map names copied verbatim
  - game terms stay in English
  - practice notes are only added where the benefit is clear
- **Interactive behaviour** is a small client-side script on a statically rendered list:
  - one text search that matches the command name and the Thai translation
  - a three-state cheat filter: all / cheat only / no cheats
  - a copy button per command that copies the exact command text
  - search and filter combine; groups with no matches are hidden
- **In-page shortcuts (added after ticket 06):** a "สารบัญ" list of links to every section in page order: the guides before the command groups, the six command groups, then the guides after them. On wide screens (1180px and up) it is a sticky sidebar to the left of the content and marks the section being read; on narrower screens it is a row of links under the page title (mobile was explicitly not a focus). Links to command groups hidden by the search or cheat filter are disabled.
- **Card layout:** one card per command. It shows the name and copy button, the cheat badge, values and default, the translation, the practice note (visibly distinct), the source badge and the untested state. The wiki's four-column table is not used.
- **Theme:** dark only. Every colour comes from this palette:

  | Colour | Hex | Role |
  |---|---|---|
  | Charcoal | `#222021` | page background |
  | Dark Slate | `#2f4442` | cards |
  | Deep Pine | `#3f5d4d` | header bar, borders and art-deco ornament |
  | Sage | `#72947f` | secondary text, only on Charcoal; ornament |
  | Cream | `#efdebf` | primary text and headings |

  The cheat badge is inverted (Charcoal on Cream). No other colours are added. Art-deco frames, corners and rules are CSS-only, with a faint noise texture.
- **Fonts (Google Fonts):** a decorative art-deco face for Latin headings, Noto Serif Thai for Thai headings, Anuphan for body text, and JetBrains Mono for command names.
- **No official assets:** no logos, hero art or icons from the game, deadlock.wiki or Valve.
- **Source files:** the saved Valve Developer Wiki page is kept in the source folder and renamed from its browser-given name to a descriptive one (`vdc-deadlock-commands`), so it can't be confused with the project glossary.
- **Repository:** initialise git, but make no commits until the user asks.

## Testing Decisions

- **One seam:** the built site, exercised in a real browser with Playwright. Tests only assert what a reader sees and can do, never component internals or data-file structure.
- **Data correctness** is enforced by the content schema at build time instead of a separate test seam. A malformed entry fails the build.
- **What the browser tests cover:**
  - searching an English command name shows that command's card
  - searching a Thai word from a translation shows the matching card
  - a search with no matches shows an empty state and hides empty groups
  - the cheat filter shows only cheat commands, only non-cheat commands, or all
  - search and filter combine correctly
  - the copy button puts the exact command text on the clipboard
  - cheat badges, source badges and untested markers appear on the right cards, checked against known entries (e.g. `citadel_ability_cooldown_max` is a cheat command; a Valve-sourced command is untested)
  - all six command groups render
  - the home page shows a card for the Commands tab that links to it
  - the tab menu appears on every page, lists only Commands, and marks the current tab
  - the prose sections render
  - the footer lists both sources with their revisions
  - the page has no horizontal scroll at phone width
- **Prior art:** none, as this is a greenfield repo. These tests set the pattern for future pages.

## Out of Scope

- The Items, Heroes and Patch notes tabs. These are planned future tabs; this spec only makes sure the shell can take them.
- A bind builder tool (pick a key plus a command to generate a line).
- Light mode and a theme switcher.
- A toggle to show the English original on the page (the original is stored, not displayed).
- Translating the full 2,300+ entry Valve cvar list.
- Hosting, deployment, domains and analytics.
- Resolving the content licence of either source. This must be checked before any public release.
- Testing commands in-game. That's done by the user, who then clears the untested status.

## Further Notes

- **Primary source:** https://deadlock.wiki/Console_commands, revision `oldid=236265`. It has 52 table rows, 21 of them marked "Requires cheats", plus prose sections. Its content licence couldn't be confirmed, because the wiki's Copyrights page returned 404.
- **Secondary source:** Valve Developer Community, "List of Deadlock console commands and variables", revision `oldid=509699`, last edited 26 June 2026. The user saved it locally because the site blocks automated fetching. It has 2,337 entries with flags (`cheat`, `sv`, `cl`, `release`, …).
- **Known disagreements between the sources:** a full comparison of all wiki commands against the Valve list found 15 disagreements: cheat flags differ on 7 commands, and 8 commands are missing from the Valve list. Under the conflict rule the wiki wins, so none of them is shown.
- **The `release` flag:** in the Valve list it usually means a command is usable in the retail game. `volume` lacks it, so the example bind `bind m "toggle volume 0 0.5"` may not work and stays untested.
- **Vocabulary:** see `GLOSSARY.md` for the agreed terms (console command, cheat command, bind, command group, source, translation, practice note, game term, untested).
