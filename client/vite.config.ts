// vite.config.ts
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  // Load environment variables for the current mode (development, production, etc.)
  const env = loadEnv(mode, process.cwd());

  const backendUri = env.VITE_BACKEND_URI;

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: backendUri,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/api'),
        }
      }
    }
  };
});
