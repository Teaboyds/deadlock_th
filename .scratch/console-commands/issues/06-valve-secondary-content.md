# 06: Valve Developer Wiki secondary content

**What to build:** The Commands page gains content from the secondary source, the saved Valve Developer Wiki list (`oldid=509699`):

- a Bind group with a syntax guide and ready-made binds
- common autoexec-style settings
- a few extra practice commands

Every piece is clearly labelled with its source and marked untested. Where the Valve list contradicts the wiki, the wiki wins and nothing is shown about the conflict.

See the spec's "Conflict rule" decision and Further Notes; see the glossary for bind, source and untested.

**Blocked by:** 03, 04

**Status:** done

- [x] The Bind / ตั้งปุ่ม group opens with a Thai syntax guide covering `bind`, `unbind`, `toggle`, chaining with `;`, `alias`, and keeping binds in `autoexec.cfg` (linking to the autoexec section)
- [x] 5–8 useful example binds, including `bind m "toggle volume 0 0.5"`, each copyable
- [x] Autoexec-style settings from the Valve list are added to the fitting groups: `cl_showfps`, `fps_max`, the `cl_hud_telemetry_*` ping/FPS/packet-loss settings and `citadel_hud_visible` (already on the wiki, so the wiki entry is kept and nothing is added from Valve)
- [x] Up to about 10 extra `citadel_*` practice commands from the Valve list that the wiki lacks, chosen for clear training value
- [x] Every entry from the Valve list or written by the site shows its source badge and is untested
- [x] Where the Valve list contradicts a wiki entry (cheat flag differs, or the command is missing from Valve), the wiki entry stays as it is: no note, not untested. The Valve list is only used for content the wiki doesn't have
- [x] Entries whose Valve flags lack `release` (e.g. `volume`) mention that they may not work in the retail game
- [x] Tests cover: the Bind group and syntax guide render, a Valve-sourced command shows its source badge and untested marker, and a wiki command the Valve list contradicts (e.g. `bot_kick_all`) shows no untested marker
