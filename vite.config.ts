// vite config
import { defineConfig } from "vite";
// import banner2 from "rollup-plugin-banner2";
// import { resolve } from "path";
import edit from "rollup-plugin-edit";

export default defineConfig({
  plugins: [
    edit({
      chunk: (chunk) => {
        if (chunk.fileName === "index.js") {
          const banner = `/*!
          `;
          return banner + chunk.code;
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
