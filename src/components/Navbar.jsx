import { useState, useEffect } from 'react'
import Logo from './Logo'

const sections = ['About', 'Experience', 'Projects', 'Skills', 'Testimonials', 'Contact']

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const offsets = sections.map((id) => {
        const el = document.getElementById(id.toLowerCase())
        return { id, top: el?.offsetTop ?? 0 }
      })
      const scrollY = window.scrollY + 120
      const current = [...offsets].reverse().find((s) => scrollY >= s.top)
      setActive(current?.id ?? '')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <span className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={32} />
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
          {sections.map((link) => (
            <li key={link}>
              <a onClick={() => scrollTo(link)} className={active === link ? 'active' : ''}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
