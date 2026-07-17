import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { site } from '../content/data'
import { scrollToId } from '../lib/scroll'

export default function Hero() {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const blobY = useTransform(scrollY, [0, 600], [0, 110])
  const fadeUp = (delay) => ({
    initial: reduced ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] },
  })

  return (
    <section className="hero" id="top">
      <motion.div className="hero-blob hero-blob--a" style={reduced ? undefined : { y: blobY }} aria-hidden="true" />
      <motion.div className="hero-blob hero-blob--b" style={reduced ? undefined : { y: blobY }} aria-hidden="true" />

      <div className="hero-inner">
        <motion.p className="hero-eyebrow" {...fadeUp(0.05)}>
          {site.name} · Arlington, VA
        </motion.p>
        <motion.h1 className="hero-title" {...fadeUp(0.16)}>
          Helping your child
          <br />
          <em>find their voice.</em>
        </motion.h1>
        <motion.p className="hero-sub" {...fadeUp(0.3)}>
          Individualized, functional, and neurodiversity-affirming pediatric speech
          therapy with {site.founder}, {site.credentials} — in the clinic, in the
          community, or by secure telehealth across {site.telehealthStates}.
        </motion.p>
        <motion.div className="hero-ctas" {...fadeUp(0.44)}>
          <button className="btn btn--primary btn--lg" onClick={() => scrollToId('contact')}>
            Book a Free Consultation
          </button>
          <button className="btn btn--ghost btn--lg" onClick={() => scrollToId('services')}>
            Explore Services
          </button>
        </motion.div>
      </div>

      <motion.div
        className="hero-scrollcue"
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="hero-scrollcue-line" />
        Scroll
      </motion.div>
    </section>
  )
}
