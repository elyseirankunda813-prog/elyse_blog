const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'A full-featured online store with product catalog, shopping cart, secure checkout via Stripe, and an admin dashboard for managing inventory and orders.',
    tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    color: '#ffffff',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
  },
  {
    title: 'Task Manager Pro',
    desc: 'A collaborative project management tool with real-time updates using Socket.io, drag-and-drop Kanban boards, team chat, and deadline tracking.',
    tags: ['Next.js', 'Socket.io', 'PostgreSQL', 'Redis'],
    color: '#cccccc',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
  },
  {
    title: 'Weather Dashboard',
    desc: 'An interactive weather forecasting app with 7-day forecasts, radar maps using Mapbox, location-based alerts, and beautiful D3.js data visualizations.',
    tags: ['React', 'D3.js', 'OpenWeather API', 'Mapbox'],
    color: '#999999',
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
  },
  {
    title: 'Mobile Banking App',
    desc: 'A cross-platform mobile banking application built with Flutter, featuring transaction history, QR code payments, and biometric authentication.',
    tags: ['Flutter', 'Firebase', 'REST API', 'Kotlin'],
    color: '#aaaaaa',
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
  },
  {
    title: 'Blog Platform',
    desc: 'A full-stack blog platform with markdown editor, user authentication, comments system, and SEO optimization built from scratch.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind'],
    color: '#bbbbbb',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=600&h=400&fit=crop',
  },
  {
    title: 'Real-Time Chat App',
    desc: 'A real-time messaging application with end-to-end encryption, file sharing, group chats, and online status indicators.',
    tags: ['React', 'Socket.io', 'Node.js', 'Redis'],
    color: '#dddddd',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=600&h=400&fit=crop',
  },
]

import { lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="tets" /></Suspense></div>
      <div className="projects-header">
        <span className="section-label">Projects</span>
        <h2 className="section-title">What I've Built</h2>
        <p className="projects-subtitle">
          A selection of projects that showcase my skills and passion for building
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div className="project-card stagger-item" style={{ '--i': i }} key={i}>
            <div className="project-card-bg" style={{ '--card-color': p.color }} />
            <div className="project-image">
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className="project-body">
              <div className="project-num">0{i + 1}</div>
              <h3 className="project-title">{p.title}</h3>
              <p className="project-desc">{p.desc}</p>
              <ul className="project-tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <div className="project-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
