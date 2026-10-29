import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'light' | 'ghost-light'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-white hover:bg-accent-deep',
  secondary: 'border border-ink/20 bg-white text-ink hover:border-ink/50 hover:bg-mist',
  light: 'bg-white text-ink hover:bg-accent-soft',
  'ghost-light': 'border border-white/30 text-white hover:border-white/70 hover:bg-white/5',
}

export const buttonClass = (variant: Variant = 'primary', extra = '') =>
  `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.95rem] font-semibold leading-none transition-colors duration-150 ${variants[variant]} ${extra}`

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  children: ReactNode
}

/** A link styled as a button. Used for every call to action, since each one goes somewhere on the page. */
export function LinkButton({ variant = 'primary', className = '', children, ...rest }: LinkButtonProps) {
  return (
    <a className={buttonClass(variant, className)} {...rest}>
      {children}
    </a>
  )
}

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
}

type SectionHeadingProps = {
  id: string
  title: string
  intro?: ReactNode
  tone?: 'default' | 'dark'
  className?: string
}

export function SectionHeading({ id, title, intro, tone = 'default', className = '' }: SectionHeadingProps) {
  const dark = tone === 'dark'
  return (
    <div className={`max-w-2xl ${className}`}>
      <h2
        id={id}
        className={`text-3xl font-semibold tracking-[-0.02em] sm:text-[2.5rem] sm:leading-[1.1] ${dark ? 'text-white' : ''}`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? 'text-white/75' : 'text-slate'}`}>{intro}</p>
      )}
    </div>
  )
}
