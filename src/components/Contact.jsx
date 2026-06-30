import { useState, lazy, Suspense } from 'react'
const SectionScene = lazy(() => import('./SectionScene'))

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="contact">
      <div className="section-bg"><Suspense fallback={null}><SectionScene variant="dots" /></Suspense></div>
      <div className="contact-inner">
        <div className="contact-header">
          <span className="section-label">Contact</span>
          <h2 className="section-title">Let's Talk</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <p className="contact-text">
              Have a project in mind, a question, or just want to say hi?
              I'm always open to new opportunities and conversations.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <span className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                </span>
                <div>
                  <div className="detail-label">Email</div>
                  <a href="mailto:elyseirankunda@gmail.com">elyseirankunda@gmail.com</a>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </span>
                <div>
                  <div className="detail-label">Location</div>
                  <span>Kigali, Rwanda</span>
                </div>
              </div>
              <div className="contact-detail">
                <span className="detail-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div>
                  <div className="detail-label">Phone</div>
                  <span>+250 795 562 383</span>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <a href="#" target="_blank" rel="noreferrer">GitHub</a>
              <a href="#" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="#" target="_blank" rel="noreferrer">Twitter</a>
              <a href="#" target="_blank" rel="noreferrer">Dev.to</a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="input-group">
                <input type="text" id="name" required />
                <label htmlFor="name">Your Name</label>
              </div>
              <div className="input-group">
                <input type="email" id="email" required />
                <label htmlFor="email">Your Email</label>
              </div>
            </div>
            <div className="input-group">
              <input type="text" id="subject" required />
              <label htmlFor="subject">Subject</label>
            </div>
            <div className="input-group">
              <textarea id="message" rows="5" required />
              <label htmlFor="message">Message</label>
            </div>
            <button type="submit" className={`btn btn-primary ${sent ? 'sent' : ''}`}>
              {sent ? 'Sent! ✓' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
