import { useId, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { AlertCircle, CheckCircle2, Info, Loader2 } from 'lucide-react'
import { company, formEndpoint, isPlaceholder } from '../config/site'
import { services } from '../config/services'
import { buttonClass } from './ui'

type Fields = {
  name: string
  email: string
  company: string
  service: string
  message: string
}

type FieldErrors = Partial<Record<keyof Fields, string>>

type Status =
  | { kind: 'idle' }
  | { kind: 'sending' }
  | { kind: 'sent'; email: string }
  | { kind: 'error'; message: string }
  | { kind: 'not-connected' }

const empty: Fields = { name: '', email: '', company: '', service: '', message: '' }

const serviceOptions = [...services.map((s) => s.title), 'Not sure yet / something else']

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(f: Fields): FieldErrors {
  const e: FieldErrors = {}
  if (f.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!f.email.trim()) e.email = 'Enter your business email address.'
  else if (!EMAIL_RE.test(f.email.trim())) e.email = 'Enter an email address like name@company.com.'
  if (!f.service) e.service = 'Choose the service you need, or "Not sure yet".'
  if (f.message.trim().length < 20)
    e.message = 'Tell us a little more about your project (at least 20 characters).'
  return e
}

const order: (keyof Fields)[] = ['name', 'email', 'company', 'service', 'message']

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(empty)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({})
  const [status, setStatus] = useState<Status>({ kind: 'idle' })
  const [honeypot, setHoneypot] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)
  const uid = useId()

  const update = (key: keyof Fields) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const next = { ...fields, [key]: e.target.value }
    setFields(next)
    // Re-check a field as soon as the visitor fixes it.
    if (touched[key]) setErrors((prev) => ({ ...prev, [key]: validate(next)[key] }))
    if (status.kind === 'error' || status.kind === 'not-connected') setStatus({ kind: 'idle' })
  }

  const blur = (key: keyof Fields) => () => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors((prev) => ({ ...prev, [key]: validate(fields)[key] }))
  }

  const focusStatus = () => requestAnimationFrame(() => statusRef.current?.focus())

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const found = validate(fields)
    setErrors(found)
    setTouched({ name: true, email: true, company: true, service: true, message: true })

    const firstInvalid = order.find((k) => found[k])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    // Spam bots fill hidden fields; silently drop those submissions.
    if (honeypot) return

    if (!formEndpoint) {
      setStatus({ kind: 'not-connected' })
      focusStatus()
      return
    }

    setStatus({ kind: 'sending' })
    try {
      const res = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: fields.name.trim(),
          email: fields.email.trim(),
          company: fields.company.trim(),
          service: fields.service,
          message: fields.message.trim(),
          _subject: `New enquiry from ${fields.name.trim()} (${fields.service})`,
        }),
      })
      if (!res.ok) throw new Error(`Status ${res.status}`)
      setStatus({ kind: 'sent', email: fields.email.trim() })
      setFields(empty)
      setTouched({})
      setErrors({})
    } catch {
      setStatus({
        kind: 'error',
        message:
          'Your enquiry wasn’t sent because the form service couldn’t be reached. Check your connection and try again.',
      })
    }
    focusStatus()
  }

  const emailFallback = isPlaceholder(company.email) ? (
    <span className="font-medium">{company.email}</span>
  ) : (
    <a className="font-medium underline underline-offset-2" href={`mailto:${company.email}`}>
      {company.email}
    </a>
  )

  if (status.kind === 'sent') {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="rounded-2xl border border-line bg-white p-8 sm:p-10"
      >
        <CheckCircle2 className="text-accent" size={32} strokeWidth={1.75} aria-hidden="true" />
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.01em]">Enquiry sent</h3>
        <p className="mt-3 leading-relaxed text-slate">
          Thank you for getting in touch. We’ve received your enquiry and will reply to{' '}
          <span className="font-medium text-ink">{status.email}</span>.
        </p>
        <button
          type="button"
          className={buttonClass('secondary', 'mt-7')}
          onClick={() => setStatus({ kind: 'idle' })}
        >
          Send another enquiry
        </button>
      </div>
    )
  }

  const sending = status.kind === 'sending'

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={onSubmit}
      aria-labelledby={`${uid}-title`}
      className="rounded-2xl border border-line bg-white p-6 sm:p-9"
    >
      <h3 id={`${uid}-title`} className="text-xl font-semibold tracking-[-0.01em]">
        Send us an enquiry
      </h3>
      <p className="mt-1.5 text-[0.95rem] text-slate">All fields are required unless marked optional.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <Field id={`${uid}-name`} label="Full name" error={touched.name ? errors.name : undefined}>
          {(props) => (
            <input
              {...props}
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={update('name')}
              onBlur={blur('name')}
            />
          )}
        </Field>
        <Field id={`${uid}-email`} label="Business email" error={touched.email ? errors.email : undefined}>
          {(props) => (
            <input
              {...props}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={fields.email}
              onChange={update('email')}
              onBlur={blur('email')}
            />
          )}
        </Field>
        <Field id={`${uid}-company`} label="Company name" optional>
          {(props) => (
            <input
              {...props}
              name="company"
              type="text"
              autoComplete="organization"
              value={fields.company}
              onChange={update('company')}
            />
          )}
        </Field>
        <Field id={`${uid}-service`} label="Service required" error={touched.service ? errors.service : undefined}>
          {(props) => (
            <select {...props} name="service" value={fields.service} onChange={update('service')} onBlur={blur('service')}>
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((s) => (
                <option key={s} value={s}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          )}
        </Field>
        <div className="sm:col-span-2">
          <Field
            id={`${uid}-message`}
            label="Project details or message"
            hint="What you need, any timelines, and anything else that helps us understand the work."
            error={touched.message ? errors.message : undefined}
          >
            {(props) => (
              <textarea
                {...props}
                name="message"
                rows={5}
                value={fields.message}
                onChange={update('message')}
                onBlur={blur('message')}
              />
            )}
          </Field>
        </div>
      </div>

      {/* Honeypot: hidden from people and assistive tech, catches simple bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this field empty
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </label>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.kind === 'error' && (
          <Notice tone="error" icon={<AlertCircle size={20} aria-hidden="true" />}>
            {status.message}
          </Notice>
        )}
        {status.kind === 'not-connected' && (
          <Notice tone="info" icon={<Info size={20} aria-hidden="true" />}>
            <strong className="font-semibold">Your enquiry hasn’t been sent.</strong> Online enquiries aren’t
            switched on yet. Please email us at {emailFallback} instead.
          </Notice>
        )}
      </div>

      <button type="submit" disabled={sending} className={buttonClass('primary', 'mt-7 w-full sm:w-auto disabled:opacity-70')}>
        {sending && <Loader2 size={18} className="animate-spin" aria-hidden="true" />}
        {sending ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}

type ControlProps = {
  id: string
  className: string
  'aria-invalid'?: true
  'aria-describedby'?: string
  'aria-required'?: true
}

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: (props: ControlProps) => ReactNode
}) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
  const control =
    'block w-full rounded-lg border bg-white px-3.5 py-3 text-[1rem] text-ink placeholder:text-slate/60 transition-colors ' +
    'focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-1 ' +
    (error
      ? 'border-red-700 focus-visible:outline-red-700'
      : 'border-line hover:border-ink/30 focus-visible:border-accent focus-visible:outline-accent')

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.95rem] font-medium text-ink">
        {label}
        {optional && <span className="ml-1.5 font-normal text-slate">(optional)</span>}
      </label>
      {children({
        id,
        className: control,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
        'aria-required': optional ? undefined : true,
      })}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.88rem] text-slate">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-[0.9rem] text-red-700">
          <AlertCircle size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

function Notice({ tone, icon, children }: { tone: 'error' | 'info'; icon: ReactNode; children: ReactNode }) {
  const styles =
    tone === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-accent/25 bg-accent-soft text-accent-deep'
  return (
    <div role={tone === 'error' ? 'alert' : 'status'} className={`mt-6 flex gap-3 rounded-lg border p-4 leading-relaxed ${styles}`}>
      <span className="mt-0.5 shrink-0">{icon}</span>
      <p>{children}</p>
    </div>
  )
}
