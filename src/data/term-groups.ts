// Glossary term groups in display order.
export const termGroups = [
  { id: 'weapon', label: 'อาวุธ' },
  { id: 'defence', label: 'ป้องกัน' },
  { id: 'health', label: 'เลือดและฟื้นฟู' },
] as const;

export type TermGroupId = (typeof termGroups)[number]['id'];

export const termGroupIds = termGroups.map((g) => g.id) as [TermGroupId, ...TermGroupId[]];
