<script setup lang="ts">
const route = useRoute()
// Cloudflare may serve the trailing-slash URL; Content paths/payload keys omit it.
const path = route.path.replace(/\/+$/, '') || '/'

const { data: article } = await useAsyncData('article-' + path, () =>
  queryCollection('articles').path(path).first(),
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

// useBarefeedSeo takes a getter so the computed metadata re-evaluates if the
// payload arrives after first paint. stem is the content path's last segment and
// matches the OG image filename written by scripts/generate-og.mjs.
useBarefeedSeo(
  computed(() => ({
    title: article.value?.title || 'Article',
    description: article.value?.description || '',
    // stem is 'posts/<slug>', but scripts/generate-og.mjs writes /og/<slug>.png.
    // Take the last path segment or every article's OG image 404s.
    imageSlug: article.value?.stem?.split('/').pop(),
    article: article.value
      ? {
          publishedTime: new Date(article.value.date || Date.now()).toISOString(),
          tags: article.value.tags || [],
        }
      : undefined,
  })),
)

const fmt = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : ''

// Reading time at 220wpm, the usual mid-range for measured prose.
const readMinutes = computed(() => {
  const body = article.value?.body as { children?: unknown[] } | undefined
  const text = JSON.stringify(body ?? '')
  const words = text.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
})
</script>

<template>
  <article v-if="article" class="container">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <time v-if="article.date" :datetime="article.date" class="date">{{
          fmt(article.date)
        }}</time>
        <span class="byline">Barefeed research desk</span>
        <span class="readtime">{{ readMinutes }} min read</span>
      </div>
      <div v-if="article.tags && article.tags.length" class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </header>

    <ContentRenderer :value="article" class="prose" />

    <footer class="article-footer">
      <p class="disclosure">
        Written with AI assistance and reviewed by a human editor. Sources are cited inline.
        <NuxtLink to="/editorial">How we work</NuxtLink>.
      </p>
    </footer>
  </article>
</template>

<style scoped>
.article-header {
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--paper-border);
}
.article-header h1 {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}
.article-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.75rem;
  font-family: var(--paper-sans);
  font-size: 0.875rem;
  color: var(--paper-muted);
}
/* The global .article-meta .date::after em-dash rule was written for a two-item
   meta row; with three children it left a dangling dash. Replace it with gap
   spacing. */
.article-meta .date::after {
  content: none;
}
.byline {
  color: var(--paper-ink);
  font-weight: 500;
}
.readtime::before {
  content: '·';
  margin-right: 0.75rem;
  color: var(--paper-border);
}
.article-tags {
  margin-top: 1rem;
}
.article-footer {
  margin-top: 3.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--paper-border);
}
.disclosure {
  font-family: var(--paper-sans);
  font-size: 0.85rem;
  line-height: 1.65;
  color: var(--paper-muted);
  max-width: 42rem;
}
.disclosure a {
  color: var(--paper-accent);
}
@media (max-width: 640px) {
  .article-header h1 {
    font-size: 1.8rem;
  }
}
</style>
