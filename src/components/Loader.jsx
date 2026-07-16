import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { loadStrokeFont, composeText } from '../lib/handwriting'

const WRITE_MS = 4200 // time to write the full line
const NAME_MS = 1900 // pause on "Shana Kilcawley" before revealing the site
const LIFT_MS = 650 // pen glide-away after the last stroke

/* Intro: a 3D fountain pen writes "Speech Language Pathologist" in ink,
   then "Shana Kilcawley" fades in beneath. Click / key to skip; a hard
   safety timeout guarantees it can never hang. */
export default function Loader({ onDone }) {
  const svgRef = useRef(null)
  const canvasRef = useRef(null)
  const [nameVisible, setNameVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf
    let safety
    let nameTimer
    let leaveTimer
    let pen = null
    let composition = null
    let cancelled = false
    let finished = false
    let skipped = false

    const finish = () => {
      if (finished) return
      finished = true
      setNameVisible(true)
      setLeaving(true)
      leaveTimer = setTimeout(() => onDone?.(), 750)
    }

    const showName = () => {
      setNameVisible(true)
      nameTimer = setTimeout(() => {
        setLeaving(true)
        leaveTimer = setTimeout(() => onDone?.(), 750)
        finished = true
      }, NAME_MS)
    }

    const run = async () => {
      // three.js is only used here, so load it in parallel with the font
      // and off the main bundle's critical path.
      let font
      let penModule = null
      try {
        ;[font, penModule] = await Promise.all([
          loadStrokeFont(`${import.meta.env.BASE_URL}fonts/SatisfySL.json`),
          import('../lib/pen3d').catch(() => null),
        ])
      } catch {
        finish() // font missing — never block the site
        return
      }
      if (cancelled) return

      const narrow = window.innerWidth < 700
      composition = composeText(
        svgRef.current,
        font,
        narrow ? ['Speech Language', 'Pathologist'] : ['Speech Language Pathologist'],
        { scale: 2.3, strokeWidth: 0.55, color: '#1d1d1f' }
      )

      if (reduced) {
        composition.setProgress(1)
        showName()
        return
      }

      pen = penModule ? penModule.createPenScene(canvasRef.current) : null
      if (pen) pen.setScale(narrow ? 1.15 : 1.45)

      const start = performance.now()
      let liftStart = null

      const frame = (now) => {
        if (cancelled) return
        const t = now - start
        const p = Math.min(skipped ? 1 : t / WRITE_MS, 1)
        // Gentle ease so strokes begin and end like a real hand.
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * p)
        const tip = composition.setProgress(eased)
        if (pen) {
          if (tip && p < 1) pen.setTip(tip.x, tip.y)
          if (p >= 1) {
            if (liftStart === null) liftStart = now
            const lp = (now - liftStart) / LIFT_MS
            if (lp < 1) pen.lift(1 - lp)
            else pen.hide()
          }
          pen.render(now)
        }
        if (p >= 1 && (now - (liftStart ?? now)) >= LIFT_MS) {
          if (!finished && !nameTimer) showName()
          if (pen) pen.render(now)
        }
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    run()

    const skip = () => {
      if (finished) return
      if (!composition) {
        finish()
        return
      }
      skipped = true
      composition.setProgress(1)
      if (pen) pen.hide()
      if (!nameTimer) {
        clearTimeout(nameTimer)
        setNameVisible(true)
        nameTimer = setTimeout(() => {
          setLeaving(true)
          leaveTimer = setTimeout(() => onDone?.(), 750)
          finished = true
        }, 700)
      }
    }
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    safety = setTimeout(finish, WRITE_MS + LIFT_MS + NAME_MS + 4000)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      clearTimeout(safety)
      clearTimeout(nameTimer)
      clearTimeout(leaveTimer)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('pointerdown', skip)
      pen?.dispose()
    }
  }, [onDone])

  return (
    <motion.div
      className="loader"
      initial={{ y: 0 }}
      animate={leaving ? { y: '-100%' } : { y: 0 }}
      transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Loading — Speech Developmental Services"
    >
      <canvas ref={canvasRef} className="loader-canvas" aria-hidden="true" />
      <div className="loader-stack">
        <svg ref={svgRef} className="loader-script" aria-hidden="true" />
        <div className={`loader-name ${nameVisible ? 'is-visible' : ''}`}>
          <span className="loader-name-main">Shana Kilcawley</span>
          <span className="loader-name-sub">CCC-SLP · Speech Developmental Services</span>
        </div>
      </div>
      <div className="loader-skip">Click anywhere to skip</div>
    </motion.div>
  )
}
