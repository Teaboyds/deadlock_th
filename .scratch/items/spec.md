# Spec: Items tab — Weapon, Tier 1

Status: ready-for-agent

## Problem Statement

The Items tab is still a "Coming soon" page. When I'm deciding what to buy, I want the shop's items in short Thai so I can see at a glance what each one gives and what it builds into, without reading long English wiki pages one item at a time.

## Solution

Turn the Items tab into a real page, starting with the seven Tier 1 Weapon items (800 souls). Each item is a card with its icon, cost, stats, passive, what it builds into, and the wiki's notes. Explanations are in Thai, while item and stat names stay in English as in the shop. Everything describes the **standard match** (6v6) only.

## User Stories

1. As a player, I want to see every Tier 1 Weapon item on one page, so that I can compare them before buying.
2. As a player, I want each item's icon next to its name, so that I recognise it the way I see it in the shop.
3. As a player, I want each item's cost in souls, so that I know what I can afford.
4. As a player, I want each item's stats with exact numbers, using the shop's English stat names, so that they match what the game shows.
5. As a player, I want an item's passive explained in Thai, with its cooldown and the stats it gives when its condition is met, so that I know when it works.
6. As a player, I want to see which items an item builds into, so that I can plan upgrades.
7. As a player, I want the wiki's notes on an item in Thai, so that I learn the edge cases (e.g. Headshot Booster doesn't trigger on Troopers).
8. As a player, I want Monster Rounds to show which Hero abilities it affects, so that I know whether it helps my Hero.
9. As a player, I want the values for the normal 6v6 mode only, so that I'm never confused by numbers from other modes.
10. As a player, I want a short intro saying these are Weapon items at Tier 1 for 800 souls, so that I know what the page covers.
11. As a player, I want each card to link to its wiki page, so that I can read more.
12. As the maintainer, I want the footer to show the Items page revision and fetch date, so that I know when the data might be stale.
13. As the maintainer, I want item data kept as structured content with a schema the build enforces, so that a broken entry never reaches the page.
14. As the maintainer, I want the English original stored next to each Thai text, so that I can re-check translations against the wiki.
15. As the maintainer, I want the page grouped by item category and then tier, so that adding Vitality, Spirit and higher tiers later doesn't need a redesign.
16. As a reader, I want the Items card on the landing page to stop saying "Coming soon".

## Implementation Decisions

- **Page structure (revised after the first build, following the wiki's item lists):**
  - `/items` shows one card per item category (Weapon, Vitality, Spirit); a category without data says "Coming soon"
  - `/items/<category>` lists the category's items in rows by cost, like the wiki: the cost (e.g. 800) as the row label with "Tier 1" beside it, then each item's icon and name inline, separated by bullets. Only rows that have data are shown; Legendary gets its own label when its data arrives
  - `/items/<category>/<item>` is the item's detail page with everything below (stats, passive, builds into, notes)
  - "builds into" names link to the target item's page when it exists on the site, and are plain text otherwise
  - row labels use the five-colour palette (pine block, cream text); no per-category colours

- **Scope: standard match only.** The page shows values for the normal 6v6 mode. Street Brawl and its enhanced item values are left out entirely: they're not stored in the content and never mentioned on the page.
- **Content:** a new `items` collection, kept apart from the UI and loaded with the same strict YAML loader as commands, so a duplicate id fails the build. Each entry is keyed by a slug id and holds:
  - name (English, as in the shop), item category, tier, cost and image file name
  - source page URL and its revision
  - stats, each with the verbatim text and the parsed value, unit and label
  - an optional passive: Thai text, English original, cooldown in seconds, and conditional stats (with their condition, e.g. "15m Close Range")
  - "component of": the names of the items it builds into
  - notes: Thai text plus English original
  - optional affected Hero abilities
  - a needs-review flag

  The raw fetched JSON in the source folder stays as the original copy.
- **Builds into:** use the wiki's complete "It is a component of …" list rather than the shorter infobox "Upgrades To". Show names as plain text until those items exist on the site.
- **Translation:**
  - item names, stat names, Hero and ability names stay in English (game terms)
  - passive descriptions and notes are translated into Thai
  - the Shopkeeper quotes are left out
- **Page layout:**
  - a short Thai intro saying these are Weapon items at Tier 1 for 800 souls; costs of other tiers are not stated, because they haven't been fetched
  - an item-category section (Weapon) containing a tier section (Tier 1), containing a responsive grid of item cards
  - no contents sidebar, search or filter for now
- **Item card:**
  - the icon, then the name, then the cost in souls
  - the stats
  - the passive block (Thai description, cooldown, conditional stats)
  - "ใช้รวมเป็น" (builds into)
  - Notes
  - the Hero-ability table (Monster Rounds only)
  - a source badge linking to the item's wiki page
- **Icons:**
  - served from a public folder that is git-ignored, so game images stay out of the repository
  - an item whose image file is missing at build time gets a framed initials placeholder with the same accessible name
  - whether to publish the icons is decided before any public release
- **Footer:** the Items page revision (`oldid=244252`) with a link, and the fetch date.
- **Tabs:** Items becomes a ready tab. Heroes stays coming soon, and the landing page's main button still goes to Commands.
- **Styling:** same daisyUI `deadlock` theme and components as the rest of the site.

## Testing Decisions

- One seam, as before: the built site in a real browser with Playwright, asserting only what a reader sees.
- Content correctness is enforced by the collection schema at build time.
- **What the tests cover:**
  - the Items tab is marked current in the menu, and the landing card no longer says Coming soon
  - the Weapon → Tier 1 section holds seven item cards
  - a known card (Close Quarters) shows its cost, a stat, its passive condition, its "builds into" item and a link to its wiki page
  - no Street Brawl text or enhanced value appears anywhere on the page
  - Monster Rounds lists an affected Hero ability
  - every card has an icon with the item's name, whether it's an image or the placeholder
  - the footer shows the Items page revision
- **Prior art:** the Commands tests (`tests/commands.spec.ts`, `tests/site-shell.spec.ts`).

## Out of Scope

- Street Brawl and any mode other than the standard 6v6 match.
- Item categories other than Weapon, and tiers above 1.
- Per-item pages, search, filters and a contents sidebar.
- Buying advice ("when to buy"), which needs real play knowledge.
- Shopkeeper quotes.
- Publishing item icons. They stay local until licensing is decided.

## Further Notes

- Data was fetched with `/agent-wiki` on 2026-11-24.
  - Items page: `oldid=244252`.
  - Item pages: Close Quarters 204425, Extended Magazine 204812, Headshot Booster 204468, High-Velocity Rounds 204477, Monster Rounds 218116, Rapid Rounds 204520, Restorative Shot 231166.
- The fetched Rapid Rounds quote matched High-Velocity Rounds' quote word for word. Quotes are out of scope, so this doesn't affect the page.
