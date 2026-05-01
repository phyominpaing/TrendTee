
export interface ProductImage {
  url: string;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  images: ProductImage[];
}
