import { useState } from 'react'
import SkillsChart from './SkillsChart'

const skills = [
  { name: 'HTML', category: 'Languages', level: 92, desc: 'Semantic markup that keeps pages structured, accessible and search-engine friendly.' },
  { name: 'CSS', category: 'Languages', level: 88, desc: 'Styling the web — responsive layouts, motion and polished design systems.' },
  { name: 'JavaScript', category: 'Languages', level: 90, desc: 'Core language for modern web apps, powering interactive UI logic and full-stack APIs.' },
  { name: 'React', category: 'Frontend', level: 88, desc: 'Component-based library for building fast, reusable and interactive interfaces.' },
  { name: 'Next.js', category: 'Frontend', level: 78, desc: 'Full-stack React framework with SSR and static generation for performance.' },
  { name: 'PHP', category: 'Backend', level: 80, desc: 'Server-side scripting for reliable, maintainable web backends.' },
  { name: 'Laravel', category: 'Backend', level: 75, desc: 'Elegant PHP framework for rapid, testable application development.' },
  { name: 'Node.js', category: 'Backend', level: 82, desc: 'JavaScript on the server for fast, event-driven APIs and tooling.' },
  { name: 'MySQL', category: 'Backend', level: 76, desc: 'Relational database design, modeling and optimization at scale.' },
  { name: 'Git', category: 'Tools', level: 85, desc: 'Version control for tracking changes, collaboration and confident shipping.' },
]

export default function Skills() {
  const [selectedName, setSelectedName] = useState(skills[0].name)
  const selected = skills.find((s) => s.name === selectedName) ?? skills[0]

  return (
    <section id="skills" className="skills" aria-label="Skills">
      <div className="skills-header">
        <span className="section-label">Skills</span>
        <h2 className="section-title">My Stack</h2>
        <p className="section-subtitle">
          Click a skill on the graph to learn more
        </p>
      </div>
      <div className="skills-inner">
        <div className="skills-chart">
          <SkillsChart
            skills={skills}
            selected={selected.name}
            onSelect={setSelectedName}
          />
        </div>
        <aside className="skill-panel" aria-label={`Details about ${selected.name}`}>
          <div className="skill-panel-body" key={selected.name}>
            <span className="skill-panel-cat">{selected.category}</span>
            <h3 className="skill-panel-name">{selected.name}</h3>
            <div className="skill-panel-level">
              <span className="skill-panel-level-label">Proficiency</span>
              <span className="skill-panel-level-value">{selected.level}%</span>
            </div>
            <div className="skill-panel-bar" aria-hidden="true">
              <div
                className="skill-panel-bar-inner"
                style={{ width: `${selected.level}%` }}
              />
            </div>
            <p className="skill-panel-desc" aria-live="polite">
              {selected.desc}
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}