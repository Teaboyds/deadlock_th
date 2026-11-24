// Shop item categories in display order, named as in the game.
export const itemCategories = ['Weapon', 'Vitality', 'Spirit'] as const;

export type ItemCategory = (typeof itemCategories)[number];

/** URL segment for a category, e.g. "weapon". */
export const categorySlug = (category: ItemCategory) => category.toLowerCase();

/** Path of an item's detail page. */
export const itemPath = (category: ItemCategory, id: string) => `/items/${categorySlug(category)}/${id}`;
