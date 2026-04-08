import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";

const TITLE = "Brokerage Calculator 2026 — Zerodha vs Upstox vs Angel One vs Groww | CNX Nifty";
const DESCRIPTION = "Free brokerage calculator for Indian traders. Compare Zerodha, Upstox, Angel One and Groww charges for equity delivery, intraday and F&O. Live STT, GST, stamp duty, SEBI fees — know your exact net profit before placing a trade.";
const URL = "https://cnxnifty.in/tools/brokerage-calculator";
const OG_IMAGE = "https://cnxnifty.in/og-image.png";

// Broker brokerage rules (as commonly published). Traders should verify on broker site before trading.
const BROKERS = [
  {
    key: "zerodha",
    name: "Zerodha",
    affiliate: "https://zerodha.com/open-account",
    rules: {
      delivery: (t) => 0,
      intraday: (t) => Math.min(20, t * 0.0003),
      futures:  (t) => Math.min(20, t * 0.0003),
      options:  () => 20,
    },
  },
  {
    key: "upstox",
    name: "Upstox",
    affiliate: "https://upstox.com/open-account/",
    rules: {
      delivery: (t) => Math.min(20, t * 0.025),
      intraday: (t) => Math.min(20, t * 0.0005),
      futures:  (t) => Math.min(20, t * 0.0005),
      options:  () => 20,
    },
  },
  {
    key: "angelone",
    name: "Angel One",
    affiliate: "https://www.angelone.in/open-demat-account",
    rules: {
      delivery: (t) => Math.min(20, t * 0.0025),
      intraday: (t) => Math.min(20, t * 0.0025),
      futures:  (t) => Math.min(20, t * 0.0025),
      options:  () => 20,
    },
  },
  {
    key: "groww",
    name: "Groww",
    affiliate: "https://groww.in/open-demat-account",
    rules: {
      delivery: (t) => Math.min(20, t * 0.001),
      intraday: (t) => Math.min(20, t * 0.0005),
      futures:  (t) => Math.min(20, t * 0.0005),
      options:  () => 20,
    },
  },
];

function govCharges(segment, buyVal, sellVal) {
  const turnover = buyVal + sellVal;
  let stt = 0, exch = 0, stamp = 0;
  if (segment === "delivery") {
    stt = (buyVal + sellVal) * 0.001;
    exch = turnover * 0.0000325;
    stamp = buyVal * 0.00015;
  } else if (segment === "intraday") {
    stt = sellVal * 0.00025;
    exch = turnover * 0.0000325;
    stamp = buyVal * 0.00003;
  } else if (segment === "futures") {
    stt = sellVal * 0.0002;
    exch = turnover * 0.0000190;
    stamp = buyVal * 0.00002;
  } else if (segment === "options") {
    stt = sellVal * 0.001;
    exch = turnover * 0.0005;
    stamp = buyVal * 0.00003;
  }
  const sebi = turnover * 0.000001;
  return { stt, exch, stamp, sebi, turnover };
}

const FAQ = [
  {
    q: "What is a brokerage calculator?",
    a: "A brokerage calculator shows you the exact charges a stockbroker and the government will deduct from a trade before you place the order. It adds up brokerage, STT, exchange transaction charges, GST, SEBI turnover fee and stamp duty so you know your true net profit or loss."
  },
  {
    q: "Which broker has the lowest brokerage in India in 2026?",
    a: "For equity delivery, Zerodha charges zero brokerage, which makes it one of the cheapest for long-term investors. For intraday and F&O, Zerodha, Upstox, Angel One and Groww all cap their per-order brokerage at ₹20, so costs are similar. Government charges like STT and GST are identical across all brokers."
  },
  {
    q: "Are the charges same for delivery, intraday and F&O?",
    a: "No. Delivery trades have the highest STT (0.1% on both buy and sell) but zero brokerage on Zerodha. Intraday has lower STT but higher stamp duty impact per turnover. F&O Options have the steepest STT on the sell side (0.1% of premium) plus exchange charges of around 0.05%."
  },
  {
    q: "Why is my net profit lower than (sell price minus buy price)?",
    a: "Because transaction costs are layered on top. A typical intraday trade on ₹1 lakh turnover attracts around ₹20 brokerage, ₹25 STT, ₹3 exchange fee, 18% GST on brokerage and exchange charges, SEBI fee and stamp duty. That can eat 0.05–0.15% of your turnover before you calculate profit."
  },
  {
    q: "Does CNX Nifty charge anything for using this calculator?",
    a: "No. The brokerage calculator on cnxnifty.in is completely free. We do not store your trade data — everything is calculated in your browser."
  },
  {
    q: "Which broker should I open an account with?",
    a: "Pick based on how you trade. Long-term investors doing mostly delivery benefit most from Zerodha (zero delivery brokerage). Intraday and options traders can choose any discount broker since per-order charges are identical — the tiebreaker becomes platform speed, margin policies and customer support."
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQ.map(f => ({
    "@type": "Question",
    "name": f.q,
    "acceptedAnswer": { "@type": "Answer", "text": f.a }
  }))
};

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "CNX Nifty Brokerage Calculator",
  "url": URL,
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Any",
  "offers": { "@type": "Offer", "price": "0", "priceCurrency": "INR" },
  "description": DESCRIPTION
};

