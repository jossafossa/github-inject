import { defineConfig } from "vite";
import edit from "rollup-plugin-edit";
import { getBanner } from "./src/banner.js";

export default defineConfig({
  plugins: [
    edit({
      chunk: (chunk) => {
        if (chunk.fileName === "index.js") {
          return getBanner() + chunk.contents;
        }
        return chunk.contents;
      },
    }),
  ],
  build: {
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        entryFileNames: "index.js",
        chunkFileNames: "index.js",
        assetFileNames: "[name][extname]",
      },
    },
  },
});
