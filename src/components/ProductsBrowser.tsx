"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import BrandMark from "@/components/BrandMark";
import Reveal from "@/components/Reveal";

export default function ProductsBrowser({ products }: { products: Product[] }) {
  const categories = [
    "Alle",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const [selected, setSelected] = useState("Alle");
  const [search, setSearch] = useState("");

  const filtered = products.filter((product) => {
    const matchesCategory = selected === "Alle" || product.category === selected;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      {/* Hero */}
      <div className="mx-auto w-full max-w-5xl px-6 pt-20 pb-4 text-center">
        <div className="animate-hero flex flex-col items-center">
          <BrandMark size={48} />
          <h1 className="mt-6 text-4xl font-extrabold tracking-wide text-black uppercase sm:text-5xl">
            Produkter
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-600">
            {products.length} forskningspeptider, 99 % renhet, testet og merket.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-12">
        <div className="relative mb-6 max-w-sm">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk etter produkt..."
            aria-label="Søk etter produkt"
            className="w-full rounded-lg border border-black/[.08] px-4 py-2.5 pr-9 text-sm text-black placeholder:text-zinc-400 dark:border-white/[.145] dark:bg-black dark:text-zinc-50"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Tøm søk"
              className="absolute top-1/2 right-3 -translate-y-1/2 text-zinc-400 transition-colors hover:text-black"
            >
              ×
            </button>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelected(category)}
              aria-pressed={selected === category}
              className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                selected === category
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/[.08] text-zinc-600 hover:border-black/20 dark:border-white/[.145] dark:text-zinc-400 dark:hover:border-white/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <p className="mb-6 text-xs tracking-wide text-zinc-500 uppercase">
          {filtered.length} {filtered.length === 1 ? "produkt" : "produkter"}
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center rounded-lg border border-dashed border-black/[.12] py-16 text-center dark:border-white/[.145]">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Ingen produkter matcher søket.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filtered.map((product, i) => (
              <Reveal key={product.id} delayMs={Math.min(i, 6) * 30}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
