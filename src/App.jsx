import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Testimonials from './components/Testimonials'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Reveal from './components/Reveal'
import Logo from './components/Logo'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Reveal direction="left"><About /></Reveal>
        <Reveal direction="up"><Experience /></Reveal>
        <Reveal direction="right"><Skills /></Reveal>
        <Reveal direction="up"><Projects /></Reveal>
        <Reveal direction="left"><Testimonials /></Reveal>
        <Reveal direction="right"><Blog /></Reveal>
        <Reveal direction="down"><Contact /></Reveal>
      </main>
      <footer>
        <div className="footer-content">
          <div className="footer-brand">
            <Logo size={40} />
            <p>Software Developer crafting digital experiences.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <a onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>About</a>
            <a onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>Projects</a>
            <a onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>Skills</a>
            <a onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Contact</a>
          </div>
          <div className="footer-social">
            <h4>Connect</h4>
            <a href="#" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noreferrer">Twitter</a>
            <a href="mailto:elyseirankunda@gmail.com" target="_blank" rel="noreferrer">Email</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2026 IRANKUNDA ELYSE. Built with React & Three.js</p>
        </div>
      </footer>
    </>
  )
}
