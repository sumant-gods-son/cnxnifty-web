import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

const TITLE = "Position Size Calculator — Stop Loss & Risk Management | CNX Nifty";
const DESC = "Free position size calculator for Indian traders. Use the 1% risk rule to find the exact number of shares to buy based on your stop-loss. Works for equity, intraday, F&O — live R:R, max loss and required capital.";
const URL = "https://cnxnifty.in/tools/position-size-calculator";

const FAQ = [
  {
    q: "What is position sizing in trading?",
    a: "Position sizing is the process of deciding how many shares or lots to buy in a single trade so that your loss stays within a pre-defined limit if the stop-loss is hit. It is the single most important rule in risk management — more important than entry signals, charts, or news — because it is the only thing that protects your capital from a bad trade or a losing streak.",
  },
  {
    q: "What is the 1% rule in trading?",
    a: "The 1% rule says you should never risk more than 1% of your total trading capital on a single trade. If your account is ₹5,00,000, you never lose more than ₹5,000 per trade, no matter how confident you feel. With a 1% rule, you can have 20 losing trades in a row and still have 81% of your capital left to keep trading. Without it, three or four bad trades can wipe you out.",
  },
  {
    q: "How do I calculate position size with a stop-loss?",
    a: "The formula is: Position size = (Account × Risk%) ÷ (Entry − Stop). Example: account ₹5,00,000, risking 1% = ₹5,000. If you buy at ₹500 with a stop at ₹490, risk per share is ₹10, so you can buy ₹5,000 ÷ ₹10 = 500 shares. Our calculator above does this math instantly for long and short trades and rounds down to whole shares.",
  },
  {
    q: "What is a good risk-to-reward ratio?",
    a: "Most professional traders aim for a minimum R:R of 1:2, meaning the potential profit is at least twice the maximum loss. With a 1:2 R:R, you only need to be right 40% of the time to be profitable. A 1:3 R:R lets you be wrong 60% of the time and still make money. Always check R:R before entering a trade — if it is below 1:1.5, skip the trade.",
  },
  {
    q: "Does this work for intraday and F&O?",
    a: "Yes. The math is identical for equity delivery, intraday and F&O. For futures and options, just use the lot size × number of lots as your share count. The stop-loss and entry are still in rupees per unit. One thing to remember: intraday and F&O use margin, so the required capital shown is the position value — the actual margin you block with your broker is a fraction of that.",
  },
  {
    q: "Why should I round down the number of shares?",
    a: "Always round down so your actual risk never exceeds your planned risk. If the formula says 473.8 shares, buy 473 — not 474. This one habit protects you from accidentally exceeding your 1% rule on every trade and keeps your long-run risk clean.",
  },
];

