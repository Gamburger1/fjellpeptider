import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import Wordmark from "@/components/Wordmark";

export default function Footer() {
  return (
    <footer className="border-t border-black/[.08] dark:border-white/[.145]">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-10 text-sm text-zinc-600 sm:flex-row sm:justify-between dark:text-zinc-400">
        <span className="flex items-center gap-2 tracking-wide uppercase">
          <BrandMark size={18} />
          <Wordmark />
        </span>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link
            href="/"
            className="transition-colors hover:text-black dark:hover:text-zinc-50"
          >
            Hjem
          </Link>
          <Link
            href="/products"
            className="transition-colors hover:text-black dark:hover:text-zinc-50"
          >
            Produkter
          </Link>
          <Link
            href="/om-oss"
            className="transition-colors hover:text-black dark:hover:text-zinc-50"
          >
            Om oss
          </Link>
          <Link
            href="/betaling-og-frakt"
            className="transition-colors hover:text-black dark:hover:text-zinc-50"
          >
            Betaling og frakt
          </Link>
          <Link
            href="/faq"
            className="transition-colors hover:text-black dark:hover:text-zinc-50"
          >
            FAQ
          </Link>
          <Link
            href="/cart"
            className="transition-colors hover:text-black dark:hover:text-zinc-50"
          >
            Handlekurv
          </Link>
        </div>
      </div>
    </footer>
  );
}
