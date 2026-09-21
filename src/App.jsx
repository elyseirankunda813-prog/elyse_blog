import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Reveal from './components/Reveal'

const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const GuestBookPage = lazy(() => import('./pages/GuestBookPage'))
const PlaygroundPage = lazy(() => import('./pages/PlaygroundPage'))

function Home() {
  return (
    <>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><Skills /></Reveal>
      <Reveal><Contact /></Reveal>
    </>
  )
}

export default function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/guestbook" element={<GuestBookPage />} />
            <Route path="/playground" element={<PlaygroundPage />} />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <div className="footer-inner">
          <p className="footer-copy">&copy; 2026 Elyse</p>
          <div className="footer-social" role="list" aria-label="Social links">
            <a href="https://github.com/elyseirankunda/" target="_blank" rel="noreferrer" role="listitem">GitHub</a>
            <a href="https://www.linkedin.com/in/irankunda-elyse-753156421/" target="_blank" rel="noreferrer" role="listitem">LinkedIn</a>
            <a href="mailto:elyseirankunda813@gmail.com" role="listitem">Email</a>
          </div>
        </div>
      </footer>
    </>
  )
}
