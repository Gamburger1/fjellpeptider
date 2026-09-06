"use client";

import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { primaryButtonClasses } from "@/lib/styles";

export default function ProductPurchasePanel({
  product,
  selectedSize,
  onSelectSize,
}: {
  product: Product;
  selectedSize: string;
  onSelectSize: (size: string) => void;
}) {
  const { addToCart } = useCart();

  const selectedVariant =
    product.variants.find((v) => v.size === selectedSize) ??
    product.variants[0];

  return (
    <div className="mt-4">
      <div className="flex items-baseline gap-3">
        <span className="text-3xl font-extrabold text-[#2f6690]">
          {formatPrice(selectedVariant.price)}
        </span>
        <span className="text-sm font-semibold text-zinc-500">
          {selectedVariant.size}
        </span>
      </div>
      <p className="mt-2 text-xs font-medium tracking-wider text-zinc-500 uppercase">
        99 % renhet · Kun til forskningsbruk
      </p>

      <div className="mt-4 flex gap-2">
        {product.variants.length > 1 ? (
          product.variants.map((variant) => (
            <button
              key={variant.size}
              type="button"
              onClick={() => onSelectSize(variant.size)}
              aria-pressed={selectedSize === variant.size}
              className={`rounded-full border px-4 py-1.5 text-sm font-bold transition-colors ${
                selectedSize === variant.size
                  ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                  : "border-black/[.08] text-zinc-600 hover:border-black/20 dark:border-white/[.145] dark:text-zinc-400 dark:hover:border-white/30"
              }`}
            >
              {variant.size}
            </button>
          ))
        ) : (
          <span className="rounded-full border border-black bg-black px-4 py-1.5 text-sm font-bold text-white dark:border-white dark:bg-white dark:text-black">
            {selectedVariant.size}
          </span>
        )}
      </div>

      <button
        onClick={() => addToCart(product.id, selectedSize)}
        disabled={!product.inStock}
        className={`mt-6 ${primaryButtonClasses} disabled:cursor-not-allowed disabled:opacity-40`}
      >
        {product.inStock ? "Legg i handlekurv" : "Utsolgt"}
      </button>

      <p className="mt-4 text-xs font-medium tracking-wider text-zinc-500 uppercase">
        {product.externalStock
          ? "Bestillingsvare · Leveringstid 7–10 dager"
          : "Sendes samme dag · Levering 1–4 virkedager"}
      </p>
    </div>
  );
}
