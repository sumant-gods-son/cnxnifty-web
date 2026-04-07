import Link from "next/link";
import Head from "next/head";

const TITLE = "CNX Nifty — Live Nifty 50 Support, Resistance & Pivot Levels (Free)";
const DESCRIPTION =
  "Free live Nifty 50 dashboard with daily support, resistance and pivot levels for Indian traders. Real-time NSE data, classic pivot formula, options-trader friendly. Updated every minute.";
const URL = "https://cnxnifty.in/";
const OG_IMAGE = "https://cnxnifty.in/og-image.png";

const FAQ = [
  {
    q: "What is CNX Nifty?",
    a: "CNX Nifty is a free live dashboard for Indian traders. It shows the current Nifty 50 price, day high, day low, and the five classic pivot levels (S2, S1, Pivot, R1, R2) recalculated every minute from official NSE data so you can plan intraday and swing trades with confidence.",
  },
  {
    q: "Is CNX Nifty really free?",
    a: "Yes. The live dashboard, support and resistance levels, and the trading guides on this site are 100% free. We may add a premium tier later for advanced option-chain analytics, but the core data will always remain free for retail Indian traders.",
  },
  {
    q: "How are the support and resistance levels calculated?",
    a: "We use the classic pivot point formula favoured by Indian institutional desks: Pivot = (High + Low + Close) / 3, then derive R1, R2, S1 and S2 from yesterday's session. This is the same method professional Nifty option writers use to set strikes.",
  },
  {
    q: "Which traders is this dashboard built for?",
    a: "Indian intraday traders, Nifty option buyers and sellers, swing traders, and anyone tracking the Nifty 50 index. It is especially useful for option writers who want objective R2 and S2 strikes for iron condors and credit spreads.",
  },
  {
    q: "How often does the data update?",
    a: "Live price, day high and day low refresh roughly every 60 seconds during market hours (9:15 AM to 3:30 PM IST). Pivot levels are calculated once per session at the open and remain valid the entire trading day.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CNX Nifty",
  url: URL,
  description: DESCRIPTION,
  potentialAction: {
    "@type": "SearchAction",
    target: "https://cnxnifty.in/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CNX Nifty" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        {/* NAV */}
        <nav className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              CNX <span className="text-emerald-400 italic">Nifty</span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/dashboard" className="text-neutral-300 hover:text-white">
                Dashboard
              </Link>
              <Link
                href="/blog/nifty-50-support-and-resistance-today"
                className="text-neutral-300 hover:text-white"
              >
                Blog
              </Link>
              <Link
                href="/dashboard"
                className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-semibold rounded-md transition"
              >
                Open App
              </Link>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-12 text-center">
          <span className="inline-block px-3 py-1 mb-5 text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-400/20 rounded-full">
            Free · Live NSE Data · Built for Indian Traders
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Live Nifty 50 Support, Resistance
            <br />
            <span className="text-emerald-400">&amp; Pivot Levels — Free</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto">
            Stop guessing. Get the exact S1, S2, Pivot, R1 and R2 levels every Indian
            options trader uses to plan entries, stop-losses and targets — updated every
            minute from live NSE data.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg transition"
            >
              Open Live Dashboard →
            </Link>
            <Link
              href="/blog/nifty-50-support-and-resistance-today"
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 font-semibold rounded-lg transition"
            >
              Read the Pivot Guide
            </Link>
          </div>
        </section>

        {/* LIVE LEVELS PREVIEW */}
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Today&apos;s Sample Levels
                </p>
                <p className="text-sm text-neutral-400 mt-1">
                  Classic pivot formula · See live values on the dashboard
                </p>
              </div>
              <Link
                href="/dashboard"
                className="text-sm text-emerald-400 hover:text-emerald-300"
              >
                Live →
              </Link>
            </div>
            <div className="grid grid-cols-5 gap-2 md:gap-4">
              {[
                { label: "S2", value: "22,381", color: "text-rose-400" },
                { label: "S1", value: "22,674", color: "text-rose-300" },
                { label: "Pivot", value: "22,836", color: "text-amber-300" },
                { label: "R1", value: "23,130", color: "text-emerald-300" },
                { label: "R2", value: "23,291", color: "text-emerald-400" },
              ].map((l) => (
                <div
                  key={l.label}
                  className="rounded-lg border border-white/10 bg-neutral-900 p-3 md:p-4 text-center"
                >
                  <p className="text-[10px] md:text-xs uppercase text-neutral-500">
                    {l.label}
                  </p>
                  <p className={`mt-1 font-bold text-sm md:text-xl ${l.color}`}>
                    {l.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="max-w-6xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-center mb-2">
            Why traders use CNX Nifty
          </h2>
          <p className="text-center text-neutral-400 mb-10">
            Built by traders, for traders. No fluff, no upsells, no noise.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-emerald-400 text-2xl mb-3">⚡</div>
              <h3 className="font-bold text-lg mb-2">Real-time NSE data</h3>
              <p className="text-sm text-neutral-400">
                Live Nifty 50 price, day high and day low refreshed every 60 seconds
                during market hours — no manual refresh, no stale numbers.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-emerald-400 text-2xl mb-3">🎯</div>
              <h3 className="font-bold text-lg mb-2">Pivot-based S/R</h3>
              <p className="text-sm text-neutral-400">
                The same classic pivot formula used by professional option writers
                in India — no black-box indicators, just battle-tested math.
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6">
              <div className="text-emerald-400 text-2xl mb-3">🇮🇳</div>
              <h3 className="font-bold text-lg mb-2">Built for Indian traders</h3>
              <p className="text-sm text-neutral-400">
                NSE timings, IST clock, Nifty-first design. No US tickers, no irrelevant
                noise — just what you need to trade the Indian market.
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                n: "1",
                t: "Open the dashboard",
                d: "Live Nifty 50 price loads instantly with today's day high and day low from NSE.",
              },
              {
                n: "2",
                t: "Read your levels",
                d: "S2, S1, Pivot, R1 and R2 are pre-calculated. No spreadsheet, no math, no waiting.",
              },
              {
                n: "3",
                t: "Plan your trade",
                d: "Use S1/R1 as first targets, S2/R2 as stops or strike-writing zones for options.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-6"
              >
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-neutral-950 font-bold flex items-center justify-center mb-4">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg mb-2">{s.t}</h3>
                <p className="text-sm text-neutral-400">{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* LATEST FROM BLOG */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-3xl font-bold">Latest from the blog</h2>
            <Link
              href="/blog/nifty-50-support-and-resistance-today"
              className="text-sm text-emerald-400 hover:text-emerald-300"
            >
              All posts →
            </Link>
          </div>
          <Link
            href="/blog/nifty-50-support-and-resistance-today"
            className="block rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:border-emerald-400/30 transition"
          >
            <p className="text-xs uppercase tracking-wider text-emerald-400 mb-2">
              Trading Guide
            </p>
            <h3 className="text-2xl font-bold mb-2">
              Nifty 50 Support and Resistance Today: Levels, Strategy &amp; Pivot Guide
            </h3>
            <p className="text-neutral-400 text-sm">
              The complete beginner-friendly guide to calculating, reading and trading
              today&apos;s Nifty 50 support and resistance levels using the classic
              pivot formula. Includes a worked example and the 5 most common mistakes.
            </p>
            <p className="mt-4 text-sm text-emerald-400">Read the guide →</p>
          </Link>
        </section>

        {/* EMAIL CAPTURE */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Tomorrow&apos;s Nifty levels in your inbox
            </h2>
            <p className="text-neutral-400 mb-6 max-w-xl mx-auto">
              Get S1, S2, Pivot, R1 and R2 every morning at 8:30 AM IST — before the
              market opens. Free, no spam, unsubscribe anytime.
            </p>
            <form
              action="https://formspree.io/f/YOUR_FORM_ID"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="flex-1 px-4 py-3 rounded-lg bg-neutral-900 border border-white/10 focus:border-emerald-400 focus:outline-none text-sm"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-400 text-neutral-950 font-bold rounded-lg transition text-sm"
              >
                Get Free Levels
              </button>
            </form>
            <p className="text-xs text-neutral-500 mt-4">
              Joining 100+ Indian traders who plan their day with CNX Nifty.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto px-6 pb-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently asked questions
          </h2>
          <div className="space-y-4">
            {FAQ.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/10 bg-white/[0.02] p-5"
              >
                <summary className="font-semibold cursor-pointer list-none flex items-center justify-between">
                  <span>{f.q}</span>
                  <span className="text-emerald-400 text-xl group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-neutral-400">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-500">
            <p>
              © 2026 CNX Nifty · Built for Indian traders ·{" "}
              <Link href="/dashboard" className="hover:text-emerald-400">
                Dashboard
              </Link>{" "}
              ·{" "}
              <Link
                href="/blog/nifty-50-support-and-resistance-today"
                className="hover:text-emerald-400"
              >
                Blog
              </Link>
            </p>
            <p className="text-xs">
              Disclaimer: Educational content only. Not investment advice.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
