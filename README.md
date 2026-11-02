# Workspan Global website

Single-page corporate website for Workspan Global.
Built with React, TypeScript, Vite, Tailwind CSS and Lucide icons.

## Preview locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev        # http://localhost:5173 with live reload
```

Other commands:

```bash
npm run typecheck  # TypeScript checks only
npm run build      # type-check + production build into dist/
npm run preview    # serve the production build at http://localhost:4173
```

## Project layout

```
index.html                  Page title, meta description, fonts, favicon link
public/
  favicon.svg               Brand mark (two points joined by a span)
  privacy-policy.html       Placeholder privacy policy page
src/
  config/site.ts            Company details, placeholders, nav links, form endpoint
  config/services.ts        The five service categories (edit to add/remove services)
  components/
    Header.tsx              Sticky nav, active-section highlight, mobile menu
    Hero.tsx, HeroVisual.tsx
    About.tsx
    Services.tsx            Service cards + "Discuss your requirements" tile
    Why.tsx                 Four principles + how an engagement works
    Contact.tsx             Contact details + form
    ContactForm.tsx         Validation, sending, success / error / not-connected states
    Footer.tsx
    ui.tsx                  Shared Container, LinkButton, SectionHeading
    BrandMark.tsx           Logo mark and wordmark
  index.css                 Tailwind setup and brand colour tokens
```

## Placeholders to fill in

All in `src/config/site.ts`:

| Field | Current value |
| --- | --- |
| `email` | `admin@workspan-global.com` |
| `phone` | `+91 78381 49333` |

While a value is still a placeholder, the site shows it as plain text; once you replace it, the
email and phone become clickable `mailto:` / `tel:` links automatically.

Also replace the content of `public/privacy-policy.html` with your approved privacy policy.
Because the contact form collects names and email addresses, you should have one in place before launch.

## Contact form

The form posts each enquiry to the URL in the `VITE_FORM_ENDPOINT` variable (set under the GitHub
repo's Settings → Secrets and variables → Actions → Variables). It is set up to use a Google Apps
Script that saves each enquiry to a Google Sheet and emails it to admin@workspan-global.com.
Setup steps are in `google-apps-script/SETUP.md`.

Until the variable is set, the form validates input and then tells visitors their enquiry was not
sent and asks them to email instead. It never shows a false "sent" message. A Formspree-style
endpoint also works in the same variable.

## Editing services

Edit `src/config/services.ts`. Each entry has a title, a one-line summary, a list of items and an
icon from [lucide.dev](https://lucide.dev/icons). The service cards and the form's
"Service required" menu both update from this list.

## Deploying

`npm run build` produces a static site in `dist/`. Upload that folder to any static host, or connect
the project to Netlify / Vercel / Cloudflare Pages with build command `npm run build` and output
directory `dist`. Then point your domain's DNS at the host as described in its dashboard.
