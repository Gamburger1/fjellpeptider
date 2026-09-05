import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

const FEATURED_PRODUCT_IDS = ["3", "11", "5"]; // Retatrutide, Melanotan II, GHK-Cu

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    where: { id: { in: FEATURED_PRODUCT_IDS } },
    include: { variants: true },
  });
  const featured = FEATURED_PRODUCT_IDS.map((id) =>
    featuredProducts.find((product) => product.id === id),
  ).filter((product) => product !== undefined);

  return (
    <div>
      <div className="relative h-[400px] w-full overflow-hidden bg-zinc-950 sm:h-[480px] lg:h-[560px]">
        <Image
          src="/banner3.jpeg"
          alt="NORLABS forskningspeptid-hetteglass"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
          <h1 className="font-montserrat text-4xl tracking-wide text-zinc-300 uppercase">
            <span className="font-normal">NOR</span>
            <span className="font-bold">LABS</span>
          </h1>
          <p className="mt-4 max-w-md text-lg text-zinc-300">
            Forskningspeptider, hentet inn og testet for renhet.
          </p>
          <Link
            href="/products"
            className="mt-8 rounded-full border border-white/25 bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:border-white/40 hover:bg-zinc-900"
          >
            Se produkter
          </Link>
        </div>
      </div>

      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <h2 className="mb-10 flex items-center gap-3 text-2xl font-semibold tracking-tight text-black">
          <span className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-500 to-orange-500" />
          Bestselgere
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className="rounded-full border border-black/[.08] px-6 py-3 text-sm font-medium text-black transition-colors hover:border-violet-300 hover:text-violet-600"
          >
            Se alle produkter
          </Link>
        </div>
      </div>
    </div>
  );
}
