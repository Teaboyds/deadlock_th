import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  // OUT_DIR lets parallel test runs build into separate folders.
  outDir: process.env.OUT_DIR ?? './dist',
  // Smart quotes would turn "..." inside commands into curly quotes the console can't read.
  markdown: { smartypants: false },
  vite: { plugins: [tailwindcss()] },
});
