import { useRef, useState, useCallback } from 'react'

export default function TiltCard({ children, className = '', maxTilt = 10 }) {
  const ref = useRef(null)
  const [style, setStyle] = useState({})

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`,
      transition: 'transform 0.1s ease-out',
    })
  }, [maxTilt])

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out',
    })
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}
