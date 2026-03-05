import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams, useRoutes } from 'react-router-dom'

type ContactFormValues = {
  name: string
  email: string
  message: string
}

type FaqItem = {
  question: string
  answer: string
}

type ServicePage = {
  slug: string
  title: string
  shortDescription: string
  heroDescription: string
  benefitItems: string[]
  processItems: string[]
  faqs: FaqItem[]
}

type IndustryPage = {
  slug: string
  title: string
  summary: string
  needs: string[]
  solution: string
}

type SeoConfig = {
  title: string
  description: string
  path: string
  keywords?: string
  structuredData?: Record<string, unknown>[]
}

const SITE_NAME = 'United Voices Interpretation'
const SITE_URL = (import.meta.env.VITE_SITE_URL ?? 'https://unitedvoicesmx.com').replace(/\/$/, '')
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`
const CONTACT_EMAIL = 'danielladelatorrejimenez@gmail.com'
const WHATSAPP_NUMBER = '+52 55 3113 2066'
const WHATSAPP_URL = 'https://wa.me/525531132066'

const servicePages: ServicePage[] = [
  {
    slug: 'simultaneous-interpretation-mexico-city',
    title: 'Simultaneous Interpretation in Mexico City',
    shortDescription:
      'Real-time multilingual interpretation for conferences, summits, and high-stakes live events.',
    heroDescription:
      'Our simultaneous interpretation team in Mexico City supports multilingual events with speed, precision, and technical coordination from briefing through delivery.',
    benefitItems: [
      'Real-time language support with minimal delay for conference-style sessions.',
      'Interpreter teams prepared for specialized topics including legal, medical, and policy contexts.',
      'On-site and hybrid event coordination with platform and booth readiness checks.',
    ],
    processItems: [
      'Scope and language mapping based on your agenda and audience profile.',
      'Terminology preparation and event briefing before execution day.',
      'Live delivery with dedicated coordination and post-event feedback follow-up.',
    ],
    faqs: [
      {
        question: 'When should I choose simultaneous interpretation?',
        answer:
          'Choose simultaneous interpretation for conferences or presentations where uninterrupted flow and live multilingual access are essential.',
      },
      {
        question: 'Can you support hybrid and remote attendees?',
        answer:
          'Yes. We support on-site, remote, and hybrid delivery formats with coordinated technical setup and interpreter scheduling.',
      },
      {
        question: 'How early should we book?',
        answer:
          'For best availability and preparation quality, we recommend confirming dates and language pairs at least two to three weeks in advance.',
      },
    ],
  },
  {
    slug: 'consecutive-interpretation-mexico-city',
    title: 'Consecutive Interpretation in Mexico City',
    shortDescription:
      'Accurate and culturally informed interpretation for meetings, interviews, and negotiations.',
    heroDescription:
      'Consecutive interpretation is ideal when clarity, nuance, and conversational pace matter. We help your parties communicate confidently in Mexico City.',
    benefitItems: [
      'High-accuracy interpretation for legal, corporate, and diplomatic conversations.',
      'Clear turn-taking that preserves tone and context between speakers.',
      'Flexible support for in-person meetings, site visits, and official interviews.',
    ],
    processItems: [
      'Session objective review and terminology collection before the engagement.',
      'Interpretation delivery aligned to meeting flow and decision points.',
      'Optional written summary of key communication moments if required.',
    ],
    faqs: [
      {
        question: 'Is consecutive interpretation suitable for legal meetings?',
        answer:
          'Yes. Consecutive interpretation works well for legal and sensitive discussions where precision and controlled pace are critical.',
      },
      {
        question: 'Do you provide same-day requests?',
        answer:
          'We handle urgent requests when availability permits, but advance notice helps ensure the best interpreter match.',
      },
      {
        question: 'Can you support recurring meetings?',
        answer:
          'Yes. We can assign consistent interpreters to recurring sessions for continuity and better context retention.',
      },
    ],
  },
  {
    slug: 'remote-interpretation-mexico-city',
    title: 'Remote Interpretation in Mexico City',
    shortDescription:
      'Reliable multilingual interpretation for online meetings, webinars, and distributed teams.',
    heroDescription:
      'Our remote interpretation services enable smooth cross-language communication across platforms for clients in Mexico City and international teams.',
    benefitItems: [
      'Platform-ready support for Zoom, Teams, Meet, and custom webinar workflows.',
      'Time-zone aligned interpreter scheduling for global participants.',
      'Reduced travel complexity while maintaining professional language quality.',
    ],
    processItems: [
      'Technical environment check and participant language flow mapping.',
      'Interpreter preparation with agenda materials and terminology references.',
      'Live monitoring and fallback protocols to minimize disruption risk.',
    ],
    faqs: [
      {
        question: 'Which platforms do you support?',
        answer:
          'We support major conferencing and webinar platforms and adapt to your preferred remote collaboration environment.',
      },
      {
        question: 'What if participant audio quality is poor?',
        answer:
          'We run pre-session checks and provide communication guidelines to reduce audio issues and preserve interpretation quality.',
      },
      {
        question: 'Can remote services be booked for small teams?',
        answer:
          'Yes. We support both enterprise-scale events and smaller meetings that still require professional interpretation.',
      },
    ],
  },
  {
    slug: 'subtitling-voiceover-mexico-city',
    title: 'Subtitling and Voiceover in Mexico City',
    shortDescription:
      'Multilingual subtitling and voice solutions for training, media, and institutional communications.',
    heroDescription:
      'We produce high-quality subtitling and voiceover outputs that preserve meaning, cultural context, and accessibility for multilingual audiences.',
    benefitItems: [
      'Subtitle timing and language adaptation for clarity across markets.',
      'Voiceover options aligned to brand tone and target audience expectations.',
      'Quality review workflows for consistency across multilingual content sets.',
    ],
    processItems: [
      'Content intake, style alignment, and language adaptation planning.',
      'Production and linguistic quality checks with revision cycles.',
      'Final delivery in formats compatible with your publishing channels.',
    ],
    faqs: [
      {
        question: 'Do you handle both subtitles and voiceover together?',
        answer:
          'Yes. We can manage complete multilingual localization workflows combining subtitling and voiceover delivery.',
      },
      {
        question: 'Can you adapt terminology for technical sectors?',
        answer:
          'Yes. We build glossary-based workflows for legal, healthcare, and corporate terminology consistency.',
      },
      {
        question: 'What file formats are supported?',
        answer:
          'We support common subtitle and audio delivery formats and align output specs with your platform requirements.',
      },
    ],
  },
]

const industryPages: IndustryPage[] = [
  {
    slug: 'legal-interpretation-mexico-city',
    title: 'Legal Interpretation in Mexico City',
    summary:
      'Language precision is non-negotiable in legal contexts. Our interpreters support legal teams, hearings, consultations, and cross-border legal communication.',
    needs: [
      'Confidential case communication across language barriers.',
      'Consistent legal terminology in hearings, interviews, and contracts.',
      'Clear interpretation for client-attorney conversations and negotiations.',
    ],
    solution:
      'United Voices provides legally sensitive interpretation support with disciplined terminology preparation and context-driven delivery for legal stakeholders in Mexico City.',
  },
  {
    slug: 'healthcare-interpretation-mexico-city',
    title: 'Healthcare Interpretation in Mexico City',
    summary:
      'Healthcare communication requires empathy and precision. We support providers, clinics, and patients with clear multilingual understanding.',
    needs: [
      'Accurate interpretation of care instructions and patient history.',
      'Support for multilingual consultations and informed consent conversations.',
      'Culturally aware communication that improves patient trust and outcomes.',
    ],
    solution:
      'United Voices delivers healthcare-focused interpretation with terminology preparation and patient-centered communication practices for Mexico City providers.',
  },
]

const emptyFormValues: ContactFormValues = {
  name: '',
  email: '',
  message: '',
}

function updateMetaTag(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`
  let element = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attr, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function setCanonical(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', url)
}

