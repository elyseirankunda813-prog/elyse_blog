import { useState, useEffect } from 'react'
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
      const offsets = links.map((id) => {
        const el = document.getElementById(id.toLowerCase())
        return { id, top: el?.offsetTop ?? 0 }
      })
      const scrollY = window.scrollY + 120
      const current = [...offsets].reverse().find((s) => scrollY >= s.top)
      setActive(current?.id ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location])

  const scrollTo = (id) => {
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
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <span className="nav-logo" onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
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
        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <li key={link}>
              <a onClick={() => scrollTo(link)} className={active === link ? 'active' : ''}>
                {link}
              </a>
            </li>
          ))}
          <li>
            <a onClick={() => { navigate('/projects'); setMenuOpen(false) }} className={location.pathname === '/projects' ? 'active' : ''}>
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
