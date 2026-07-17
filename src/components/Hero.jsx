import { useEffect, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../content/data'
import { scrollToId } from '../lib/scroll'

const TRUST_CHIPS = [
  'Licensed & Board-Certified CCC-SLP',
  'Telehealth in VA · MD · DC · FL',
  'Free 15-Minute Consultation',
]

export default function Hero() {
  const reduced = useReducedMotion()
  const canvasRef = useRef(null)
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 700], [0, -90])
  const contentOpacity = useTransform(scrollY, [0, 550], [1, 0.25])

  // Lazy 3D orb backdrop (shares the three.js chunk with the intro pen).
  useEffect(() => {
    let orbs
    let cancelled = false
    import('../lib/orbs3d')
      .then((mod) => {
        if (!cancelled && canvasRef.current) orbs = mod.createOrbScene(canvasRef.current)
      })
      .catch(() => {})
    return () => {
      cancelled = true
      orbs?.dispose()
    }
  }, [])

  const fadeUp = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="hero" id="top">
      <canvas ref={canvasRef} className="hero-orbs" aria-hidden="true" />
      <div className="hero-veil" aria-hidden="true" />

      <motion.div className="hero-inner" style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}>
        <motion.p className="hero-eyebrow" {...fadeUp(0.05)}>
          {site.name} · Arlington, VA
        </motion.p>
        <motion.h1 className="hero-title" {...fadeUp(0.14)}>
          Helping your child
          <br />
          <em>find their voice.</em>
        </motion.h1>
        <motion.p className="hero-sub" {...fadeUp(0.28)}>
          Individualized, functional, and neurodiversity-affirming pediatric speech
          therapy with {site.founder}, {site.credentials} — in the clinic, in the
          community, or by secure telehealth.
        </motion.p>
        <motion.div className="hero-ctas" {...fadeUp(0.4)}>
          <button className="btn btn--primary btn--lg" onClick={() => scrollToId('contact')}>
            Book a Free Consultation
          </button>
          <button className="btn btn--ghost btn--lg" onClick={() => scrollToId('services')}>
            Explore Services
          </button>
        </motion.div>
        <motion.ul className="hero-chips" {...fadeUp(0.52)}>
          {TRUST_CHIPS.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="hero-scrollcue"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span className="hero-scrollcue-line" />
        Scroll
      </motion.div>
    </section>
  )
}
