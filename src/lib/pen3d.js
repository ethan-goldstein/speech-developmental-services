/* A 3D fountain pen rendered on a transparent full-screen canvas.
   The camera is placed so that world units at the z=0 plane equal CSS pixels,
   letting the loader position the nib exactly on the handwriting tip. */

import * as THREE from 'three'

const FOV = 40

function buildPen() {
  const pen = new THREE.Group()

  const navy = new THREE.MeshStandardMaterial({
    color: 0x2e3a63,
    metalness: 0.4,
    roughness: 0.28,
  })
  const gold = new THREE.MeshStandardMaterial({
    color: 0xd8b26a,
    metalness: 0.9,
    roughness: 0.28,
  })
  const black = new THREE.MeshStandardMaterial({
    color: 0x17171a,
    metalness: 0.5,
    roughness: 0.35,
  })

  // Nib: cone with its tip at the group origin, pointing down (-y).
  const nib = new THREE.Mesh(new THREE.ConeGeometry(3.4, 15, 32), gold)
  nib.rotation.x = Math.PI
  nib.position.y = 7.5
  pen.add(nib)

  const grip = new THREE.Mesh(new THREE.CylinderGeometry(3.7, 3.2, 11, 32), black)
  grip.position.y = 20.5
  pen.add(grip)

  const band = new THREE.Mesh(new THREE.CylinderGeometry(4.15, 4.15, 3, 32), gold)
  band.position.y = 27.5
  pen.add(band)

  const body = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 4.1, 58, 32), navy)
  body.position.y = 58
  pen.add(body)

  const clip = new THREE.Mesh(new THREE.BoxGeometry(1.5, 24, 1.1), gold)
  clip.position.set(5.4, 74, 0)
  pen.add(clip)

  const topRing = new THREE.Mesh(new THREE.CylinderGeometry(5.05, 5.2, 2.6, 32), gold)
  topRing.position.y = 88.3
  pen.add(topRing)

  const cap = new THREE.Mesh(new THREE.SphereGeometry(5.05, 32, 16), navy)
  cap.scale.y = 0.72
  cap.position.y = 89.6
  pen.add(cap)

  return pen
}

export function createPenScene(canvas) {
  let renderer
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  } catch {
    return null // no WebGL — loader falls back to handwriting only
  }
  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 5000)

  scene.add(new THREE.AmbientLight(0xffffff, 0.75))
  const key = new THREE.DirectionalLight(0xffffff, 1.6)
  key.position.set(200, 350, 420)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x9db4ff, 0.7)
  rim.position.set(-300, 120, -200)
  scene.add(rim)

  // Writing grip: leaned right and toward the viewer, like a held pen.
  const pen = buildPen()
  const holder = new THREE.Group()
  holder.add(pen)
  pen.rotation.set(0.42, 0.25, -0.62)
  scene.add(holder)
  holder.visible = false

  let w = 1
  let h = 1
  const target = new THREE.Vector3()
  let hasTarget = false

  function resize() {
    w = canvas.clientWidth || window.innerWidth
    h = canvas.clientHeight || window.innerHeight
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // Distance at which 1 world unit == 1 CSS pixel on the z=0 plane.
    camera.position.z = h / 2 / Math.tan(THREE.MathUtils.degToRad(FOV / 2))
    camera.updateProjectionMatrix()
  }
  resize()
  window.addEventListener('resize', resize)

  return {
    /* Move the nib toward screen-pixel (x, y). */
    setTip(x, y) {
      target.set(x - w / 2, h / 2 - y, 0)
      if (!hasTarget) {
        holder.position.copy(target)
        hasTarget = true
      }
      holder.visible = true
    },
    hide() {
      holder.visible = false
    },
    /* Glide the pen up and away (used when writing completes). */
    lift(amount) {
      holder.position.x += amount * 2.2
      holder.position.y += amount * 3.1
      pen.rotation.z -= amount * 0.004
    },
    render(time) {
      if (hasTarget) {
        // Chase the tip with a light lag + a faint hand tremor.
        holder.position.lerp(target, 0.45)
        pen.rotation.z = -0.62 + Math.sin(time * 0.006) * 0.022
        pen.rotation.x = 0.42 + Math.cos(time * 0.0045) * 0.016
      }
      renderer.render(scene, camera)
    },
    setScale(s) {
      pen.scale.setScalar(s)
    },
    dispose() {
      window.removeEventListener('resize', resize)
      renderer.dispose()
    },
  }
}
