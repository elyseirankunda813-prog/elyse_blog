import { useEffect, useState, lazy, Suspense } from 'react'
import Typewriter from './Typewriter'

const Scene3D = lazy(() => import('./Scene3D'))

export default function Hero() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setLoaded(true) }, [])

  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
        <div className="hero-gradient" />
        <div className="hero-noise" />
      </div>
      <div className={`hero-content ${loaded ? 'visible' : ''}`}>
        <div className="hero-badge">Software Developer</div>
        <h1 className="hero-name">
          <Typewriter text="IRANKUNDA ELYSE" speed={65} delay={300} />
        </h1>
        <p className="hero-desc">
          Level 4 Software Development candidate from Rwanda. I build
          web &amp; mobile applications with modern technologies.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            <span>View My Work</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
          <button className="btn btn-ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Get In Touch
          </button>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
