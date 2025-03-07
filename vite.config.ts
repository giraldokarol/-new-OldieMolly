import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path-browserify';
import { fileURLToPath } from 'url';

const __filename:any = fileURLToPath(import.meta.url);
const __dirname:any = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions :{
      scss: {
        additionalData: `@use "@/styles/config.scss" as *; @use "@/styles/mixins.scss" as *;`
      }
    },
  },
})


