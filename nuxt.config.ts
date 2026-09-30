// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/content'],
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  compatibilityDate: '2024-04-03',

  // SSG Configuration
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      // Generated routes, not reachable by crawling links.
      routes: ['/feed.xml', '/sitemap.xml'],
    },
  },

  // Canonical origin. barefeed.dibotak.com is a Cloudflare Pages custom domain;
  // barefeed.pages.dev is the fallback hostname and redirects here (see
  // app/plugins/canonical-redirect.ts). Every SEO-facing URL is built from this
  // value so there is one source of truth for the site's address.
  runtimeConfig: {
    public: {
      siteUrl: 'https://barefeed.dibotak.com',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      titleTemplate: '%s — Barefeed',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Barefeed publishes research syntheses on logistics, finance, and learning — grounded in academic research, industry data, and primary sources, never in hot takes.',
        },
        { name: 'theme-color', content: '#8b4513' },
        { name: 'author', content: 'Barefeed' },
        // Content is AI-assisted; this is a standing disclosure so it surfaces
        // in search results and wherever the site gets embedded.
        { name: 'robots', content: 'index, follow, max-image-preview:large' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600&display=swap',
        },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        {
          rel: 'alternate',
          type: 'application/rss+xml',
          title: 'Barefeed — Research Syntheses',
          href: '/feed.xml',
        },
      ],
    },
  },

  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },
})
