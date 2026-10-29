import type { LucideIcon } from 'lucide-react'
import { Palette, PenLine, CalendarRange, MonitorSmartphone, Puzzle } from 'lucide-react'

/**
 * Service categories shown in "What We Do" and in the contact form's
 * "Service required" menu. Add, remove or reword entries here; the page updates itself.
 */
export type Service = {
  id: string
  title: string
  summary: string
  items: string[]
  icon: LucideIcon
}

export const services: Service[] = [
  {
    id: 'design',
    title: 'Graphic design and creative services',
    summary: 'Visual work that gives your brand a consistent, considered look wherever it appears.',
    icon: Palette,
    items: [
      'Brand and visual identity design',
      'Marketing creatives and promotional materials',
      'Social media graphics and campaign assets',
      'Presentations, pitch decks and business collateral',
      'Digital and web design assets',
    ],
  },
  {
    id: 'content',
    title: 'Content creation and copywriting',
    summary: 'Clear, on-brand writing for your website, campaigns and everyday business communication.',
    icon: PenLine,
    items: [
      'Website and landing-page copy',
      'Blog articles and editorial content',
      'Marketing copy and campaign messaging',
      'Social media captions and content',
      'Business communications and branded materials',
    ],
  },
  {
    id: 'social',
    title: 'Social media and digital content',
    summary: 'Planned, platform-ready content that keeps your channels active and coherent.',
    icon: CalendarRange,
    items: [
      'Social media content planning and creation',
      'Creative assets for digital campaigns',
      'Content calendars and publishing support',
      'Platform-specific content adaptation',
      'Ongoing content support for business accounts',
    ],
  },
  {
    id: 'web',
    title: 'Website and digital support',
    summary: 'Design and content help for the pages and digital assets your business relies on.',
    icon: MonitorSmartphone,
    items: [
      'Website design support',
      'Landing-page design and content',
      'Digital asset preparation',
      'Content updates and maintenance, where agreed',
      'Related digital services based on your needs',
    ],
  },
  {
    id: 'custom',
    title: 'Custom creative and business support',
    summary: 'For needs that don’t fit a single category, we shape the engagement around the work.',
    icon: Puzzle,
    items: [
      'Tailored creative projects',
      'Ongoing outsourced content support',
      'Dedicated project-based creative assistance',
      'Other related services agreed with you',
    ],
  },
]
