import { Container, SectionHeading } from './ui'

const principles = [
  {
    title: 'Flexible engagements',
    text: 'Services are structured around your requirements, whether that is a single project or ongoing support.',
  },
  {
    title: 'Skilled professionals',
    text: 'Access to independent professionals with relevant creative and digital expertise.',
  },
  {
    title: 'Simplified coordination',
    text: 'One contractual business partner for the services covered by your engagement, instead of several separate providers.',
  },
  {
    title: 'Collaborative delivery',
    text: 'An emphasis on communication, clear expectations and working towards agreed deliverables.',
  },
]

const steps = [
  { title: 'Tell us what you need', text: 'Share your project, goals and timeline through the enquiry form.' },
  { title: 'Agree the scope', text: 'We confirm the services, deliverables and terms in a service agreement.' },
  {
    title: 'We deliver and coordinate',
    text: 'Professionals we engage carry out the work, and we manage the engagement with you.',
  },
]

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="on-dark bg-ink py-20 text-white lg:py-28">
      <Container>
        <SectionHeading
          id="why-title"
          tone="dark"
          title="Why Workspan Global?"
          intro="A simple way to get dependable creative and digital support, without managing a roster of individual providers."
        />

        <dl className="mt-14 grid gap-x-12 sm:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="border-t border-white/15 py-7">
              <dt className="text-[1.2rem] font-semibold tracking-[-0.01em] text-white">{p.title}</dt>
              <dd className="mt-2 max-w-md leading-relaxed text-white/70">{p.text}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-14 rounded-2xl border border-white/15 p-7 sm:p-9">
          <h3 className="text-[1.2rem] font-semibold text-white">How an engagement works</h3>
          <ol className="mt-7 grid gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-light/60 text-[0.9rem] font-semibold text-accent-light"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-white">{s.title}</p>
                  <p className="mt-1 leading-relaxed text-white/70">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  )
}
