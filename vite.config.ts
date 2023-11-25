import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import EnvironmentPlugin from 'vite-plugin-environment';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    EnvironmentPlugin('all', {prefix: ''}), 
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], 
        sourcemap: true
      }, 
      devOptions: {
        enabled: true
      },
      injectRegister: 'auto',
    })
  ]  
})
