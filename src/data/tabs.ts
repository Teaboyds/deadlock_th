export interface Tab {
  id: string;
  label: string;
  href: string;
  /** Short Thai blurb shown on the home page card. */
  description: string;
  /** A coming-soon tab has a placeholder page until its content is written. */
  status: 'ready' | 'coming-soon';
}

// Every tab, in menu order. Patch notes is dropped for now.
export const tabs: Tab[] = [
  {
    id: 'heroes',
    label: 'Heroes',
    href: '/heroes',
    description: 'รายละเอียด Hero และสกิล ภาษาไทย',
    status: 'coming-soon',
  },
  {
    id: 'items',
    label: 'Items',
    href: '/items',
    description: 'Item ในร้านค้า ค่าสถานะและ passive ภาษาไทย',
    status: 'ready',
  },
  {
    id: 'commands',
    label: 'Commands',
    href: '/commands',
    description: 'คำสั่ง console ของ Deadlock แปลไทย พร้อมวิธีใช้ฝึกซ้อม',
    status: 'ready',
  },
  {
    id: 'glossary',
    label: 'Glossary',
    href: '/glossary',
    description: 'ศัพท์พื้นฐานในเกม เช่น Fire Rate และ Bullet Resist อธิบายเป็นภาษาไทย',
    status: 'ready',
  },
  {
    id: 'status-effects',
    label: 'Status Effects',
    href: '/status-effects',
    description: 'Buff และ Debuff ทั้งหมด เช่น Stun และ Silence ทำอะไรได้บ้าง ภาษาไทย',
    status: 'ready',
  },
];
