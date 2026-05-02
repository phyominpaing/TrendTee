import ProductCard from "@/components/products/ProductCard";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/slices/productApi";
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

  const { data: product_meta } = useGetProductsMetaQuery("none");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (products.length === 0) {
    return <div>No products found.</div>;
  }
  return (
    <div className=" grid grid-cols-12 gap-6 mt-6">
      <div className="col-span-2 gap-6">
        <h2 className="text-lg font-bold mb-1">Products Filters</h2>
        <p className="text-gray-600 text-xs mb-4">
          Explore our collection of trendy t-shirts. Use the filters to find
          your perfect style.
        </p>
        <div>
          <h3 className="text-lg font-semibold mb-2 underline">Colors</h3>
          <div className="flex flex-col gap-1 mb-4 justify-start items-start">
            {product_meta?.colors.map((color, index) => (
              <button
                key={index}
                className="px-3 py-1 mr-2  rounded-full border border-gray-300 text-sm"
              >
                {color}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2 underline">Sizes</h3>
          <div className="flex flex-col gap-1 mb-4 justify-start items-start">
            {product_meta?.sizes.map((size, index) => (
              <button
                key={index}
                className="px-3 py-1 mr-2  rounded-full border border-gray-300 text-sm"
              >
                {size}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2 underline">Price</h3>
          <div className="flex flex-col gap-1 justify-start items-start">
            <input
              type="number"
              min={0}
              placeholder={`Min ($${product_meta?.minPrice})`}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm mb-2"
            />
            <input
              type="number"
              min={product_meta?.minPrice}
              placeholder={`Max ($${product_meta?.maxPrice})`}
              className="px-3 py-1 rounded-md border border-gray-300 text-sm"
            />
          </div>
        </div>
      </div>

      <div className=" col-span-10 gap-6">
        <div className=" grid grid-cols-4 gap-6 py-4">
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
      </div>
    </div>
  );
};

export default ProductFilter;
