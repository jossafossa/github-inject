// vite config
import { defineConfig } from "vite";
// import banner2 from "rollup-plugin-banner2";
import { resolve } from "path";
import edit from "rollup-plugin-edit";
import { readFileSync } from "fs";

export default defineConfig({
  plugins: [
    edit({
      chunk: (chunk) => {
        if (chunk.fileName === "index.js") {
          // get the banner content from src/banner.js
          const banner = readFileSync(
            resolve(__dirname, "src/banner.js"),
            "utf8"
          );
          // read the content of the file
          return banner + chunk.contents;
        }
      },
    }),
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
