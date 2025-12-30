/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@page": path.resolve(__dirname, "./src/page"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@schema": path.resolve(__dirname, "./src/schema"),
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
