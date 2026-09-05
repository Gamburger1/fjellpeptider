import type { Metadata } from "next";
import Link from "next/link";
import { primaryButtonClasses } from "@/lib/styles";
import ClearCartOnLoad from "@/components/ClearCartOnLoad";

export const metadata: Metadata = {
  title: "Bestilling mottatt",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-16 text-center">
      <ClearCartOnLoad />
      <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        Betaling mottatt
      </h1>
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Takk for bestillingen. Vi bekrefter betalingen og sender deg en
        e-post så snart den er registrert.
      </p>
      <Link
        href="/products"
        className={`mt-8 inline-block ${primaryButtonClasses}`}
      >
        Fortsett å handle
      </Link>
    </div>
  );
}
