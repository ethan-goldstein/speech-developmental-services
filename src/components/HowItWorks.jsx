import { steps, settings, site } from '../content/data'
import Icon from './Icons'
import Reveal from './Reveal'
import { scrollToId } from '../lib/scroll'

export default function HowItWorks() {
  return (
    <section className="section how" id="how-it-works">
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Evaluation &amp; Therapy</p>
          <h2 className="section-title">Care in the setting that works best for your family.</h2>
          <p className="section-lede">
            Therapy services are offered in our clinic, in the community, or through
            secure telehealth. Our practice is based in {site.base}, with telehealth
            available in {site.telehealthStates}.
          </p>
        </Reveal>

        <div className="settings-row">
          {settings.map((s, i) => (
            <Reveal key={s.title} delay={0.07 * i} className="setting-chip">
              <Icon name={s.icon} size={22} />
              <div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="steps">
          <Reveal>
            <h3 className="steps-heading">How does it work?</h3>
          </Reveal>
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={0.05} className="step">
              <span className="step-n">{step.n}</span>
              <div className="step-body">
                <h4>{step.title}</h4>
                <p>{step.text}</p>
                {i === 0 && (
                  <button className="btn btn--primary" onClick={() => scrollToId('contact')}>
                    Schedule Yours — It’s Free
                  </button>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
