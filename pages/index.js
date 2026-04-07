import Link from "next/link";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CNX Nifty — Live Nifty 50 Support, Resistance & Options Signals</title>
        <meta
          name="description"
          content="Live Nifty 50 price, daily support & resistance levels, pivot points and AI-powered options signals for Indian traders. Free and updated every minute."
        />
        <link rel="canonical" href="https://cnxnifty.in/" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="CNX Nifty" />
        <meta property="og:title" content="CNX Nifty — Live Nifty 50 Support & Resistance" />
        <meta
          property="og:description"
          content="Live Nifty 50 price, pivot points, and support/resistance levels for Indian options traders."
        />
        <meta property="og:url" content="https://cnxnifty.in/" />
        <meta property="og:image" content="https://cnxnifty.in/og-image.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="CNX Nifty — Live Nifty 50 Intelligence" />
        <meta
          name="twitter:description"
          content="Live Nifty 50 price, support & resistance, and options signals."
        />
        <meta name="twitter:image" content="https://cnxnifty.in/og-image.png" />
      </Head>
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
    </>
  );
}
