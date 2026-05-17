export interface ProductImage {
  url: string;
  public_alt?: string;
}
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  instock_count: number;
  category: string;
  sizes: string[];
  colors: string[];
  is_new_arrival: boolean;
  is_feature: boolean;
  rating_count: number;
  images: ProductImage[];
  createdAt : string | Date;
}

export interface ProductMeta {
  colors: string[];
  sizes: string[];
  minPrice: number;
  maxPrice: number;
}

export interface ProductFilters {
  colors : string[];
  sizes : string[];
  minPrice : string | null;
  maxPrice : string | null;
  keyword : string;
  category : string;
}
