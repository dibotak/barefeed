/**
 * XML sitemap covering every article plus the standing pages.
 * Emits absolute URLs only — a relative sitemap URL is invalid.
 */
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl

  const articles = await queryCollection(event, 'articles')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .all()

  const staticPages = [
    { loc: '/', priority: '1.0', freq: 'daily' },
    { loc: '/about', priority: '0.6', freq: 'monthly' },
    { loc: '/editorial', priority: '0.5', freq: 'monthly' },
  ]

  const articleEntries = articles
    .map((a) => `  <url>
    <loc>${siteUrl}${a.path.replace(/\/+$/, '')}/</loc>
    <lastmod>${new Date(a.date || Date.now()).toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join('\n')

  const staticEntries = staticPages
    .map(
      (p) => `  <url>
    <loc>${siteUrl}${p.loc}</loc>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${articleEntries}
</urlset>
`

  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')
  return xml
})
