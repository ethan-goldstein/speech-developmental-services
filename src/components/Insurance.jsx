import { insurers, legal } from '../content/data'
import Reveal from './Reveal'
import { scrollToId } from '../lib/scroll'

export default function Insurance() {
  return (
    <section className="section insurance" id="insurance">
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Insurance &amp; Cost</p>
          <h2 className="section-title">Insurances accepted.</h2>
        </Reveal>

        <div className="insurer-grid">
          {insurers.map((ins, i) => (
            <Reveal key={ins.name} delay={0.045 * i} className="insurer-badge">
              <span className="insurer-dot" style={{ '--dot-brand': ins.color }} aria-hidden="true" />
              {ins.name}
            </Reveal>
          ))}
        </div>

        <div className="cost-cards">
          <Reveal delay={0.1} className="cost-card" three>
            <h3>Private Pay</h3>
            <p>
              Please contact for private pay rates and available payment options.
              Package pricing available upon request.
            </p>
            <button className="btn btn--ghost" onClick={() => scrollToId('contact')}>
              Ask About Rates
            </button>
          </Reveal>
          <Reveal delay={0.18} className="cost-card cost-card--legal" three>
            <h3>Good Faith Estimate</h3>
            <p>{legal.goodFaith}</p>
            <a className="text-link" href={legal.noSurprisesUrl} target="_blank" rel="noreferrer">
              Learn about the No Surprises Act ↗
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
