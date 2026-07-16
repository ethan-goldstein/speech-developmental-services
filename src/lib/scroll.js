/* Smooth-scroll to a section id, preferring the Lenis instance when active. */
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -84, duration: 1.3 })
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
