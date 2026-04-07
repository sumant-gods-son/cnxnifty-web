// Server-side API route — calls Yahoo Finance (no CORS issues on server).
// Returns Nifty 50 price + classic pivot-based support & resistance levels.
export default async function handler(req, res) {
  try {
    const url =
      "https://query1.finance.yahoo.com/v8/finance/chart/%5ENSEI?interval=1d&range=7d";
    const r = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!r.ok) throw new Error(`Upstream responded ${r.status}`);
    const json = await r.json();

    const result = json.chart && json.chart.result && json.chart.result[0];
    if (!result) throw new Error("No data returned from upstream");

    const meta = result.meta;
    const price = meta.regularMarketPrice;
    const prevClose = meta.chartPreviousClose;
    const dayHigh = meta.regularMarketDayHigh;
    const dayLow = meta.regularMarketDayLow;

    // Previous completed day's H/L/C for classic pivot
    const quotes = result.indicators && result.indicators.quote && result.indicators.quote[0];
    const closes = (quotes && quotes.close) || [];
    const highs = (quotes && quotes.high) || [];
    const lows = (quotes && quotes.low) || [];

    let H = dayHigh,
      L = dayLow,
      C = prevClose;
    for (let i = closes.length - 2; i >= 0; i--) {
      if (closes[i] != null && highs[i] != null && lows[i] != null) {
        H = highs[i];
        L = lows[i];
        C = closes[i];
        break;
      }
    }

    const pivot = (H + L + C) / 3;
    const r1 = 2 * pivot - L;
    const s1 = 2 * pivot - H;
    const r2 = pivot + (H - L);
    const s2 = pivot - (H - L);

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");
    res.status(200).json({
      price,
      change: price - prevClose,
      changePct: ((price - prevClose) / prevClose) * 100,
      dayHigh,
      dayLow,
      levels: { pivot, r1, s1, r2, s2 },
      asOf: new Date().toISOString(),
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
