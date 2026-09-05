export default function StockBadge({
  inStock,
  externalStock = false,
}: {
  inStock: boolean;
  externalStock?: boolean;
}) {
  if (!inStock) {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-red-100 px-2.5 py-1 text-xs font-semibold text-red-700 dark:bg-red-950 dark:text-red-400">
        <span className="h-1.5 w-1.5 rounded-full bg-red-600 dark:bg-red-400" />
        Utsolgt
      </span>
    );
  }

  if (externalStock) {
    return (
      <span className="inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-700 dark:bg-amber-950 dark:text-amber-400">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 dark:bg-amber-400" />
        Bestillingsvare · 7–10 dager
      </span>
    );
  }

  return (
    <span className="inline-flex w-fit items-center gap-1.5 self-start rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-950 dark:text-green-400">
      <span className="h-1.5 w-1.5 rounded-full bg-green-600 dark:bg-green-400" />
      På lager
    </span>
  );
}
