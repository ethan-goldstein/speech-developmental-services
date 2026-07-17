import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { site } from '../content/data'
import { scrollToId, goToBooking } from '../lib/scroll'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scrollspy: highlight the section currently in view.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: '-38% 0px -55% 0px' }
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <motion.span className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => scrollToId('top')} aria-label="Back to top">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="nav-logo" />
          <span className="nav-wordmark">{site.name}</span>
        </button>

        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav-link ${active === l.id ? 'is-active' : ''}`}
              onClick={() => scrollToId(l.id)}
            >
              {l.label}
            </button>
          ))}
        </nav>

        <button className="btn btn--primary btn--nav" onClick={goToBooking}>
          Book a Free Consultation
        </button>
      </div>
    </header>
  )
}
