import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          // creating a chunk to @open-ish deps. Reducing the vendor chunk size
          if (id.includes('@open-ish') || id.includes('tslib')) {
            return '@open-ish';
          }
          // creating a chunk to react routes deps. Reducing the vendor chunk size
          // if (
          //   id.includes('react-router-dom') ||
          //   id.includes('@remix-run') ||
          //   id.includes('react-router')
          // ) {
          //   return '@react-router';
          // }
          // custom other
          if (id.includes('lodash')) {
            return '@lodash';
          }
          if (id.includes('antd')) {
            return '@antd';
          }
          // if (id.includes('ckeditor')) {
          //   return '@ckeditor';
          // }
          if (id.includes('bootstrap')) {
            return '@bootstrap';
          }
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [react(), ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })],
  server: {
    port: 5173,
  },
});
