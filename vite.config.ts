// vite config
import { defineConfig } from "vite";
import banner2 from "rollup-plugin-banner2";
// import { resolve } from "path";

export default defineConfig({
  plugins: [
    banner2(
      () => `
    /**
     * rollup-plugin-banner2
     */
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
