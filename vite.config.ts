import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // Semi Design bundles CSS in dist/ which is not in its package exports map;
      // this alias bypasses the exports check so Vite can resolve it.
      '@douyinfe/semi-ui/dist/css/semi.min.css': path.resolve(
        __dirname,
        'node_modules/@douyinfe/semi-ui/dist/css/semi.min.css',
      ),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-semi': ['@douyinfe/semi-ui', '@douyinfe/semi-icons'],
          'vendor-i18n': ['i18next', 'react-i18next'],
        },
      },
    },
  },
})
