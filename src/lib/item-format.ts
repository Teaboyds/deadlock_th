/** A stat's amount as shown in the shop, e.g. "+20%". */
export const formatStatValue = (s: { value: number; unit?: string; signed: boolean }) =>
  `${s.signed ? '+' : ''}${s.value}${s.unit ?? ''}`;

/** A stat as shown in the shop, e.g. "+20% Melee Resist". */
export const formatStat = (s: { value: number; unit?: string; label: string; signed: boolean }) =>
  `${formatStatValue(s)} ${s.label}`;

/** A numbered tier, or Legendary, which the wiki lists apart and without a souls cost. */
export type Tier = number | 'legendary';

/** Sort key: numbered tiers ascending, Legendary last. */
export const tierOrder = (tier: Tier) => (tier === 'legendary' ? Number.POSITIVE_INFINITY : tier);

/** Short label for an item's tier and cost, e.g. "Tier 1 · 800 souls" or "Legendary". */
export const tierLabel = (item: { tier: Tier; cost?: number }) =>
  item.tier === 'legendary' ? 'Legendary' : `Tier ${item.tier} · ${item.cost} souls`;
