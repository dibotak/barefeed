<script setup lang="ts">
const route = useRoute()
// Cloudflare may serve the trailing-slash URL; Content paths/payload keys omit it.
const path = route.path.replace(/\/+$/, '') || '/'

const { data: article } = await useAsyncData('article-' + path, () =>
  queryCollection('articles').path(path).first()
)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found', fatal: true })
}

useHead({
  title: article.value?.title ? `${article.value.title} — Paper` : 'Paper',
})
</script>

<template>
  <article v-if="article" class="container">
    <header class="article-header">
      <h1>{{ article.title }}</h1>
      <div class="article-meta">
        <time v-if="article.date" :datetime="article.date" class="date">{{ article.date }}</time>
        <span v-if="article.author" class="author">{{ article.author }}</span>
      </div>
      <div v-if="article.tags && article.tags.length" class="article-tags">
        <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </header>

    <ContentRenderer :value="article" class="prose" />
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
}

.article-tags {
  margin-top: 1rem;
}
</style>
