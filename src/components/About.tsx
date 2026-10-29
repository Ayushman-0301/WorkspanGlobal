import { Layers, UserCheck, SlidersHorizontal, MessagesSquare, Handshake } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container, SectionHeading } from './ui'

const points: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Layers,
    title: 'One partner for many requirements',
    text: 'Design, writing and digital work handled through a single business relationship.',
  },
  {
    icon: UserCheck,
    title: 'Skilled independent professionals',
    text: 'We engage professionals whose skills match the work you need done.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Flexible arrangements',
    text: 'A one-off project or ongoing support, structured around your requirements.',
  },
  {
    icon: MessagesSquare,
    title: 'Clear communication',
    text: 'Agreed scope, straightforward updates and professional delivery.',
  },
  {
    icon: Handshake,
    title: 'Lasting relationships',
    text: 'We want to be the partner you come back to as your needs grow and change.',
  },
]

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line bg-white py-20 lg:py-28">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading id="about-title" title="One partner for your creative and content work" />
          <div className="mt-6 space-y-4 text-[1.06rem] leading-relaxed text-slate">
            <p>
              Workspan Global Private Limited is an India-based company providing design, content and
              digital services to businesses in the United States and other international markets.
            </p>
            <p>
              Instead of finding and coordinating several freelancers yourself, you agree the work with us.
              We engage independent professionals with the right skills to carry it out, and we remain your
              contractual service provider throughout.
            </p>
          </div>
        </div>

        <ul className="divide-y divide-line border-y border-line lg:col-span-7">
          {points.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-5 py-6">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[1.08rem] font-semibold">{title}</h3>
                <p className="mt-1 leading-relaxed text-slate">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
