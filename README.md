# Deadlock TH

A Thai guide to Deadlock: a static, client-side-only Astro site. Terms are defined in `GLOSSARY.md`; the current spec and tickets live in `.scratch/`.

## Commands

The project uses [Bun](https://bun.sh) as its package manager (`bun.lock`); don't use npm.

```sh
bun install
bunx playwright install chromium   # first time only
bun run dev       # dev server at http://localhost:4321
bun run build     # static site in dist/ (fails on invalid content)
bun run test      # build, then run the Playwright tests against the built site
bun run check     # TypeScript and Astro type check
```

## Content

- Console commands: `src/content/commands.yaml`, one entry per command keyed by its exact name. The schema in `src/content.config.ts` fails the build on a broken entry.
- Saved copies of the sources: `source_deadlock/`.
- Items: `src/content/items.yaml`, one entry per item keyed by a slug id, standard (6v6) match values only. Icons go in `public/items/` (git-ignored); a missing icon shows the item's initials.

### Adding items

1. Fetch the wiki pages with `/agent-wiki` and turn the result into a JSON file shaped like `source_deadlock/items/weapon-tier1-800.json` (the shape is documented at the top of `scripts/import-items.ts`).
2. `bun run import-items <file.json>`: appends the new items to `src/content/items.yaml`, skips ids already there, and lists the Thai fields to fill in.
3. Fill in those Thai fields (the build fails while any is empty), drop the icons into `public/items/`, then `bun run test`.

Category pages, cost rows (Legendary last), item pages, "builds into" links and the landing counts all follow the content; no code changes are needed.
