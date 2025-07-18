import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: "\u200B",
        short_name: "\u200B",
        description: 'SmartCart mobile app as a Progressive Web App',
        start_url: '/',
        display: 'standalone',
        background_color: '#8a2be2',
        theme_color: '#8a2be2', // You can change this to your app’s primary color
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ]
})






// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'
// import { VitePWA } from 'vite-plugin-pwa'

// // https://vite.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://nutrigeen.com',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   },
//   plugins: [
//     react(),
//     tailwindcss(),
//     VitePWA({
//       registerType: 'autoUpdate',
//       includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
//       manifest: {
//         name: "\u200B",
//         short_name: "\u200B",
//         description: 'SmartCart mobile app as a Progressive Web App',
//         start_url: '/',
//         display: 'standalone',
//         background_color: '#8a2be2',
//         theme_color: '#8a2be2',
//         icons: [
//           {
//             src: 'icons/icon-192x192.png',
//             sizes: '192x192',
//             type: 'image/png'
//           },
//           {
//             src: 'icons/icon-512x512.png',
//             sizes: '512x512',
//             type: 'image/png'
//           },
//           {
//             src: 'icons/icon-512x512.png',
//             sizes: '512x512',
//             type: 'image/png',
//             purpose: 'any maskable'
//           }
//         ]
//       }
//     })
//   ]
// })
