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

// The two horizontal rules that frame the title block. Named because the title
// is centred between them — inline literals made the collision above easy to
// reintroduce.
const TOP_RULE = 226
const BOTTOM_RULE = H - 130

// Vertical budget for the title block, in px, centred between the rules.
//
// A title of N lines at 58px on 68px leading spans, top to bottom:
//   ASCENT + (N-1)*STEP + DESCENT  =  46 + (N-1)*68 + 16
// so the tallest allowed title (TITLE_MAX_LINES) needs 198px. The raw gap
// between the rules is 274px, which leaves 76px of slack — so titles are
// optically centred in the frame with room to spare rather than butting up
// against a rule.
const TITLE_STEP = 68
const TITLE_FONT = 58
const TITLE_ASCENT = 46
const TITLE_DESCENT = 16
const TITLE_MAX_LINES = 3

// Matches the site palette in app/layouts/default.vue.
const BG = '#fdfbf7'
const INK = '#1a1a1a'
const MUTED = '#6b6b6b'
// Brand mark orange. Used for large type, rules, and the logo — all >= 24px or
// non-text, where 3.87:1 is fine. The site's --paper-accent (#B4401C) is the
// darkened sibling used for small link text.
const ACCENT = '#D9542B'
const RULE = '#e2ddd3'

/**
 * The 'b' mark, inlined so the OG cards carry the real identity rather than a
 * text-only lockup. Read from the brand asset so the cards cannot drift from it.
 *
 * The asset is read as raw markup and the outer <svg> wrapper swapped for a
 * <g>, rather than parsing out individual <path> elements — parsing them means
 * reconstructing the element open-tag, and dropping it yields bare attributes
 * that render as nothing at all (a silently blank mark, not an error).
 */
const MARK_SVG = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'brand', 'barefeed-b-color.svg'),
  'utf8',
)
if (!MARK_SVG.includes('<path') || !MARK_SVG.includes('viewBox="0 0 512 512"')) {
  throw new Error('barefeed-b-color.svg does not look like the expected 512x512 mark')
}

/**
 * The mark's paths, wrapped in a nested <svg> whose viewBox is trimmed to the
 * real ink bounds.
 *
 * The authored artboard is 512x512 but the mark only fills 284x300 of it, so
 * scaling paths by MARK_SIZE/512 renders it at ~55% of the intended size. A
 * nested <svg> with a tight viewBox makes MARK_SIZE mean the mark's actual
 * visible size. (Same reason scripts/generate-icons.mjs trims before
 * rasterising — and the same trap: do not ALSO apply a scale group on top of a
 * trimmed viewBox, the two compound and push the mark off the canvas.)
 */
const markInkBox = () => {
  const nums = []
  for (const m of MARK_SVG.matchAll(/[ML]\s*(-?[\d.]+),\s*(-?[\d.]+)/g)) {
    nums.push([parseFloat(m[1]), parseFloat(m[2])])
  }
  if (!nums.length) throw new Error('no path coordinates in brand SVG')
  const xs = nums.map((n) => n[0])
  const ys = nums.map((n) => n[1])
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const w = Math.max(...xs) - minX
  const h = Math.max(...ys) - minY
  const pad = Math.max(w, h) * 0.04
  return `${(minX - pad).toFixed(2)} ${(minY - pad).toFixed(2)} ${(w + pad * 2).toFixed(2)} ${(h + pad * 2).toFixed(2)}`
}

const MARK_BOX = markInkBox()
const MARK_PATH = MARK_SVG
  .replace(/^[\s\S]*?<svg[^>]*>/, '')
  .replace(/<\/svg>\s*$/, '')
  .trim()

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
  const lines = wrap(title, 34, TITLE_MAX_LINES)
  // The title block is centred in the space between the header rule (TOP_RULE)
  // and the footer rule (BOTTOM_RULE), so a 1-line and a 3-line title both sit
  // optically centred instead of hanging off a fixed baseline and colliding
  // with the eyebrow above.
  // Centre the block's true ink extent — first baseline to last baseline, plus
  // half the ascent above and half the descent below — inside the rule gap.
  const gapTop = TOP_RULE
  const gapBottom = BOTTOM_RULE
  const gapCentre = (gapTop + gapBottom) / 2
  const blockHeight = TITLE_ASCENT + (lines.length - 1) * TITLE_STEP + TITLE_DESCENT
  if (blockHeight > gapBottom - gapTop) {
    throw new Error(
      `OG title block (${blockHeight}px) is taller than the rule gap ` +
        `(${gapBottom - gapTop}px) at ${lines.length} lines — ` +
        `reduce TITLE_MAX_LINES or TITLE_FONT, or move the rules apart`,
    )
  }
  // First baseline such that the block's vertical centre lands on gapCentre.
  const firstY =
    gapCentre - blockHeight / 2 + TITLE_ASCENT
  const titleSvg = lines
    .map(
      (l, i) =>
        `<text x="80" y="${Math.round(firstY + i * TITLE_STEP)}" font-family="Georgia, 'Times New Roman', serif" font-size="${TITLE_FONT}" font-weight="600" fill="${INK}">${esc(l)}</text>`,
    )
    .join('\n')

  // The mark, sized from its trimmed ink bounds so MARK_SIZE is the mark's real
  // visible height, not a fraction of the authored 512 artboard. Nested <svg>
  // rather than a scale group, because the viewBox is already in path space.
  const MARK_SIZE = 84
  const mark = `<svg x="80" y="40" width="${MARK_SIZE}" height="${MARK_SIZE}" viewBox="${MARK_BOX}" overflow="visible">${MARK_PATH}</svg>`

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <rect width="${W}" height="${H}" fill="${BG}"/>
  <rect x="0" y="0" width="${W}" height="10" fill="${ACCENT}"/>
  ${mark}
  <text x="194" y="104" font-family="Georgia, serif" font-size="40" font-weight="700" fill="${ACCENT}">Barefeed</text>
  <text x="80" y="196" font-family="Helvetica, Arial, sans-serif" font-size="23" font-weight="600" letter-spacing="3.4" fill="${ACCENT}">${esc(eyebrow.toUpperCase())}</text>
  <line x1="80" y1="${TOP_RULE}" x2="1120" y2="${TOP_RULE}" stroke="${RULE}" stroke-width="2"/>
  ${titleSvg}
  <line x1="80" y1="${BOTTOM_RULE}" x2="1120" y2="${BOTTOM_RULE}" stroke="${RULE}" stroke-width="2"/>
  <text x="80" y="${H - 88}" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="${MUTED}">${esc(footer)}</text>
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
