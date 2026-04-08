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

## Status as of 2026-04-09

### LIVE & WORKING
- **Homepage** `/` — Full SEO landing page (16.5 KB, 950+ words)
  - H1, canonical, meta description, OG + Twitter cards
  - 2 JSON-LD blocks (WebSite + FAQPage schemas)
  - Hero, levels preview, 3 benefit cards, how-it-works, blog teaser, email capture form, 5-item FAQ accordion, footer
- **Dashboard** `/dashboard` — Live Nifty 50 data with S2/S1/Pivot/R1/R2, day high/low
- **Blog #1** `/blog/nifty-50-support-and-resistance-today` — 1826 words, FAQPage + Article JSON-LD
- **Tool #1** `/tools/brokerage-calculator` ⭐ NEW 2026-04-09
  - 19.7 KB, ~1200 words, 4 brokers (Zerodha, Upstox, Angel One, Groww)
  - Interactive: segment selector (delivery/intraday/futures/options), buy/sell/qty inputs
  - Computes brokerage + STT + exch + SEBI + GST 18% + stamp duty → net P&L per broker
  - 4 affiliate buttons (`rel="noopener noreferrer sponsored"`)
  - WebApplication + FAQPage JSON-LD, 6-item FAQ accordion
  - Verified live: title ✅, canonical ✅, JSON-LD ✅ (2 blocks), 4 broker rows ✅, 4 sponsored links ✅, ₹ rendering ✅
- **sitemap.xml** — 4 URLs (added brokerage-calculator 2026-04-09), all lastmod=2026-04-09
- **robots.txt** — `Allow: /` + sitemap pointer
- **og-image.png** — 200 OK, image/png

### GSC STATUS
- Domain property `sc-domain:cnxnifty.in` verified
- Homepage: indexed, 93 total clicks on site (Overview as of 2026-04-09)
- Blog #1: indexing requested
- Brokerage Calculator: indexing requested 2026-04-09 ("URL added to priority crawl queue")
- Sitemap resubmitted 2026-04-09 (live fetch confirms 4 URLs)

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
4. Build Calculator #2: **Position Size Calculator** (stop-loss based risk sizing) — highest intent
5. Build Calculator #3: **Pivot Point Calculator** (classic/Fibonacci/Camarilla toggle) — huge search volume
6. Add header/nav link to Brokerage Calculator from homepage (boost internal linking)
7. Update real broker affiliate IDs on `/tools/brokerage-calculator` (currently generic links)

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

_Last updated: 2026-04-09 — shipped Brokerage Calculator (calc #1 of 6)._
