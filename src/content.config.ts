import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { commandGroupIds } from './data/command-groups';
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

export const collections = { commands, guides };
