"use client";

import Link from "next/link";
import { useCart } from "@/context/cart-context";

export default function CartNavLink() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link
      href="/cart"
      className="text-sm font-medium text-zinc-600 transition-colors hover:text-black dark:text-zinc-400 dark:hover:text-zinc-50"
    >
      Handlekurv{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
