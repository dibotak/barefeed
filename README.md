# Barefeed

Research syntheses on logistics, finance, and learning.

**Live:** https://barefeed.dibotak.com

## What this is

A static publication built with Nuxt 4 + Nuxt Content. Articles are markdown files in
`content/posts/`; the site is fully prerendered and served from Cloudflare Pages.

Content is written with AI assistance and reviewed by a human editor. That disclosure
appears in the footer, at the foot of every article, and in the page metadata.

## Brand

The identity is the lowercase **b** mark: an ink stem, an orange bowl, and a grey
baseline bar. Source assets live in `public/brand/`:

| file | use |
| --- | --- |
| `barefeed-b-color.svg` | primary mark, OG cards, SVG favicon |
| `barefeed-b-web.svg` | header `<img>` — same art, **trimmed viewBox** (see below) |
| `barefeed-b-mono.svg` | single-colour, for `maskable` manifest icons |
| `barefeed-b-container.svg` | framed lockup, used for `apple-touch-icon` |

Regenerate every derived icon with `npm run icons`
(`scripts/generate-icons.mjs`): `favicon.ico` (6 frames, 16→256), `favicon-32.png`,
`apple-touch-icon.png` (180×180), and `barefeed-b-web.svg`.

### The artboard trap

The authored SVGs are 512×512 but the mark only fills **284×300** of that — 55%×59%.
Anything that scales the *artboard* rather than the *ink* draws the mark at 55% of
the size you asked for. An `<img width="34">` rendered a 19px logo.

So `trimToInk()` in `generate-icons.mjs` measures the path coordinates and writes
a `viewBox` tight to the real bounds. The geometry is untouched; only the viewing
window moves. Measured after the fix: 32px favicon went from 12.5% → 36% ink.

**Do not also wrap trimmed content in a `scale()` group.** The viewBox is in the
path's own coordinate space, so the two compound — the bowl lands past x=512, gets
clipped, and the orange silently disappears while the icon still "works". This cost
a debug cycle in `generate-og.mjs` too, which is why both scripts carry the note.

### Colour

| token | value | contrast on paper |
| --- | --- | --- |
| `--paper-accent` | `#B4401C` | 5.51:1 — small text, links |
| `--paper-accent-bright` | `#D9542B` | 3.87:1 — large text, rules, the mark |
| `--paper-ink` | `#1A1A1A` | 17.5:1 |

The brand orange is `#D9542B`. It clears the 3:1 bar for large type and non-text
shapes but **fails AA at 4.5:1 for the 16–17px link text** the site uses. So exact
brand orange is kept for the mark and large elements, and small text uses a
darkened sibling at the same hue. Do not "fix" this by replacing
`--paper-accent` with the brand orange — that is a measured regression.

## Commands

```bash
npm run dev       # dev server
npm run icons     # regenerate favicon.ico / apple-touch-icon / web SVG
npm run og        # icons + regenerate public/og/*.png from content frontmatter
npm run generate  # prerender to .output/public
npm run deploy    # og + generate  <-- what Cloudflare Pages runs
```

`npm run deploy` runs icon + OG generation *first* on purpose. The pages reference
`/og/<slug>.png` and `/favicon.ico`; if those are stale or missing the build still
succeeds and the breakage only shows up when someone shares a link. Generating
first makes the build fail loudly instead.

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
  generate-icons.mjs    favicon.ico / touch icon / trimmed web SVG
public/
  brand/*.svg           the b mark, source assets
  og/*.png              generated
  favicon.ico
  apple-touch-icon.png
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
