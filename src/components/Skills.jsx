const skillData = [
  { name: 'HTML & CSS', level: 92, category: 'Frontend' },
  { name: 'JavaScript', level: 88, category: 'Frontend' },
  { name: 'React.js', level: 85, category: 'Frontend' },
  { name: 'Next.js', level: 78, category: 'Frontend' },
  { name: 'PHP', level: 80, category: 'Backend' },
  { name: 'Node.js', level: 75, category: 'Backend' },
  { name: 'C', level: 70, category: 'Backend' },
  { name: 'C++', level: 65, category: 'Backend' },
  { name: 'Flutter', level: 72, category: 'Mobile' },
  { name: 'Kotlin', level: 68, category: 'Mobile' },
]

const categories = ['Frontend', 'Backend', 'Mobile']

import { lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="bars" /></Suspense></div>
      <div className="skills-header">
        <span className="section-label">Skills</span>
        <h2 className="section-title">My Stack</h2>
        <p className="skills-subtitle">
          Technologies I've been working with to build digital products
        </p>
      </div>
      <div className="skills-categories">
        {categories.map((cat) => (
          <div className="skill-category stagger-item" style={{ '--i': 0 }} key={cat}>
            <h3 className="skill-cat-title">{cat}</h3>
            {skillData.filter((s) => s.category === cat).map((skill, i) => (
              <div className="skill-bar-group stagger-item" style={{ '--i': i + 1 }} key={skill.name}>
                <div className="skill-bar-label">
                  <span>{skill.name}</span>
                  <span className="skill-bar-pct">{skill.level}%</span>
                </div>
                <div className="skill-bar-track">
                  <div className="skill-bar-fill" style={{ '--w': `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
