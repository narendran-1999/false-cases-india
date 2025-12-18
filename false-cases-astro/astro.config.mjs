// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://narendran-1999.github.io",
  base: "/false-cases-india",
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap(), svelte()],

  prefetch: true,
  compressHTML: true,
});