// vite config
import { defineConfig } from "vite";
import banner2 from "rollup-plugin-banner2";
// import { resolve } from "path";

export default defineConfig({
  plugins: [
    banner2(
      () => `
// ==UserScript==
// @name         Github test
// @namespace    http://tampermonkey.net/
// @version      2025-04-25
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

    `
    ),
  ],
  // no hash in build
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
