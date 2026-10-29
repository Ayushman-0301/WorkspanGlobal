import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { navLinks, type SectionId } from '../config/site'
import { Container, LinkButton } from './ui'
import { Wordmark } from './BrandMark'

/** Tracks which section is currently in view so the nav can mark it. */
function useActiveSection(): SectionId {
  const [active, setActive] = useState<SectionId>('home')

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id as SectionId)
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return active
}

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const active = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the mobile menu with Escape, and whenever the layout grows to desktop width.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => mq.matches && setOpen(false)
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open ? 'border-line bg-paper/95 backdrop-blur' : 'border-transparent bg-paper'
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-6">
        <a href="#home" className="rounded-md" aria-label="Workspan Global, back to top" onClick={close}>
          <Wordmark />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={`rounded-md px-3 py-2 text-[0.94rem] font-medium transition-colors ${
                    active === link.id ? 'text-ink' : 'text-slate hover:text-ink'
                  }`}
                >
                  <span
                    className={`border-b-2 pb-1 ${active === link.id ? 'border-accent' : 'border-transparent'}`}
                  >
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <LinkButton href="#contact" className="!px-4 !py-2.5" onClick={close}>
              Get in Touch
            </LinkButton>
          </span>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-mist lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div id="mobile-menu" hidden={!open} className="border-t border-line bg-paper lg:hidden">
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={close}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={`block rounded-md px-2 py-3 text-base font-medium ${
                      active === link.id ? 'text-ink' : 'text-slate hover:text-ink'
                    }`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <LinkButton href="#contact" onClick={close} className="mt-3 w-full sm:hidden">
            Get in Touch
          </LinkButton>
        </Container>
      </div>
    </header>
  )
}
