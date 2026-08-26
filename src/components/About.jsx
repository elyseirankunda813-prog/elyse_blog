export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-inner">
        <div className="about-text">
          <span className="section-label">About</span>
          <h2 className="section-title">A bit about me</h2>
          <p>
            I'm a software developer based in Kigali, Rwanda, passionate about
            crafting clean, functional digital experiences — from responsive
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
            <div>
              <div className="stat-num">10+</div>
              <div className="stat-label">Technologies</div>
            </div>
            <div>
              <div className="stat-num">3+</div>
              <div className="stat-label">Years Coding</div>
            </div>
            <div>
              <div className="stat-num">15+</div>
              <div className="stat-label">Projects</div>
            </div>
          </div>
        </div>
        <div className="about-visual">
          <div className="about-card">
            <span className="about-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </span>
            <div>
              <div className="about-card-label">Location</div>
              <div className="about-card-value">Kigali, Rwanda</div>
            </div>
          </div>
          <div className="about-card">
            <span className="about-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
            </span>
            <div>
              <div className="about-card-label">Education</div>
              <div className="about-card-value">Software Development L4</div>
            </div>
          </div>
          <div className="about-card">
            <span className="about-card-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </span>
            <div>
              <div className="about-card-label">Role</div>
              <div className="about-card-value">Full-Stack Developer</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
