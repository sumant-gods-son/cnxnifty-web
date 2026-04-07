import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        CNX <span className="text-emerald-400 italic">Nifty</span>
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        India&apos;s options intelligence platform. Live Nifty data, support &amp; resistance, and AI signals.
      </p>
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition"
      >
        Open Dashboard →
      </Link>
    </main>
  );
}
