import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'

function TorusKnot({ position, scale, speed, color, distort }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.15
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.2
  })

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={ref} position={position} scale={scale}>
        <torusKnotGeometry args={[1.2, 0.3, 128, 16]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
          distort={distort}
          speed={1.5}
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  )
}

function Icosahedron({ position, scale, color, speed }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed * 0.6) * 0.3
    ref.current.rotation.x += 0.003 * speed
    ref.current.rotation.z += 0.005 * speed
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.25}
      />
    </mesh>
  )
}

function Ring({ position, color, speed, size }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.z = clock.getElapsedTime() * speed * 0.08
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime() * speed * 0.4) * 0.2
    ref.current.rotation.x = Math.PI / 2 + Math.sin(clock.getElapsedTime() * 0.2) * 0.1
  })

  return (
    <mesh ref={ref} position={position}>
      <torusGeometry args={[size, 0.02, 16, 80]} />
      <meshStandardMaterial color={color} transparent opacity={0.2} />
    </mesh>
  )
}

function Dodecahedron({ position, scale, color, speed }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * speed * 0.1
    ref.current.rotation.x = clock.getElapsedTime() * speed * 0.07
  })

  return (
    <Float speed={speed * 0.3} rotationIntensity={0.1} floatIntensity={0.3}>
      <mesh ref={ref} position={position} scale={scale}>
        <dodecahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  )
}

function SceneContent() {
  const shapes = useMemo(() => [
    { pos: [-4, 1.5, -6], scale: 0.5, color: '#ffffff', speed: 0.5, distort: 0.2 },
    { pos: [4.5, -1, -5], scale: 0.4, color: '#cccccc', speed: 0.4, distort: 0.3 },
    { pos: [-3, -2.5, -8], scale: 0.35, color: '#999999', speed: 0.6, distort: 0.15 },
    { pos: [3.5, 2.5, -7], scale: 0.45, color: '#dddddd', speed: 0.3, distort: 0.25 },
  ], [])

  const wireframes = useMemo(() => [
    { pos: [0, 3, -9], scale: 2.5, color: '#ffffff', speed: 0.3 },
    { pos: [-4, -2, -10], scale: 2, color: '#aaaaaa', speed: 0.25 },
    { pos: [4.5, 0.5, -11], scale: 3, color: '#888888', speed: 0.2 },
    { pos: [-2, 3.5, -12], scale: 1.8, color: '#bbbbbb', speed: 0.35 },
    { pos: [2, -3, -13], scale: 2.2, color: '#999999', speed: 0.28 },
  ], [])

  const rings = useMemo(() => [
    { pos: [2, 0, -7], color: '#ffffff', speed: 0.4, size: 2.5 },
    { pos: [-3, 1.5, -9], color: '#bbbbbb', speed: 0.3, size: 3 },
    { pos: [0, -2, -11], color: '#888888', speed: 0.35, size: 3.5 },
    { pos: [-1.5, 2, -14], color: '#aaaaaa', speed: 0.25, size: 4 },
  ], [])

  const dodecas = useMemo(() => [
    { pos: [0, -3.5, -15], scale: 1.8, color: '#ffffff', speed: 0.2 },
    { pos: [5, 3, -16], scale: 2.5, color: '#cccccc', speed: 0.15 },
    { pos: [-5, -1, -17], scale: 2, color: '#999999', speed: 0.18 },
  ], [])

  return (
    <>
      {shapes.map((s, i) => (
        <TorusKnot key={`knot${i}`} position={s.pos} scale={s.scale} color={s.color} speed={s.speed} distort={s.distort} />
      ))}
      {wireframes.map((s, i) => (
        <Icosahedron key={`ico${i}`} position={s.pos} scale={s.scale} color={s.color} speed={s.speed} />
      ))}
      {rings.map((r, i) => (
        <Ring key={`ring${i}`} position={r.pos} color={r.color} speed={r.speed} size={r.size} />
      ))}
      {dodecas.map((d, i) => (
        <Dodecahedron key={`dodeca${i}`} position={d.pos} scale={d.scale} color={d.color} speed={d.speed} />
      ))}
    </>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 50 }}>
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, 5]} intensity={0.4} />
        <SceneContent />
      </Canvas>
    </div>
  )
}
