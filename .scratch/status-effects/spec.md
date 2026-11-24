# Spec: Status Effects tab

Status: done (content fetched 2026-11-24, see source_deadlock/deadlock-wiki-status-effects.md)

## Problem Statement

In fights I get hit by things like Stun, Silence or Curse, and items or abilities mention buffs like Unstoppable. I don't always know exactly what each one stops me from doing. I want short Thai explanations of every status effect in one place.

## Solution

A **Status Effects** tab, last in the menu, listing the game's buffs and debuffs with short Thai explanations, plus a short section on how to counter debuffs. Content is translated from deadlock.wiki's Status Effects page.

## User Stories

1. As a player, I want every buff and debuff on one page, so that I can look one up mid-session.
2. As a player, I want each effect under its in-game name, so that it matches what I see.
3. As a player, I want a clear Buff or Debuff label on each effect, so that I know at a glance whether it helps or hurts.
4. As a player, I want a one-line Thai meaning and a short explanation, so that I know exactly what the effect stops or allows (e.g. Silence still allows active items).
5. As a player, I want other names listed (Time Stop is also Time Slow / Slow Motion), so that I recognise them.
6. As a player, I want to know how to counter debuffs (temporary immunity, Purge, Debuff Resistance), so that I can plan items.
7. As a player, I want search and a contents sidebar like the other tabs, so that the long list stays easy to use.
8. As the maintainer, I want effects kept as structured content checked by the build.

## Implementation Decisions

- **Tab:** "Status Effects", after Glossary. The page is separate from the Glossary because status effects are many and differ from stat terms.
- **Scope:** 12 buffs, 14 debuffs, and a "countering debuffs" group (Temporary Buffs, Purge, Debuff Resistance). Hero-specific effects (12) wait for the Heroes tab.
- **Content:** a `status-effects` collection (strict YAML loader, schema enforced at build). Each entry holds:
  - name and aliases
  - kind: buff, debuff or counter
  - a Thai one-line meaning, plus a Thai explanation with its English original
  - source URL
- **Sources lists:** the wiki's "Sources" lists (mostly hero abilities) are left out. Purge names the two items that purge (Dispel Magic, Divine Barrier) in its explanation.
- **Colours (user's choice, the only exception to the five-colour palette):** buffs green `#0BA372`, debuffs red `#CA401C`, on the badge and as a 4px left edge on the card. Badge text is charcoal on green (5.0:1) and white on red (4.9:1); cream on red would be only 3.7:1.
- **Page:** same pattern as Glossary: groups (Buff, Debuff, วิธีรับมือ Debuff), cards, search, contents sidebar on wide screens. No wiki icons.
- **Shared search:** the card search used by Glossary is extracted into one component that both tabs use.

## Testing Decisions

- One seam: the built site in Playwright. Tests cover:
  - the menu shows Status Effects last
  - a known debuff (Stun) shows its label and Thai meaning
  - an alias shows (Time Stop → Time Slow)
  - search filters the cards
  - the sidebar lists the groups
  - hero-specific effects are absent
  - the source link

## Out of Scope

- Hero-specific effects.
- Per-effect sources (abilities and items).
- Effect icons.
- Durations and numbers.
