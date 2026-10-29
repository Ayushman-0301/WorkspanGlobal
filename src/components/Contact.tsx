import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { company, isPlaceholder } from '../config/site'
import { Container, SectionHeading } from './ui'
import { ContactForm } from './ContactForm'

function DetailRow({ icon: Icon, label, value, href }: { icon: LucideIcon; label: string; value: string; href?: string }) {
  // Placeholder values are shown as plain text so they can't become broken links.
  const linkable = href && !isPlaceholder(value)
  return (
    <div className="flex gap-4 py-5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-accent ring-1 ring-line">
        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <dt className="text-[0.9rem] text-slate">{label}</dt>
        <dd className="mt-0.5 font-medium break-words text-ink">
          {linkable ? (
            <a href={href} className="underline decoration-line underline-offset-4 hover:decoration-accent">
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-mist py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            title="Let’s talk about your project"
            intro="Tell us what you need and we’ll get back to you to discuss requirements, scope and next steps."
          />
          <dl className="mt-8 divide-y divide-line border-y border-line">
            <DetailRow icon={Building2} label="Company" value={company.legalName} />
            <DetailRow icon={Mail} label="Email" value={company.email} href={`mailto:${company.email}`} />
            <DetailRow
              icon={Phone}
              label="Phone"
              value={company.phone}
              href={`tel:${company.phone.replace(/[^\d+]/g, '')}`}
            />
            <DetailRow icon={MapPin} label="Address" value={company.address} />
          </dl>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </Container>
    </section>
  )
}
