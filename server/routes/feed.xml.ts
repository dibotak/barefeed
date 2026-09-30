/**
 * RSS 2.0 feed. A publication without a feed is a publication most readers
 * never subscribe to — this is the highest-leverage file in the whole build.
 *
 * Served as a prerendered route (declared in nuxt.config nitro.prerender.routes)
 * so it is a real static file at /feed.xml, not a server function.
 */
import { queryCollection } from '@nuxt/content/server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = config.public.siteUrl

  const articles = await queryCollection(event, 'articles')
    .where('draft', '<>', true)
    .order('date', 'DESC')
    .all()

  const escapeXml = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;')

  const items = articles
    .map((a) => {
      const url = `${siteUrl}${a.path.replace(/\/+$/, '')}/`
      const pubDate = new Date(a.date || Date.now()).toUTCString()
      return `    <item>
      <title>${escapeXml(a.title || '')}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(a.description || '')}</description>
${(a.tags || []).map((t) => `      <category>${escapeXml(t)}</category>`).join('\n') || '      <category>Analysis</category>'}
      <dc:creator>Barefeed</dc:creator>
    </item>`
    })
    .join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Barefeed</title>
    <link>${siteUrl}</link>
    <description>Research syntheses on logistics, finance, and learning — grounded in primary sources, never in hot takes.</description>
    <language>en</language>
    <copyright>© ${new Date().getFullYear()} Barefeed</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>Nuxt Content</generator>
${items}
  </channel>
</rss>
`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  // Let aggregators refetch daily; the content only changes when we publish.
  setHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400')
  return xml
})
