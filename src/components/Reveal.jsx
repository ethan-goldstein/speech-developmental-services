import { motion, useReducedMotion } from 'framer-motion'

/* Scroll-in reveal. `three` adds a subtle 3D flip-up entrance
   (perspective comes from the parent section via CSS). */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
  as = 'div',
  three = false,
}) {
  const reduced = useReducedMotion()
  const M = motion[as] ?? motion.div
  const hidden = three
    ? { opacity: 0, y, rotateX: 14, transformPerspective: 900 }
    : { opacity: 0, y }
  const shown = three ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 1, y: 0 }
  return (
    <M
      className={className}
      initial={reduced ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  )
}
