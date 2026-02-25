import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// Vite configuration tuned for modern React/TypeScript development with Ant Design
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            if (id.includes(path.resolve(__dirname, 'src/app/providers/ThemeProvider'))) {
              return 'theme-provider';
            }
            return undefined;
          }

          if (id.includes('/node_modules/antd/')) {
            return 'vendor-antd';
          }

          if (id.includes('/node_modules/axios/')) {
            return 'vendor-axios';
          }

          if (id.includes('/node_modules/zustand/')) {
            return 'vendor-zustand';
          }

          if (/@babel|rc-|@ant-design/.test(id)) {
            return 'vendor-helpers';
          }

          return undefined;
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
});
