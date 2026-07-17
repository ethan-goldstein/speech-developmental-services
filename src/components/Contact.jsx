import { useState } from 'react'
import { site, socials } from '../content/data'
import Icon from './Icons'
import Reveal from './Reveal'

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — the mailto link still works */
    }
  }

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <Reveal className="contact-panel" three>
          <div className="contact-aurora" aria-hidden="true" />
          <p className="section-eyebrow section-eyebrow--light">Contact</p>
          <h2 className="contact-title">
            Interested in helping
            <br />
            your child <em>flourish?</em>
          </h2>
          <p className="contact-sub">
            Reach out directly by email or phone to schedule your free 15-minute
            consultation.
          </p>

          <div className="contact-actions">
            <div className="contact-mail-row">
              <a className="contact-mail" href={`mailto:${site.email}`}>
                <Icon name="mail" size={22} />
                {site.email}
              </a>
              <button
                className={`contact-copy ${copied ? 'is-copied' : ''}`}
                onClick={copyEmail}
                aria-label="Copy email address"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <a className="contact-phone" href={site.phoneHref}>
              <Icon name="phone" size={18} />
              {site.phone}
            </a>
          </div>

          <div className="contact-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="contact-social"
                aria-label={s.label}
                title={`${s.label} — ${s.handle}`}
              >
                <Icon name={s.icon} size={21} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