function useSeo(config: SeoConfig) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${config.path}`
    document.title = config.title

    updateMetaTag('name', 'description', config.description)
    if (config.keywords) {
      updateMetaTag('name', 'keywords', config.keywords)
    }
    updateMetaTag('name', 'robots', 'index,follow,max-image-preview:large')
    if (import.meta.env.VITE_GOOGLE_SITE_VERIFICATION) {
      updateMetaTag('name', 'google-site-verification', import.meta.env.VITE_GOOGLE_SITE_VERIFICATION)
    }
    if (import.meta.env.VITE_BING_SITE_VERIFICATION) {
      updateMetaTag('name', 'msvalidate.01', import.meta.env.VITE_BING_SITE_VERIFICATION)
    }
    updateMetaTag('property', 'og:type', 'website')
    updateMetaTag('property', 'og:site_name', SITE_NAME)
    updateMetaTag('property', 'og:title', config.title)
    updateMetaTag('property', 'og:description', config.description)
    updateMetaTag('property', 'og:url', canonicalUrl)
    updateMetaTag('property', 'og:image', DEFAULT_OG_IMAGE)
    updateMetaTag('name', 'twitter:card', 'summary_large_image')
    updateMetaTag('name', 'twitter:title', config.title)
    updateMetaTag('name', 'twitter:description', config.description)
    updateMetaTag('name', 'twitter:image', DEFAULT_OG_IMAGE)
    setCanonical(canonicalUrl)

    for (const node of document.head.querySelectorAll('script[data-uv-jsonld="true"]')) {
      node.remove()
    }

    for (const item of config.structuredData ?? []) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.uvJsonld = 'true'
      script.text = JSON.stringify(item)
      document.head.appendChild(script)
    }

    return () => {
      for (const node of document.head.querySelectorAll('script[data-uv-jsonld="true"]')) {
        node.remove()
      }
    }
  }, [config])
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon-512.png`,
    image: `${SITE_URL}/og-image.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: CONTACT_EMAIL,
        telephone: '+52-55-3113-2066',
        availableLanguage: ['English', 'Spanish'],
      },
    ],
  }
}

function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/og-image.png`,
    areaServed: {
      '@type': 'City',
      name: 'Mexico City',
    },
    email: CONTACT_EMAIL,
    telephone: '+52-55-3113-2066',
    serviceType: 'Interpretation and multilingual communication services',
  }
}

