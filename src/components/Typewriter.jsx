import { useState, useEffect, useRef } from 'react'

export default function Typewriter({ text, speed = 80, deleteSpeed = 30, delay = 300, pauseTime = 2000 }) {
  const [displayed, setDisplayed] = useState('')
  const idx = useRef(0)
  const dir = useRef(1)
  const timer = useRef(null)

  useEffect(() => {
    const start = setTimeout(() => {
      const tick = () => {
        const next = idx.current + dir.current
        if (next >= 0 && next <= text.length) {
          idx.current = next
          setDisplayed(text.slice(0, idx.current))
        }

        const atEnd = idx.current === text.length && dir.current === 1
        const atStart = idx.current === 0 && dir.current === -1

        if (atEnd || atStart) {
          dir.current *= -1
          timer.current = setTimeout(tick, atEnd ? pauseTime : delay)
        } else {
          timer.current = setTimeout(tick, dir.current === 1 ? speed : deleteSpeed)
        }
      }

      tick()
    }, delay)

    return () => {
      clearTimeout(start)
      clearTimeout(timer.current)
    }
  }, [text, speed, deleteSpeed, delay, pauseTime])

  const done = displayed.length === text.length

  return (
    <span className="typewriter">
      {displayed}
      <span className={`typewriter-cursor ${done ? 'done' : ''}`}>|</span>
    </span>
  )
}
