import { Check } from 'lucide-react'
import { services } from '../config/services'
import { Container, LinkButton, SectionHeading } from './ui'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-mist py-20 lg:py-28">
      <Container>
        <SectionHeading
          id="services-title"
          title="What we do"
          intro="Creative and digital support across five areas. Each engagement is scoped to what you need, so you can start with one service or combine several."
        />

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(({ id, title, summary, items, icon: Icon }) => (
            <li
              key={id}
              className="flex flex-col rounded-2xl border border-line bg-white p-7 shadow-[0_1px_2px_rgba(21,35,63,0.04)] transition-[border-color,box-shadow] duration-200 hover:border-ink/20 hover:shadow-[0_10px_30px_-16px_rgba(21,35,63,0.25)]"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ink text-accent-light">
                <Icon size={21} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-[1.2rem] leading-snug font-semibold tracking-[-0.01em]">{title}</h3>
              <p className="mt-2 leading-relaxed text-slate">{summary}</p>
              <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-[0.95rem]">
                {items.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check size={16} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}

          {/* Closing tile: the call to discuss requirements */}
          <li className="flex flex-col justify-between rounded-2xl bg-ink p-7 text-white on-dark">
            <div>
              <h3 className="text-[1.35rem] leading-snug font-semibold tracking-[-0.01em] text-white">
                Have something specific in mind?
              </h3>
              <p className="mt-3 leading-relaxed text-white/75">
                Tell us about your project and what you need from it. We'll talk through how we can help and
                how the engagement could be set up.
              </p>
            </div>
            <LinkButton href="#contact" variant="light" className="mt-8 self-start">
              Discuss your requirements
            </LinkButton>
          </li>
        </ul>
      </Container>
    </section>
  )
}
