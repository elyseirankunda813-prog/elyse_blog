import useReveal from '../hooks/useReveal'

const directions = {
  up: 'reveal-up',
  down: 'reveal-down',
  left: 'reveal-left',
  right: 'reveal-right',
}

export default function Reveal({ children, direction = 'up', className = '' }) {
  const ref = useReveal()

  return (
    <div ref={ref} className={`reveal ${directions[direction]} ${className}`}>
      {children}
    </div>
  )
}
