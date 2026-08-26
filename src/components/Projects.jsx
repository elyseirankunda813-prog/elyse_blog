const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'A full-featured online store with product catalog, shopping cart, secure checkout via Stripe, and an admin dashboard for managing inventory and orders.',
    tags: ['react', 'node.js', 'stripe', 'mongodb'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'Task Manager Pro',
    desc: 'A collaborative project management tool with real-time updates, drag-and-drop Kanban boards, team chat, and deadline tracking.',
    tags: ['next.js', 'socket.io', 'postgresql', 'redis'],
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'Weather Dashboard',
    desc: 'An interactive weather forecasting app with 7-day forecasts, radar maps, location-based alerts, and beautiful data visualizations.',
    tags: ['react', 'd3.js', 'openweather api', 'mapbox'],
    image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop',
    link: '#',
  },
  {
    title: 'Mobile Banking App',
    desc: 'A cross-platform mobile banking application featuring transaction history, QR code payments, and biometric authentication.',
    tags: ['flutter', 'firebase', 'rest api', 'kotlin'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
    link: '#',
  },
]

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects-header">
        <span className="section-label">Projects</span>
        <h2 className="section-title">What I've Built</h2>
        <p className="section-subtitle">
          A selection of projects that showcase my skills and passion for building
        </p>
      </div>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <a href={p.link} className="project-card" key={i} target="_blank" rel="noreferrer">
            <div className="project-card-img">
              <img src={p.image} alt={p.title} loading="lazy" />
              <span className="project-card-num">0{i + 1}</span>
            </div>
            <div className="project-card-body">
              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-card-desc">{p.desc}</p>
              <ul className="project-card-tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <span className="project-card-link">
                View Project
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
