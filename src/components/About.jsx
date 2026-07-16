import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { about, pillars, site } from '../content/data'
import Reveal from './Reveal'

export default function About() {
  const reduced = useReducedMotion()
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [40, -40])

  return (
    <section className="section about" id="about">
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">About</p>
          <h2 className="section-title">
            {site.founder}
            <span className="section-title-sub">{site.title}</span>
          </h2>
        </Reveal>

        <div className="about-grid">
          <div className="about-photo-col" ref={photoRef}>
            <Reveal delay={0.1}>
              <motion.figure
                className="about-photo"
                style={reduced ? undefined : { y: photoY }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}headshot.jpg`}
                  alt={`${site.founder}, ${site.credentials}`}
                  draggable="false"
                />
                <figcaption>
                  {site.founder}, {site.credentials}
                </figcaption>
              </motion.figure>
            </Reveal>
          </div>

          <div className="about-text">
            <Reveal delay={0.12}>
              <p>{about.intro}</p>
            </Reveal>
            <Reveal delay={0.18}>
              <p>{about.why}</p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="about-connection">{about.connection}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="about-personal">{about.personal}</p>
            </Reveal>
          </div>
        </div>

        <div className="pillars">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={0.08 * i} className="pillar">
              <span className="pillar-index">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
