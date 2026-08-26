import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const links = ['About', 'Skills', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      if (location.pathname !== '/') return
      const scrollY = window.scrollY + 120
      const current = [...links].reverse().find((id) => {
        const el = document.getElementById(id.toLowerCase())
        return el && scrollY >= el.offsetTop
      })
      setActive(current ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const scrollTo = useCallback((id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(id.toLowerCase())
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      const el = document.getElementById(id.toLowerCase())
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }, [location, navigate])

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-content">
        <span className="nav-logo" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} role="link" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter') { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) } }}>
          Elyse
        </span>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} />}
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`} role="menubar">
          {links.map((link) => (
            <li key={link} role="none">
              <a role="menuitem" onClick={() => scrollTo(link)} className={active === link ? 'active' : ''} tabIndex={0}>
                {link}
              </a>
            </li>
          ))}
          <li role="none">
            <a role="menuitem" onClick={() => { navigate('/projects'); setMenuOpen(false) }} className={location.pathname === '/projects' ? 'active' : ''} tabIndex={0}>
              Projects
            </a>
          </li>
        </ul>
        <button className="nav-cta" onClick={() => scrollTo('Contact')}>
          Let's Talk
        </button>
      </div>
    </nav>
  )
}