function faqSchema(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

function serviceSchema(page: ServicePage) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: page.title,
    description: page.shortDescription,
    provider: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      '@type': 'City',
      name: 'Mexico City',
    },
  }
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function SiteLayout() {
  return (
    <div className="pb-20">
      <header className="page-shell py-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-5 py-3 shadow-sm">
          <Link className="text-sm font-semibold tracking-[0.14em] text-[var(--text)] sm:text-base" to="/">
            UNITED VOICES INTERPRETATION
          </Link>
          <nav className="flex flex-wrap items-center gap-3 text-sm font-semibold text-[var(--text-muted)]">
            <NavLink className="inline-link" to="/">
              Home
            </NavLink>
            <NavLink className="inline-link" to="/services/simultaneous-interpretation-mexico-city">
              Services
            </NavLink>
            <NavLink className="inline-link" to="/industries/legal-interpretation-mexico-city">
              Industries
            </NavLink>
            <NavLink className="inline-link" to="/contact">
              Contact
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer className="page-shell mt-8 border-t border-[var(--border)] pt-8 text-sm text-[var(--text-muted)]">
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </footer>
    </div>
  )
}

function HomePage() {
  const seoConfig = useMemo(
    () => ({
      title: 'Interpretation Services in Mexico City | United Voices Interpretation',
      description:
        'Professional simultaneous, consecutive, remote, and subtitling interpretation services in Mexico City. Request a quote from United Voices Interpretation.',
      path: '/',
      keywords:
        'interpretation services mexico city, simultaneous interpretation mexico city, consecutive interpretation mexico city, remote interpretation mexico city, subtitling voiceover mexico city',
      structuredData: [organizationSchema(), localBusinessSchema()],
    }),
    [],
  )

  useSeo(seoConfig)

  return (
    <>
      <section className="page-shell section-space flex flex-col items-center text-center">
        <img
          alt="United Voices Interpretation logo"
          className="w-full max-w-3xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 shadow-[0_16px_35px_rgba(11,61,58,0.08)] sm:p-6"
          src="/logo-source.jpeg"
        />
        <h1 className="mt-8 max-w-3xl text-balance text-4xl font-bold leading-tight text-[var(--text)] sm:text-5xl">
          Interpretation Services in Mexico City
        </h1>
        <p className="mt-4 max-w-3xl text-lg text-[var(--text-muted)] sm:text-xl">
          Many Voices, One Understanding. We provide reliable multilingual communication support
          for organizations, institutions, and businesses operating across languages.
        </p>
        <Link className="cta-button mt-10 inline-flex" to="/contact">
          Request a Quote
        </Link>
      </section>

      <section className="page-shell section-space border-t border-[var(--border)]" id="services">
        <h2 className="section-heading">Services in Mexico City</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {servicePages.map((service) => (
            <article className="card-surface" key={service.slug}>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-2 text-base text-[var(--text-muted)]">{service.shortDescription}</p>
              <Link className="inline-link mt-4 inline-flex" to={`/services/${service.slug}`}>
                View service page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell section-space border-t border-[var(--border)]" id="industries">
        <h2 className="section-heading">Industries We Support</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {industryPages.map((industry) => (
            <article className="card-surface" key={industry.slug}>
              <h3 className="text-xl font-semibold">{industry.title}</h3>
              <p className="mt-2 text-base text-[var(--text-muted)]">{industry.summary}</p>
              <Link className="inline-link mt-4 inline-flex" to={`/industries/${industry.slug}`}>
                View industry page
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="page-shell section-space border-t border-[var(--border)]">
        <h2 className="section-heading">Why Choose United Voices</h2>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          <article className="card-surface">
            <h3 className="text-xl font-semibold">Professional Excellence</h3>
            <p className="mt-2 text-base text-[var(--text-muted)]">
              Experienced interpretation teams with event-ready workflows and terminology
              preparation.
            </p>
          </article>
          <article className="card-surface">
            <h3 className="text-xl font-semibold">Cultural Intelligence</h3>
            <p className="mt-2 text-base text-[var(--text-muted)]">
              Context-aware communication that respects tone, audience expectations, and cultural
              nuance.
            </p>
          </article>
          <article className="card-surface">
            <h3 className="text-xl font-semibold">Reliable Delivery</h3>
            <p className="mt-2 text-base text-[var(--text-muted)]">
              Reliable scheduling, responsive support, and clear execution from briefing to delivery.
            </p>
          </article>
        </div>
      </section>

      <ContactSection />
    </>
  )
}

function ServiceDetailPage() {
  const params = useParams<{ slug: string }>()
  const page = servicePages.find((item) => item.slug === params.slug)

  const seoConfig = useMemo(
    () => ({
      title: page ? `${page.title} | ${SITE_NAME}` : `Service Not Found | ${SITE_NAME}`,
      description: page
        ? `${page.shortDescription} Request professional interpretation support from ${SITE_NAME}.`
        : 'The requested service page was not found.',
      path: page ? `/services/${page.slug}` : '/404',
      keywords: page ? `${page.title.toLowerCase()}, interpretation services mexico city` : undefined,
      structuredData: page
        ? [organizationSchema(), localBusinessSchema(), serviceSchema(page), faqSchema(page.faqs)]
        : [organizationSchema(), localBusinessSchema()],
    }),
    [page],
  )

  useSeo(seoConfig)

  if (!page) {
    return <NotFoundPage />
  }

  return (
    <section className="page-shell section-space">
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
        Service Page
      </p>
      <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
        {page.title}
      </h1>
      <p className="mt-6 max-w-4xl text-lg text-[var(--text-muted)]">{page.heroDescription}</p>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="card-surface">
          <h2 className="text-2xl font-semibold">What You Get</h2>
          <ul className="mt-4 space-y-3 text-[var(--text-muted)]">
            {page.benefitItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="pt-1 text-[var(--accent)]">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="card-surface">
          <h2 className="text-2xl font-semibold">How We Work</h2>
          <ol className="mt-4 space-y-3 text-[var(--text-muted)]">
            {page.processItems.map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-sm font-bold text-white">
                  {index + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>

      <article className="card-surface mt-6">
        <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4">
          {page.faqs.map((faq) => (
            <div key={faq.question}>
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <p className="mt-1 text-[var(--text-muted)]">{faq.answer}</p>
            </div>
          ))}
        </div>
      </article>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="cta-button inline-flex" to="/contact">
          Request a Quote
        </Link>
        <Link className="inline-link inline-flex items-center" to="/">
          Back to homepage
        </Link>
      </div>
    </section>
  )
}

function IndustryDetailPage() {
  const params = useParams<{ slug: string }>()
  const page = industryPages.find((item) => item.slug === params.slug)

  const seoConfig = useMemo(
    () => ({
      title: page ? `${page.title} | ${SITE_NAME}` : `Industry Page Not Found | ${SITE_NAME}`,
      description: page
        ? `${page.summary} Professional language support by ${SITE_NAME}.`
        : 'The requested industry page was not found.',
      path: page ? `/industries/${page.slug}` : '/404',
      keywords: page ? `${page.title.toLowerCase()}, interpretation mexico city` : undefined,
      structuredData: [organizationSchema(), localBusinessSchema()],
    }),
    [page],
  )

  useSeo(seoConfig)

  if (!page) {
    return <NotFoundPage />
  }

  return (
    <section className="page-shell section-space">
      <p className="text-sm font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
        Industry Page
      </p>
      <h1 className="mt-4 max-w-4xl text-balance text-4xl font-bold leading-tight sm:text-5xl">
        {page.title}
      </h1>
      <p className="mt-6 max-w-4xl text-lg text-[var(--text-muted)]">{page.summary}</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="card-surface">
          <h2 className="text-2xl font-semibold">Common Communication Needs</h2>
          <ul className="mt-4 space-y-3 text-[var(--text-muted)]">
            {page.needs.map((item) => (
              <li key={item} className="flex gap-2">
                <span aria-hidden="true" className="pt-1 text-[var(--accent)]">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="card-surface">
          <h2 className="text-2xl font-semibold">Our Approach</h2>
          <p className="mt-4 text-[var(--text-muted)]">{page.solution}</p>
          <div className="mt-6">
            <Link className="cta-button inline-flex" to="/contact">
              Discuss Your Project
            </Link>
          </div>
        </article>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link className="inline-link inline-flex" to="/">
          Back to homepage
        </Link>
      </div>
    </section>
  )
}

function ContactPage() {
  const seoConfig = useMemo(
    () => ({
      title: `Contact ${SITE_NAME} | Interpretation Services in Mexico City`,
      description:
        'Request interpretation support in Mexico City. Contact United Voices Interpretation by email, WhatsApp, or the quote request form.',
      path: '/contact',
      structuredData: [organizationSchema(), localBusinessSchema()],
    }),
    [],
  )

  useSeo(seoConfig)

  return <ContactSection />
}

function ContactSection() {
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
      const response = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
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
    } catch {
      const mailtoSubject = encodeURIComponent(subject)
      const mailtoBody = encodeURIComponent(bodyLines.join('\n'))
      window.location.href = `mailto:${CONTACT_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`
      setSubmitMessage('Email app opened as fallback. Please send the pre-filled draft.')
    } finally {
      setIsSubmitting(false)
      setFormValues(emptyFormValues)
    }
  }

  return (
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
            Tell us your language pairs, dates, and format. We support interpretation projects in
            Mexico City and remote multilingual sessions worldwide.
          </p>
          <div>
            <p className="label">Email</p>
            <a className="contact-link break-all" href={`mailto:${CONTACT_EMAIL}`}>
              {CONTACT_EMAIL}
            </a>
          </div>
          <div>
            <p className="label">WhatsApp</p>
            <a className="contact-link" href={WHATSAPP_URL}>
              {WHATSAPP_NUMBER}
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
  )
}

function NotFoundPage() {
  const seoConfig = useMemo(
    () => ({
      title: `Page Not Found | ${SITE_NAME}`,
      description: `The page you requested could not be found on ${SITE_NAME}.`,
      path: '/404',
    }),
    [],
  )

  useSeo(seoConfig)

  return (
    <section className="page-shell section-space">
      <h1 className="text-4xl font-bold">Page Not Found</h1>
      <p className="mt-4 text-[var(--text-muted)]">
        The page you requested does not exist. You can return to the homepage below.
      </p>
      <Link className="cta-button mt-8 inline-flex" to="/">
        Go to Homepage
      </Link>
    </section>
  )
}

export default function App() {
  const routedElement = useRoutes([
    {
      path: '/',
      element: (
        <>
          <ScrollToTop />
          <SiteLayout />
        </>
      ),
      children: [
        { index: true, element: <HomePage /> },
        { path: 'services/:slug', element: <ServiceDetailPage /> },
        { path: 'industries/:slug', element: <IndustryDetailPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ])

  return routedElement
}
