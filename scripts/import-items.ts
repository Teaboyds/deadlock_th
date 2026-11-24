// Appends items from a fetched-items JSON file (see source_deadlock/items/*.json) to src/content/items.yaml.
//
//   bun run import-items <items.json> [target.yaml]
//
// Input shape: { items: [{ id, name, developmentName?, category, tier, cost, image, source: { url, oldid },
//   stats: { base: Stat[], enhanced?: Stat[] }, passive?: { description, cooldownSeconds, conditionalStats: { base: Stat[] } },
//   componentOf: string[], notes: string[], affectedAbilities?: [{ hero, ability, note }] }] }
// where Stat = { text, value, unit, label, condition? }; tier is a number or "legendary" (with cost null).
//
// Only standard-match (base) values are imported; enhanced (Street Brawl) values are dropped.
// Items whose id already exists are skipped. Thai fields are written empty, so the build fails until each one
// is translated; the script lists them.
import { appendFileSync, readFileSync } from 'node:fs';
import { parse, stringify } from 'yaml';

interface Stat {
  text: string;
  value: number;
  unit?: string | null;
  label: string;
  condition?: string | null;
}

interface FetchedItem {
  id: string;
  name: string;
  category: string;
  tier: number | 'legendary';
  cost?: number | null;
  image: string;
  source: { url: string; oldid: number };
  stats: { base: Stat[] };
  passive?: { description: string; cooldownSeconds?: number | null; conditionalStats: { base: Stat[] } } | null;
  componentOf?: string[];
  notes?: string[];
  affectedAbilities?: { hero: string; ability: string; note?: string | null }[];
}

const [inputPath, targetPath = 'src/content/items.yaml'] = process.argv.slice(2);
if (!inputPath) {
  console.error('usage: bun run import-items <items.json> [target.yaml]');
  process.exit(1);
}

const fetched = JSON.parse(readFileSync(inputPath, 'utf-8')) as { items: FetchedItem[] };
const existing = new Set(Object.keys((parse(readFileSync(targetPath, 'utf-8')) as object | null) ?? {}));

const toStat = (s: Stat) => ({
  text: s.text,
  value: s.value,
  ...(s.unit ? { unit: s.unit } : {}),
  label: s.label,
  ...(s.condition ? { condition: s.condition } : {}),
  // Healing amounts are shown without a "+".
  ...(s.text.startsWith('Healing ') ? { signed: false } : {}),
});

const added: string[] = [];
const toTranslate: string[] = [];

for (const item of fetched.items) {
  if (existing.has(item.id)) {
    console.log(`skip ${item.id} (already in ${targetPath})`);
    continue;
  }
  const entry = {
    name: item.name,
    category: item.category,
    tier: item.tier,
    ...(item.tier === 'legendary' ? {} : { cost: item.cost }),
    image: item.image,
    source: { url: item.source.url, oldid: item.source.oldid },
    stats: item.stats.base.map(toStat),
    ...(item.passive
      ? {
          passive: {
            th: '',
            en: item.passive.description,
            ...(item.passive.cooldownSeconds ? { cooldownSeconds: item.passive.cooldownSeconds } : {}),
            stats: item.passive.conditionalStats.base.map(toStat),
          },
        }
      : {}),
    componentOf: item.componentOf ?? [],
    ...(item.notes?.length ? { notes: item.notes.map((en) => ({ th: '', en })) } : {}),
    ...(item.affectedAbilities?.length
      ? {
          affectedAbilities: item.affectedAbilities.map((a) => ({
            hero: a.hero,
            ability: a.ability,
            ...(a.note ? { th: '', en: a.note } : {}),
          })),
        }
      : {}),
  };

  if (item.passive) toTranslate.push(`${item.id}: passive.th`);
  item.notes?.forEach((_, i) => toTranslate.push(`${item.id}: notes[${i}].th`));
  item.affectedAbilities?.forEach((a, i) => a.note && toTranslate.push(`${item.id}: affectedAbilities[${i}].th`));

  appendFileSync(targetPath, `\n${stringify({ [item.id]: entry }, { lineWidth: 0 })}`);
  added.push(item.id);
}

console.log(`added ${added.length} item(s)${added.length ? `: ${added.join(', ')}` : ''}`);
if (toTranslate.length) {
  console.log(`\nTranslate these Thai fields (the build fails while they are empty):\n  ${toTranslate.join('\n  ')}`);
}
