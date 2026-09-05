const nokFormatter = new Intl.NumberFormat("nb-NO", {
  style: "currency",
  currency: "NOK",
});

export function formatPrice(price: number): string {
  return nokFormatter.format(price);
}
