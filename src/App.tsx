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

function App() {
  const [formValues, setFormValues] = useState<ContactFormValues>(emptyFormValues)

  const updateField =
    (field: keyof ContactFormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((previous) => ({
        ...previous,
        [field]: event.target.value,
      }))
    }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log({
      ...formValues,
      submittedAt: new Date().toISOString(),
    })
    setFormValues(emptyFormValues)
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
        <section className="page-shell section-space">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
            Professional Interpretation Services
          </p>
          <h1 className="max-w-3xl text-balance text-4xl font-bold leading-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
            United Voices Interpretation
          </h1>
          <p className="mt-6 max-w-2xl text-2xl text-[var(--text-muted)] sm:text-3xl">
            Many Voices, One Understanding
          </p>
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
              <p className="text-base text-[var(--text-muted)]">
                Share your event details and preferred language coverage. We will respond with a custom
                quote.
              </p>
              <div>
                <p className="label">Email</p>
                <a
                  className="inline-link mt-1 inline-flex"
                  href="mailto:danielladelatorrejimenez@gmail.com"
                >
                  danielladelatorrejimenez@gmail.com
                </a>
              </div>
              <div>
                <p className="label">WhatsApp</p>
                <a className="inline-link mt-1 inline-flex" href="https://wa.me/525531132066">
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
              <button className="cta-button" type="submit">
                Send Message
              </button>
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