function formatINR(n) {
  if (!isFinite(n)) return "—";
  return "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 2, minimumFractionDigits: 2 });
}

export default function BrokerageCalculator() {
  const [segment, setSegment] = useState("delivery");
  const [buy, setBuy] = useState("100");
  const [sell, setSell] = useState("105");
  const [qty, setQty] = useState("100");

  const results = useMemo(() => {
    const b = parseFloat(buy) || 0;
    const s = parseFloat(sell) || 0;
    const q = parseFloat(qty) || 0;
    const buyVal = b * q;
    const sellVal = s * q;
    const gov = govCharges(segment, buyVal, sellVal);
    const grossPL = sellVal - buyVal;
    return BROKERS.map(br => {
      const brokerage = br.rules[segment](gov.turnover) + br.rules[segment](gov.turnover) * 0; // buy + sell? simplify to per-side: we call twice
      // recompute: per-side brokerage
      const brBuy = br.rules[segment](buyVal);
      const brSell = br.rules[segment](sellVal);
      const brTotal = brBuy + brSell;
      const gstBase = brTotal + gov.exch + gov.sebi;
      const gst = gstBase * 0.18;
      const totalCharges = brTotal + gov.stt + gov.exch + gov.sebi + gov.stamp + gst;
      const netPL = grossPL - totalCharges;
      return {
        key: br.key,
        name: br.name,
        affiliate: br.affiliate,
        brokerage: brTotal,
        stt: gov.stt,
        exch: gov.exch,
        sebi: gov.sebi,
        stamp: gov.stamp,
        gst,
        total: totalCharges,
        netPL,
        grossPL,
      };
    });
  }, [segment, buy, sell, qty]);

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index,follow,max-image-preview:large" />
        <meta name="theme-color" content="#0a0a0a" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CNX Nifty" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <div className="min-h-screen bg-neutral-950 text-neutral-100">
        <nav className="border-b border-white/5">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="font-bold text-emerald-400">CNX Nifty</Link>
            <div className="flex gap-5 text-sm text-neutral-300">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link href="/tools/brokerage-calculator" className="hover:text-white">Tools</Link>
              <Link href="/blog/nifty-50-support-and-resistance-today" className="hover:text-white">Blog</Link>
            </div>
          </div>
        </nav>

        <section className="max-w-6xl mx-auto px-4 pt-14 pb-6">
          <div className="inline-block text-xs tracking-wide px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-400/20 mb-4">
            Free · Updated for 2026 · All Indian brokers
          </div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Brokerage Calculator — Zerodha vs Upstox vs Angel One vs Groww
          </h1>
          <p className="mt-4 text-neutral-300 text-lg max-w-3xl">
            Compare exact brokerage, STT, GST, SEBI, stamp duty and exchange charges across India&apos;s top discount brokers. Know your real net profit before you place the trade.
          </p>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-8">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-2">Segment</label>
                <select
                  value={segment}
                  onChange={(e) => setSegment(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white"
                >
                  <option value="delivery">Equity Delivery</option>
                  <option value="intraday">Equity Intraday</option>
                  <option value="futures">F&amp;O Futures</option>
                  <option value="options">F&amp;O Options</option>
                </select>
              </div>
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-2">Buy Price (₹)</label>
                <input
                  type="number"
                  value={buy}
                  onChange={(e) => setBuy(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-2">Sell Price (₹)</label>
                <input
                  type="number"
                  value={sell}
                  onChange={(e) => setSell(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-neutral-400 mb-2">Quantity</label>
                <input
                  type="number"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-white"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 pb-10">
          <h2 className="text-2xl font-bold mb-4">Cost &amp; Net Profit by Broker</h2>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-neutral-300">
                <tr>
                  <th className="text-left px-4 py-3">Broker</th>
                  <th className="text-right px-4 py-3">Brokerage</th>
                  <th className="text-right px-4 py-3">STT</th>
                  <th className="text-right px-4 py-3">Exch + SEBI</th>
                  <th className="text-right px-4 py-3">GST</th>
                  <th className="text-right px-4 py-3">Stamp</th>
                  <th className="text-right px-4 py-3">Total Cost</th>
                  <th className="text-right px-4 py-3">Net P&amp;L</th>
                  <th className="text-right px-4 py-3">Open</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r) => (
                  <tr key={r.key} className="border-t border-white/5">
                    <td className="px-4 py-3 font-medium">{r.name}</td>
                    <td className="px-4 py-3 text-right">{formatINR(r.brokerage)}</td>
                    <td className="px-4 py-3 text-right">{formatINR(r.stt)}</td>
                    <td className="px-4 py-3 text-right">{formatINR(r.exch + r.sebi)}</td>
                    <td className="px-4 py-3 text-right">{formatINR(r.gst)}</td>
                    <td className="px-4 py-3 text-right">{formatINR(r.stamp)}</td>
                    <td className="px-4 py-3 text-right font-semibold">{formatINR(r.total)}</td>
                    <td className={"px-4 py-3 text-right font-semibold " + (r.netPL >= 0 ? "text-emerald-400" : "text-rose-400")}>
                      {formatINR(r.netPL)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={r.affiliate}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-block px-3 py-1.5 rounded-md bg-emerald-500 text-neutral-950 font-semibold text-xs hover:bg-emerald-400"
                      >
                        Open Free Account
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-neutral-500">
            Charges shown are indicative, based on publicly listed brokerage plans as of 2026. Always verify with the broker before placing a trade.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-4">How brokerage is calculated in India</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Every trade on an Indian stock exchange has two layers of charges. The first is your broker&apos;s own brokerage — a flat fee or a percentage of turnover, whichever is lower. Discount brokers like Zerodha, Upstox, Angel One and Groww cap this at ₹20 per order for most segments, while full-service brokers charge significantly more.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            The second layer is government and exchange charges, which are identical across brokers and include Securities Transaction Tax (STT), exchange transaction charges levied by NSE or BSE, SEBI turnover fees, GST at 18% on the sum of brokerage and exchange charges, and state-specific stamp duty. These are unavoidable and form the bulk of your cost on large trades.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            For equity delivery, STT is the biggest hit at 0.1% on both the buy and sell legs, but Zerodha charges zero brokerage for delivery — making it the cheapest option for long-term investors. For intraday and F&amp;O, all discount brokers charge the same ₹20 cap, so the real difference comes down to platform quality, margin policy and execution speed.
          </p>
          <p className="text-neutral-300 leading-relaxed">
            Our brokerage calculator above does the full math for you. Pick your segment, enter buy price, sell price and quantity, and you&apos;ll instantly see the net profit after every charge across all four brokers side by side.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Which broker is cheapest for you?</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            If you are mostly investing in stocks for the long term, Zerodha wins outright on equity delivery with zero brokerage. For active intraday traders, all four discount brokers charge the same ₹20 per order cap, so pick based on platform stability, margin offered, and the quality of their charting and order management tools. Options traders should focus on execution speed and margin benefit, as the per-order fee is identical at ₹20 flat.
          </p>
          <p className="text-neutral-300 leading-relaxed">
            Use our calculator to stress-test your own trade size. On a ₹5 lakh turnover intraday trade, the difference between brokers is usually less than ₹15 — but on a ₹50 lakh delivery trade, Zerodha can save you ₹1,000 or more versus brokers that charge 0.1% delivery brokerage.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Related tools on CNX Nifty</h2>
          <ul className="space-y-2 text-neutral-300">
            <li>→ <Link href="/dashboard" className="text-emerald-400 hover:underline">Live Nifty 50 Dashboard</Link> with daily support, resistance and pivot levels</li>
            <li>→ <Link href="/blog/nifty-50-support-and-resistance-today" className="text-emerald-400 hover:underline">Nifty 50 Support &amp; Resistance — Pivot Trading Guide</Link></li>
          </ul>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {FAQ.map((f, i) => (
              <details key={i} className="group rounded-lg border border-white/10 bg-white/5 px-4 py-3">
                <summary className="cursor-pointer font-medium list-none flex justify-between items-center">
                  <span>{f.q}</span>
                  <span className="text-emerald-400 text-xl group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-neutral-300 text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/5 mt-10">
          <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-neutral-400 flex flex-col md:flex-row justify-between gap-4">
            <div>© 2026 CNX Nifty · Built for Indian traders</div>
            <div className="flex gap-4">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link href="/tools/brokerage-calculator" className="hover:text-white">Brokerage Calculator</Link>
              <Link href="/blog/nifty-50-support-and-resistance-today" className="hover:text-white">Blog</Link>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 pb-8 text-xs text-neutral-500">
            Disclaimer: This calculator is for educational purposes only. Charges may change; verify with your broker before trading. CNX Nifty may earn a referral fee if you open an account through the links above.
          </div>
        </footer>
      </div>
    </>
  );
}
