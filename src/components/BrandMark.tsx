/** Simple brand mark: two points joined by a span. Mirrors the favicon. */
export function BrandMark({ className = '', inverted = false }: { className?: string; inverted?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" fill={inverted ? '#ffffff' : '#15233f'} />
      <path
        d="M14 40 C 22 18, 42 18, 50 40"
        fill="none"
        stroke={inverted ? '#2e6b6a' : '#8fc0bc'}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <circle cx="14" cy="40" r="5" fill={inverted ? '#15233f' : '#ffffff'} />
      <circle cx="50" cy="40" r="5" fill={inverted ? '#15233f' : '#ffffff'} />
    </svg>
  )
}

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <BrandMark className="h-8 w-8 shrink-0" inverted={inverted} />
      <span
        className={`whitespace-nowrap text-[1.05rem] font-semibold tracking-[-0.01em] ${inverted ? 'text-white' : 'text-ink'}`}
      >
        Workspan <span className={inverted ? 'text-white/70' : 'text-slate'}>Global</span>
      </span>
    </span>
  )
}
