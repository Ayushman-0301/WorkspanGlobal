import { company, isPlaceholder } from '../config/site'
import { Container } from './ui'
import { Wordmark } from './BrandMark'

const quickLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'What We Do' },
  { href: '#contact', label: 'Contact Us' },
]

function ContactValue({ value, href }: { value: string; href: string }) {
  if (isPlaceholder(value)) return <span>{value}</span>
  return (
    <a href={href} className="hover:text-white">
      {value}
    </a>
  )
}

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="on-dark bg-ink text-white/70">
      <Container className="grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark inverted />
          <p className="mt-5 max-w-sm leading-relaxed">
            Design, content and digital services for international businesses, delivered through flexible,
            professionally managed engagements.
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <h2 className="text-[0.95rem] font-semibold text-white">Quick links</h2>
          <ul className="mt-4 space-y-2.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="text-[0.95rem] font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-2.5 break-words">
            <li>
              <ContactValue value={company.email} href={`mailto:${company.email}`} />
            </li>
            <li>
              <ContactValue value={company.phone} href={`tel:${company.phone.replace(/[^\d+]/g, '')}`} />
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-3 py-6 text-[0.9rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <a href={company.privacyPolicyUrl} className="underline-offset-4 hover:text-white hover:underline">
            Privacy Policy
          </a>
        </Container>
      </div>
    </footer>
  )
}
