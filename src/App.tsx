import { useState, type ChangeEvent, type FormEvent } from 'react'

type ContactFormValues = {
  name: string
  email: string
  message: string
}

const services = [
  {
    title: 'Simultaneous',
    description: 'Real-time interpretation for conferences, summits, and large events.',
  },
  {
    title: 'Consecutive',
    description: 'Accurate message delivery for meetings, interviews, and negotiations.',
  },
  {
    title: 'Remote',
    description: 'Flexible online interpretation support across platforms and time zones.',
  },
  {
    title: 'Subtitling/Voice',
    description: 'Clear multilingual subtitles and voice solutions for media content.',
  },
]

const advantages = [
  {
    title: 'Professional Excellence',
    description: 'Experienced interpreters who maintain clarity, tone, and intent in every exchange.',
  },
  {
    title: 'Cultural Intelligence',
    description: 'Context-aware communication that respects cultural nuance and local expectations.',
  },
  {
    title: 'Reliable Delivery',
    description: 'Consistent execution with responsive coordination before, during, and after each session.',
  },
]

const industries = [
  'International Orgs',
  'Government/Diplomacy',
  'Corporate',
  'Healthcare',
  'Legal',
]

const emptyFormValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

const contactEmail = 'danielladelatorrejimenez@gmail.com'

function App() {
  const [formValues, setFormValues] = useState<ContactFormValues>(emptyFormValues)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const updateField =
    (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSubmitMessage('')
      setFormValues((previous) => ({
        ...previous,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    const subject = `New interpretation request from ${formValues.name}`
    const bodyLines = [
      `Name: ${formValues.name}`,
      `Email: ${formValues.email}`,
      '',
      'Message:',
      formValues.message,
    ]

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${contactEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          ...formValues,
          _subject: subject,
        }),
      })

      if (!response.ok) {
        throw new Error('Email submission failed')
      }

      setSubmitMessage('Message sent successfully. We will contact you soon.')
    } catch (error) {
      const mailtoSubject = encodeURIComponent(subject)
      const mailtoBody = encodeURIComponent(bodyLines.join('\n'))
      window.location.href = `mailto:${contactEmail}?subject=${mailtoSubject}&body=${mailtoBody}`
      setSubmitMessage('Email app opened as fallback. Please send the pre-filled draft.')
    } finally {
      setIsSubmitting(false)
      setFormValues(emptyFormValues)
    }
  }

  return (
    <div className="pb-20">
      <header className="page-shell py-6">
        <div className="flex items-center justify-between rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 shadow-sm">
          <span className="text-sm font-semibold tracking-[0.14em] text-[var(--text)] sm:text-base">
            UNITED VOICES INTERPRETATION
          </span>
          <a className="inline-link hidden sm:inline-flex" href="#contact">
            Request a Quote
          </a>
        </div>
      </header>

      <main>
        <section className="page-shell section-space flex flex-col items-center text-center">
          <h1 className="sr-only">United Voices Interpretation</h1>
          <img
            alt="United Voices Interpretation logo"
            className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_16px_35px_rgba(11,61,58,0.08)] sm:p-6"
            src="/logo-source.jpeg"
          />
          <a className="cta-button mt-10 inline-flex" href="#contact">
            Request a Quote
          </a>
        </section>

        <section className="page-shell section-space border-t border-[var(--border)]" id="services">
          <h2 className="section-heading">Services</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {services.map((service) => (
              <article className="card-surface" key={service.title}>
                <h3 className="text-xl font-semibold">{service.title}</h3>
                <p className="mt-2 text-base text-[var(--text-muted)]">{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell section-space border-t border-[var(--border)]" id="why-choose-us">
          <h2 className="section-heading">Why Choose Us</h2>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {advantages.map((item) => (
              <article className="card-surface" key={item.title}>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-base text-[var(--text-muted)]">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="page-shell section-space border-t border-[var(--border)]" id="industries">
          <h2 className="section-heading">Industries</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {industries.map((industry) => (
              <span className="industry-pill" key={industry}>
                {industry}
              </span>
            ))}
          </div>
        </section>

        <section className="page-shell section-space border-t border-[var(--border)]" id="contact">
          <h2 className="section-heading">Contact</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
            <article className="card-surface space-y-4">
              <div className="flex flex-col items-center text-center">
                <img
                  alt="United Voices Interpretation owner portrait"
                  className="h-32 w-32 rounded-full border-4 border-[var(--accent)] object-cover object-[center_20%] shadow-[0_10px_24px_rgba(46,196,182,0.28)]"
                  src="/owner-avatar.jpg"
                />
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.09em] text-[var(--text-muted)]">
                  Direct Owner Contact
                </p>
              </div>
              <p className="text-base text-[var(--text-muted)]">
                Share your event details and preferred language coverage. We will respond with a custom
                quote.
              </p>
              <div>
                <p className="label">Email</p>
                <a className="contact-link break-all" href={`mailto:${contactEmail}`}>
                  {contactEmail}
                </a>
              </div>
              <div>
                <p className="label">WhatsApp</p>
                <a className="contact-link" href="https://wa.me/525531132066">
                  +52 55 3113 2066
                </a>
              </div>
            </article>

            <form className="card-surface space-y-4" onSubmit={handleSubmit}>
              <label className="form-field">
                Name
                <input
                  className="input-field"
                  name="name"
                  onChange={updateField('name')}
                  placeholder="Your name"
                  required
                  type="text"
                  value={formValues.name}
                />
              </label>
              <label className="form-field">
                Email
                <input
                  className="input-field"
                  name="email"
                  onChange={updateField('email')}
                  placeholder="you@example.com"
                  required
                  type="email"
                  value={formValues.email}
                />
              </label>
              <label className="form-field">
                Message
                <textarea
                  className="input-field min-h-36 resize-y"
                  name="message"
                  onChange={updateField('message')}
                  placeholder="Tell us about your interpretation needs"
                  required
                  value={formValues.message}
                />
              </label>
              <button
                className="cta-button disabled:cursor-not-allowed disabled:opacity-70"
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {submitMessage && <p className="text-sm text-[var(--text-muted)]">{submitMessage}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="page-shell mt-8 border-t border-[var(--border)] pt-8 text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} United Voices Interpretation. All rights reserved.
      </footer>
    </div>
  )
}

export default App
