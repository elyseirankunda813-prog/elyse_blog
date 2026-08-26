import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const VIDEO_SRC = 'https://cdn.pixabay.com/video/2020/07/07/44081-438195519_large.mp4'
const MOBILE_BREAKPOINT = 768

export default function Hero() {
  const videoRef = useRef(null)
  const bgRef = useRef(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const el = bgRef.current
    const video = videoRef.current
    if (!el || !video) return

    if (window.innerWidth <= MOBILE_BREAKPOINT) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !videoLoaded) {
          video.src = VIDEO_SRC
          video.load()
          setVideoLoaded(true)
          observer.disconnect()
        }
      },
      { rootMargin: '200px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [videoLoaded])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoLoaded) return

    const onCanPlay = () => {
      video.play().catch(() => {})
    }
    video.addEventListener('canplay', onCanPlay, { once: true })
    return () => video.removeEventListener('canplay', onCanPlay)
  }, [videoLoaded])

  const scrollTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <section id="home" className="hero" aria-label="Introduction">
      <div className="hero-bg" ref={bgRef}>
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero-overlay" aria-hidden="true" />
      </div>
      <div className="hero-content">
        <h1 className="hero-name">Hi, I'm Elyse.</h1>
        <p className="hero-subtitle">
          Software Developer building simple, useful and reliable digital experiences.
        </p>
        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => navigate('/projects')}>
            View My Work
          </button>
          <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>
            Contact Me
          </button>
        </div>
        <div className="hero-links" role="list" aria-label="Social profiles">
          <a href="https://github.com/elyseirankunda/" target="_blank" rel="noreferrer" role="listitem" aria-label="GitHub profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/irankunda-elyse-753156421/" target="_blank" rel="noreferrer" role="listitem" aria-label="LinkedIn profile">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
