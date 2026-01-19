// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/image', '@nuxtjs/i18n', 'pinia-plugin-persistedstate', '@pinia/nuxt', 'nuxt-echarts'],
  
  css: ['~/assets/css/main.css'],
  
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
      '/api/brc20/**': {
        proxy: 'https://v2api.bestinslot.xyz/brc2.0/**'
      }
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
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Space+Grotesk:wght@400;500;600;700&display=swap' }
      ]
    }
  }
})