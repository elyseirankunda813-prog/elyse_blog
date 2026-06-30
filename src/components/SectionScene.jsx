import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function Box({ p, s, c, sp, w }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.rotation.x = clock.getElapsedTime() * sp * 0.3; r.current.rotation.y = clock.getElapsedTime() * sp * 0.5 })
  return (<Float speed={sp * 0.4} rotationIntensity={0.2} floatIntensity={0.3}><mesh ref={r} position={p} scale={s}><boxGeometry args={[1,1,1]} /><meshStandardMaterial color={c} wireframe={w} transparent opacity={w ? 0.25 : 0.12} /></mesh></Float>)
}

function Sphere({ p, s, c, sp, w }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.position.y = p[1] + Math.sin(clock.getElapsedTime() * sp * 0.5) * 0.3; r.current.rotation.x += 0.005 * sp; r.current.rotation.y += 0.008 * sp })
  return (<mesh ref={r} position={p} scale={s}><sphereGeometry args={[1,32,32]} /><meshStandardMaterial color={c} wireframe={w} transparent opacity={w ? 0.25 : 0.12} /></mesh>)
}

function Ring({ p, c, sp, sz, a }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.rotation.x = a + Math.sin(clock.getElapsedTime() * sp * 0.2) * 0.2; r.current.rotation.z = clock.getElapsedTime() * sp * 0.1 })
  return (<mesh ref={r} position={p}><torusGeometry args={[sz, 0.025, 16, 60]} /><meshStandardMaterial color={c} transparent opacity={0.18} /></mesh>)
}

function Diamond({ p, s, c, sp }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.rotation.y = clock.getElapsedTime() * sp * 0.2; r.current.rotation.x = clock.getElapsedTime() * sp * 0.15 })
  return (<Float speed={sp * 0.3} rotationIntensity={0.1} floatIntensity={0.2}><mesh ref={r} position={p} scale={s}><octahedronGeometry args={[1,0]} /><meshStandardMaterial color={c} wireframe transparent opacity={0.22} /></mesh></Float>)
}

function Pillar({ p, s, c, sp }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.position.y = p[1] + Math.sin(clock.getElapsedTime() * sp * 0.6) * 0.2; r.current.rotation.y += 0.003 * sp })
  return (<mesh ref={r} position={p} scale={s}><boxGeometry args={[0.4,1.5,0.4]} /><meshStandardMaterial color={c} transparent opacity={0.15} /></mesh>)
}

function Dot({ p, c, sp, i }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.position.x = p[0] + Math.sin(clock.getElapsedTime() * sp * 0.5 + i) * 0.4; r.current.position.y = p[1] + Math.cos(clock.getElapsedTime() * sp * 0.4 + p[0]) * 0.4 })
  return (<mesh ref={r} position={p}><sphereGeometry args={[0.06,8,8]} /><meshStandardMaterial color={c} transparent opacity={0.5} /></mesh>)
}

function Tetra({ p, s, c, sp }) {
  const r = useRef()
  useFrame(({ clock }) => { r.current.rotation.y = clock.getElapsedTime() * sp * 0.25; r.current.rotation.z = clock.getElapsedTime() * sp * 0.15 })
  return (<Float speed={sp * 0.3} rotationIntensity={0.15} floatIntensity={0.25}><mesh ref={r} position={p} scale={s}><tetrahedronGeometry args={[1,0]} /><meshStandardMaterial color={c} wireframe transparent opacity={0.2} /></mesh></Float>)
}

function Cubes() {
  const d = useMemo(() => [[-3,1.5,-4,0.8,'#ffffff',0.4,1],[3,-1,-5,0.6,'#cccccc',0.3,0],[-2,-2,-7,0.5,'#999999',0.5,1],[4,2,-6,0.7,'#aaaaaa',0.35,0],[0,0,-8,0.9,'#dddddd',0.25,1]],[])
  return d.map((v,i) => <Box key={i} p={[v[0],v[1],v[2]]} s={v[3]} c={v[4]} sp={v[5]} w={!!v[6]} />)
}

