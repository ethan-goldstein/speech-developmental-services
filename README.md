# Speech Developmental Services

Professional site for **Shana Kilcawley, CCC-SLP** — pediatric speech therapy in
Arlington, VA and by secure telehealth in VA, MD, DC, and FL.

**Live:** https://speechdservices.com (also at https://ethan-goldstein.github.io/speech-developmental-services/)

## Highlights

- **3D pen intro** — a custom stroke-font handwriting engine draws
  *"Speech Language Pathologist"* while a three.js fountain pen tracks the
  stroke tip in real time (skippable, reduced-motion aware, code-split so the
  main bundle stays light).
- Apple-style design: frosted-glass nav, pill buttons, scroll-driven reveals
  (Framer Motion) with Lenis smooth scrolling.
- Brand palette (periwinkle `#7E9FFF` on cream `#F8EFE6`) sampled directly
  from the SDS logo.

## Develop

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # production bundle in dist/
```

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages.

**Custom domain:** `speechdservices.com` (set in repo Pages settings +
`public/CNAME`). DNS at the registrar must have four apex A records
(185.199.108.153 / .109.153 / .110.153 / .111.153) and a `www` CNAME to
`ethan-goldstein.github.io`. The Vite base is relative (`./`), so no build
changes are needed.

## Booking form

"Book a Free Consultation" opens a two-step form (`#book`) whose answers are
emailed to Shana via [FormSubmit](https://formsubmit.co) — no backend needed.
**One-time setup:** the first submission triggers an activation email to
Shana@speechds.com; Shana must click the link once, after which all requests
land straight in her inbox. If FormSubmit's AJAX endpoint is bot-challenged,
the form falls back to a real POST (visitor passes the check, then returns to
the site's confirmation screen).

## Content

All copy, the headshot, and the logo come from the practice's intake PDF.
Update site text in `src/content/data.js`.

---

Site by [Ethan Goldstein](https://ethangoldstein.dev)
