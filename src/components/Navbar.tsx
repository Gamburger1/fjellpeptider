import Link from "next/link";
import BrandMark from "@/components/BrandMark";
import Wordmark from "@/components/Wordmark";
import CartNavLink from "@/components/CartNavLink";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 border-b border-black/[.08] bg-zinc-200/70 backdrop-blur dark:border-white/[.145] dark:bg-zinc-950/70">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm tracking-wide text-black uppercase dark:text-zinc-50"
        >
          <BrandMark size={22} />
          <Wordmark />
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/products"
            className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Produkter
          </Link>
          <Link
            href="/om-oss"
            className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-black sm:inline dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Om oss
          </Link>
          <Link
            href="/betaling-og-frakt"
            className="hidden text-sm font-medium text-zinc-600 transition-colors hover:text-black sm:inline dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Betaling og frakt
          </Link>
          <CartNavLink />
        </div>
      </div>
    </nav>
  );
}
