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
