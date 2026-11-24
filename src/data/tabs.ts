export interface Tab {
  id: string;
  label: string;
  href: string;
  /** Short Thai blurb shown on the home page card. */
  description: string;
}

// Only tabs that have a real page belong here; the menu and home page show every entry.
// Planned: Items, Heroes, Patch notes.
export const tabs: Tab[] = [
  {
    id: 'commands',
    label: 'Commands',
    href: '/commands',
    description: 'คำสั่ง console ของ Deadlock แปลไทย พร้อมวิธีใช้ฝึกซ้อม',
  },
];
