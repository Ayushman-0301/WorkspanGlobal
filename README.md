# Workspan Global website

Single-page corporate website for Workspan Global Private Limited.
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
| `email` | `[Insert Business Email]` |
| `phone` | `[Insert Business Phone Number]` (use international format, e.g. `+91 …`) |
| `address` | `[Insert Business Address]` |

While a value is still a placeholder, the site shows it as plain text; once you replace it, the
email and phone become clickable `mailto:` / `tel:` links automatically.

Also replace the content of `public/privacy-policy.html` with your approved privacy policy.
Because the contact form collects names and email addresses, you should have one in place before launch.

## Connecting the contact form to email

The form posts JSON to whatever URL is set in the `VITE_FORM_ENDPOINT` environment variable.
**Until it is set, the form validates input and then tells the visitor their enquiry was not sent and
asks them to email you instead. It never shows a false "sent" message.**

### Option A: Formspree (simplest, no server needed)

1. Create a free account at formspree.io and add a new form. Set the notification email to your
   business inbox.
2. Copy the form endpoint, which looks like `https://formspree.io/f/abcdwxyz`.
3. In the project folder, copy `.env.example` to `.env` and set:
   ```
   VITE_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```
4. Restart `npm run dev` (or rebuild). Send a test enquiry and confirm it reaches your inbox.
5. On your hosting platform (Netlify, Vercel, Cloudflare Pages, etc.), add the same
   `VITE_FORM_ENDPOINT` variable in the site's environment settings before building.

The form ID is not a secret (it is meant to be public), so it is safe in frontend code. The form
also sends a hidden `_gotcha` honeypot field that Formspree uses to filter spam, and a `_subject`
line like "New enquiry from Jane Doe (Content creation and copywriting)".

Similar services (Basin, Getform, FormBackend) work the same way: put their endpoint URL in
`VITE_FORM_ENDPOINT`. If a service needs extra fields, add them to the `body` in
`src/components/ContactForm.tsx`.

### Option B: Your own backend

Point `VITE_FORM_ENDPOINT` at your own API route (for example a Netlify/Vercel serverless function)
that accepts a JSON `POST` with `name`, `email`, `company`, `service`, `message`, sends the email
using a provider such as Resend, Postmark or SendGrid, and returns a 2xx status on success.
Keep the email provider's API key in the server function's environment variables, never in this
frontend code.

The form treats any 2xx response as sent and anything else (or a network failure) as an error,
keeping the visitor's text so they can retry.

## Editing services

Edit `src/config/services.ts`. Each entry has a title, a one-line summary, a list of items and an
icon from [lucide.dev](https://lucide.dev/icons). The service cards and the form's
"Service required" menu both update from this list.

## Deploying

`npm run build` produces a static site in `dist/`. Upload that folder to any static host, or connect
the project to Netlify / Vercel / Cloudflare Pages with build command `npm run build` and output
directory `dist`. Then point your domain's DNS at the host as described in its dashboard.
