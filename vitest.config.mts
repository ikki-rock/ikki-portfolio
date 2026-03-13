import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom", // 브라우저 환경 사용
    globals: true, // describe, it, expect 등을 import 없이 사용 가능하게 함
    setupFiles: "./vitest.setup.ts", // 초기 세팅 파일
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"), // 절대 경로 @ 설정
    },
  },
});
