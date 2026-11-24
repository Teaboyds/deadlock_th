import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import type { Loader } from 'astro/loaders';
import { parseDocument } from 'yaml';

/**
 * Loads a YAML map keyed by entry id. Unlike Astro's `file()` loader, which logs YAML errors and
 * carries on, any parse error (including duplicate keys) fails the build.
 */
export function strictYamlLoader(fileName: string): Loader {
  return {
    name: 'strict-yaml-loader',
    load: async ({ config, store, parseData, watcher, logger }) => {
      const filePath = fileURLToPath(new URL(fileName, config.root));

      async function sync() {
        const doc = parseDocument(await readFile(filePath, 'utf-8'));
        if (doc.errors.length > 0) {
          throw new Error(`${fileName}: ${doc.errors.map((e) => e.message).join('\n')}`);
        }
        const entries = doc.toJS() as Record<string, Record<string, unknown>> | null;
        if (!entries || typeof entries !== 'object' || Array.isArray(entries)) {
          throw new Error(`${fileName}: expected a map of entries keyed by id`);
        }
        store.clear();
        for (const [id, raw] of Object.entries(entries)) {
          store.set({ id, data: await parseData({ id, data: raw, filePath }), filePath: fileName });
        }
      }

      await sync();

      watcher?.add(filePath);
      watcher?.on('change', async (changed) => {
        if (changed !== filePath) return;
        try {
          await sync();
        } catch (error) {
          logger.error((error as Error).message);
        }
      });
    },
  };
}
