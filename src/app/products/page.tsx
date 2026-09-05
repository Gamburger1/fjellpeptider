import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import ProductsBrowser from "@/components/ProductsBrowser";

export const metadata: Metadata = {
  title: "Produkter",
  description:
    "Se alle forskningspeptider fra NORLABS. 99 % renhet, testet og merket.",
};

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { sortOrder: "asc" },
    include: { variants: true },
  });

  return <ProductsBrowser products={products} />;
}
