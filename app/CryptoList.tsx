"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
}

export default function CryptoList({ initialCoins }: { initialCoins: Coin[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredCoins = initialCoins.filter((coin) =>
    coin.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  return (
    <div>
      {/* 1. Interactive Search Input Bar */}
      <input
        type="text"
        placeholder="Search coin name or symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 rounded-xl bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-emerald-400 font-medium"
      />

      {/* 2. Filtered Coin Display list */}
      <div className="space-y-4">
        {filteredCoins.map((coin) => (
          <div key={coin.id} className="p-4 bg-slate-800 rounded-xl flex justify-between items-center border border-slate-700">
            <div className="flex items-center gap-3">
              <Image src={coin.image} alt={coin.name} width={32} height={32} className="w-8 h-8" />
              <div>
                <h2 className="font-semibold">{coin.name}</h2>
                <p className="text-xs text-slate-400 uppercase">{coin.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono font-bold">${coin.current_price.toLocaleString()}</p>
              <p className={`text-xs ${coin.price_change_percentage_24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}

        {/* Fallback if no matching coins are found */}
        {filteredCoins.length === 0 && (
          <p className="text-center text-slate-500 py-4">No coins found matching {searchTerm}</p>
        )}
      </div>
    </div>
  );
}
