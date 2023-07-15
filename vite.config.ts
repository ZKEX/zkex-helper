import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      stream: "stream-browserify",
      crypto: 'crypto-browserify',
      assert: 'assert',
      connectors: "/src/connectors",
      components: "/src/components",
      config: "/src/config",
      store: "/src/store",
      router: "/src/router",
      views: "/src/views",
      styles: "/src/styles",
      assets: "/src/assets",
      utils: "/src/utils",
      hooks: "/src/hooks",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: "globalThis",
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
})
