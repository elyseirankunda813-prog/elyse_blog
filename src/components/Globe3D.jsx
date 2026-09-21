import { useEffect, useRef } from 'react'
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Group,
  Points,
  BufferGeometry,
  BufferAttribute,
  ShaderMaterial,
  Color,
  Vector3,
  CanvasTexture,
  SpriteMaterial,
  Sprite,
  Clock,
  SRGBColorSpace,
} from 'three'
import { feature } from 'topojson-client'
import landTopo from 'world-atlas/countries-110m.json'
import { RWANDA_FLAG } from '../lib/flags'

const LON0 = 20
const R = 1.8
const STEP = 2
const DEG = Math.PI / 180
const START_ROT = -LON0 * DEG
const SPIN = 0.21

const bounds = (geometry) => {
  let minLng = 180
  let maxLng = -180
  let minLat = 90
  let maxLat = -90
  const polygons = geometry.type === 'Polygon' ? [geometry.coordinates] : geometry.coordinates
  for (const rings of polygons) {
    for (const ring of rings) {
      for (const [lng, lat] of ring) {
        if (lng < minLng) minLng = lng
        if (lng > maxLng) maxLng = lng
        if (lat < minLat) minLat = lat
        if (lat > maxLat) maxLat = lat
      }
    }
  }
  return { minLng, maxLng, minLat, maxLat }
}

const FEATURES = feature(landTopo, landTopo.objects.countries).features
  .filter((f) => f.geometry)
  .map((f) => ({
    polygons: f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates,
    box: bounds(f.geometry),
  }))

const ringContains = (ring, lng, lat) => {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0]
    const yi = ring[i][1]
    const xj = ring[j][0]
    const yj = ring[j][1]
    if (yi > lat !== yj > lat && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

const isLand = (lng, lat) => {
  for (const f of FEATURES) {
    const b = f.box
    if (lng < b.minLng || lng > b.maxLng || lat < b.minLat || lat > b.maxLat) continue
    for (const rings of f.polygons) {
      let inPoly = false
      for (const ring of rings) if (ringContains(ring, lng, lat)) inPoly = !inPoly
      if (inPoly) return true
    }
  }
  return false
}

const direction = (lat, lng) => {
  const lar = lat * DEG
  const lrr = lng * DEG
  return new Vector3(Math.cos(lar) * Math.sin(lrr), Math.sin(lar), Math.cos(lar) * Math.cos(lrr))
}

let dotsCache = null
const getDots = () => {
  if (dotsCache) return dotsCache
  const dots = []
  for (let lat = -60; lat <= 70; lat += STEP) {
    for (let lng = -180; lng < 180; lng += STEP) {
      if (isLand(lng, lat)) dots.push(direction(lat, lng))
    }
  }
  dotsCache = dots
  return dots
}

const flagTexture = (markup) =>
  new Promise((resolve) => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="90" height="60" viewBox="0 0 45 30">${markup}</svg>`
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
    const img = new Image()
    img.onload = () => {
      const c = document.createElement('canvas')
      c.width = 90
      c.height = 60
      c.getContext('2d').drawImage(img, 0, 0, 90, 60)
      URL.revokeObjectURL(url)
      resolve(c)
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      resolve(null)
    }
    img.src = url
  })

const VERT = `
  uniform vec3 uLight;
  uniform float uPx;
  attribute vec3 aDir;
  varying float vI;
  void main() {
    vec3 n = normalize((modelMatrix * vec4(aDir, 0.0)).xyz);
    vI = max(dot(n, uLight), 0.0) * 0.8 + 0.18;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = uPx;
    gl_Position = projectionMatrix * mv;
  }
`

const FRAG = `
  uniform vec3 uDark;
  uniform vec3 uLit;
  varying float vI;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    float a = 1.0 - smoothstep(0.14, 0.5, d);
    if (a < 0.02) discard;
    gl_FragColor = vec4(mix(uDark, uLit, clamp(vI, 0.0, 1.0)), a);
  }
`

export default function Globe3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    mount.appendChild(renderer.domElement)

    const scene = new Scene()
    const camera = new PerspectiveCamera(45, 1, 0.1, 50)
    camera.position.z = 4.9

    const DOTS = getDots()
    const positions = new Float32Array(DOTS.length * 3)
    const dirs = new Float32Array(DOTS.length * 3)
    DOTS.forEach((d, i) => {
      positions[i * 3] = d.x * R
      positions[i * 3 + 1] = d.y * R
      positions[i * 3 + 2] = d.z * R
      dirs[i * 3] = d.x
      dirs[i * 3 + 1] = d.y
      dirs[i * 3 + 2] = d.z
    })

    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(positions, 3))
    geometry.setAttribute('aDir', new BufferAttribute(dirs, 3))

    const material = new ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      uniforms: {
        uLight: { value: new Vector3(0.55, 0.72, 0.45).normalize() },
        uDark: { value: new Color(0x1b3a63) },
        uLit: { value: new Color(0x9db8d8) },
        uPx: { value: 4 * Math.min(window.devicePixelRatio, 2) },
      },
    })

    const points = new Points(geometry, material)
    points.frustumCulled = false
    const group = new Group()
    group.rotation.y = START_ROT
    group.add(points)
    scene.add(group)

    const flagSprites = []
    let disposed = false
    const flags = [RWANDA_FLAG]
    flags.forEach((f) => {
      flagTexture(f.markup).then((canvas) => {
        if (!canvas || !scene || disposed) return
        const texture = new CanvasTexture(canvas)
        texture.colorSpace = SRGBColorSpace
        const spriteMat = new SpriteMaterial({ map: texture, transparent: true, depthWrite: false })
        const sprite = new Sprite(spriteMat)
        sprite.scale.set(R * 0.24, R * 0.16, 1)
        const d = direction(f.lat, f.lng)
        flagSprites.push({ sprite, d })
        scene.add(sprite)
      })
    })

    const clock = new Clock()
    let offset = 0
    let rafId = 0
    let running = true

    const draw = () => {
      if (running) {
        offset += clock.getDelta() * SPIN
        group.rotation.y = START_ROT + offset
        flagSprites.forEach(({ sprite, d }) => {
          const r = rotateY(d, group.rotation.y)
          sprite.position.set(r.x * R * 1.04, r.y * R * 1.04, r.z * R * 1.04)
          sprite.visible = r.z > 0
        })
        renderer.render(scene, camera)
      }
      rafId = requestAnimationFrame(draw)
    }
    draw()

    const observer = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting
      clock.getDelta()
    })
    observer.observe(mount)

    const resize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (w < 1 || h < 1) return
      renderer.setSize(w, h, true)
    }
    const ro = new ResizeObserver(resize)
    ro.observe(mount)
    resize()

    return () => {
      disposed = true
      cancelAnimationFrame(rafId)
      observer.disconnect()
      ro.disconnect()
      scene.traverse((obj) => {
        if (obj.material) {
          if (obj.material.map) obj.material.map.dispose()
          obj.material.dispose()
        }
        if (obj.geometry) obj.geometry.dispose()
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div
      ref={mountRef}
      className="guestbook-hero"
      role="img"
      aria-label="Rotating 3D globe made of dots, with the Rwanda flag"
    />
  )
}

function rotateY(v, a) {
  const c = Math.cos(a)
  const s = Math.sin(a)
  return new Vector3(v.x * c + v.z * s, v.y, -v.x * s + v.z * c)
}