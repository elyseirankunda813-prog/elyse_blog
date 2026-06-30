const testimonials = [
  {
    name: 'Alice Mugisha',
    role: 'CEO, Tech Innovators Rwanda',
    text: 'Elyse is one of the most dedicated developers I\'ve had the pleasure of working with. His attention to detail and ability to solve complex problems sets him apart. Any team would be lucky to have him.',
  },
  {
    name: 'Bob Habimana',
    role: 'Senior Developer, Digital Solutions Ltd',
    text: 'I mentored Elyse during his time at Digital Solutions and watched him grow from a junior developer into someone who can confidently architect and build full-stack applications. His hunger for learning is unmatched.',
  },
  {
    name: 'Catherine Uwimana',
    role: 'Client, E-Commerce Project',
    text: 'Working with Elyse was an absolute pleasure. He understood our requirements perfectly and delivered a platform that exceeded our expectations. Highly recommended for any web development project.',
  },
]

import { lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="spheres" opacity={0.25} /></Suspense></div>
      <div className="testimonials-header">
        <span className="section-label">Testimonials</span>
        <h2 className="section-title">What People Say</h2>
      </div>
      <div className="testimonials-grid">
        {testimonials.map((t, i) => (
          <div className="testimonial-card stagger-item" style={{ '--i': i }} key={i}>
            <div className="testimonial-quote">"</div>
            <p className="testimonial-text">{t.text}</p>
            <div className="testimonial-author">
              <div className="testimonial-avatar">{t.name.charAt(0)}</div>
              <div>
                <div className="testimonial-name">{t.name}</div>
                <div className="testimonial-role">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
