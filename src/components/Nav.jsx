import { useEffect, useState } from 'react'
import { site } from '../content/data'
import { scrollToId } from '../lib/scroll'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'how-it-works', label: 'How It Works' },
  { id: 'insurance', label: 'Insurance' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <button className="nav-brand" onClick={() => scrollToId('top')} aria-label="Back to top">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="nav-logo" />
          <span className="nav-wordmark">{site.name}</span>
        </button>

        <nav className="nav-links" aria-label="Sections">
          {LINKS.map((l) => (
            <button key={l.id} className="nav-link" onClick={() => scrollToId(l.id)}>
              {l.label}
            </button>
          ))}
        </nav>

        <button className="btn btn--primary btn--nav" onClick={() => scrollToId('contact')}>
          Book a Free Consultation
        </button>
      </div>
    </header>
  )
}
