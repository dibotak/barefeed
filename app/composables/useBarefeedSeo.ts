/**
 * Single place where every page's <head> is built.
 *
 * Why a composable instead of per-page useHead calls: an article card and a
 * standalone article must emit identical OG/Twitter/canonical metadata, and
 * keeping that logic duplicated across four templates is how they drift apart.
 * Pages pass a title + description + image and get correct, absolute URLs.
 */
import type { MaybeRefOrGetter } from 'vue'

export interface SeoOptions {
  title: string
  description: string
  /** Slug for a per-article OG image; omit for the site default. */
  imageSlug?: string
  /** Set for /posts/* pages only. */
  article?: {
    publishedTime: string
    modifiedTime?: string
    tags: string[]
  }
  /** Defaults to false, so pages are not indexed unless opted in. */
  noindex?: boolean
}

export function useBarefeedSeo(opts: MaybeRefOrGetter<SeoOptions>) {
  const config = useRuntimeConfig()
  // Capture the route ONCE, at setup time. Calling useRoute() inside the
  // computed() below throws "requires access to the Nuxt instance ... called
  // outside of a plugin", because the computed body runs outside setup context.
  const route = useRoute()
  // Normalise to a plain object so computed() can track it reactively whether
  // the caller passed a raw object or a ref.
  const o = computed(() => toValue(opts))

  const canonical = computed(() => {
    const path = route.path
    const clean = path === '/' ? '/' : path.replace(/\/+$/, '') + '/'
    return `${config.public.siteUrl}${clean}`
  })

  const ogImage = computed(() => {
    const slug = o.value.imageSlug
    const file = slug ? `/og/${slug}.png` : '/og/default.png'
    return `${config.public.siteUrl}${file}`
  })

  // Barefeed writes in third person and never claims first-hand experience.
  // The byline is deliberately publication-level rather than a person.
  const byline = 'Barefeed — research synthesis desk'

  useHead(() => {
    const t = o.value
    // titleTemplate is '%s — Barefeed', so the homepage (whose name IS the
    // publication) must pass a descriptor, not "Barefeed", or the tab reads
    // "Barefeed — Research Syntheses — Barefeed".
    const title = t.title === 'Barefeed' ? 'Research Syntheses' : t.title
    return {
      title,
      link: [{ rel: 'canonical', href: canonical.value }],
      meta: [
        { name: 'description', content: t.description },
        { property: 'og:type', content: t.article ? 'article' : 'website' },
        { property: 'og:site_name', content: 'Barefeed' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: t.description },
        { property: 'og:url', content: canonical.value },
        { property: 'og:image', content: ogImage.value },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:alt', content: title },
        { property: 'og:locale', content: 'en_US' },

        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: t.description },
        { name: 'twitter:image', content: ogImage.value },

        { name: 'author', content: byline },

        ...(t.article
          ? [
              { property: 'article:published_time', content: t.article.publishedTime },
              ...(t.article.modifiedTime
                ? [{ property: 'article:modified_time', content: t.article.modifiedTime }]
                : []),
              { property: 'article:author', content: byline },
              ...t.article.tags.map((tag) => ({
                property: 'article:tag',
                content: tag,
              })),
            ]
          : []),

        ...(t.noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : []),
      ],
    }
  })

  // Article structured data. Google uses this for the byline, publish date, and
  // headline in search results; without it an article page shows as a bare
  // snippet regardless of how good the meta tags are.
  useHead(() => {
    if (!o.value.article) return {}
    const a = o.value.article
    return {
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: o.value.title,
            description: o.value.description,
            // Absolute URL required by schema.org; relative hrefs are ignored.
            url: canonical.value,
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonical.value },
            datePublished: a.publishedTime,
            dateModified: a.modifiedTime || a.publishedTime,
            author: { '@type': 'Organization', name: byline },
            publisher: {
              '@type': 'Organization',
              name: 'Barefeed',
              url: config.public.siteUrl,
            },
            keywords: a.tags.join(', '),
            // Discloses the AI-assisted origin in the machine-readable layer too,
            // so a downstream republisher can't strip the disclosure unnoticed.
            isAccessibleForFree: true,
            creativeWorkStatus: 'Published',
          }),
        },
      ],
    }
  })

  return { canonical, ogImage }
}
