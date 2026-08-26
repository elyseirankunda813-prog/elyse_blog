import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'
import ProjectsPage from './pages/ProjectsPage'
import Reveal from './components/Reveal'

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
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </main>
      <footer>
        <div className="footer-inner">
          <p className="footer-copy">&copy; 2026 Elyse</p>
          <div className="footer-social">
            <a href="https://github.com/elyseirankunda/" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/irankunda-elyse-753156421/" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:elyseirankunda468@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </>
  )
}
