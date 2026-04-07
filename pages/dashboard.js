import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/nifty")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) setError(d.error);
        else setData(d);
      })
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-10">
        <Link href="/" className="text-xl font-bold">
          CNX <span className="text-emerald-400 italic">Nifty</span>
        </Link>
        <span className="text-xs uppercase tracking-widest text-gray-400">Dashboard</span>
      </header>

      {error && <p className="text-red-400">Error: {error}</p>}
      {!data && !error && <p className="text-gray-400">Loading live Nifty data…</p>}

      {data && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            <Card
              label="NIFTY 50"
              value={data.price.toFixed(2)}
              sub={`${data.change >= 0 ? "+" : ""}${data.change.toFixed(2)} (${
                data.change >= 0 ? "+" : ""
              }${data.changePct.toFixed(2)}%)`}
              subClass={data.change >= 0 ? "text-emerald-400" : "text-red-400"}
            />
            <Card label="DAY HIGH" value={data.dayHigh.toFixed(2)} />
            <Card label="DAY LOW" value={data.dayLow.toFixed(2)} />
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Support &amp; Resistance</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              <Level label="S2" value={data.levels.s2} color="text-red-400" />
              <Level label="S1" value={data.levels.s1} color="text-red-300" />
              <Level label="Pivot" value={data.levels.pivot} color="text-yellow-300" />
              <Level label="R1" value={data.levels.r1} color="text-emerald-300" />
              <Level label="R2" value={data.levels.r2} color="text-emerald-400" />
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Classic pivot formula based on previous session high, low &amp; close.
            </p>
          </section>

          <p className="text-xs text-gray-500">
            Last updated: {new Date(data.asOf).toLocaleString()}
          </p>
        </>
      )}
    </main>
  );
}

function Card({ label, value, sub, subClass }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-xs uppercase tracking-widest text-gray-400">{label}</div>
      <div className="text-3xl font-bold mt-2">{value}</div>
      {sub && <div className={`text-sm mt-1 ${subClass || "text-gray-400"}`}>{sub}</div>}
    </div>
  );
}

function Level({ label, value, color }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-center">
      <div className="text-xs text-gray-400">{label}</div>
      <div className={`text-lg font-semibold ${color}`}>{value.toFixed(2)}</div>
    </div>
  );
}
