import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { about, pillars, site } from '../content/data'
import Reveal from './Reveal'
import Icon from './Icons'

export default function About() {
  const reduced = useReducedMotion()
  const photoRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], [48, -48])
  const photoRot = useTransform(scrollYProgress, [0, 1], [3.5, -3.5])

  return (
    <section className="section about" id="about">
      <div className="section-orb section-orb--b" aria-hidden="true" />
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
            <Reveal delay={0.1} three>
              <motion.figure
                className="about-photo"
                style={reduced ? undefined : { y: photoY, rotateZ: photoRot }}
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
              <p>{about.connection}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p>{about.personal}</p>
            </Reveal>
          </div>
        </div>

        <div className="approach">
          <Reveal>
            <h3 className="approach-heading">My approach</h3>
          </Reveal>
          <div className="approach-grid">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.09 * i} className="approach-card" three>
                <span className="approach-icon">
                  <Icon name={['target', 'home', 'heart'][i]} size={24} />
                </span>
                <h4>{p.title}</h4>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
