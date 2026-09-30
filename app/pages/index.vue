<script setup lang="ts">
const { data: articles } = await useAsyncData('articles', () =>
  queryCollection('articles')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

useBarefeedSeo({
  title: 'Barefeed',
  description:
    'Research syntheses on logistics, finance, and learning — grounded in academic research, industry data, and primary sources.',
})

const fmt = (d?: string) =>
  d
    ? new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
      })
    : ''
</script>

<template>
  <div class="container">
    <header class="page-header">
      <h1>Barefeed</h1>
      <p class="lede">
        Research syntheses on logistics, finance, and learning — built from academic papers,
        filings, and industry data rather than hot takes.
      </p>
      <p class="feed-cta">
        <a href="/feed.xml">Subscribe via RSS</a> — new articles land as they publish.
      </p>
    </header>

    <ul v-if="articles && articles.length" class="article-list">
      <li v-for="article in articles" :key="article.path" class="article-item">
        <h2>
          <NuxtLink :to="article.path">{{ article.title }}</NuxtLink>
        </h2>
        <p v-if="article.description" class="excerpt">{{ article.description }}</p>
        <div class="meta">
          <time v-if="article.date" :datetime="article.date">{{ fmt(article.date) }}</time>
          <span v-if="article.tags && article.tags.length" class="tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </div>
      </li>
    </ul>

    <div v-else class="empty-state">
      <p>No articles yet. Check back soon.</p>
    </div>
  </div>
</template>

<style scoped>
.lede {
  font-size: 1.15rem;
  color: var(--paper-muted);
  max-width: 38rem;
  margin: 1rem auto 0;
  line-height: 1.6;
}
.feed-cta {
  font-family: var(--paper-sans);
  font-size: 0.85rem;
  color: var(--paper-muted);
  margin-top: 1.25rem;
}
.feed-cta a {
  color: var(--paper-accent);
  font-weight: 500;
}
/* The starter's .article-meta::after drew an em-dash after .date; in the list
   layout that produced a dangling separator before the tags. Scope it to the
   article header only. */
.meta time {
  margin-right: 0.75rem;
}
.meta .tag {
  margin-right: 0.35rem;
}
</style>
