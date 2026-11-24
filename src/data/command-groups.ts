// Command groups in display order. A console command belongs to exactly one.
export const commandGroups = [
  { id: 'practice', label: 'ฝึกซ้อม' },
  { id: 'bots', label: 'Bot / NPC / Trooper' },
  { id: 'map-lobby', label: 'แมพ / ล็อบบี้ / เซิร์ฟเวอร์' },
  { id: 'hud-info', label: 'HUD / ข้อมูล' },
  { id: 'binds', label: 'Bind / ตั้งปุ่ม' },
  { id: 'other', label: 'อื่น ๆ' },
] as const;

export type CommandGroupId = (typeof commandGroups)[number]['id'];

export const commandGroupIds = commandGroups.map((g) => g.id) as [CommandGroupId, ...CommandGroupId[]];
