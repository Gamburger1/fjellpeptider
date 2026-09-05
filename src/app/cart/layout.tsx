import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Handlekurv",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
