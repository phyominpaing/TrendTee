import ProductCard from "@/components/products/ProductCard";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  // local state (ui update / from url) to hold filter values, initialized from query parameters
  const [filters, setFilters] = useState({
    keyword: queryParams.get("keyword") || "",
    category: queryParams.get("category") || "",
  });

  // update local state when url changes (e.g. user clicks category in SecondaryBar or performs a search)
  // this ensures the component re-fetches products with new filters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setFilters({
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
    });
  }, [location.search]);

  // sync url query parameters with local state (optional, for better UX - keeps url in sync with current filters)
  useEffect(() => {
    const parms = new URLSearchParams();
    if (filters.keyword) parms.set("keyword", filters.keyword);
    if (filters.category) parms.set("category", filters.category);

    navigate(
      {
        pathname: "/products/filter",
        search: parms.toString(),
      },
      { replace: true },
    );
  }, [filters, navigate]);

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
