---
title: เพิ่ม Bot
order: 4
placement: after-commands
parent: hosting
source: deadlock-wiki
needsReview: true
reviewNotes:
  - "The wiki writes \"(i.e. `map street_test`)\" although its hosting steps use dl_midtown; rendered as เช่น (e.g.) with the command kept verbatim."
  - "\"see table above\" rendered as ดูรายการคำสั่งด้านบน, since this site shows cards, not the wiki table."
  - "\"Bots should fill\" kept as a hedge: บอทน่าจะเติม."
en: |
  - On the main menu, before you start the game, run `exec citadel_botmatch_practice_6v6` to load the bot config.
    - If you're already in a game, you can perform these steps then run `changelevel dl_midtown` to restart the game instead of starting a new one.
  - Run `citadel_spawn_practice_bots false` so that bots won't spawn immediately when the game starts.
  - Run `citadel_spawn_practice_bots_count 12` to ensure that bots fill all remaining slots (they'll be added until both teams have 6 players).
  - Start the game (i.e. `map street_test`) and press P to pause the game during the pregame (as soon as you load in).
    - You can use `citadel_pregame_duration` before starting the game to increase the duration of the pregame if you want.
  - Allow all other human players to connect and select their team and hero.
    - The team/hero menu can be a bit glitchy. Players can use the `changeteam` command instead (see table above for command description).
    - Remember to choose your (the host's) own team and hero as well. This may automatically unpause the game - press P after selecting a team to pause again.
    - After all human players have joined teams and selected heroes, the host runs `citadel_spawn_practice_bots true`, then presses P again to unpause the game. Bots should fill the remaining slots on each team.
---

1. ที่เมนูหลัก ก่อนเริ่มเกม ให้รัน <code data-command>exec citadel_botmatch_practice_6v6</code> เพื่อโหลด config ของบอท
   - ถ้าอยู่ในเกมแล้ว ทำขั้นตอนเหล่านี้แล้วรัน <code data-command>changelevel dl_midtown</code> เพื่อเริ่มเกมใหม่แทนการเปิดเกมใหม่ได้
2. รัน <code data-command>citadel_spawn_practice_bots false</code> เพื่อไม่ให้บอทเกิดทันทีตอนเกมเริ่ม
3. รัน <code data-command>citadel_spawn_practice_bots_count 12</code> เพื่อให้บอทเติมช่องที่เหลือทั้งหมด (จะเพิ่มบอทจนทั้งสองทีมมีผู้เล่นทีมละ 6 คน)
4. เริ่มเกม (เช่น <code data-command>map street_test</code>) แล้วกด **P** เพื่อ pause ตอน pregame (ทันทีที่โหลดเข้า)
   - ถ้าต้องการ ใช้ `citadel_pregame_duration` ก่อนเริ่มเกมเพื่อยืดเวลา pregame ได้
5. รอให้ผู้เล่นคนอื่นทุกคนเข้ามาและเลือกทีมกับ Hero
   - เมนูเลือกทีม/Hero อาจรวนบ้าง ผู้เล่นใช้คำสั่ง `changeteam` แทนได้ (ดูคำอธิบายคำสั่งในรายการคำสั่งด้านบน)
   - อย่าลืมเลือกทีมและ Hero ของตัวเอง (host) ด้วย ซึ่งอาจทำให้เกม unpause เอง ให้กด **P** หลังเลือกทีมเพื่อ pause อีกครั้ง
   - เมื่อผู้เล่นทุกคนเข้าทีมและเลือก Hero แล้ว host รัน <code data-command>citadel_spawn_practice_bots true</code> แล้วกด **P** อีกครั้งเพื่อ unpause บอทน่าจะเติมช่องที่เหลือในแต่ละทีม
