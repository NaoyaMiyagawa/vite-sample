import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import WindiCSS from 'vite-plugin-windicss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
    },
  },
  plugins: [vue(), WindiCSS()],
});
