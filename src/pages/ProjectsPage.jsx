import { Link } from 'react-router-dom'
import Projects from '../components/Projects'

export default function ProjectsPage() {
  return (
    <div className="projects-page">
      <div className="projects-page-top">
        <Link to="/" className="projects-back" aria-label="Back to homepage">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          Back to Home
        </Link>
      </div>
      <Projects />
    </div>
  )
}
