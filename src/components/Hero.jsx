import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../content/data'
import { scrollToId, goToBooking } from '../lib/scroll'

const TRUST_CHIPS = [
  'Licensed & Board-Certified CCC-SLP',
  'Telehealth in VA · MD · DC · FL',
  'Free 15-Minute Consultation',
]

/* Seamlessly looping sine path: two identical cycles side by side, the CSS
   animation slides the svg by -50% for an endless flow. */
const wavePath = (amp, mid = 60, wl = 240, width = 2880) => {
  let d = `M0 ${mid} q ${wl / 4} ${-amp} ${wl / 2} 0`
  for (let x = wl / 2; x < width; x += wl / 2) d += ` t ${wl / 2} 0`
  return d
}

const WAVES = [
  // top%, amplitude, stroke, width, duration s, reverse
  { top: '20%', amp: 26, stroke: 'rgba(126, 159, 255, 0.35)', w: 2, dur: 30, rev: false },
  { top: '38%', amp: 34, stroke: 'rgba(78, 106, 230, 0.22)', w: 2.5, dur: 44, rev: true },
  { top: '58%', amp: 22, stroke: 'rgba(201, 154, 69, 0.32)', w: 1.8, dur: 36, rev: false },
  { top: '74%', amp: 30, stroke: 'rgba(169, 189, 255, 0.4)', w: 2, dur: 52, rev: true },
]

export default function Hero() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const contentY = useTransform(scrollY, [0, 700], [0, -90])
  const contentOpacity = useTransform(scrollY, [0, 550], [1, 0.25])
  const wavesY = useTransform(scrollY, [0, 700], [0, 130])

  const fadeUp = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="hero" id="top">
      <motion.div
        className="hero-waves"
        style={reduced ? undefined : { y: wavesY }}
        aria-hidden="true"
      >
        {WAVES.map((wv, i) => (
          <div className="wave-layer" style={{ top: wv.top }} key={i}>
            <svg
              viewBox="0 0 2880 120"
              preserveAspectRatio="none"
              style={{ animationDuration: `${wv.dur}s`, animationDirection: wv.rev ? 'reverse' : 'normal' }}
            >
              <path d={wavePath(wv.amp)} fill="none" stroke={wv.stroke} strokeWidth={wv.w} strokeLinecap="round" />
            </svg>
          </div>
        ))}
      </motion.div>

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
          therapy with {site.founder}, {site.credentials}, offered in the clinic, in the
          community, or by secure telehealth.
        </motion.p>
        <motion.div className="hero-ctas" {...fadeUp(0.4)}>
          <button className="btn btn--primary btn--lg" onClick={goToBooking}>
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
