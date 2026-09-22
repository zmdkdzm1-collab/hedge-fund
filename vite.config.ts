import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages(프로젝트 페이지) 배포 경로
  base: process.env.GHPAGES ? "/hedge-fund/" : "/",
  plugins: [react()],
  server: { port: 5173 },
});
