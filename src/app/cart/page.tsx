import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CartView from "@/components/CartView";

export const metadata: Metadata = {
  title: "Handlekurv",
};

export default async function CartPage() {
  const products = await prisma.product.findMany({
    include: { variants: true },
  });

  return <CartView products={products} />;
}
