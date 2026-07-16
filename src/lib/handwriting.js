/* Handwriting composer for Vara-format stroke fonts (single-stroke SVG paths).
   Lays out lines of text as stroke paths inside an <svg>, and exposes a
   draw-progress API driven by total stroke length, so an external rAF loop
   can both animate the ink and know the exact pen-tip position each frame. */

export async function loadStrokeFont(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`font fetch failed: ${res.status}`)
  return res.json()
}

const SVG_NS = 'http://www.w3.org/2000/svg'

/* Compose `lines` (array of strings) into `svg`. Returns handles for
   animation. Mirrors Vara.js layout: each glyph's paths are offset by
   (mx, -my), the glyph group is placed at the cursor corrected by its
   measured bbox.x, and the cursor advances by the glyph's rendered width. */
export function composeText(svg, font, lines, opts = {}) {
  const scale = opts.scale ?? 2.3
  const letterSpacing = (opts.letterSpacing ?? 0.6) * scale
  const lineGap = (opts.lineGap ?? font.p.lh * 1.1) * scale
  const strokeWidth = opts.strokeWidth ?? 0.5
  const color = opts.color ?? '#1d1d1f'

  while (svg.firstChild) svg.removeChild(svg.firstChild)
  const root = document.createElementNS(SVG_NS, 'g')
  svg.appendChild(root)

  const paths = []
  const lineGroups = []

  for (const line of lines) {
    const lineGroup = document.createElementNS(SVG_NS, 'g')
    root.appendChild(lineGroup)
    let cursor = 0

    for (const ch of line) {
      if (ch === ' ') {
        cursor += font.p.space * scale
        continue
      }
      const glyph = font.c[ch.charCodeAt(0)] ?? font.c[63] // '?' fallback
      const cGroup = document.createElementNS(SVG_NS, 'g')
      lineGroup.appendChild(cGroup)

      for (const seg of glyph.paths) {
        const p = document.createElementNS(SVG_NS, 'path')
        p.setAttribute('d', seg.d)
        p.setAttribute('fill', 'none')
        p.setAttribute('stroke', color)
        p.setAttribute('stroke-width', strokeWidth)
        p.setAttribute('stroke-linecap', font.p.slc || 'round')
        p.setAttribute('stroke-linejoin', font.p.slj || 'round')
        p.setAttribute('transform', `translate(${seg.mx}, ${-seg.my})`)
        cGroup.appendChild(p)
      }

      const box = cGroup.getBBox()
      cGroup.setAttribute(
        'transform',
        `translate(${cursor - box.x * scale}, 0) scale(${scale})`
      )
      cursor += box.width * scale + letterSpacing

      for (const p of cGroup.querySelectorAll('path')) paths.push(p)
    }
    lineGroups.push(lineGroup)
  }

  // Stack lines, centered horizontally relative to the widest line.
  let y = 0
  let minX = Infinity
  let maxX = -Infinity
  const boxes = lineGroups.map((g) => g.getBBox())
  const widest = Math.max(...boxes.map((b) => b.width))
  lineGroups.forEach((g, i) => {
    const b = boxes[i]
    const x = (widest - b.width) / 2 - b.x
    g.setAttribute('transform', `translate(${x}, ${y - b.y})`)
    minX = Math.min(minX, x + b.x)
    maxX = Math.max(maxX, x + b.x + b.width)
    y += b.height + (i < lineGroups.length - 1 ? lineGap : 0)
  })

  const pad = 8 * scale
  svg.setAttribute(
    'viewBox',
    `${minX - pad} ${-pad} ${maxX - minX + pad * 2} ${y + pad * 2}`
  )

  // Per-path stroke lengths → global draw timeline.
  let total = 0
  const segments = paths.map((el) => {
    const len = el.getTotalLength()
    // The +2 / +1 offsets avoid a stray dot artifact with round linecaps.
    el.style.strokeDasharray = `${len} ${len + 2}`
    el.style.strokeDashoffset = len + 1
    const seg = { el, len, start: total }
    total += len
    return seg
  })

  return {
    totalLength: total,
    /* progress: 0..1 of total stroke length. Returns the pen tip in screen
       (viewport) pixel coordinates, or null when nothing is drawing. */
    setProgress(progress) {
      const drawnTotal = progress * total
      let tip = null
      for (const seg of segments) {
        const drawn = Math.min(Math.max(drawnTotal - seg.start, 0), seg.len)
        seg.el.style.strokeDashoffset =
          drawn <= 0 ? seg.len + 1 : Math.max(seg.len - drawn, 0)
        if (drawn > 0 && (drawn < seg.len || drawnTotal <= seg.start + seg.len)) {
          const pt = seg.el.getPointAtLength(drawn)
          const ctm = seg.el.getScreenCTM()
          if (ctm) {
            const sp = new DOMPoint(pt.x, pt.y).matrixTransform(ctm)
            tip = { x: sp.x, y: sp.y }
          }
        }
      }
      return tip
    },
  }
}
