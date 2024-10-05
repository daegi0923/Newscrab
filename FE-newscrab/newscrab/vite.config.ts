import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url"; // ES 모듈 방식에서 경로 처리

// __dirname 대체 코드
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {

      "@apis": path.resolve(__dirname, "src/apis"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@common": path.resolve(__dirname, "src/components/common"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@router": path.resolve(__dirname, "src/router"),
      "@store": path.resolve(__dirname, "src/store"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
