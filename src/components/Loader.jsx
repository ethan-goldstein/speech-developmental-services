import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { prepareStrokePaths } from '../lib/handwriting'
import { logoTrace } from '../content/logoPaths'

const TRACE_MS = 2800 // time for the pen to trace the logo
const FILL_MS = 750 // outline → real logo crossfade
const NAME_MS = 2000 // pause on the name before revealing the site
const LIFT_MS = 550 // pen glide-away after the last stroke

/* Intro: a 3D fountain pen traces the SDS logo in ink, the outline
   crossfades into the periwinkle logo, and the practice name fades in
   beneath. Click / key to skip; a hard safety timeout guarantees it can
   never hang. */
export default function Loader({ onDone }) {
  const svgRef = useRef(null)
  const canvasRef = useRef(null)
  const [filled, setFilled] = useState(false)
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

    const leave = () => {
      setLeaving(true)
      leaveTimer = setTimeout(() => onDone?.(), 750)
      finished = true
    }

    const finish = () => {
      if (finished) return
      setFilled(true)
      setNameVisible(true)
      leave()
    }

    const showName = () => {
      setNameVisible(true)
      nameTimer = setTimeout(() => {
        if (!finished) leave()
      }, NAME_MS)
    }

    const run = async () => {
      // three.js is only used here — keep it off the critical path.
      const penModule = await import('../lib/pen3d').catch(() => null)
      if (cancelled) return

      composition = prepareStrokePaths(svgRef.current, logoTrace.paths, {
        viewBox: logoTrace.viewBox,
        color: '#0f0f10',
        strokeWidth: 4,
      })

      if (reduced) {
        composition.setProgress(1)
        setFilled(true)
        showName()
        return
      }

      pen = penModule ? penModule.createPenScene(canvasRef.current) : null
      if (pen) pen.setScale(window.innerWidth < 700 ? 1.1 : 1.4)

      const start = performance.now()
      let liftStart = null

      const frame = (now) => {
        if (cancelled) return
        const t = now - start
        const p = Math.min(skipped ? 1 : t / TRACE_MS, 1)
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
        } else if (p >= 1 && liftStart === null) {
          liftStart = now
        }
        if (p >= 1 && liftStart !== null && now - liftStart >= LIFT_MS * 0.4) {
          setFilled(true)
        }
        if (p >= 1 && liftStart !== null && now - liftStart >= LIFT_MS + FILL_MS) {
          if (!finished && !nameTimer) showName()
        }
        raf = requestAnimationFrame(frame)
      }
      raf = requestAnimationFrame(frame)
    }

    run()

    const skip = () => {
      if (finished) return
      skipped = true
      if (composition) composition.setProgress(1)
      if (pen) pen.hide()
      setFilled(true)
      if (!nameTimer) {
        setNameVisible(true)
        nameTimer = setTimeout(() => {
          if (!finished) leave()
        }, 700)
      }
    }
    window.addEventListener('keydown', skip)
    window.addEventListener('pointerdown', skip)
    safety = setTimeout(finish, TRACE_MS + LIFT_MS + FILL_MS + NAME_MS + 4000)

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
        <div className={`loader-logo ${filled ? 'is-filled' : ''}`}>
          <svg ref={svgRef} className="loader-logo-trace" aria-hidden="true" />
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt=""
            className="loader-logo-img"
            draggable="false"
          />
        </div>
        <div className={`loader-name ${nameVisible ? 'is-visible' : ''}`}>
          <span className="loader-name-main">Shana Kilcawley</span>
          <span className="loader-name-sub">CCC-SLP · Speech Developmental Services</span>
        </div>
      </div>
      <div className="loader-skip">click anywhere to skip</div>
    </motion.div>
  )
}
