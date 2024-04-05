import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const __dirname = path.resolve();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: __dirname + '/src' },
    ],
  },
    define: {
        __HTML_PARSER_API__: JSON.stringify('https://html-parser-tau.vercel.app/'),
    },
})