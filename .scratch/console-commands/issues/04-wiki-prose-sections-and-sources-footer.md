# 04: Wiki prose sections and sources footer

**What to build:** The Commands page explains, in Thai, how to actually use commands:

- how to open the console, and where commands work
- how autoexec works
- how to host a custom game
- how to add bots

It ends with a footer listing the sources with their revisions and the translation date.

See the spec's "Prose sections" decision and Further Notes.

**Blocked by:** 01

**Status:** done

- [x] Opening the console: enable "Dev command console" in settings, press F7; commands work in Hideout, Sandbox, Explore NYC and cheat-enabled custom games; server commands only on custom servers; cheat commands need `sv_cheats true` in a custom lobby
- [x] Autoexec: where `autoexec.cfg` goes (`...\Deadlock\game\citadel\cfg`), one command per line, and the `-console -exec autoexec` launch options. The wiki screenshot is not reused; describe the step in text instead
- [x] Hosting custom games: the `map dl_midtown`, `status`, `connect`, `changeteam 0`, `changelevel dl_midtown` flow
- [x] Adding bots: `exec citadel_botmatch_practice_6v6` and the `citadel_spawn_practice_bots` / `citadel_spawn_practice_bots_count` steps
- [x] All commands, paths and map names inside the prose are verbatim, and each command shown has a copy button (the copy behaviour itself may land in ticket 05)
- [x] Prose is authored content kept with the data, not hard-coded in UI components, and records its source
- [x] The footer lists deadlock.wiki (`oldid=236265`) and Valve Developer Wiki (`oldid=509699`) with links and the translation date
- [x] Tests cover: the four prose sections render, and the footer shows both sources with their revisions
