"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { primaryButtonClasses } from "@/lib/styles";

export default function CartView({ products }: { products: Product[] }) {
  const { items, removeFromCart, updateQuantity } = useCart();

  const cartLines = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.size === item.size);
      return product && variant
        ? { product, variant, quantity: item.quantity }
        : null;
    })
    .filter((line) => line !== null);

  const total = cartLines.reduce(
    (sum, { variant, quantity }) => sum + variant.price * quantity,
    0,
  );

  if (cartLines.length === 0) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <p className="text-zinc-600 dark:text-zinc-400">
          Handlekurven er tom.
        </p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm font-medium text-black underline dark:text-zinc-50"
        >
          Se produkter
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="mb-10 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Handlekurv
      </h1>
      <div className="flex flex-col gap-6">
        {cartLines.map(({ product, variant, quantity }) => (
          <div
            key={`${product.id}-${variant.size}`}
            className="flex items-center justify-between gap-4 border-b border-black/[.08] pb-6 dark:border-white/[.145]"
          >
            <div>
              <h3 className="text-base font-medium text-black dark:text-zinc-50">
                {product.name}{" "}
                <span className="text-zinc-500 dark:text-zinc-400">
                  ({variant.size})
                </span>
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {formatPrice(variant.price)}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={quantity}
                aria-label={`Antall for ${product.name} (${variant.size})`}
                onChange={(e) => {
                  const next = Math.max(1, Number(e.target.value) || 1);
                  updateQuantity(product.id, variant.size, next);
                }}
                className="w-16 rounded border border-black/[.08] px-2 py-1 text-sm dark:border-white/[.145] dark:bg-black"
              />
              <button
                onClick={() => removeFromCart(product.id, variant.size)}
                aria-label={`Fjern ${product.name} (${variant.size}) fra handlekurven`}
                className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
              >
                Fjern
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center justify-between">
        <span className="text-base font-medium text-black dark:text-zinc-50">
          Totalt
        </span>
        <span className="text-lg font-semibold text-black dark:text-zinc-50">
          {formatPrice(total)}
        </span>
      </div>
      <Link
        href="/checkout"
        className={`mt-8 block w-full text-center ${primaryButtonClasses}`}
      >
        Gå til kassen
      </Link>
    </div>
  );
}