export default function PositionSizeCalculator() {
  const [direction, setDirection] = useState("long");
  const [capital, setCapital] = useState(500000);
  const [riskPct, setRiskPct] = useState(1);
  const [entry, setEntry] = useState(500);
  const [stop, setStop] = useState(490);
  const [target, setTarget] = useState(520);

  const result = useMemo(() => {
    const cap = Number(capital) || 0;
    const rp = Number(riskPct) || 0;
    const e = Number(entry) || 0;
    const s = Number(stop) || 0;
    const t = Number(target) || 0;

    const capitalAtRisk = cap * (rp / 100);
    const riskPerShare = direction === "long" ? e - s : s - e;
    const rewardPerShare = direction === "long" ? t - e : e - t;

    const validStop = riskPerShare > 0;
    const shares = validStop ? Math.floor(capitalAtRisk / riskPerShare) : 0;
    const positionValue = shares * e;
    const maxLoss = shares * riskPerShare;
    const maxProfit = shares * rewardPerShare;
    const rr = riskPerShare > 0 && rewardPerShare > 0 ? rewardPerShare / riskPerShare : 0;
    const positionPct = cap > 0 ? (positionValue / cap) * 100 : 0;

    return {
      capitalAtRisk,
      riskPerShare,
      rewardPerShare,
      shares,
      positionValue,
      maxLoss,
      maxProfit,
      rr,
      positionPct,
      validStop,
    };
  }, [capital, riskPct, entry, stop, target, direction]);

  const inr = (n) =>
    "₹" +
    (Number(n) || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });

  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Position Size Calculator",
    url: URL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
    description: DESC,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESC} />
        <link rel="canonical" href={URL} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESC} />
        <meta property="og:url" content={URL} />
        <meta property="og:image" content="https://cnxnifty.in/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESC} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </Head>

      <div className="min-h-screen bg-neutral-950 text-white">
        <header className="border-b border-white/10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="font-bold text-lg">
              CNX <span className="text-emerald-400">Nifty</span>
            </Link>
            <nav className="flex gap-4 text-sm text-neutral-300">
              <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
              <Link href="/tools/brokerage-calculator" className="hover:text-white">Brokerage</Link>
              <Link href="/blog/nifty-50-support-and-resistance-today" className="hover:text-white">Blog</Link>
            </nav>
          </div>
        </header>

        <section className="max-w-3xl mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Position Size Calculator
          </h1>
          <p className="text-neutral-300 leading-relaxed mb-6">
            Find the exact number of shares to buy based on your stop-loss and the 1% risk rule.
            Works for equity delivery, intraday and F&amp;O. Live risk-to-reward ratio, max loss and required capital.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="grid grid-cols-2 gap-3 mb-5">
              <button
                onClick={() => setDirection("long")}
                className={
                  "rounded-lg py-2 font-medium border " +
                  (direction === "long"
                    ? "bg-emerald-500/20 border-emerald-400 text-emerald-300"
                    : "bg-white/5 border-white/10 text-neutral-300")
                }
              >
                Long (Buy)
              </button>
              <button
                onClick={() => setDirection("short")}
                className={
                  "rounded-lg py-2 font-medium border " +
                  (direction === "short"
                    ? "bg-rose-500/20 border-rose-400 text-rose-300"
                    : "bg-white/5 border-white/10 text-neutral-300")
                }
              >
                Short (Sell)
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-neutral-400">Account Capital (₹)</span>
                <input
                  type="number"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-400">Risk per trade (%)</span>
                <input
                  type="number"
                  step="0.1"
                  value={riskPct}
                  onChange={(e) => setRiskPct(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-400">Entry Price (₹)</span>
                <input
                  type="number"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-white"
                />
              </label>
              <label className="block">
                <span className="text-sm text-neutral-400">Stop Loss (₹)</span>
                <input
                  type="number"
                  value={stop}
                  onChange={(e) => setStop(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-white"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="text-sm text-neutral-400">Target Price (₹) — optional</span>
                <input
                  type="number"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="mt-1 w-full rounded-lg bg-neutral-900 border border-white/10 px-3 py-2 text-white"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-8">
          <div className="rounded-2xl border border-emerald-400/30 bg-emerald-500/5 p-6">
            <h2 className="text-xl font-bold mb-4 text-emerald-300">Your Position Plan</h2>
            {!result.validStop && (
              <p className="text-rose-300 text-sm mb-4">
                ⚠ Invalid stop-loss for a {direction} trade. For long, stop must be below entry. For short, stop must be above entry.
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-neutral-400">Shares to buy</div>
                <div className="text-2xl font-bold text-white">{result.shares.toLocaleString("en-IN")}</div>
              </div>
              <div>
                <div className="text-neutral-400">Capital at risk</div>
                <div className="text-xl font-semibold">{inr(result.capitalAtRisk)}</div>
              </div>
              <div>
                <div className="text-neutral-400">Risk / share</div>
                <div className="text-xl font-semibold">{inr(Math.max(result.riskPerShare, 0))}</div>
              </div>
              <div>
                <div className="text-neutral-400">Position value</div>
                <div className="text-xl font-semibold">{inr(result.positionValue)}</div>
              </div>
              <div>
                <div className="text-neutral-400">Max loss</div>
                <div className="text-xl font-semibold text-rose-300">{inr(result.maxLoss)}</div>
              </div>
              <div>
                <div className="text-neutral-400">Max profit</div>
                <div className="text-xl font-semibold text-emerald-300">{inr(Math.max(result.maxProfit, 0))}</div>
              </div>
              <div>
                <div className="text-neutral-400">Risk : Reward</div>
                <div className="text-xl font-semibold">
                  {result.rr > 0 ? "1 : " + result.rr.toFixed(2) : "—"}
                </div>
              </div>
              <div>
                <div className="text-neutral-400">% of capital used</div>
                <div className="text-xl font-semibold">{result.positionPct.toFixed(1)}%</div>
              </div>
            </div>
            <p className="mt-5 text-xs text-neutral-400 leading-relaxed">
              Shares are rounded down so your actual risk never exceeds your planned risk.
              For F&amp;O, multiply entry by lot size and treat "shares" as units.
            </p>
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">How to size a trade in 4 steps</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Position sizing is the single most important rule in trading. It matters more than your entry signal, more than your chart pattern, and more than the news. Most retail traders blow up not because they pick bad trades but because they bet too big on each one. The 1% rule fixes this permanently, and the math takes ten seconds to run.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Step one: decide your maximum risk per trade as a percentage of your capital. Beginners should start with 0.5% to 1%. Experienced traders with a proven edge can scale up to 2%, but never more. If you trade with 1% risk, you can be wrong 20 times in a row and still keep 81% of your account. That is what survival looks like in this business.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Step two: define your stop-loss before you enter. The stop must be based on the chart — a swing low for long trades, a swing high for short trades, or a technical level like a pivot or moving average. Never set a stop based on a round number like "2% below entry" unless that happens to align with a real level. A stop that is too tight will get hit by noise; a stop that is too loose will give back your winners.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Step three: calculate risk per share as the distance between entry and stop. Step four: divide your capital at risk by the risk per share to get the exact number of shares. Round down to protect yourself from any rounding error. That is it. Our calculator above does all four steps instantly — you just type in the numbers.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Real examples for Indian traders</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-white/10 rounded-lg overflow-hidden">
              <thead className="bg-white/5 text-neutral-300">
                <tr>
                  <th className="px-3 py-2 text-left">Account</th>
                  <th className="px-3 py-2 text-left">Risk %</th>
                  <th className="px-3 py-2 text-left">Entry</th>
                  <th className="px-3 py-2 text-left">Stop</th>
                  <th className="px-3 py-2 text-left">Shares</th>
                  <th className="px-3 py-2 text-left">Max Loss</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                <tr>
                  <td className="px-3 py-2">₹1,00,000</td>
                  <td className="px-3 py-2">1%</td>
                  <td className="px-3 py-2">₹500</td>
                  <td className="px-3 py-2">₹490</td>
                  <td className="px-3 py-2">100</td>
                  <td className="px-3 py-2">₹1,000</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">₹5,00,000</td>
                  <td className="px-3 py-2">1%</td>
                  <td className="px-3 py-2">₹500</td>
                  <td className="px-3 py-2">₹490</td>
                  <td className="px-3 py-2">500</td>
                  <td className="px-3 py-2">₹5,000</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">₹10,00,000</td>
                  <td className="px-3 py-2">0.5%</td>
                  <td className="px-3 py-2">₹1,200</td>
                  <td className="px-3 py-2">₹1,180</td>
                  <td className="px-3 py-2">250</td>
                  <td className="px-3 py-2">₹5,000</td>
                </tr>
                <tr>
                  <td className="px-3 py-2">₹25,00,000</td>
                  <td className="px-3 py-2">1%</td>
                  <td className="px-3 py-2">₹2,500</td>
                  <td className="px-3 py-2">₹2,450</td>
                  <td className="px-3 py-2">500</td>
                  <td className="px-3 py-2">₹25,000</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-neutral-400 text-xs mt-3">
            Notice how the tighter the stop, the bigger the position. This is the real power of position sizing — tighter stops mean more shares with the same dollar risk, which means bigger potential rewards.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Why most traders ignore position sizing</h2>
          <p className="text-neutral-300 leading-relaxed mb-4">
            Here is the uncomfortable truth: most retail traders in India trade far too large on every position, often risking 10% to 20% of their capital on a single idea. They do this because small positions feel boring and big positions feel exciting. But the market does not care about your feelings — it will punish oversized bets with mathematical certainty.
          </p>
          <p className="text-neutral-300 leading-relaxed mb-4">
            The professionals who last decades in this business all follow the same core rule: small risk per trade, many trades, let probability do the work. You do not need to predict the market correctly most of the time. You just need to survive long enough for your edge — whatever it is — to play out across hundreds of trades. Position sizing is what keeps you in the game.
          </p>
        </section>

        <section className="max-w-3xl mx-auto px-4 py-6">
          <h2 className="text-2xl font-bold mb-4">Related tools on CNX Nifty</h2>
          <ul className="space-y-2 text-neutral-300">
            <li>→ <Link href="/tools/brokerage-calculator" className="text-emerald-400 hover:underline">Brokerage Calculator</Link> — compare Zerodha, Upstox, Angel One and Groww charges before you place the trade</li>
            <li>→ <Link href="/dashboard" className="text-emerald-400 hover:underline">Live Nifty 50 Dashboard</Link> — today&apos;s support, resistance and pivot levels</li>
            <li>→ <Link href="/blog/nifty-50-support-and-resistance-today" className="text-emerald-400 hover:underline">Nifty 50 Support &amp; Resistance Guide</Link> — how to pick stop-loss levels using pivot points</li>
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
              <Link href="/tools/brokerage-calculator" className="hover:text-white">Brokerage</Link>
              <Link href="/tools/position-size-calculator" className="hover:text-white">Position Size</Link>
              <Link href="/blog/nifty-50-support-and-resistance-today" className="hover:text-white">Blog</Link>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-4 pb-8 text-xs text-neutral-500">
            Disclaimer: This calculator is for educational purposes only and does not constitute investment advice. Always verify your risk parameters with your own broker and risk manager before placing any trade.
          </div>
        </footer>
      </div>
    </>
  );
}
