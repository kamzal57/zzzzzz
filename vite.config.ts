import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        open: true, // Automatically open browser on dev server start
      },
      plugins: [react()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        // Optimize production build
        sourcemap: false,
        minify: 'esbuild', // Use esbuild for faster builds (included with Vite)
        rollupOptions: {
          output: {
            manualChunks: {
              'vendor-react': ['react', 'react-dom'],
              'vendor-genai': ['@google/genai'],
            }
          }
        },
        // Increase chunk size warning limit
        chunkSizeWarningLimit: 1000,
      },
      // Optimize dependencies
      optimizeDeps: {
        include: ['react', 'react-dom', '@google/genai', 'isomorphic-dompurify'],
      }
    };
});
