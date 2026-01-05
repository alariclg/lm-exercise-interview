/// <reference types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@models": path.resolve(__dirname, "./src/models"),
      "@mutationOptions": path.resolve(__dirname, "./src/mutationOptions"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@queryOptions": path.resolve(__dirname, "./src/queryOptions"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@schema": path.resolve(__dirname, "./src/schema"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://edulib.alariclg.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  build: {
    outDir: "dist-libmanuels",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
