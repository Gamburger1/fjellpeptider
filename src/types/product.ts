export interface ProductVariant {
  size: string;
  price: number;
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
}
