import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/helper/',
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      assert: 'assert',
      connectors: '/src/connectors',
      components: '/src/components',
      config: '/src/config',
      store: '/src/store',
      router: '/src/router',
      views: '/src/views',
      styles: '/src/styles',
      assets: '/src/assets',
      utils: '/src/utils',
      hooks: '/src/hooks',
      api: '/src/api',
    },
  },
  define: {
    global: 'globalThis',
  },
})
