import { legal, site } from '../content/data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img
          src={`${import.meta.env.BASE_URL}logo.png`}
          alt={site.name}
          className="footer-logo"
        />
        <p className="footer-coi">
          <strong>Conflict of Interest Statement — </strong>
          {legal.conflictOfInterest}
        </p>
        <div className="footer-meta">
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="footer-dot" aria-hidden="true">·</span>
          <a href="https://ethangoldstein.dev" target="_blank" rel="noreferrer">
            Site by Ethan Goldstein
          </a>
        </div>
      </div>
    </footer>
  )
}
