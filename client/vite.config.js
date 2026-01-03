import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react({
      // React Fast Refresh optimization
      fastRefresh: true,
      // Babel runtime optimization
      babel: {
        plugins: [
          ['@babel/plugin-transform-runtime', { useESModules: true }]
        ]
      }
    }),
    
    // Gzip compression
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240, // 10kb üzeri dosyaları sıkıştır
      algorithm: 'gzip',
      ext: '.gz'
    }),
    
    // Brotli compression (daha iyi sıkıştırma)
    viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'brotliCompress',
      ext: '.br'
    }),
    
    // Image optimization
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 80
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
            active: false
          },
          {
            name: 'removeEmptyAttrs',
            active: true
          }
        ]
      }
    }),
    
    // Bundle analyzer (production build sonrası)
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true
    })
  ],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@i18n': path.resolve(__dirname, './src/i18n')
    }
  },
  
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  },
  
  build: {
    outDir: 'build',
    sourcemap: false,
    
    // Chunk size uyarı limiti
    chunkSizeWarningLimit: 1000,
    
    // CSS code splitting
    cssCodeSplit: true,
    
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Console.log'ları kaldır
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug']
      }
    },
    
    rollupOptions: {
      output: {
        // Manual chunks - Daha akıllı kod bölme
        manualChunks: (id) => {
          // React core
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom')) {
            return 'react-vendor'
          }
          
          // React Router
          if (id.includes('node_modules/react-router-dom')) {
            return 'router'
          }
          
          // Bootstrap & UI
          if (id.includes('node_modules/react-bootstrap') || 
              id.includes('node_modules/bootstrap')) {
            return 'bootstrap'
          }
          
          // Slick Slider
          if (id.includes('node_modules/react-slick') || 
              id.includes('node_modules/slick-carousel')) {
            return 'slider'
          }
          
          // i18n
          if (id.includes('node_modules/react-i18next') || 
              id.includes('node_modules/i18next')) {
            return 'i18n'
          }
          
          // AOS (Animation)
          if (id.includes('node_modules/aos')) {
            return 'aos'
          }
          
          // Diğer node_modules
          if (id.includes('node_modules')) {
            return 'vendor'
          }
        },
        
        // Asset dosya isimlendirme
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.').pop()
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    
    // Preload stratejisi
    modulePreload: {
      polyfill: true
    }
  },
  
  // Optimizasyon ayarları
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'react-bootstrap',
      'react-i18next',
      'i18next'
    ],
    exclude: ['@vite/client', '@vite/env']
  },
  
  // CSS preprocessing
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    devSourcemap: false
  }
})