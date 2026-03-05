# United Voices Interpretation

Multi-page SEO-focused website for **United Voices Interpretation** built with **Vite + React + Tailwind CSS**.

## What Is Implemented

- Multi-page SEO routes:
  - `/`
  - `/contact`
  - `/services/simultaneous-interpretation-mexico-city`
  - `/services/consecutive-interpretation-mexico-city`
  - `/services/remote-interpretation-mexico-city`
  - `/services/subtitling-voiceover-mexico-city`
  - `/industries/legal-interpretation-mexico-city`
  - `/industries/healthcare-interpretation-mexico-city`
- Dynamic SEO metadata per route (title, description, canonical, OG/Twitter).
- JSON-LD structured data (Organization, ProfessionalService, Service, FAQPage).
- Technical SEO files:
  - `/public/robots.txt`
  - `/public/sitemap.xml`
- SPA route rewrites for Vercel via `vercel.json`.
- Contact section with owner avatar + working form submit flow.

## Local Development

```bash
npm install
npm run dev
```

## Build and Preview

```bash
npm run build
npm run preview
```

## SEO / Domain Environment Variables

```bash
VITE_SITE_URL=https://unitedvoicesmx.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GOOGLE_SITE_VERIFICATION=google-verification-token
VITE_BING_SITE_VERIFICATION=bing-verification-token
```

## Domain + Tooling Setup Docs

- Domain + Search Console + GA4 workflow:
  - `/Users/user/Documents/united-voices/docs/seo-operations.md`
- Google Business Profile content pack:
  - `/Users/user/Documents/united-voices/docs/google-business-profile-pack.md`

## Free SEO Tool Stack

- Google Search Console
- Google Analytics (GA4)
- Google Business Profile
- Bing Webmaster Tools

## Optional Paid Tools

- Ahrefs
- Semrush
- Screaming Frog

## Live URL (Current)

- Primary domain: `https://unitedvoicesmx.com` (after DNS propagation)
- Vercel fallback: `https://united-voices.vercel.app`
