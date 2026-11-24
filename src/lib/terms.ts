/** Anchor of a term on the Glossary page. */
export const termHref = (id: string) => `/glossary#term-${id}`;

interface TermLike {
  id: string;
  data: { name: string; aliases: string[] };
}

/**
 * The term an item stat label refers to: the label equals the term's name or an alias, or starts with one followed
 * by a qualifier (e.g. "Bullet Resist vs. NPCs" refers to Bullet Resist).
 */
export const termForLabel = <T extends TermLike>(label: string, terms: T[]): T | undefined =>
  terms.find((t) =>
    [t.data.name, ...t.data.aliases].some((name) => label === name || label.startsWith(`${name} `)),
  );
