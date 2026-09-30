<script setup lang="ts">
// The layout renders chrome only. Content is rendered by the page component
// ([...slug].vue for markdown pages, index.vue for the article list).
</script>

<template>
  <div class="paper-layout">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <header class="site-header">
      <div class="wrap header-inner">
        <NuxtLink to="/" class="brand">
          <span class="brand-name">Barefeed</span>
          <span class="brand-tag">Research syntheses</span>
        </NuxtLink>
        <nav class="site-nav" aria-label="Main">
          <NuxtLink to="/" class="nav-link">Articles</NuxtLink>
          <NuxtLink to="/about" class="nav-link">About</NuxtLink>
          <NuxtLink to="/editorial" class="nav-link">Editorial</NuxtLink>
          <a href="/feed.xml" class="nav-link nav-rss">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.18 20.82a3.18 3.18 0 1 1-6.36 0 3.18 3.18 0 0 1 6.36 0zM0 9.9v4.1C6.05 14.1 9.9 18 10 24h4.1C14.1 13.95 10.05 9.9 0 9.9zM0 .55v4.05C10.6 4.7 19.3 13.4 19.3 24h4.05C23.35 10.4 13.6.55 0 .55z" transform="translate(0 -0.55) scale(0.9)" />
            </svg>
            RSS
          </a>
        </nav>
      </div>
    </header>

    <main id="main-content" class="wrap site-main">
      <!--
        Content rendering is the page's job, not the layout's. The layout used
        to also query and render `content` for the current path, which meant
        /about rendered its body TWICE — once here and once in [...slug].vue.
        Only the layout chrome belongs here.
      -->
      <slot />
    </main>

    <footer class="site-footer">
      <div class="wrap footer-inner">
        <p class="footer-note">
          Barefeed publishes research syntheses on logistics, finance, and learning.
          Every article traces its claims to named sources.
        </p>
        <p class="footer-ai">
          Content is written with AI assistance and reviewed by a human editor.
          <NuxtLink to="/editorial">Read our editorial policy</NuxtLink>.
        </p>
        <nav class="footer-nav" aria-label="Footer">
          <NuxtLink to="/">Articles</NuxtLink>
          <NuxtLink to="/about">About</NuxtLink>
          <NuxtLink to="/editorial">Editorial</NuxtLink>
          <a href="/feed.xml">RSS</a>
        </nav>
        <p class="footer-copy">&copy; {{ new Date().getFullYear() }} Barefeed. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.paper-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--paper-serif);
  background-color: var(--paper-bg);
  color: var(--paper-ink);
}

.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  background: var(--paper-ink);
  color: var(--paper-bg);
  padding: 0.75rem 1.25rem;
  z-index: 100;
  font-family: var(--paper-sans);
  font-size: 0.9rem;
}
.skip-link:focus {
  left: 0.5rem;
  top: 0.5rem;
}

/* ---------- header ---------- */
.site-header {
  border-bottom: 1px solid var(--paper-border);
  background: var(--paper-bg);
}
.header-inner {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 2.25rem;
  padding-bottom: 2.25rem;
  flex-wrap: wrap;
}
.brand {
  text-decoration: none;
  color: inherit;
  display: flex;
  align-items: baseline;
  gap: 0.85rem;
  flex-wrap: wrap;
}
.brand-name {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--paper-accent);
}
.brand-tag {
  font-family: var(--paper-sans);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--paper-muted);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
  font-family: var(--paper-sans);
  font-size: 0.88rem;
}
.nav-link {
  color: var(--paper-muted);
  text-decoration: none;
  letter-spacing: 0.04em;
  /* 26px min target: these are small type but must stay tappable. */
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 3px 0;
  border-bottom: 2px solid transparent;
  transition: color 0.15s ease, border-color 0.15s ease;
}
.nav-link:hover,
.nav-link:focus-visible {
  color: var(--paper-accent);
  border-bottom-color: var(--paper-accent);
}
.nav-link.router-link-active {
  color: var(--paper-accent);
  border-bottom-color: var(--paper-accent);
}
.nav-rss {
  gap: 0.4rem;
  color: var(--paper-accent);
}

/* ---------- main ---------- */
.site-main {
  flex: 1;
  width: 100%;
}

/* ---------- footer ---------- */
.site-footer {
  margin-top: 4.5rem;
  border-top: 1px solid var(--paper-border);
  background: var(--paper-muted-faint);
}
.footer-inner {
  padding-top: 2.5rem;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  font-family: var(--paper-sans);
  font-size: 0.85rem;
  color: var(--paper-muted);
}
.footer-note {
  max-width: 46rem;
  line-height: 1.65;
}
.footer-ai {
  max-width: 46rem;
  line-height: 1.65;
  padding: 0.7rem 0.9rem;
  border-left: 3px solid var(--paper-accent);
  background: var(--paper-bg);
  color: var(--paper-ink);
}
.footer-ai a {
  color: var(--paper-accent);
}
.footer-nav {
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding-top: 0.5rem;
}
.footer-nav a {
  color: var(--paper-muted);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  min-height: 26px;
  padding: 3px 0;
  border-bottom: 1px solid transparent;
}
.footer-nav a:hover,
.footer-nav a:focus-visible {
  color: var(--paper-accent);
  border-bottom-color: var(--paper-accent);
}
.footer-copy {
  color: var(--paper-muted);
  font-size: 0.8rem;
}

@media (max-width: 600px) {
  .header-inner {
    padding-top: 1.6rem;
    padding-bottom: 1.6rem;
  }
  .brand-name {
    font-size: 1.6rem;
  }
  .site-nav {
    gap: 1.1rem;
    font-size: 0.82rem;
  }
}
</style>
