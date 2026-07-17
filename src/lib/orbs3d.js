/* 3D speech-bubble field for the hero background — extruded chat bubbles
   (echoing the SDS logo mark) and floating "···" dot trios that drift gently
   and parallax with scroll. No pointer tracking by design. */

import * as THREE from 'three'

function bubbleGeometry(w = 4, h = 3, r = 1.1) {
  // Rounded rectangle with a tail at the bottom-left, like the logo bubble.
  const s = new THREE.Shape()
  const hw = w / 2
  const hh = h / 2
  const tailX = -hw + r * 0.9
  s.moveTo(-hw + r, -hh)
  // tail: dips below the bottom edge
  s.lineTo(tailX + 0.9, -hh)
  s.lineTo(tailX + 0.25, -hh - 1.05)
  s.lineTo(tailX + 0.15, -hh)
  s.lineTo(-hw + r, -hh) // continue bottom edge start
  s.absarc(-hw + r, -hh + r, r, -Math.PI / 2, Math.PI, true)
  s.lineTo(-hw, hh - r)
  s.absarc(-hw + r, hh - r, r, Math.PI, Math.PI / 2, true)
  s.lineTo(hw - r, hh)
  s.absarc(hw - r, hh - r, r, Math.PI / 2, 0, true)
  s.lineTo(hw, -hh + r)
  s.absarc(hw - r, -hh + r, r, 0, -Math.PI / 2, true)
  s.lineTo(tailX + 0.9, -hh)

  return new THREE.ExtrudeGeometry(s, {
    depth: 0.9,
    bevelEnabled: true,
    bevelThickness: 0.28,
    bevelSize: 0.28,
    bevelSegments: 5,
    curveSegments: 24,
  })
}

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

  scene.add(new THREE.AmbientLight(0xffffff, 0.95))
  const key = new THREE.DirectionalLight(0xffffff, 1.3)
  key.position.set(6, 10, 8)
  scene.add(key)
  const fill = new THREE.DirectionalLight(0x7e9fff, 0.7)
  fill.position.set(-8, -4, 6)
  scene.add(fill)

  const group = new THREE.Group()
  scene.add(group)

  const mat = (color, opacity) =>
    new THREE.MeshStandardMaterial({
      color,
      roughness: 0.22,
      metalness: 0.08,
      transparent: true,
      opacity,
    })

  const floaters = []
  const addFloater = (mesh, x, y, z, spinAxis) => {
    mesh.position.set(x, y, z)
    mesh.userData = {
      baseX: x,
      baseY: y,
      phase: floaters.length * 1.37,
      spinAxis,
    }
    group.add(mesh)
    floaters.push(mesh)
  }

  // Speech bubbles — different sizes, tilts, and depths.
  const BUBBLES = [
    // x, y, z, scale, rotZ, color, opacity
    [-10.5, 3.2, -7, 1.15, 0.14, 0x7e9fff, 0.5],
    [10.8, -2.4, -9, 1.5, -0.1, 0x9bb5ff, 0.42],
    [8.6, 4.8, -6, 0.75, 0.2, 0xb9c9ff, 0.55],
    [-6.6, -5.2, -5, 0.6, -0.22, 0x8fa9ff, 0.45],
  ]
  for (const [x, y, z, sc, rz, color, opacity] of BUBBLES) {
    const m = new THREE.Mesh(bubbleGeometry(), mat(color, opacity))
    m.scale.setScalar(sc)
    m.rotation.z = rz
    m.rotation.x = 0.12
    addFloater(m, x, y, z, 'y')
  }

  // "···" dot trios — the logo's ellipsis, floating free.
  const TRIOS = [
    [1.6, 6.6, -10, 0.42, 0x7e9fff, 0.5],
    [-2.8, -6.9, -8, 0.34, 0xa5baff, 0.42],
  ]
  for (const [x, y, z, r, color, opacity] of TRIOS) {
    const trio = new THREE.Group()
    for (let i = -1; i <= 1; i++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(r, 28, 20), mat(color, opacity))
      dot.position.x = i * r * 2.9
      trio.add(dot)
    }
    addFloater(trio, x, y, z, 'z')
  }

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
    for (const m of floaters) {
      const { baseY, baseX, phase, spinAxis } = m.userData
      m.position.y = baseY + Math.sin(t * 0.00045 + phase) * 0.85
      m.position.x = baseX + Math.cos(t * 0.00032 + phase * 1.7) * 0.5
      if (spinAxis === 'y') m.rotation.y = Math.sin(t * 0.00028 + phase) * 0.38
      else m.rotation.z = Math.sin(t * 0.00034 + phase) * 0.22
    }
    group.rotation.z = Math.sin(t * 0.00012) * 0.04
    // scroll parallax — the field recedes as the page scrolls
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
