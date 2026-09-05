import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import StockBadge from "@/components/StockBadge";
import ProductCard from "@/components/ProductCard";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return { title: "Produkt ikke funnet | NORLABS" };
  }
  return {
    title: `${product.name} | NORLABS`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id },
    include: { variants: true },
  });

  if (!product) {
    return (
      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <p className="text-zinc-600 dark:text-zinc-400">Produktet finnes ikke.</p>
        <Link
          href="/products"
          className="mt-4 inline-block text-sm font-medium text-black underline dark:text-zinc-50"
        >
          Tilbake til produkter
        </Link>
      </div>
    );
  }

  const related = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    orderBy: { sortOrder: "asc" },
    take: 3,
    include: { variants: true },
  });

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-16">
      <Link
        href="/products"
        className="mb-8 inline-block text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
      >
        ← Tilbake til produkter
      </Link>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold tracking-wide text-black uppercase dark:text-zinc-50">
            {product.name}
          </h1>
          <div className="mt-3">
            <StockBadge inStock={product.inStock} externalStock={product.externalStock} />
          </div>
          <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
            {product.description}
          </p>
          <ProductPurchasePanel product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-10 flex items-center gap-3 text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
            <span className="h-6 w-1 rounded-full bg-gradient-to-b from-violet-500 to-orange-500" />
            Relaterte produkter
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
