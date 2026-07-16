import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import HowItWorks from './components/HowItWorks'
import Insurance from './components/Insurance'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [introDone, setIntroDone] = useState(false)

  // Smooth scrolling for the whole page (started after the intro).
  useEffect(() => {
    if (!introDone) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    window.__lenis = lenis
    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      delete window.__lenis
    }
  }, [introDone])

  // Lock scroll while the intro is playing.
  useEffect(() => {
    document.documentElement.style.overflow = introDone ? '' : 'hidden'
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [introDone])

  return (
    <>
      {!introDone && <Loader onDone={() => setIntroDone(true)} />}
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <HowItWorks />
        <Insurance />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
