const experiences = [
  {
    role: 'Freelance Full-Stack Developer',
    company: 'Self-Employed',
    period: '2025 — Present',
    desc: [
      'Built and deployed 5+ full-stack web applications for local businesses in Rwanda',
      'Developed custom CMS solutions using React and Node.js',
      'Implemented responsive designs with modern CSS frameworks',
      'Managed client relationships and project timelines independently',
    ],
  },
  {
    role: 'Software Development Intern',
    company: 'Tech Innovators Rwanda',
    period: '2024 — 2025',
    desc: [
      'Assisted in building RESTful APIs using Node.js and Express',
      'Contributed to frontend development with React.js',
      'Participated in daily stand-ups and agile ceremonies',
      'Wrote unit tests and performed code reviews',
    ],
  },
  {
    role: 'Junior Web Developer',
    company: 'Digital Solutions Ltd',
    period: '2023 — 2024',
    desc: [
      'Developed and maintained responsive websites for various clients',
      'Worked with HTML, CSS, JavaScript, and PHP on a daily basis',
      'Collaborated with designers to implement pixel-perfect interfaces',
      'Optimized website performance and loading times',
    ],
  },
]

import { lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="rings" opacity={0.25} /></Suspense></div>
      <div className="experience-header">
        <span className="section-label">Experience</span>
        <h2 className="section-title">Where I've Worked</h2>
      </div>
      <div className="timeline">
        {experiences.map((exp, i) => (
          <div className="timeline-item stagger-item" style={{ '--i': i }} key={i}>
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="timeline-period">{exp.period}</div>
              <h3 className="timeline-role">{exp.role}</h3>
              <div className="timeline-company">{exp.company}</div>
              <ul className="timeline-desc">
                {exp.desc.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
