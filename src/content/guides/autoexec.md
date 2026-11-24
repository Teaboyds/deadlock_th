---
title: รันคำสั่งอัตโนมัติตอนเปิดเกม (autoexec)
order: 2
placement: after-commands
source: deadlock-wiki
needsReview: false
en: |
  - In the `<installation path>\steamapps\common\Deadlock\game\citadel\cfg` folder create a text file name it `autoexec.cfg`
  - Put the console commands that you want to run on startup of Deadlock in the `autoexec.cfg` file, one console command on each line and save it
  - In the Steam app right-click Deadlock in your list of games on the Library tab and select Properties...
  - In the "LAUNCH OPTIONS" field enter `-console -exec autoexec`
  (The wiki shows a screenshot of the Launch options field here; it is not reused.)
---

1. ในโฟลเดอร์ `<installation path>\steamapps\common\Deadlock\game\citadel\cfg` สร้างไฟล์ข้อความแล้วตั้งชื่อว่า `autoexec.cfg`
2. ใส่ console command ที่อยากให้รันตอนเปิด Deadlock ลงในไฟล์ `autoexec.cfg` บรรทัดละหนึ่งคำสั่ง แล้วบันทึกไฟล์
3. ในแอป Steam ที่แท็บ Library คลิกขวาที่ Deadlock ในรายชื่อเกม แล้วเลือก Properties...
4. ในช่อง "LAUNCH OPTIONS" ใส่ <code data-command>-console -exec autoexec</code>
