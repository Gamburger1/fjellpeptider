export interface ProductVariant {
  size: string;
  price: number;
  imageUrl?: string | null;
}

export interface Product {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  imageUrl: string;
  category: string;
  variants: ProductVariant[];
  inStock: boolean;
  externalStock: boolean;
  comingSoon: boolean;
}
