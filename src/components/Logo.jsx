export default function Logo({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
      <path d="M10 6 L10 26" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M10 9.5 L19 9.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M10 16 L22 16" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M10 22.5 L19 22.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M24 16 L25.5 14.5 L27 16 L25.5 17.5 Z" fill="currentColor" />
    </svg>
  )
}
