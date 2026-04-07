# CNX Nifty — Project Log

> Daily tracker so we never restart from scratch.
> **Next session: read this file FIRST.**

---

## Mission
Build cnxnifty.in into India's #1 trading intelligence platform.
Target: **₹1Cr/year** via AdSense + broker affiliates + premium tier.

---

## Stack
- Next.js 14 (Pages Router) + Tailwind CSS
- Hosted on Vercel (auto-deploy from GitHub `main` branch)
- Repo: github.com/sumant-gods-son/cnxnifty-web
- Domain: cnxnifty.in (verified in Google Search Console as domain property)
- Theme: dark (`neutral-950`) + emerald accents

---

## Status as of 2026-04-08

### LIVE & WORKING
- **Homepage** `/` — Full SEO landing page (16.5 KB, 950+ words)
  - H1, canonical, meta description, OG + Twitter cards
  - 2 JSON-LD blocks (WebSite + FAQPage schemas)
  - Hero, levels preview, 3 benefit cards, how-it-works, blog teaser, email capture form, 5-item FAQ accordion, footer
  - Audit: title ✅, 1 H1 ✅, canonical ✅, JSON-LD ✅, FAQ details ✅, email form ✅
- **Dashboard** `/dashboard` — Live Nifty 50 data
  - Pulls real NSE price (verified: 23123.65 on audit)
  - Renders S2/S1/Pivot/R1/R2 from classic pivot formula `P=(H+L+C)/3`
  - Day high/low, last updated timestamp
- **Blog #1** `/blog/nifty-50-support-and-resistance-today`
  - 1826 words, 1 H1, canonical, 2 JSON-LD, table, dashboard CTA
  - Submitted to GSC, indexing requested
- **sitemap.xml** — 3 URLs (after fix on 2026-04-08), priorities set
- **robots.txt** — `Allow: /` + sitemap pointer
- **og-image.png** — 200 OK, image/png

### GSC STATUS
- Domain property `sc-domain:cnxnifty.in` verified
- Homepage: indexed, re-requested 2026-04-08
- Blog #1: indexing requested
- Sitemap submitted

---

## Decisions Log
- **Pivot formula**: classic, not Fibonacci/Camarilla (most-searched + simplest to explain)
- **Theme**: dark + emerald — stands out in trading niche dominated by green/red
- **No paywall yet**: focus is SEO traffic first, monetization at 1k+ daily users
- **Email capture**: Formspree placeholder (`YOUR_FORM_ID`) — needs real ID
- **No analytics yet**: GSC + Vercel analytics enough until traffic warrants GA4
- **Pages Router**: keeping Pages over App Router for stability/simplicity

---

## Outstanding TODOs (priority order)

### P0 — This week
1. Replace Formspree `YOUR_FORM_ID` with a real form ID (5 min, manual signup at formspree.io)
2. Build `/blog` index page (lists all posts) — currently no listing
3. Publish Blog #2: "Bank Nifty Option Chain Analysis: PCR, OI & Max Pain Explained"
4. Add 3 high-traffic calculator tools (see strategy section in chat history)

### P1 — Next 2 weeks
5. Privacy Policy + Terms + About + Contact pages (AdSense requirement)
6. Apply for Google AdSense (need 10–15 quality posts first)
7. Add Zerodha / Upstox / Angel One affiliate signup links + dedicated comparison page
8. Publish Blogs #3–#10 (1 per day cadence)

### P2 — Month 2+
9. Build `/dashboard/pro` premium tier (₹299/mo, Razorpay)
10. WhatsApp + Telegram alert bots (broker affiliate + premium upsell)
11. Sector heatmap, FII/DII flows, gainers/losers pages
12. Backtest tool / strategy builder

---

## Reusable Automation Recipes

### Commit a file via GitHub web UI (no terminal needed)
1. Navigate to `https://github.com/sumant-gods-son/cnxnifty-web/edit/main/<path>`
2. Inject content into CodeMirror 6 editor:
   - Focus `.cm-content` (it's a contenteditable div, NOT a textarea)
   - Use Selection API → `selectNodeContents` → `document.execCommand('insertText', false, content)`
3. For files > 5 KB: split base64 into chunks, push to `window.__chunks`, decode with `Uint8Array.from(atob(s), c=>c.charCodeAt(0))` + `TextDecoder('utf-8')`
4. Click "Commit changes…" → "Commit changes" in dialog
5. Vercel auto-deploys in ~40 seconds
6. Verify live: navigate + check `document.title`

### CRITICAL: UTF-8 fix
Bare `atob()` returns Latin-1 bytes — multi-byte chars (©, ·, —, ₹) become mojibake.
Always decode through `TextDecoder('utf-8')` before injecting.

---

## Revenue Model (90-day plan)

| Lane | Expected Monthly | Unlocks at |
|---|---|---|
| AdSense | ₹40k–₹80k | 30k+ pageviews/mo |
| Broker affiliates (Zerodha/Upstox) | ₹50k–₹2L | 50+ signups/mo |
| Premium (₹299/mo) | ₹50k–₹5L | 200–1500 paid users |
| **TOTAL @ scale** | **₹1.4L–₹7.8L** | Months 4–9 |

---

## Next Session — START HERE
1. Re-read this file
2. Check: did Blog #1 + homepage rank for any keyword in GSC (Performance tab)?
3. Continue P0 list — calculators are the highest-leverage next move
4. Update this log at end of every session

---

_Last updated: 2026-04-08_
