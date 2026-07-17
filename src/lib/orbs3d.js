/* Soft 3D orb field for the hero background — periwinkle glass spheres that
   drift gently and parallax with scroll. No pointer tracking by design. */

import * as THREE from 'three'

export function createOrbScene(canvas) {
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  } catch {
    return null
  }
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
  camera.position.z = 16

  scene.add(new THREE.AmbientLight(0xffffff, 0.9))
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(6, 10, 8)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0x7e9fff, 0.8)
  fill.position.set(-8, -4, 6)
  scene.add(fill)

  const group = new THREE.Group()
  scene.add(group)

  const ORBS = [
    // x, y, z, radius, color, opacity
    [-9.5, 3.4, -6, 2.6, 0x7e9fff, 0.5],
    [10.2, -2.6, -8, 3.4, 0x9bb5ff, 0.42],
    [-6.8, -4.2, -4, 1.5, 0x4e6ae6, 0.4],
    [8.4, 4.6, -5, 1.9, 0xb9c9ff, 0.5],
    [1.8, 6.4, -9, 2.2, 0x8fa9ff, 0.35],
    [-2.4, -6.6, -7, 2.8, 0xa5baff, 0.32],
  ]

  const meshes = ORBS.map(([x, y, z, r, color, opacity], i) => {
    const m = new THREE.Mesh(
      new THREE.SphereGeometry(r, 48, 32),
      new THREE.MeshStandardMaterial({
        color,
        roughness: 0.18,
        metalness: 0.1,
        transparent: true,
        opacity,
      })
    )
    m.position.set(x, y, z)
    m.userData = { baseY: y, baseX: x, phase: (i / ORBS.length) * Math.PI * 2 }
    group.add(m)
    return m
  })

  let w = 1
  let h = 1
  function resize() {
    w = canvas.clientWidth || window.innerWidth
    h = canvas.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  let raf
  let disposed = false
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const frame = (t) => {
    if (disposed) return
    for (const m of meshes) {
      const { baseY, baseX, phase } = m.userData
      m.position.y = baseY + Math.sin(t * 0.00045 + phase) * 0.9
      m.position.x = baseX + Math.cos(t * 0.00032 + phase * 1.7) * 0.55
    }
    group.rotation.z = Math.sin(t * 0.00012) * 0.05
    // scroll parallax — orbs recede as the page scrolls
    group.position.y = window.scrollY * 0.004
    renderer.render(scene, camera)
    raf = requestAnimationFrame(frame)
  }

  if (reduced) {
    renderer.render(scene, camera) // static backdrop
  } else {
    raf = requestAnimationFrame(frame)
  }

  return {
    dispose() {
      disposed = true
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      renderer.dispose()
    },
  }
}
