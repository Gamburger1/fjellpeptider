"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/types/product";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import StockBadge from "@/components/StockBadge";

export default function ProductDetail({ product }: { product: Product }) {
  const [selectedSize, setSelectedSize] = useState(
    product.variants[0]?.size ?? "",
  );

  const selectedVariant =
    product.variants.find((v) => v.size === selectedSize) ??
    product.variants[0];

  const imageUrl = selectedVariant?.imageUrl ?? product.imageUrl;

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
        <Image
          key={imageUrl}
          src={imageUrl}
          alt={`${product.name}${selectedVariant ? ` (${selectedVariant.size})` : ""}`}
          fill
          className="animate-image-fade object-cover"
        />
      </div>
      <div>
        <h1 className="text-3xl font-extrabold tracking-wide text-black uppercase dark:text-zinc-50">
          {product.name}
        </h1>
        <div className="mt-3">
          {product.comingSoon ? (
            <span className="inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-[#dceaf3] px-2.5 py-1 text-xs font-semibold text-[#234d6c] dark:bg-[#234d6c] dark:text-[#8ec2e0]">
              Kommer snart
            </span>
          ) : (
            <StockBadge inStock={product.inStock} externalStock={product.externalStock} />
          )}
        </div>
        <p className="mt-6 text-base leading-7 text-zinc-600 dark:text-zinc-400">
          {product.description}
        </p>
        {product.comingSoon ? (
          <p className="mt-4 text-sm text-zinc-500">
            Dette produktet er ikke tilgjengelig for bestilling ennå.
          </p>
        ) : (
          <ProductPurchasePanel
            product={product}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
        )}
      </div>
    </div>
  );
}
