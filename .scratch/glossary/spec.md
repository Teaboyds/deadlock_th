# Spec: Glossary tab — game terms in Thai

Status: done (content fetched 2026-11-24, see source_deadlock/deadlock-wiki-stat-terms.md)

## Problem Statement

Item stats and wiki pages use game words like Fire Rate, Bullet Velocity and Bullet Resist. When I don't know exactly what one means, I can't judge whether an item is worth buying. I want one place that explains these words in short Thai.

## Solution

A new **Glossary** tab, last in the menu, that explains each **term** (a game word such as a stat name) in Thai. Each term shows which items give it, and item pages link their stat names to it. Content is translated from deadlock.wiki; anything the site adds itself is labelled.

## User Stories

1. As a player, I want a Glossary tab, so that I can look up any game word in one place.
2. As a player, I want each term under the exact English name the game uses, so that I match it to what I see in the shop and HUD.
3. As a player, I want a one-line Thai meaning per term, so that I get the idea at a glance.
4. As a player, I want a 2–3 line Thai explanation, so that I understand how the term works.
5. As a player, I want each term to list the items that give it, so that I know where to get more of it.
6. As a player, I want the Resist terms explained together under one overview, so that I see how Bullet, Spirit and Melee Resist differ.
7. As a player, I want terms grouped (weapon, defence, health and regen), so that related words sit together.
8. As a player, I want to search terms in English or Thai, so that I find a word whichever way I remember it.
9. As a player, I want stat names on item pages to link to their term, so that I can check a word without leaving what I'm reading.
10. As a player, I want to see each term's source, and whether the site wrote part of it, so that I know how far to trust it.
11. As the maintainer, I want terms kept as structured content checked by the build, so that a broken entry never ships.

## Implementation Decisions

- **Tab:** "Glossary", added after Commands (Heroes, Items, Commands, Glossary). It is a ready tab once the first terms exist.
- **First batch (10 terms plus an overview):**
  - weapon: Weapon Damage, Fire Rate, Bullet Velocity, Max Ammo, Head Shot Bonus Damage
  - defence: a "Damage Resistance" overview (the wiki's own page name), then Bullet Resist, Spirit Resist, Melee Resist
  - health and regen: Bonus Health, Out of Combat Regen
- **Names:** the term name is the stat label shown on items in the shop (Max Ammo, Out of Combat Regen), so item pages can link to it. The wiki's other names (Ammo, Clip Size, Out of Combat Health Regen) are listed under the heading as aliases and are searchable.
- **Explanations only (decided after the fetch):** each term explains what the stat means so a player understands it. Formulas and calculations are left out for now and can be added later.
- **Source revision:** shown when the fetch captured it; Fire_Rate, Damage_Resistance and Health were truncated before their revision, so those terms link to the page without one.
- **Content:** a `terms` collection (strict YAML loader, schema enforced at build). Each term holds:
  - the English name and its group
  - a Thai one-line meaning and a Thai explanation, each with its English original
  - the source (deadlock.wiki page and revision, or site-written)
  - an optional site-written note, shown apart and labelled
  - a needs-review flag
- **Source:** deadlock.wiki pages fetched by the user with `/agent-wiki`; Claude does not write mechanics explanations from memory.
- **"Where to get it":** computed at build time from the items collection, by matching item stat labels to the term name. It is never hand-written.
- **Page:**
  - groups in a fixed order, terms alphabetical within each group
  - each term has its own anchor
  - a search box matches the English name and the Thai meaning (progressive enhancement, like Commands)
- **Item pages:** a stat label that matches a term name links to that term's anchor on the Glossary page.
- **Styling:** the existing daisyUI `deadlock` theme.

## Testing Decisions

- One seam: the built site in Playwright, asserting what a reader sees. Tests follow the content rather than hard-coding counts, like the Items tests.
- **What the tests cover:**
  - the menu shows Glossary last, and it is marked current on its page
  - each group renders, with a known term (Fire Rate) showing its Thai meaning and source
  - a term's "where to get it" lists an item known to give it (e.g. Rapid Rounds for Fire Rate)
  - searching in English and in Thai finds the term
  - on an item page, the stat name links to the matching term anchor
- **Prior art:** `tests/items.spec.ts`, `tests/search-filter-copy.spec.ts`.

## Out of Scope

- Terms beyond the first 10 (Spirit stats, movement, abilities, map words); they are added later as content.
- Hero-specific mechanics.
- Formulas and damage calculations (to be added later).
- Thai translations of term names themselves (names stay as in the game).

## Further Notes

- Blocked on content: the user runs `/agent-wiki` to find and copy the wiki's explanations of the 10 terms. The suggested starting points are https://deadlock.wiki/Stats and pages linked from item pages.
