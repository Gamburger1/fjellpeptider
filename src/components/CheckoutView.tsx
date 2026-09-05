"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format";
import { primaryButtonClasses } from "@/lib/styles";

const inputClasses =
  "rounded border border-black/[.08] px-3 py-2 text-sm dark:border-white/[.145] dark:bg-black";

type PaymentMethod = "cryptomus" | "manual";

export default function CheckoutView({ products }: { products: Product[] }) {
  const { items, clearCart } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cryptomus");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.currentTarget);
    const cartItems = items.map(({ productId, size, quantity }) => ({
      productId,
      size,
      quantity,
    }));

    if (paymentMethod === "manual") {
      const customer = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        postalCode: formData.get("postalCode") as string,
        country: formData.get("country") as string,
      };

      setIsRedirecting(true);
      try {
        const res = await fetch("/api/orders/notify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: cartItems,
            paymentMethod: "Wise",
            customer,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error ?? "Noe gikk galt");
        }

        clearCart();
        setSubmitted(true);
      } catch {
        setError(
          "Kunne ikke sende bestillingen. Prøv igjen om litt.",
        );
      } finally {
        setIsRedirecting(false);
      }
      return;
    }

    setIsRedirecting(true);
    try {
      const res = await fetch("/api/cryptomus/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Noe gikk galt");
      }

      window.location.href = data.paymentUrl;
    } catch {
      setError(
        "Kunne ikke starte betaling med Cryptomus. Prøv igjen om litt.",
      );
      setIsRedirecting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
          Bestilling mottatt
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Takk — vi har mottatt bestillingen din. Vi sender
          betalingsdetaljer for Wise til e-posten din innen kort tid.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block text-sm font-medium text-black underline dark:text-zinc-50"
        >
          Fortsett å handle
        </Link>
      </div>
    );
  }

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
        Kasse
      </h1>

      <div className="mb-10 flex flex-col gap-3 border-b border-black/[.08] pb-8 dark:border-white/[.145]">
        {cartLines.map(({ product, variant, quantity }) => (
          <div
            key={`${product.id}-${variant.size}`}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-black dark:text-zinc-50">
              {product.name} ({variant.size}) × {quantity}
            </span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {formatPrice(variant.price * quantity)}
            </span>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between text-base font-semibold">
          <span className="text-black dark:text-zinc-50">Totalt</span>
          <span className="text-black dark:text-zinc-50">
            {formatPrice(total)}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          required
          name="name"
          aria-label="Fullt navn"
          placeholder="Fullt navn"
          className={inputClasses}
        />
        <input
          required
          type="email"
          name="email"
          aria-label="E-post"
          placeholder="E-post"
          className={inputClasses}
        />
        <input
          required
          name="address"
          aria-label="Adresse"
          placeholder="Adresse"
          className={inputClasses}
        />
        <div className="flex gap-4">
          <input
            required
            name="city"
            aria-label="By"
            placeholder="By"
            className={`flex-1 ${inputClasses}`}
          />
          <input
            required
            name="postalCode"
            aria-label="Postnummer"
            placeholder="Postnummer"
            className={`w-32 ${inputClasses}`}
          />
        </div>
        <input
          required
          name="country"
          aria-label="Land"
          placeholder="Land"
          defaultValue="Norge"
          className={inputClasses}
        />

        <fieldset className="mt-2 flex flex-col gap-2">
          <legend className="mb-1 text-sm font-medium text-black dark:text-zinc-50">
            Betalingsmåte
          </legend>
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="radio"
              name="paymentMethod"
              value="cryptomus"
              checked={paymentMethod === "cryptomus"}
              onChange={() => setPaymentMethod("cryptomus")}
            />
            Kryptovaluta (Bitcoin, USDT) via Cryptomus
          </label>
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            <input
              type="radio"
              name="paymentMethod"
              value="manual"
              checked={paymentMethod === "manual"}
              onChange={() => setPaymentMethod("manual")}
            />
            Wise (vi sender betalingsdetaljer på e-post)
          </label>
        </fieldset>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={isRedirecting}
          className={`mt-4 ${primaryButtonClasses} disabled:opacity-60`}
        >
          {isRedirecting
            ? paymentMethod === "cryptomus"
              ? "Sender deg til betaling…"
              : "Sender bestilling…"
            : paymentMethod === "cryptomus"
              ? "Betal med krypto"
              : "Fullfør bestilling"}
        </button>
      </form>
    </div>
  );
}
