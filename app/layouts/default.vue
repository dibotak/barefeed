<template>
  <div class="paper-layout">
    <header class="site-header">
      <div class="container">
        <NuxtLink to="/" class="site-title">Paper</NuxtLink>
        <nav class="site-nav">
          <NuxtLink to="/">Journal</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
        </nav>
      </div>
    </header>

    <main class="site-main">
      <slot />
    </main>

    <footer class="site-footer">
      <div class="container">
        <p>Written with ink &mdash; Built with Nuxt</p>
      </div>
    </footer>
  </div>
</template>

<style>
:root {
  --paper-bg: #fdfbf7;
  --paper-ink: #1a1a1a;
  --paper-muted: #6b6b6b;
  --paper-border: #e2ddd3;
  --paper-accent: #8b4513;
  --paper-serif: 'Crimson Pro', Georgia, 'Times New Roman', serif;
  --paper-sans: 'Inter', system-ui, -apple-system, sans-serif;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--paper-serif);
  background-color: var(--paper-bg);
  color: var(--paper-ink);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}

.paper-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.site-header {
  border-bottom: 1px solid var(--paper-border);
  padding: 1.5rem 0;
  background: linear-gradient(to bottom, #fff 0%, var(--paper-bg) 100%);
}

.site-header .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.site-title {
  font-family: var(--paper-serif);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--paper-ink);
  text-decoration: none;
  letter-spacing: -0.02em;
}

.site-nav {
  display: flex;
  gap: 1.5rem;
}

.site-nav a {
  font-family: var(--paper-sans);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--paper-muted);
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  transition: color 0.2s;
}

.site-nav a:hover,
.site-nav a.router-link-active {
  color: var(--paper-accent);
}

/* Main */
.site-main {
  flex: 1;
  padding: 3rem 0;
}

/* Footer */
.site-footer {
  border-top: 1px solid var(--paper-border);
  padding: 2rem 0;
  margin-top: auto;
}

.site-footer p {
  font-family: var(--paper-sans);
  font-size: 0.8125rem;
  color: var(--paper-muted);
  text-align: center;
}

/* Content Typography */
.prose {
  max-width: 100%;
}

.prose h1 {
  font-family: var(--paper-serif);
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
}

.prose h2 {
  font-family: var(--paper-serif);
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.01em;
}

.prose h3 {
  font-family: var(--paper-serif);
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.prose p {
  margin-bottom: 1.25rem;
  font-size: 1.0625rem;
}

.prose a {
  color: var(--paper-accent);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.prose blockquote {
  border-left: 3px solid var(--paper-border);
  padding-left: 1.25rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--paper-muted);
}

.prose ul,
.prose ol {
  margin-bottom: 1.25rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose code {
  font-family: 'SF Mono', Monaco, monospace;
  font-size: 0.875em;
  background: #f0ece4;
  padding: 0.15rem 0.4rem;
  border-radius: 3px;
}

.prose pre {
  background: #f0ece4;
  padding: 1.25rem;
  border-radius: 6px;
  overflow-x: auto;
  margin-bottom: 1.25rem;
}

.prose pre code {
  background: none;
  padding: 0;
}

.prose hr {
  border: none;
  border-top: 1px solid var(--paper-border);
  margin: 2.5rem 0;
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1.5rem 0;
}

/* Article meta */
.article-meta {
  font-family: var(--paper-sans);
  font-size: 0.875rem;
  color: var(--paper-muted);
  margin-bottom: 2rem;
}

.article-meta .date::after {
  content: '\2014';
  margin: 0 0.5rem;
}

/* Article list */
.article-list {
  list-style: none;
  padding: 0;
}

.article-item {
  padding: 2rem 0;
  border-bottom: 1px solid var(--paper-border);
}

.article-item:first-child {
  padding-top: 0;
}

.article-item h2 {
  font-family: var(--paper-serif);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.article-item h2 a {
  color: var(--paper-ink);
  text-decoration: none;
  transition: color 0.2s;
}

.article-item h2 a:hover {
  color: var(--paper-accent);
}

.article-item .excerpt {
  color: var(--paper-muted);
  margin-bottom: 0.75rem;
  font-size: 1rem;
  line-height: 1.6;
}

.article-item .meta {
  font-family: var(--paper-sans);
  font-size: 0.8125rem;
  color: var(--paper-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* Tag pills */
.tag {
  display: inline-block;
  font-family: var(--paper-sans);
  font-size: 0.75rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--paper-muted);
  background: #f0ece4;
  padding: 0.25rem 0.625rem;
  border-radius: 999px;
  margin-right: 0.5rem;
}

/* Page header for index */
.page-header {
  text-align: center;
  padding: 2rem 0 3rem;
  border-bottom: 1px solid var(--paper-border);
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--paper-muted);
  font-size: 1.125rem;
  font-style: italic;
}

@media (max-width: 640px) {
  .site-header .container {
    flex-direction: column;
    gap: 1rem;
  }

  .page-header h1 {
    font-size: 2rem;
  }

  .prose h1 {
    font-size: 1.875rem;
  }
}
</style>
