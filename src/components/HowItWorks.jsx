import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { steps, settings, site } from '../content/data'
import Icon from './Icons'
import Reveal from './Reveal'
import { goToBooking } from '../lib/scroll'

export default function HowItWorks() {
  const reduced = useReducedMotion()
  const railRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 0.72', 'end 0.6'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })

  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Evaluation &amp; Therapy</p>
          <h2 className="section-title">
            Care in the setting that works best for your family.
          </h2>
          <p className="section-lede">
            Therapy services are offered in our clinic, in the community, or through
            secure telehealth. Our practice is based in {site.base}, with telehealth
            available in {site.telehealthStates}.
          </p>
        </Reveal>

        <div className="settings-row">
          {settings.map((s, i) => (
            <Reveal key={s.title} delay={0.07 * i} className="setting-chip" three>
              <span className="setting-icon">
                <Icon name={s.icon} size={22} />
              </span>
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="steps" ref={railRef}>
          <Reveal>
            <h3 className="steps-heading">How does it work?</h3>
          </Reveal>

          <div className="steps-rail" aria-hidden="true">
            <motion.span
              className="steps-rail-fill"
              style={reduced ? { scaleY: 1 } : { scaleY: fill }}
            />
          </div>

          {steps.map((step, i) => (
            <Reveal key={step.n} delay={0.06} className="step">
              <span className="step-marker" aria-hidden="true" />
              <span className="step-n">{step.n}</span>
              <div className="step-body">
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                {i === 0 && (
                  <button className="btn btn--primary" onClick={goToBooking}>
                    Schedule Yours, It’s Free
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
