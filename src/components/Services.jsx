import { services } from '../content/data'
import Icon from './Icons'
import Reveal from './Reveal'

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <Reveal>
          <p className="section-eyebrow">Areas of Support</p>
          <h2 className="section-title">
            Support for every kind
            <br />
            of communicator.
          </h2>
        </Reveal>

        <div className="services-grid">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={0.06 * (i % 3)} className="service-card">
              <span className="service-icon">
                <Icon name={s.icon} size={26} />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
