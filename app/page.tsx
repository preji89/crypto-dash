import CryptoList from "./CryptoList";

export default async function CryptoDashboard() {
  // Fetch live data securely on the server
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1",
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch coins: ${res.status}`);
  }
  const coins = await res.json();

  return (
    <main className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-emerald-400">Crypto Tracker</h1>
        
        {/* Pass the server-fetched data into the interactive client component */}
        <CryptoList initialCoins={coins} />
      </div>
    </main>
  );
}
