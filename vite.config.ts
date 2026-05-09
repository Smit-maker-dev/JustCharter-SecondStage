import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('react-router') || id.includes('@remix-run')) return 'vendor-router';
            if (id.includes('leaflet')) return 'vendor-maps';
            if (id.includes('/react/') || id.includes('/react-dom/')) return 'vendor-react';
            if (id.includes('motion') || id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('date-fns')) return 'vendor-utils';
            if (id.includes('react-helmet-async')) return 'vendor-seo';
            return; // Return undefined instead of vendor-misc to let Vite handle the rest and avoid circular dependencies
          },
        },
      },
    },
  };
});
