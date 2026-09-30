# Barefeed

Research syntheses on logistics, finance, and learning.

**Live:** https://barefeed.dibotak.com

## What this is

A static publication built with Nuxt 4 + Nuxt Content. Articles are markdown files in
`content/posts/`; the site is fully prerendered and served from Cloudflare Pages.

Content is written with AI assistance and reviewed by a human editor. That disclosure
appears in the footer, at the foot of every article, and in the page metadata.

## Commands

```bash
npm run dev       # dev server
npm run og        # regenerate public/og/*.png from content frontmatter
npm run generate  # prerender to .output/public
npm run deploy    # og + generate  <-- what Cloudflare Pages runs
```

`npm run deploy` runs OG generation *first* on purpose. The pages reference
`/og/<slug>.png`; if the images are stale or missing the build still succeeds and the
breakage only shows up when someone shares a link. Generating first makes the build
fail loudly instead.

## Domain and the pages.dev redirect

`barefeed.dibotak.com` is a Cloudflare Pages custom domain. The project is *also* served
at `barefeed.pages.dev`, which is a duplicate-content risk — two origins, one set of
articles.

Two mechanisms handle it:

- **SEO (the part that matters):** every page emits
  `<link rel="canonical" href="https://barefeed.dibotak.com/...">` via
  `app/composables/useBarefeedSeo.ts`. Whichever host serves the HTML, the canonical
  points at the custom domain, so search engines consolidate on it.
- **Visitors:** `app/plugins/canonical-redirect.ts` does a client-side
  `location.replace()` to the custom domain. Because this site is SSG there is no
  server at request time, so **this is not an HTTP 301** — a crawler hitting
  `pages.dev` without running JS will not be redirected.

### Manual step: disable the pages.dev subdomain

The real fix is **Workers & Pages → the project → Custom domains → Disable
`*.pages.dev`**. That gives a true 301 at the edge. It needs Cloudflare dashboard/API
access, which this machine does not have, so it has not been done. Once it is, the
client-side plugin becomes a harmless no-op and can be deleted.

## Structure

```
content/
  index.md              homepage prose
  about.md              About Barefeed
  editorial.md          Editorial Policy
  posts/*.md            14 articles
app/
  composables/
    useBarefeedSeo.ts   all <head> output: OG, Twitter, canonical, JSON-LD
  plugins/
    canonical-redirect.ts
  layouts/default.vue   header/nav/footer chrome only
  pages/
    index.vue           article list
    [...slug].vue       markdown pages (about, editorial)
    posts/[...slug].vue article pages
  assets/css/main.css   palette + prose typography
server/routes/
  feed.xml.ts           RSS 2.0
  sitemap.xml.ts
scripts/
  generate-og.mjs       OG images via sharp
public/
  og/*.png              generated
  robots.txt
  site.webmanifest
```

`feed.xml` and `sitemap.xml` are Nitro server routes, but they are **prerendered** to
static files (listed in `nuxt.config.ts` → `nitro.prerender.routes`) because
`crawlLinks` never discovers a URL nobody links to.

## Conventions that will bite you

**Content markdown must not start with `# Title`.** The frontmatter `title` is the
single source of truth and the page template renders the `<h1>`. A leading `#` in the
body produces two `<h1>`s on the page.

**`stem` already contains the directory.** For the `articles` collection
(`source: 'posts/*.md'`), `article.stem` is `posts/<slug>`, not `<slug>`. Use
`article.path` for URLs. Using `stem` produces `/posts/posts/<slug>/` in the feed and
sitemap, and a 404 on the OG image.

**No `author` frontmatter.** Bylines are inconsistent if set per-file; the byline is
rendered centrally as "Barefeed research desk" and the AI disclosure is a standing
footer, not per-article text.

**One SEO entry point.** Do not add `useHead({ title })` to a page — call
`useBarefeedSeo()` so OG/Twitter/canonical/JSON-LD stay consistent with the title.

**`useRoute()` must be called at setup time**, not inside a `computed()` body, or Nuxt
throws *"requires access to the Nuxt instance … called outside of a plugin"*.

## Adding an article

Drop a `.md` in `content/posts/` with `title`, `description`, `date`, `tags`. No `#`
heading. Then `npm run deploy` and commit — Cloudflare Pages builds on push.

The OG image and feed/sitemap entries are generated from the frontmatter; nothing else
needs updating.