function RingsV() {
  const d = useMemo(() => [[2,0,-5,'#ffffff',0.3,2,1.05],[-3,1.5,-7,'#cccccc',0.25,2.5,0.79],[0,-2,-9,'#999999',0.35,3,1.57],[-1.5,2,-11,'#aaaaaa',0.2,3.5,0.52]],[])
  return d.map((v,i) => <Ring key={i} p={[v[0],v[1],v[2]]} c={v[3]} sp={v[4]} sz={v[5]} a={v[6]} />)
}

function SpheresV() {
  const d = useMemo(() => [[-3,1,-5,0.7,'#ffffff',0.3,1],[3,-1.5,-6,0.5,'#cccccc',0.4,0],[0,2,-8,0.9,'#999999',0.25,1],[-2,-2,-10,0.6,'#aaaaaa',0.35,0],[4,1,-12,1.1,'#dddddd',0.2,1]],[])
  return d.map((v,i) => <Sphere key={i} p={[v[0],v[1],v[2]]} s={v[3]} c={v[4]} sp={v[5]} w={!!v[6]} />)
}

function StarsV() {
  const d = useMemo(() => [[-3,1.5,-4,0.6,'#ffffff',0.4],[3.5,-1,-6,0.5,'#cccccc',0.3],[-1,-2.5,-8,0.7,'#999999',0.5],[2,2.5,-10,0.4,'#aaaaaa',0.35]],[])
  return d.map((v,i) => <Diamond key={i} p={[v[0],v[1],v[2]]} s={v[3]} c={v[4]} sp={v[5]} />)
}

function BarsV() {
  const d = useMemo(() => [[-3,0,-5,1,'#ffffff',0.3],[0,-0.5,-6,1.3,'#cccccc',0.4],[3,0.5,-7,0.8,'#999999',0.25],[-1.5,1,-9,1.6,'#aaaaaa',0.35],[4.5,-1,-8,0.6,'#dddddd',0.3]],[])
  return d.map((v,i) => <Pillar key={i} p={[v[0],v[1],v[2]]} s={[1,v[3],1]} c={v[4]} sp={v[5]} />)
}

function DotsV() {
  const d = useMemo(() => Array.from({length:30},(_,i)=>({p:[(Math.random()-0.5)*10,(Math.random()-0.5)*6,-3-Math.random()*8],c:i%3===0?'#ffffff':i%3===1?'#cccccc':'#999999',sp:0.2+Math.random()*0.4,i})),[])
  return d.map((v) => <Dot key={v.i} p={v.p} c={v.c} sp={v.sp} i={v.i} />)
}

function TetsV() {
  const d = useMemo(() => [[-2,2,-4,0.8,'#ffffff',0.4],[4,-1.5,-6,0.6,'#cccccc',0.3],[-4,-2,-8,0.5,'#999999',0.5],[1,2.5,-10,0.7,'#aaaaaa',0.25],[3,-2.5,-12,0.4,'#dddddd',0.35]],[])
  return d.map((v,i) => <Tetra key={i} p={[v[0],v[1],v[2]]} s={v[3]} c={v[4]} sp={v[5]} />)
}

const variants = { cubes: Cubes, rings: RingsV, spheres: SpheresV, stars: StarsV, bars: BarsV, dots: DotsV, tets: TetsV }

function SceneContent({ variant }) {
  const C = variants[variant] || Cubes
  return <C />
}

export default function SectionScene({ variant = 'cubes', opacity = 0.35 }) {
  return (
    <div className="section-scene" style={{ opacity }}>
      <Canvas camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 50 }}>
        <ambientLight intensity={2.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, -5, 5]} intensity={0.4} />
        <SceneContent variant={variant} />
      </Canvas>
    </div>
  )
}
