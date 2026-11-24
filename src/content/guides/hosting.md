---
title: เปิด custom game
order: 3
placement: after-commands
source: deadlock-wiki
needsReview: false
en: |
  - The host starts a custom game by loading into the map with `map dl_midtown`
    - You may want to pause the game immediately after joining by pressing P to give other players time to join the match.
  - The host finds their ID by running `status`
    - Find a green line in the console that looks like this: `[Client] steamid : [A:1:XXXXXXXXXX:XXXXX] (XXXXXXXXXXXXXXXXX)` (the Xs will be replaced with numbers)
    - Select the part after `steamid` that looks like this, including the square brackets: `[A:1:XXXXXXXXXX:XXXXX]`
    - Right click and choose "Copy Selected Text"
  - The host sends players the ID they just copied. Players can now connect to the game by opening their console and running `connect [A:1:XXXXXXXXXX:XXXXX]` (replace the part after connect with the ID they got from the host).
  - Upon joining, players will be able to select their team and hero. To bring up this menu again, players can run `changeteam 0`.
  - If you ever want to restart the game, the host can run `changelevel dl_midtown` .
---

1. Host เริ่ม custom game โดยโหลดเข้าแมพด้วย <code data-command>map dl_midtown</code>
   - อาจกด **P** เพื่อ pause เกมทันทีหลังเข้า ให้ผู้เล่นคนอื่นมีเวลาเข้าแมตช์
2. Host หา ID ของตัวเองโดยรัน <code data-command>status</code>
   - หาบรรทัดสีเขียวใน console ที่หน้าตาแบบนี้: `[Client] steamid : [A:1:XXXXXXXXXX:XXXXX] (XXXXXXXXXXXXXXXXX)` (X จะเป็นตัวเลข)
   - เลือกส่วนหลัง `steamid` ที่หน้าตาแบบนี้ รวมวงเล็บเหลี่ยมด้วย: `[A:1:XXXXXXXXXX:XXXXX]`
   - คลิกขวาแล้วเลือก "Copy Selected Text"
3. Host ส่ง ID ที่เพิ่งคัดลอกให้ผู้เล่น แล้วผู้เล่นเข้าเกมได้โดยเปิด console แล้วรัน <code data-command>connect [A:1:XXXXXXXXXX:XXXXX]</code> (แทนส่วนหลัง connect ด้วย ID ที่ได้จาก host)
4. พอเข้าเกมแล้ว ผู้เล่นจะเลือกทีมและ Hero ได้ ถ้าจะเปิดเมนูนี้อีกครั้ง ให้รัน <code data-command>changeteam 0</code>
5. ถ้าอยากเริ่มเกมใหม่ host รัน <code data-command>changelevel dl_midtown</code> ได้
