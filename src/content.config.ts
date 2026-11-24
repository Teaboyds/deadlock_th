import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { commandGroupIds } from './data/command-groups';
import { itemCategories } from './data/item-categories';
import { termGroupIds } from './data/term-groups';
import { sourceIds } from './data/sources';
import { strictYamlLoader } from './lib/strict-yaml-loader';

// One entry per console command, keyed by its exact name; a duplicate name fails the build.
const commands = defineCollection({
  loader: strictYamlLoader('src/content/commands.yaml'),
  schema: z
    .object({
      /** Accepted values, verbatim from the source. */
      values: z.array(z.string()).default([]),
      default: z.string().optional(),
      cheat: z.boolean(),
      group: z.enum(commandGroupIds),
      source: z.enum(sourceIds),
      untested: z.boolean().default(false),
      th: z.string().min(1),
      /** Original English description from the source. */
      en: z.string().min(1).optional(),
      practice: z.string().min(1).optional(),
      /** The Valve list doesn't flag this command (or one it relies on) `release`, so it may not work in the retail game. */
      noReleaseFlag: z.boolean().default(false),
      needsReview: z.boolean().default(false),
    })
    .superRefine((cmd, ctx) => {
      if (cmd.source !== 'site' && !cmd.en) {
        ctx.addIssue({ code: 'custom', path: ['en'], message: 'sourced content needs its English original' });
      }
      if (cmd.source !== 'deadlock-wiki' && !cmd.untested) {
        ctx.addIssue({
          code: 'custom',
          path: ['untested'],
          message: 'content not from deadlock.wiki must be untested',
        });
      }
    }),
});

// One Markdown file per prose section of the Commands page (opening the console, autoexec, ...).
const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/content/guides' }),
  schema: z
    .object({
      /** Thai heading. */
      title: z.string().min(1),
      order: z.number().int(),
      /** Where on the page the section goes, relative to the command groups. */
      /** `binds` puts the section at the top of the Bind command group. */
      placement: z.enum(['before-commands', 'after-commands', 'binds']),
      /** Id of the section this one is a subsection of. */
      parent: z.string().min(1).optional(),
      source: z.enum(sourceIds),
      untested: z.boolean().default(false),
      /** Original English text from the source. */
      en: z.string().min(1).optional(),
      needsReview: z.boolean().default(false),
      /** What to check when needsReview is set; never shown on the page. */
      reviewNotes: z.array(z.string().min(1)).default([]),
    })
    .strict()
    .superRefine((guide, ctx) => {
      if (guide.source !== 'site' && !guide.en) {
        ctx.addIssue({ code: 'custom', path: ['en'], message: 'sourced content needs its English original' });
      }
      if (guide.source !== 'deadlock-wiki' && !guide.untested) {
        ctx.addIssue({ code: 'custom', path: ['untested'], message: 'content not from deadlock.wiki must be untested' });
      }
      if (guide.needsReview && guide.reviewNotes.length === 0) {
        ctx.addIssue({ code: 'custom', path: ['reviewNotes'], message: 'say what needs review' });
      }
    }),
});

const itemStat = z
  .object({
    /** Verbatim stat text from the wiki. */
    text: z.string().min(1),
    value: z.number(),
    unit: z.string().min(1).optional(),
    /** Stat name as in the shop, e.g. "Weapon Damage". */
    label: z.string().min(1),
    /** When the stat applies, e.g. "15m Close Range". */
    condition: z.string().min(1).optional(),
    /** Whether the value is shown with a leading "+". */
    signed: z.boolean().default(true),
  })
  .strict();

const thEn = { th: z.string().min(1), en: z.string().min(1) };

// One entry per shop item, keyed by a slug id. Standard (6v6) match values only.
const items = defineCollection({
  loader: strictYamlLoader('src/content/items.yaml'),
  schema: z
    .object({
      name: z.string().min(1),
      category: z.enum(itemCategories),
      /** A numbered tier, or Legendary (listed apart, without a souls cost). */
      tier: z.union([z.number().int().min(1), z.literal('legendary')]),
      cost: z.number().int().positive().optional(),
      /** File name in the git-ignored icon folder. */
      image: z.string().min(1),
      source: z.object({ url: z.url(), oldid: z.number().int() }).strict(),
      stats: z.array(itemStat),
      passive: z
        .object({ ...thEn, cooldownSeconds: z.number().positive().optional(), stats: z.array(itemStat) })
        .strict()
        .optional(),
      /** Items this one builds into. */
      componentOf: z.array(z.string().min(1)).default([]),
      notes: z.array(z.object(thEn).strict()).default([]),
      affectedAbilities: z
        .array(
          z
            .object({
              hero: z.string().min(1),
              ability: z.string().min(1),
              th: z.string().min(1).optional(),
              en: z.string().min(1).optional(),
            })
            .strict(),
        )
        .default([]),
      needsReview: z.boolean().default(false),
    })
    .strict()
    .superRefine((item, ctx) => {
      if (item.tier === 'legendary' ? item.cost !== undefined : item.cost === undefined) {
        ctx.addIssue({ code: 'custom', path: ['cost'], message: 'numbered tiers need a cost; Legendary has none' });
      }
    }),
});

// One entry per Glossary term, keyed by a slug id. Explanations only, no formulas.
const terms = defineCollection({
  loader: strictYamlLoader('src/content/terms.yaml'),
  schema: z
    .object({
      /** The stat label shown on items in the shop. */
      name: z.string().min(1),
      /** Other names the wiki or players use; shown under the name and searchable. */
      aliases: z.array(z.string().min(1)).default([]),
      group: z.enum(termGroupIds),
      /** An overview that introduces its group, shown first. */
      overview: z.boolean().default(false),
      /** One-line Thai meaning. */
      th: z.string().min(1),
      explanation: z.object(thEn).strict(),
      source: z.object({ url: z.url(), oldid: z.number().int().optional() }).strict(),
      /** Advice the site adds itself; shown apart from the translation. */
      siteNote: z.string().min(1).optional(),
      needsReview: z.boolean().default(false),
    })
    .strict(),
});

export const collections = { commands, guides, items, terms };
