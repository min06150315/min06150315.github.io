import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
// 타입 에러 실시간 확인
import checker from 'vite-plugin-checker';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: true,
    }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
});