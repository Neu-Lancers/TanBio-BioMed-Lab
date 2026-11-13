import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: {
    outDir: "build", // firebase.json serves "build"
    target: "es2020",
    sourcemap: false,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: { react: ["react", "react-dom", "react-router-dom"] },
      },
    },
  },
});
