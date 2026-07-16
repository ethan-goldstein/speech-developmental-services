/* Thin-line icon set, 24x24, stroke-based — Apple SF Symbols flavor. */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

export const ICONS = {
  chat: (
    <g {...base}>
      <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h8A2.5 2.5 0 0 1 17 6.5v4a2.5 2.5 0 0 1-2.5 2.5H9l-3.4 2.6c-.4.3-.9 0-.9-.5V13" />
      <path d="M17.5 9H18a2.5 2.5 0 0 1 2.5 2.5v3A2.5 2.5 0 0 1 18 17h-.5v2.1c0 .5-.55.8-.95.5L14 17.5h-2" />
    </g>
  ),
  people: (
    <g {...base}>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M3 19c.4-3.2 2.6-5 5.5-5s5.1 1.8 5.5 5" />
      <path d="M15.5 5.4a3 3 0 0 1 0 5.2" />
      <path d="M17.3 14.3c2 .7 3.3 2.3 3.7 4.7" />
    </g>
  ),
  sound: (
    <g {...base}>
      <path d="M4 10v4h3l4 3.5v-11L7 10H4Z" />
      <path d="M14.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17 7a7 7 0 0 1 0 10" />
    </g>
  ),
  wave: (
    <g {...base}>
      <path d="M3 12c1.5 0 1.5-3.5 3-3.5S7.5 15 9 15s1.5-8 3-8 1.5 10 3 10 1.5-6.5 3-6.5 1.5 1.5 3 1.5" />
    </g>
  ),
  tablet: (
    <g {...base}>
      <rect x="4" y="3.5" width="16" height="17" rx="2.5" />
      <circle cx="8.7" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="9" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.3" cy="9" r="1" fill="currentColor" stroke="none" />
      <path d="M8 13.5h8M8 16.5h5" />
    </g>
  ),
  puzzle: (
    <g {...base}>
      <path d="M9.5 5.5a2 2 0 1 1 4 0H16a1.5 1.5 0 0 1 1.5 1.5v2.5a2 2 0 1 1 0 4V16a1.5 1.5 0 0 1-1.5 1.5h-2.5a2 2 0 1 0-4 0H7A1.5 1.5 0 0 1 5.5 16v-2.5a2 2 0 1 0 0-4V7A1.5 1.5 0 0 1 7 5.5h2.5Z" />
    </g>
  ),
  video: (
    <g {...base}>
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="m16 10.5 4.2-2.6c.4-.2.8 0 .8.5v7.2c0 .5-.4.7-.8.5L16 13.5" />
    </g>
  ),
  building: (
    <g {...base}>
      <path d="M5 20V6.5A1.5 1.5 0 0 1 6.5 5h7A1.5 1.5 0 0 1 15 6.5V20" />
      <path d="M15 9.5h3A1.5 1.5 0 0 1 19.5 11v9" />
      <path d="M3.5 20h17" />
      <path d="M8 8.5h4M8 11.5h4M8 14.5h4M10 20v-2.5" />
    </g>
  ),
  tree: (
    <g {...base}>
      <path d="M12 3.5 6.5 11h2.8L5 17h14l-4.3-6h2.8L12 3.5Z" />
      <path d="M12 17v3.5" />
    </g>
  ),
  laptop: (
    <g {...base}>
      <rect x="5" y="5.5" width="14" height="10" rx="1.8" />
      <path d="M3 18.5h18" />
      <path d="M9.5 10.7 12 8.9l2.5 1.8-1 2.8h-3l-1-2.8Z" fill="currentColor" stroke="none" opacity="0.9" />
    </g>
  ),
  mail: (
    <g {...base}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7.5 8 6 8-6" />
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
