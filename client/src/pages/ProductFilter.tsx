import ProductCard from "@/components/products/ProductCard";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { useState } from "react";
import { useLocation } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialKeyword = queryParams.get("keyword") || "";

  const [filters, setFilters] = useState({ keyword: initialKeyword });

  const { data: products = [], isLoading } = useGetProductsQuery(filters) as {
    data: Product[];
    isLoading: boolean;
  };

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 py-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              _id={product._id}
              name={product.name}
              price={product.price}
              image={product.images[0].url}
              ratingCount={product.rating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductFilter;
