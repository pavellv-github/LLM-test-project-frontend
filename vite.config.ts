import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite configuration tuned for modern React/TypeScript development with Ant Design
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
});
