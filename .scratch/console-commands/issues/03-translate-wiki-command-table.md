# 03: Translate the full deadlock.wiki command table

**What to build:** The Commands page shows every command from the deadlock.wiki Console commands table (revision `oldid=236265`, 52 rows), translated into short, clear Thai. They're organised into the six command groups, so a reader can find any wiki command and understand it in one line.

See the spec's "Translation rules", "Command groups" and "Merging rows" decisions, and the glossary for vocabulary.

**Blocked by:** 01

**Status:** done

- [x] Every row of the wiki table is present as a console command entry, with name, values and default copied verbatim and the English description stored as the original
- [x] Rows that differ only in value (e.g. `citadel_rapid_stamina_regen` true/false) are merged into one entry listing all values
- [x] The 21 rows marked "Requires cheats" on the wiki are cheat commands; no other entry is
- [x] Every entry has a one-line Thai translation; game terms stay in English
- [x] Every entry is assigned to exactly one of the six command groups: ฝึกซ้อม, Bot / NPC / Trooper, แมพ / ล็อบบี้ / เซิร์ฟเวอร์, HUD / ข้อมูล, Bind / ตั้งปุ่ม, อื่น ๆ
- [x] Practice notes are added only where the training benefit is clear
- [x] Translations or group choices the agent is unsure of carry the "needs review" flag, and the agent lists them in its hand-off
- [x] All six command groups render on the page (an empty group may show a short placeholder line until ticket 06 fills Bind)
- [x] Tests cover: the six groups render, and known entries show the right cheat badge (e.g. `citadel_ability_cooldown_max` is a cheat command, `changelevel` is not)
