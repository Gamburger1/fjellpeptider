import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CheckoutView from "@/components/CheckoutView";

export const metadata: Metadata = {
  title: "Kasse",
};

export default async function CheckoutPage() {
  const products = await prisma.product.findMany({
    include: { variants: true },
  });

  return <CheckoutView products={products} />;
}
