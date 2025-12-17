// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://narendran-1999.github.io",
  base: "/false-cases-india",
  output: "static",

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],

  prefetch: true,
  compressHTML: true,
});