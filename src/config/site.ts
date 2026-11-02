/**
 * Site-wide settings and content.
 *
 * Company name and contact details shown on the site live here.
 */

export const company = {
  brand: 'Workspan Global',
  legalName: 'Workspan Global',
  email: 'admin@workspan-global.com',
  phone: '+91 78381 49333',
  // Link for the footer "Privacy Policy". A placeholder page ships in /public.
  privacyPolicyUrl: './privacy-policy.html',
}

/** True while a value is still an "[Insert ...]" placeholder. */
export const isPlaceholder = (value: string) => /^\[Insert .*\]$/.test(value.trim())

/**
 * Contact form endpoint. Set VITE_FORM_ENDPOINT in a .env file (see .env.example
 * and README.md). When it is empty, the form validates input but tells visitors
 * that online enquiries are not switched on yet, and never claims to have sent anything.
 */
export const formEndpoint: string = (import.meta.env.VITE_FORM_ENDPOINT ?? '').trim()

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'services', label: 'What We Do' },
  { id: 'why', label: 'Why Workspan' },
  { id: 'contact', label: 'Contact Us' },
] as const

export type SectionId = (typeof navLinks)[number]['id']
