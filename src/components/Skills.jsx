const skills = [
  { name: 'JavaScript', category: 'Languages' },
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'PHP', category: 'Backend' },
  { name: 'Laravel', category: 'Backend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'MySQL', category: 'Backend' },
  { name: 'HTML', category: 'Languages' },
  { name: 'CSS', category: 'Languages' },
  { name: 'Git', category: 'Tools' },
]

const categories = [...new Set(skills.map((s) => s.category))]

export default function Skills() {
  return (
    <section id="skills" className="skills">
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto' }}>
        <span className="section-label">Skills</span>
        <h2 className="section-title">My Stack</h2>
        <p className="section-subtitle">
          Technologies I work with to build digital products
        </p>
      </div>
      <div className="skills-grid">
        {categories.map((cat) => (
          <div className="skill-category" key={cat}>
            <h3 className="skill-cat-title">{cat}</h3>
            <div className="skill-list">
              {skills.filter((s) => s.category === cat).map((skill) => (
                <span className="skill-tag" key={skill.name}>{skill.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
