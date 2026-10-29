import { Container, LinkButton } from './ui'
import { HeroVisual } from './HeroVisual'

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="pt-10 pb-20 sm:pt-16 lg:pt-20 lg:pb-28">
      <Container className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="text-[0.95rem] font-medium text-accent">Workspan Global</p>
          <h1
            id="hero-title"
            className="mt-4 text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[4.4rem]"
          >
            Creative Talent.
            <br />
            Global Possibilities.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate sm:text-[1.2rem]">
            Workspan Global helps businesses bring their ideas to life with dependable design, content and
            digital services. We bring in skilled independent professionals and manage the engagement for
            you, so you get flexible creative support through one accountable partner.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#contact">Let's Work Together</LinkButton>
            <LinkButton href="#services" variant="secondary">
              Explore Our Services
            </LinkButton>
          </div>
          <p className="mt-8 max-w-md text-[0.94rem] leading-relaxed text-slate">
            Based in India, working with businesses in the United States and other international markets.
          </p>
        </div>

        <div className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
          <HeroVisual />
        </div>
      </Container>
    </section>
  )
}
