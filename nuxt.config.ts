// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n',  '@pinia/nuxt', 'nuxt-echarts'],
  
  css: ['~/assets/css/main.css'],
  
  // 图片优化配置
  image: {
    format: ['webp', 'png'],
    quality: 80,
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    },
    dir: 'public',
    domains: ['bestinslot.xyz']
  },
  
  // Vite 构建优化
  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'echarts': ['echarts'],
            'pinia': ['pinia']
          }
        }
      }
    },
    optimizeDeps: {
      include: ['echarts', 'pinia']
    }
  },
  
  // Nitro 配置（代理和路由）
  nitro: {
    devProxy: {
      '/api/brc20': {
        target: 'https://v2api.bestinslot.xyz/brc2.0',
        changeOrigin: true
      }
    },
    // 生产环境路由处理
    routeRules: {
      '/api/brc20': {
        proxy: 'https://v2api.bestinslot.xyz/brc2.0'
      },
      '/': { prerender: true },
      '/**': { isr: 60 } // Incremental Static Regeneration
    }
  },
  
  i18n: {
    strategy: 'no_prefix',
    locales: [
      { 
        code: 'zh', 
        iso: 'zh-CN', 
        name: '中文',
        files: ['zh.json']
      },
      { 
        code: 'en', 
        iso: 'en-US', 
        name: 'English',
        files: ['en.json']
      }
    ],
    defaultLocale: 'zh'
  },
  
  app: {
    head: {
      title: 'Nutkin - BRC2.0 Token Platform',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'The most trusted BRC2.0 token platform with real-time analytics and secure transactions' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap' },
        { rel: 'preconnect', href: 'https://v2api.bestinslot.xyz' },
        { rel: 'preconnect', href: 'https://bestinslot.xyz' },
        { rel: 'dns-prefetch', href: 'https://v2api.bestinslot.xyz' },
        { rel: 'dns-prefetch', href: 'https://bestinslot.xyz' }
      ]
    }
  }
})