import { GitHubIcon, LinkedInIcon, EmailIcon } from './icons'
import ContactForm from './ContactForm'

export default function Contact() {
  return (
    <section id="contact" className="contact" aria-label="Contact">
      <div className="contact-inner">
        <span className="section-label">Contact</span>
        <h2 className="contact-statement">Let's build something useful.</h2>
        <div className="contact-links" role="list" aria-label="Contact options">
          <a href="mailto:elyseirankunda813@gmail.com" className="contact-link" role="listitem" aria-label="Send email">
            <EmailIcon />
            elyseirankunda813@gmail.com
          </a>
          <a href="https://github.com/elyseirankunda/" target="_blank" rel="noreferrer" className="contact-link" role="listitem" aria-label="GitHub profile">
            <GitHubIcon size={18} />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/irankunda-elyse-753156421/" target="_blank" rel="noreferrer" className="contact-link" role="listitem" aria-label="LinkedIn profile">
            <LinkedInIcon size={18} />
            LinkedIn
          </a>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
