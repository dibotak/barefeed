import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import vm from 'node:vm'

// Exercise each page's setup against prerendered content indexed without a
// trailing slash, just like Nuxt Content's collection paths and payload keys.
for (const [file, path] of [
  ['posts/[...slug].vue', '/posts/last-mile-problem'],
  ['[...slug].vue', '/about'],
]) {
  for (const suffix of ['', '/']) {
    test(`${file} resolves ${path}${suffix} to its prerendered content`, async () => {
      const source = await readFile(new URL(`../app/pages/${file}`, import.meta.url), 'utf8')
      const setup = source.match(/<script setup lang="ts">([\s\S]*?)<\/script>/)[1]
      const routePath = path + suffix
      const slug = routePath.replace(/^\/posts\//, '').replace(/^\//, '').split('/')
      let dataKey, queryPath
      const context = {
        useRoute: () => ({ path: routePath, params: { slug } }),
        useAsyncData: async (key, fetcher) => {
          dataKey = key
          return { data: { value: await fetcher() } }
        },
        queryCollection: () => ({ path: (value) => {
          queryPath = value
          return { first: async () => value === path ? { title: 'Article' } : null }
        } }),
        createError: (error) => new Error(error.statusMessage),
        useHead: () => {},
      }
      await vm.runInNewContext(`(async () => { ${setup} })()`, context)
      assert.equal(queryPath, path)
      assert.equal(dataKey, `${file.startsWith('posts/') ? 'article' : 'page'}-${path}`)
    })
  }
}
