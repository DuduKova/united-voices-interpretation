# SEO Operations Checklist (United Voices)

## 1) Domain Setup on Vercel (Custom .com)

Status: `unitedvoicesmx.com` and `www.unitedvoicesmx.com` are already added in Vercel.

1. At Porkbun, set these DNS records:

```text
A @ 76.76.21.21
A www 76.76.21.21
```

2. Wait for propagation and verify from project root:

```bash
vercel domains inspect unitedvoicesmx.com
vercel domains inspect www.unitedvoicesmx.com
```

3. `www` redirect to apex is enforced via `vercel.json`:
- `www.unitedvoicesmx.com/* -> https://unitedvoicesmx.com/*`

## 2) Environment Variables (SEO + Tracking)

Set these in Vercel project settings or `.env` locally:

```bash
VITE_SITE_URL=https://unitedvoicesmx.com
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_GOOGLE_SITE_VERIFICATION=google-verification-token
VITE_BING_SITE_VERIFICATION=bing-verification-token
```

## 3) Google Search Console

1. Add property for `https://unitedvoicesmx.com`.
2. Verify using HTML meta token (already supported in app via env var).
3. Submit sitemap:

```text
https://unitedvoicesmx.com/sitemap.xml
```

4. Request indexing for:
- `/`
- `/contact`
- all `/services/*` pages
- all `/industries/*` pages

## 4) Google Analytics (GA4)

1. Create GA4 property.
2. Copy measurement ID (`G-...`).
3. Set `VITE_GA_MEASUREMENT_ID`.
4. Redeploy.

## 5) Weekly SEO Review

Track these metrics each week:
- Impressions
- Clicks
- Average Position
- CTR
- Quote submissions (form sends)

Decision rule:
- High impressions + low CTR: rewrite title/meta.
- Good CTR + low rank: expand page depth and internal links.
