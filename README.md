# United Voices Interpretation

Single-page landing site for **United Voices Interpretation** built with **Vite + React + Tailwind CSS**.

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Build and Preview

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Content and Settings You May Edit

- Main page content and section cards:
  - `/Users/user/Documents/united-voices/src/App.tsx`
- Contact placeholders (email + WhatsApp):
  - `/Users/user/Documents/united-voices/src/App.tsx` in the `Contact` section
- SEO tags (`title`, description, Open Graph, canonical URL):
  - `/Users/user/Documents/united-voices/index.html`
- Favicon placeholder:
  - `/Users/user/Documents/united-voices/public/favicon.svg`

## Deployment

Production deployment is done with Vercel:

```bash
vercel deploy --prod -y
```

Live URL (updated after deployment):

- `https://united-voices.vercel.app`
