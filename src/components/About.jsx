import { lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="cubes" /></Suspense></div>
      <div className="about-inner">
        <div className="about-visual">
          <div className="about-info-cards">
            <div className="info-card">
              <span className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <div>
                <div className="info-label">Location</div>
                <span className="info-value">Kigali, Rwanda</span>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
              </span>
              <div>
                <div className="info-label">Education</div>
                <span className="info-value">Software Development L4</span>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              </span>
              <div>
                <div className="info-label">Role</div>
                <span className="info-value">Full-Stack Developer</span>
              </div>
            </div>
          </div>
        </div>
        <div className="about-text">
          <span className="section-label">About</span>
          <h2 className="section-title">
            Turning ideas into <span className="text-outline">code</span>
          </h2>
          <p>
            I'm a Level 4 Software Development student based in Kigali, Rwanda, passionate
            about crafting clean, functional digital experiences — from responsive
            websites to cross-platform mobile apps.
          </p>
          <p>
            My journey into tech started with curiosity about how websites work,
            which quickly turned into a full-blown passion for software development.
            I specialize in building full-stack applications using modern frameworks
            and tools, and I'm always eager to learn new technologies.
          </p>
          <p>
            When I'm not coding, you'll find me exploring new tech, contributing to
            open source projects, or enjoying a good cup of Rwandan coffee.
          </p>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat">
              <span className="stat-num">3+</span>
              <span className="stat-label">Years Coding</span>
            </div>
            <div className="stat">
              <span className="stat-num">15+</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Coffee Cups</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
