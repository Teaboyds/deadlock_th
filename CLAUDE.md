## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

Uses the five default triage labels (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`). See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.

## Working rules

- Do all work directly in the main session. Do not spawn subagents or workflows. Work tickets one at a time.
- Use Bun for everything: `bun install`, `bun run <script>`, `bunx <tool>`. Never npm/npx. Note `bun run test` runs the Playwright suite; plain `bun test` is Bun's own test runner.
