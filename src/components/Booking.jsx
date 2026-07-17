import { useState } from 'react'
import { motion } from 'framer-motion'
import { site, bookingOptions } from '../content/data'
import Icon from './Icons'

const STEPS = ['Get Started', 'Your Details', 'Confirmation']

const initialForm = {
  service: '',
  who: '',
  state: '',
  insurance: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  message: '',
}

export default function Booking() {
  // #booked = returning from the form relay's redirect → show confirmation.
  const [step, setStep] = useState(window.location.hash === '#booked' ? 2 : 0)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }))
    setErrors((er) => ({ ...er, [key]: false }))
  }

  const validateStep1 = () => {
    const er = {}
    if (!form.service) er.service = true
    if (!form.who) er.who = true
    if (!form.state) er.state = true
    if (!form.insurance) er.insurance = true
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const validateStep2 = () => {
    const er = {}
    if (!form.firstName.trim()) er.firstName = true
    if (!form.lastName.trim()) er.lastName = true
    if (!form.phone.trim()) er.phone = true
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) er.email = true
    setErrors(er)
    return Object.keys(er).length === 0
  }

  const fields = () => ({
    'Service': form.service,
    'Who needs services': form.who,
    'State': form.state,
    'Insurance': form.insurance,
    'First name': form.firstName,
    'Last name': form.lastName,
    'Phone': form.phone,
    'Email': form.email,
    'Message': form.message || '—',
  })

  /* Fallback: a real top-level form POST to the relay. Unlike fetch, a full
     navigation can pass the relay's bot check interactively; it then
     redirects back to us at #booked, which renders the confirmation step. */
  const nativeSubmit = () => {
    const f = document.createElement('form')
    f.method = 'POST'
    f.action = `https://formsubmit.co/${site.email}`
    const returnUrl = `${window.location.origin}${window.location.pathname}#booked`
    const all = {
      ...fields(),
      _subject: `New consultation request — ${form.firstName} ${form.lastName}`,
      _template: 'table',
      _next: returnUrl,
    }
    for (const [name, value] of Object.entries(all)) {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = name
      input.value = value
      f.appendChild(input)
    }
    document.body.appendChild(f)
    f.submit()
  }

  const submit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    setSending(true)
    try {
      const controller = new AbortController()
      const timer = setTimeout(() => controller.abort(), 8000)
      const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          _subject: `New consultation request — ${form.firstName} ${form.lastName}`,
          _template: 'table',
          _captcha: 'false',
          ...fields(),
        }),
      })
      clearTimeout(timer)
      const data = await res.json().catch(() => ({}))
      if (!res.ok || String(data.success) === 'false') throw new Error('send failed')
      setStep(2)
      window.scrollTo(0, 0)
    } catch {
      // Relay unreachable via AJAX (e.g. bot-check challenge) — do the
      // real form POST instead; it returns to #booked on success.
      nativeSubmit()
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="booking">
      <header className="booking-bar">
        <a className="booking-brand" href="#top">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt={site.name} />
        </a>
        <a className="booking-back" href="#top">
          ← Back to site
        </a>
      </header>

      <motion.main
        className="booking-card"
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <ol className="booking-steps" aria-label="Booking progress">
          {STEPS.map((label, i) => (
            <li key={label} className={i === step ? 'is-active' : i < step ? 'is-done' : ''}>
              <span className="booking-step-n">{i < step ? '✓' : i + 1}</span>
              {label}
            </li>
          ))}
        </ol>

        {step === 0 && (
          <form
            className="booking-form"
            onSubmit={(e) => {
              e.preventDefault()
              if (validateStep1()) {
                setStep(1)
                window.scrollTo(0, 0)
              }
            }}
          >
            <h1 className="booking-title">Find your perfect therapist match</h1>
            <p className="booking-sub">
              {site.name} offers a free 15-minute consultation with {site.founder},{' '}
              {site.credentials}.
            </p>

            <fieldset className={`booking-field ${errors.service ? 'has-error' : ''}`}>
              <legend>What service are you looking for?</legend>
              <div className="booking-radios">
                {bookingOptions.services.map((s) => (
                  <label key={s} className={`booking-radio ${form.service === s ? 'is-selected' : ''}`}>
                    <input
                      type="radio"
                      name="service"
                      value={s}
                      checked={form.service === s}
                      onChange={set('service')}
                    />
                    <span className="booking-radio-dot" aria-hidden="true" />
                    {s}
                  </label>
                ))}
              </div>
              {errors.service && <p className="booking-error">Please choose a service.</p>}
            </fieldset>

            <div className={`booking-field ${errors.who ? 'has-error' : ''}`}>
              <label htmlFor="who">Who needs services?</label>
              <select id="who" value={form.who} onChange={set('who')}>
                <option value="" disabled>
                  Select an option
                </option>
                {bookingOptions.who.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              {errors.who && <p className="booking-error">Please select an option.</p>}
            </div>

            <div className={`booking-field ${errors.state ? 'has-error' : ''}`}>
              <label htmlFor="state">Select your state</label>
              <select id="state" value={form.state} onChange={set('state')}>
                <option value="" disabled>
                  Select an option
                </option>
                {bookingOptions.states.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              {errors.state && <p className="booking-error">Please select your state.</p>}
            </div>

            <div className={`booking-field ${errors.insurance ? 'has-error' : ''}`}>
              <label htmlFor="insurance">Choose your insurance (or pay privately)</label>
              <select id="insurance" value={form.insurance} onChange={set('insurance')}>
                <option value="" disabled>
                  Select an option
                </option>
                {bookingOptions.insurance.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              {errors.insurance && <p className="booking-error">Please select an option.</p>}
            </div>

            <button className="btn btn--primary btn--lg booking-continue" type="submit">
              Continue
            </button>
          </form>
        )}

        {step === 1 && (
          <form className="booking-form" onSubmit={submit}>
            <h1 className="booking-title">Your details</h1>
            <p className="booking-sub">
              Shana will use these to reach out and schedule your free consultation.
            </p>

            <div className="booking-row">
              <div className={`booking-field ${errors.firstName ? 'has-error' : ''}`}>
                <label htmlFor="firstName">First name</label>
                <input id="firstName" type="text" autoComplete="given-name" value={form.firstName} onChange={set('firstName')} />
                {errors.firstName && <p className="booking-error">Required.</p>}
              </div>
              <div className={`booking-field ${errors.lastName ? 'has-error' : ''}`}>
                <label htmlFor="lastName">Last name</label>
                <input id="lastName" type="text" autoComplete="family-name" value={form.lastName} onChange={set('lastName')} />
                {errors.lastName && <p className="booking-error">Required.</p>}
              </div>
            </div>

            <div className={`booking-field ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">Phone number</label>
              <input id="phone" type="tel" autoComplete="tel" value={form.phone} onChange={set('phone')} />
              {errors.phone && <p className="booking-error">Required.</p>}
            </div>

            <div className={`booking-field ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Email address</label>
              <input id="email" type="email" autoComplete="email" value={form.email} onChange={set('email')} />
              {errors.email && <p className="booking-error">Please enter a valid email.</p>}
            </div>

            <div className="booking-field">
              <label htmlFor="message">
                Anything you’d like Shana to know? <span className="booking-optional">(optional)</span>
              </label>
              <textarea id="message" rows="4" value={form.message} onChange={set('message')} />
            </div>

            <div className="booking-actions">
              <button type="button" className="btn btn--ghost" onClick={() => setStep(0)}>
                ← Back
              </button>
              <button className="btn btn--primary btn--lg" type="submit" disabled={sending}>
                {sending ? 'Sending…' : 'Send Booking Request'}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="booking-success">
            <span className="booking-success-icon" aria-hidden="true">
              <Icon name="mail" size={28} />
            </span>
            <h1 className="booking-title">Request sent!</h1>
            <p className="booking-sub">
              Thank you{form.firstName ? `, ${form.firstName}` : ''}. Your booking
              request is on its way to {site.founder} — she’ll reach out shortly to
              schedule your free 15-minute consultation.
            </p>
            <a className="btn btn--primary btn--lg" href="#top">
              Back to Site
            </a>
          </div>
        )}
      </motion.main>
    </div>
  )
}
