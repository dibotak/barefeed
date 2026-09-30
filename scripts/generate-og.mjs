/**
 * Generates Open Graph images for every article plus a site default.
 *
 * Runs at build time and writes to public/og/. Static PNGs are deliberate: a
 * crawler fetching an OG image will not execute JS, so a runtime-generated
 * image would show nothing in WhatsApp, Slack, or X.
 *
 * Usage: node scripts/generate-og.mjs
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const POSTS = join(ROOT, 'content', 'posts')
const OUT = join(ROOT, 'public', 'og')

const W = 1200
const H = 630

// Matches the site palette in app/layouts/default.vue.
const BG = '#fdfbf7'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'
const ACCENT = '#8b4513'
const RULE = '#e2ddd3'

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

/**
 * Word-wrap by measuring nothing — approximate with a per-character budget.
 * Crimson Pro at 58px fits roughly 34 characters on a 1000px measure, and
 * guessing is fine here because the card is a fixed canvas.
 */
function wrap(text, max = 34, maxLines = 4) {
  const words = String(text).split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line.trim())
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
    if (lines.length === maxLines) break
  }
  if (line && lines.length < maxLines) lines.push(line)
  // Ellipsise if we dropped words — better than overflowing the canvas.
  const consumed = lines.join(' ').split(/\s+/).length
  if (consumed < words.length && lines.length) {
    lines[lines.length - 1] = lines[lines.length - 1].replace(/\w+$/, '…')
  }
  return lines
}

function card({ eyebrow, title, footer }) {
  const lines = wrap(title)
  const startY = 250 - (lines.length - 1) * 34
  const titleSvg = lines
    .map(
      (l, i) =>
        `<text x="80" y="${startY + i * 68}" font-family="Georgia, 'Times New Roman', serif" font-size="58" font-weight="600" fill="${INK}">${esc(l)}</text>`,
    )
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${ACCENT}"/>
  <text x="80" y="130" font-family="Helvetica, Arial, sans-serif" font-size="23" font-weight="600" letter-spacing="3.4" fill="${ACCENT}">${esc(eyebrow.toUpperCase())}</text>
  <line x1="80" y1="165" x2="1120" y2="165" stroke="${RULE}" stroke-width="2"/>
  ${titleSvg}
  <line x1="80" y1="${H - 130}" x2="1120" y2="${H - 130}" stroke="${RULE}" stroke-width="2"/>
  <text x="80" y="${H - 88}" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${MUTED}">${esc(footer)}</text>
  <text x="1120" y="${H - 88}" text-anchor="end" font-family="Georgia, serif" font-size="30" font-weight="600" fill="${ACCENT}">Barefeed</text>
</svg>`
}

function fmtDate(d) {
  if (!d) return ''
  const dt = new Date(d)
  if (Number.isNaN(dt.getTime())) return ''
  return dt.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
}

// Minimal frontmatter parse — avoids pulling in a YAML dependency for 5 keys.
function fm(src) {
  const m = src.match(/^---\n([\s\S]*?)\n---/)
  if (!m) return {}
  const out = {}
  for (const line of m[1].split('\n')) {
    const t = line.match(/^(\w+):\s*(.*)$/)
    if (!t) continue
    let v = t[2].trim().replace(/^["']|["']$/g, '')
    if (v.startsWith('[') && v.endsWith(']')) {
      out[t[1]] = v.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
    } else {
      out[t[1]] = v
    }
  }
  return out
}

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true })

let count = 0

// Site default
const defSvg = card({
  eyebrow: 'Research syntheses',
  title: 'Logistics, finance, and learning — grounded in primary sources',
  footer: 'barefeed.dibotak.com',
})
await sharp(Buffer.from(defSvg)).png().toFile(join(OUT, 'default.png'))
console.log('  og/default.png')
count++

for (const file of readdirSync(POSTS).filter((f) => f.endsWith('.md'))) {
  const src = readFileSync(join(POSTS, file), 'utf8')
  const meta = fm(src)
  if (meta.draft === 'true') continue
  const stem = file.replace(/\.md$/, '')
  const tags = Array.isArray(meta.tags) ? meta.tags : meta.tags ? [meta.tags] : []
  const date = fmtDate(meta.date)

  const svg = card({
    eyebrow: tags[0] || 'Analysis',
    title: meta.title || stem,
    footer: date,
  })
  await sharp(Buffer.from(svg)).png().toFile(join(OUT, `${stem}.png`))
  console.log(`  og/${stem}.png`)
  count++
}

console.log(`\nGenerated ${count} OG images (${W}x${H}).`)
