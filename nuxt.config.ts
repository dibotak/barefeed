// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',

  // SSG Configuration
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },

  app: {
    head: {
      title: 'Paper Blog',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'A minimal paper-themed blog built with Nuxt' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap' },
      ],
    },
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
})
