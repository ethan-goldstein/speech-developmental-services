/* Minimal line icon set, 24x24 — single-weight strokes, no ornament. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ICONS = {
  chat: (
    <g {...base}>
      <path d="M4 7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3h-7l-4.5 4v-4H7a3 3 0 0 1-3-3Z" />
    </g>
  ),
  people: (
    <g {...base}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c1-3.6 3.5-5.2 6.5-5.2s5.5 1.6 6.5 5.2" />
    </g>
  ),
  sound: (
    <g {...base}>
      <path d="M8 9.5a4.2 4.2 0 0 1 0 5" />
      <path d="M12 7.5a7.5 7.5 0 0 1 0 9" />
      <path d="M16 5.5a11 11 0 0 1 0 13" />
    </g>
  ),
  wave: (
    <g {...base}>
      <path d="M3 12c2.5-6 5-6 7.5 0s5 6 7.5 0" />
    </g>
  ),
  tablet: (
    <g {...base}>
      <rect x="5" y="3.5" width="14" height="17" rx="3" />
      <path d="M9.5 16.5h5" />
    </g>
  ),
  puzzle: (
    <g {...base}>
      <path d="M9 4H6.5A2.5 2.5 0 0 0 4 6.5V9" />
      <path d="M15 4h2.5A2.5 2.5 0 0 1 20 6.5V9" />
      <path d="M9 20H6.5A2.5 2.5 0 0 1 4 17.5V15" />
      <path d="M15 20h2.5a2.5 2.5 0 0 0 2.5-2.5V15" />
    </g>
  ),
  video: (
    <g {...base}>
      <rect x="3.5" y="6.5" width="12" height="11" rx="2.5" />
      <path d="m15.5 11 5-3v8l-5-3" />
    </g>
  ),
  building: (
    <g {...base}>
      <path d="M5 20V6.5L12 3.5l7 3V20" />
      <path d="M4 20h16" />
      <path d="M10 20v-4.5h4V20" />
    </g>
  ),
  tree: (
    <g {...base}>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M12 14.5V20" />
    </g>
  ),
  laptop: (
    <g {...base}>
      <rect x="5" y="6" width="14" height="9.5" rx="1.8" />
      <path d="M3 18.5h18" />
    </g>
  ),
  target: (
    <g {...base}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </g>
  ),
  home: (
    <g {...base}>
      <path d="m4 11.5 8-7 8 7" />
      <path d="M6.5 9.5V19h11V9.5" />
    </g>
  ),
  heart: (
    <g {...base}>
      <path d="M12 19.5S5.2 15.1 3.9 11.2A4.6 4.6 0 0 1 12 7.6a4.6 4.6 0 0 1 8.1 3.6C18.8 15.1 12 19.5 12 19.5Z" />
    </g>
  ),
  mail: (
    <g {...base}>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
      <path d="m4.5 7.5 7.5 5.5 7.5-5.5" />
    </g>
  ),
  phone: (
    <g {...base}>
      <path d="M7.2 3.8 9 3.2c.6-.2 1.2.1 1.5.7l1.1 2.6c.2.6.1 1.2-.4 1.6L9.9 9.3a12.6 12.6 0 0 0 4.8 4.8l1.2-1.3c.4-.5 1-.6 1.6-.4l2.6 1.1c.6.3.9.9.7 1.5l-.6 1.8c-.3.9-1.1 1.5-2 1.4C11.3 19.5 4.5 12.7 3.8 5.8c-.1-.9.5-1.7 1.4-2h2Z" />
    </g>
  ),
  arrow: (
    <g {...base}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </g>
  ),
  instagram: (
    <g {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </g>
  ),
  linkedin: (
    <g fill="currentColor" stroke="none">
      <path d="M4.5 9.3h3.2V19H4.5zM6.1 4.7a1.85 1.85 0 1 1 0 3.7 1.85 1.85 0 0 1 0-3.7ZM9.8 9.3h3v1.4h.05c.42-.8 1.46-1.63 3-1.63 3.2 0 3.8 2.1 3.8 4.9V19h-3.2v-4.4c0-1.05-.02-2.4-1.47-2.4-1.47 0-1.7 1.14-1.7 2.32V19H9.8z" />
    </g>
  ),
  facebook: (
    <g fill="currentColor" stroke="none">
      <path d="M13.6 20v-7h2.35l.35-2.75H13.6V8.5c0-.8.22-1.34 1.36-1.34h1.44V4.7c-.25-.03-1.1-.1-2.1-.1-2.1 0-3.5 1.27-3.5 3.6v2.05H8.5V13h2.3v7h2.8Z" />
    </g>
  ),
}

export default function Icon({ name, size = 24, className = '' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  )
}
