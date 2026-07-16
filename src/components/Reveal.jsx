import { motion, useReducedMotion } from 'framer-motion'

/* Scroll-in reveal: fade + rise once, Apple-style easing. */
export default function Reveal({ children, delay = 0, y = 26, className = '', as = 'div' }) {
  const reduced = useReducedMotion()
  const M = motion[as] ?? motion.div
  return (
    <M
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
