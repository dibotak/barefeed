<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
  return queryCollection('content').path(route.path).first()
})

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useHead({
  title: page.value?.title ? `${page.value.title} \u2014 Paper` : 'Paper',
})
</script>

<template>
  <article v-if="page" class="container">
    <header class="article-header">
      <h1>{{ page.title }}</h1>
    </header>
    <ContentRenderer :value="page" class="prose" />
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
}
</style>
