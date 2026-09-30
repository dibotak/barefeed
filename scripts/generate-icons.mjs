#!/usr/bin/env node
/**
 * Generates the favicon.ico family from the brand SVG.
 *
 * The committed favicon.ico was the placeholder book mark. Browsers pick different
 * sizes out of the .ico, so a single 32px stamp looks blurry in a tab; this
 * rasterises the real mark at each size the OS actually requests.
 *
 *   node scripts/generate-icons.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const PUB = join(ROOT, 'public')

// Which asset each icon is rasterised from, and how each is framed.
//
// The unframed b-color mark is the right subject for a favicon: the container's
// rounded frame eats the pixel budget and shrinks the letterform. But the bare
// mark only fills 284x300 of its 512x512 artboard (55% x 59%), so rasterising
// the file as-is renders it far too small in a tab — the 32px PNG came out at
// 12.5% ink coverage. The frame is what was carrying apparent size before.
//
// So: re-frame the mark with a viewBox trimmed to its real ink bounds plus a
// small optical margin, which scales the letterform up to fill the icon without
// redrawing anything. Derived from the paths at runtime so it cannot drift from
// the asset.
const MARGIN_RATIO = 0.04 // 4% padding, so anti-aliased edges are not clipped
const SRC_ICO = join(PUB, 'brand', 'barefeed-b-color.svg')
// iOS is the exception — it applies its own rounded mask, and the container
// frame fills that shape properly, so it uses the file as authored.
const SRC_APPLE = join(PUB, 'brand', 'barefeed-b-container.svg')

for (const p of [SRC_ICO, SRC_APPLE]) {
  if (!existsSync(p)) {
    console.error(`missing ${p} — cannot generate icons`)
    process.exit(1)
  }
}

/**
 * Replaces an SVG's viewBox with the tight bounding box of its path data, plus
 * a margin. Geometry is untouched — only the viewing window moves — so the mark
 * is identical, just larger in frame.
 *
 * The viewBox alone does the reframing. Do NOT also wrap the content in a
 * scale/translate group: the viewBox is in the path's own coordinate space, so
 * scaling on top of it compounds and pushes the mark off the canvas (the bowl
 * lands past x=512 and gets clipped, which silently drops the orange element).
 */
function trimToInk(svg, margin = MARGIN_RATIO) {
  const nums = []
  for (const m of svg.matchAll(/[ML]\s*(-?[\d.]+),\s*(-?[\d.]+)/g)) {
    nums.push([parseFloat(m[1]), parseFloat(m[2])])
  }
  if (!nums.length) throw new Error('no path coordinates found in brand SVG')
  const xs = nums.map((n) => n[0])
  const ys = nums.map((n) => n[1])
  const minX = Math.min(...xs)
  const minY = Math.min(...ys)
  const w = Math.max(...xs) - minX
  const h = Math.max(...ys) - minY
  const m = Math.max(w, h) * margin
  const box = `${(minX - m).toFixed(2)} ${(minY - m).toFixed(2)} ${(w + m * 2).toFixed(2)} ${(h + m * 2).toFixed(2)}`
  return { box, w, h }
}

const svgRaw = readFileSync(SRC_ICO, 'utf8')
if (!svgRaw.includes('<path') || !svgRaw.includes('viewBox="0 0 512 512"')) {
  throw new Error(`${SRC_ICO} does not look like the expected 512x512 mark`)
}
const t = trimToInk(svgRaw)
console.log(
  `mark bbox ${t.w.toFixed(0)}x${t.h.toFixed(0)} of 512 artboard -> ` +
    `viewBox "${t.box}" (ink now fills the frame)`,
)

// Re-view the mark: same paths, tighter window, square artboard.
// The opening tag is rebuilt from scratch rather than string-patched — patching
// `viewBox` in place leaves the original attribute there too, and a duplicate
// attribute is a hard XML parse error, not a warning.
// Wrapped in Buffer because sharp() needs bytes, not a string.
const svg = Buffer.from(
  svgRaw
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
    .trim()
    .replace(
      /^/,
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${t.box}" width="512" height="512">`,
    )
    .replace(/$/, '</svg>'),
)

const appleSvg = readFileSync(SRC_APPLE)
const SIZES = [16, 32, 48, 64, 128, 256]

// Also emit the framed SVG for the site chrome. The header renders this at 34px
// via <img>, and an <img> scales the whole artboard — so an untrimmed mark
// draws at ~19px. Writing the trimmed viewBox into a separate asset keeps the
// authored original untouched and lets the layout ask for a real size.
const WEB_BOX = trimToInk(svgRaw, 0.02).box
writeFileSync(
  join(PUB, 'brand', 'barefeed-b-web.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${WEB_BOX}" width="512" height="512" role="img" aria-label="Barefeed">\n` +
    svgRaw.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').trim() +
    `\n</svg>\n`,
)
console.log(`brand/barefeed-b-web.svg  viewBox "${WEB_BOX}" (for <img> at small sizes)`)

// Build the .ico by hand: ICONDIR + ICONDIRENTRY + one PNG frame each. PNG
// frames are valid inside a modern .ico and avoid needing a BMP encoder.
const frames = []
for (const size of SIZES) {
  const png = await sharp(svg, { density: 384 }).resize(size, size).png().toBuffer()
  frames.push({ size, png })
}

const HEADER = 6
const ENTRY = 16
let offset = HEADER + ENTRY * frames.length
const dir = Buffer.alloc(HEADER + ENTRY * frames.length)
dir.writeUInt16LE(0, 0) // reserved
dir.writeUInt16LE(1, 2) // type: icon
dir.writeUInt16LE(frames.length, 4)

frames.forEach((f, i) => {
  const p = HEADER + ENTRY * i
  dir.writeUInt8(f.size >= 256 ? 0 : f.size, p) // 0 means 256
  dir.writeUInt8(f.size >= 256 ? 0 : f.size, p + 1)
  dir.writeUInt8(0, p + 2) // palette
  dir.writeUInt8(0, p + 3) // reserved
  dir.writeUInt16LE(1, p + 4) // colour planes
  dir.writeUInt16LE(32, p + 6) // bits per pixel
  dir.writeUInt32LE(f.png.length, p + 8)
  dir.writeUInt32LE(offset, p + 12)
  offset += f.png.length
})

const out = Buffer.concat([dir, ...frames.map((f) => f.png)])
writeFileSync(join(PUB, 'favicon.ico'), out)
console.log(`favicon.ico  ${out.length} bytes  sizes: ${SIZES.join(', ')}`)

// apple-touch-icon: iOS expects 180x180 and applies its own rounded mask, so this
// one uses the container variant — the frame fills the masked shape.
const APPLE = 180
await sharp(appleSvg, { density: 512 })
  .resize(APPLE, APPLE)
  .png()
  .toFile(join(PUB, 'apple-touch-icon.png'))
console.log(`apple-touch-icon.png  ${APPLE}x${APPLE}  (container variant)`)

// A standalone 32px PNG, for the manifest and any client that will not read .ico
// or SVG (older Android home screens).
await sharp(svg, { density: 256 })
  .resize(32, 32)
  .png()
  .toFile(join(PUB, 'favicon-32.png'))
console.log('favicon-32.png  32x32')

if (!existsSync(join(PUB, 'brand'))) mkdirSync(join(PUB, 'brand'), { recursive: true })
