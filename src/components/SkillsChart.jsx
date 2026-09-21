import { useId } from 'react'

const RINGS = 4

function polar(cx, cy, radius, angle) {
  return [cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
}

export default function SkillsChart({ skills, selected, onSelect = () => {}, size = 500 }) {
  const titleId = useId()
  const count = skills.length
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 60

  const axes = skills.map((skill, i) => ({
    ...skill,
    angle: -Math.PI / 2 + (2 * Math.PI * i) / count,
  }))

  const ringPoints = (fraction) =>
    axes.map((a) => polar(cx, cy, radius * fraction, a.angle))

  const dataPoints = axes.map((a) =>
    polar(cx, cy, radius * (a.level / 100), a.angle),
  )

  const labelAnchor = (angle) => {
    const c = Math.cos(angle)
    return Math.abs(c) < 0.3 ? 'middle' : c > 0 ? 'start' : 'end'
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      className="skills-chart-svg"
      role="img"
      aria-labelledby={titleId}
    >
      <title id={titleId}>
        Radar chart showing self-assessed proficiency —{' '}
        {axes.map((a) => `${a.name} ${a.level}`).join(', ')}. Select a skill to
        see its description.
      </title>
      {Array.from({ length: RINGS }, (_, k) => (
        <polygon
          key={k}
          points={ringPoints((k + 1) / RINGS).map((p) => p.join(',')).join(' ')}
          fill="none"
          strokeWidth="1"
          style={{ stroke: 'var(--border)' }}
        />
      ))}
      {axes.map((a, i) => {
        const end = polar(cx, cy, radius, a.angle)
        const isSelected = a.name === selected
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={end[0]}
            y2={end[1]}
            strokeWidth={isSelected ? 1.5 : 1}
            style={{ stroke: isSelected ? 'var(--text)' : 'var(--border)' }}
          />
        )
      })}
      <polygon
        points={dataPoints.map((p) => p.join(',')).join(' ')}
        fillOpacity="0.12"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ fill: 'var(--text)', stroke: 'var(--text)' }}
      />
      {dataPoints.map((p, i) => {
        const isSelected = axes[i].name === selected
        return (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={isSelected ? 4.5 : 3} style={{ fill: 'var(--text)' }} />
            {isSelected && (
              <circle
                cx={p[0]}
                cy={p[1]}
                r={9}
                fill="none"
                strokeWidth="1"
                style={{ stroke: 'var(--text)' }}
              />
            )}
          </g>
        )
      })}
      {Array.from({ length: RINGS }, (_, k) => {
        const val = ((k + 1) * 100) / RINGS
        const p = polar(cx, cy, radius * ((k + 1) / RINGS), -Math.PI / 2)
        return (
          <text key={k} x={p[0] + 6} y={p[1] + 3} className="skills-chart-tick">
            {val}%
          </text>
        )
      })}
      {axes.map((a, i) => {
        const label = polar(cx, cy, radius + 26, a.angle)
        return (
          <g
            key={i}
            className={`skill-axis${a.name === selected ? ' is-selected' : ''}`}
            role="button"
            tabIndex="0"
            aria-pressed={a.name === selected}
            aria-label={`Select ${a.name} skill, level ${a.level}%`}
            onClick={() => onSelect(a.name)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onSelect(a.name)
              }
            }}
          >
            <circle cx={label[0]} cy={label[1]} r="26" fill="transparent" />
            <text
              x={label[0]}
              y={label[1]}
              dy="0.32em"
              textAnchor={labelAnchor(a.angle)}
            >
              {a.name}
            </text>
          </g>
        )
      })}
    </svg>
  )
}