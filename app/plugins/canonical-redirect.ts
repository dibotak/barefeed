/**
 * Bounces visitors on barefeed.pages.dev to barefeed.dibotak.com.
 *
 * Cloudflare Pages serves a project under both its *.pages.dev hostname and any
 * attached custom domain. For a publication that is a duplicate-content risk:
 * two origins, one set of articles, and search engines may split ranking across
 * them or index the pages.dev copy instead of the real domain.
 *
 * Two separate mechanisms, and it matters which does what:
 *
 * 1. SEO consolidation is handled by the <link rel="canonical"> that
 *    useBarefeedSeo() emits on every page. It always points at the custom
 *    domain, whichever host served the HTML. This is the part that actually
 *    tells search engines which URL is the real one.
 *
 * 2. This plugin is the human-visible redirect. Because the site is SSG
 *    (`nuxt generate` -> static files), there is no server at request time, so
 *    this is a client-side replace() and NOT an HTTP 301. A crawler's first
 *    unrendered hit on pages.dev will not be redirected.
 *
 * The real fix is to disable the pages.dev subdomain in the Cloudflare
 * dashboard (Workers & Pages -> project -> Custom domains -> Disable
 * *.pages.dev). That needs Cloudflare API access this machine does not have,
 * so it is left as a documented manual step in README.md.
 */
export default defineNuxtPlugin(() => {
  const CANONICAL_HOST = 'barefeed.dibotak.com'
  const LEGACY_HOST = 'barefeed.pages.dev'

  if (!import.meta.client) return
  if (window.location.hostname !== LEGACY_HOST) return

  // replace() rather than assign() so the pages.dev URL leaves the back button
  // history and the visitor cannot bounce between the two.
  window.location.replace(`https://${CANONICAL_HOST}${window.location.pathname}${window.location.search}${window.location.hash}`)
})
