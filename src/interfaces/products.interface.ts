export interface Product {
  id: number;
  categoryId: number;
  brandId: number;

  name: string;
  stock: number;

  price: number;
  importPrice: number;
  sold: number;

  description: string;
  images: string[];
}
