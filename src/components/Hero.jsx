import { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { GitHubIcon, LinkedInIcon } from './icons'

const VIDEO_SRC = 'https://cdn.pixabay.com/video/2020/07/07/44081-438195519_small.mp4'
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
            <GitHubIcon />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/irankunda-elyse-753156421/" target="_blank" rel="noreferrer" role="listitem" aria-label="LinkedIn profile">
            <LinkedInIcon />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
