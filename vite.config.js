import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base must match the GitHub Pages repo path (https://Rax498.github.io/VideoFarm)
export default defineConfig({
  base: "/VideoFarm/",
  plugins: [react()],
  build: {
    outDir: "dist",
  },
});
