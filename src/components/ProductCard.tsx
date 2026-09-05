import type { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/format";
import StockBadge from "@/components/StockBadge";

export default function ProductCard({ product }: { product: Product }) {
  const lowestPrice = Math.min(...product.variants.map((v) => v.price));
  const hasMultipleSizes = product.variants.length > 1;
  const sortedVariants = [...product.variants].sort(
    (a, b) => a.price - b.price,
  );

  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col gap-4 rounded-lg border border-black/[.08] p-6 shadow-transparent transition-all duration-300 hover:-translate-y-1 hover:border-black/20 hover:shadow-lg dark:border-white/[.145] dark:hover:border-white/30"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <h3 className="text-sm font-extrabold tracking-wide text-black uppercase dark:text-zinc-50">
        {product.name}
      </h3>
      <StockBadge inStock={product.inStock} externalStock={product.externalStock} />
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {product.shortDescription}
      </p>
      <div className="mt-2 flex flex-col gap-2">
        <span className="text-lg font-extrabold text-violet-600">
          {hasMultipleSizes ? `Fra ${formatPrice(lowestPrice)}` : formatPrice(lowestPrice)}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {sortedVariants.map((variant) => (
            <span
              key={variant.size}
              className="rounded-full border border-black bg-black px-2.5 py-0.5 text-xs font-bold text-white dark:border-white dark:bg-white dark:text-black"
            >
              {variant.size}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
