import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produkter",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
