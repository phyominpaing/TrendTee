import ProductCard from "@/components/products/ProductCard";
import {
  useGetProductsMetaQuery,
  useGetProductsQuery,
} from "@/store/slices/productApi";
import type { Product, ProductFilters } from "@/types/product";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const ProductFilter = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialFilters = (): ProductFilters => {
    const queryParams = new URLSearchParams(location.search);
    return {
      keyword: queryParams.get("keyword") || "",
      category: queryParams.get("category") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
      colors: queryParams.getAll("colors"),
      sizes: queryParams.getAll("sizes"),
    };
  };

  // local state (ui update / from url) to hold filter values, initialized from query parameters
  const [filters, setFilters] = useState(initialFilters);

  // update local state when url changes (e.g. user clicks category in SecondaryBar or performs a search)
  // this ensures the component re-fetches products with new filters
  useEffect(() => {
    setFilters(initialFilters());
  }, [location.search]);

  // sync url query parameters with local state (optional, for better UX - keeps url in sync with current filters)
  useEffect(() => {
    const parms = new URLSearchParams();

    if (filters.keyword) parms.set("keyword", filters.keyword);
    if (filters.category) parms.set("category", filters.category);

    filters.colors.forEach((color) => parms.append("colors", color));
    filters.sizes.forEach((size) => parms.append("sizes", size));

    if (filters.minPrice) parms.set("minPrice", filters.minPrice);
    if (filters.maxPrice) parms.set("maxPrice", filters.maxPrice);

    const newSearchQuery = parms.toString();
    const currentSearchQuery = location.search.slice(1); // remove leading '?'

    if (newSearchQuery !== currentSearchQuery) {
          const timeoutId = setTimeout(() => {
        navigate(
          { pathname: "/products/filter", search: newSearchQuery },
          { replace: true }
        );
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [filters, navigate, location.search]);

  const { data: products = [], isLoading } = useGetProductsQuery(filters) as {
    data: Product[];
    isLoading: boolean;
  };

  const { data: product_meta } = useGetProductsMetaQuery("none");

  // filter state -> {colors : ["Red" , "Blue"] , sizes : ["S","M"] , ...}
  const toggleValue = (key: "colors" | "sizes", value: string) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((x) => x !== value)
        : [...currentValues, value];
      return { ...prev, [key]: newValues };
    });
  };

  const handlePriceChange = (type: "minPrice" | "maxPrice", value: string) => {
    setFilters((prev) => ({ ...prev, [type]: value }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
                onClick={() => toggleValue("colors", color)}
                key={index}
                className={`px-3 py-1 mr-2  rounded-full border text-sm ${
                  filters.colors.includes(color)
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
              >
                {color}
              </button>
            ))}
          </div>

          <h3 className="text-lg font-semibold mb-2 underline">Sizes</h3>
          <div className="flex flex-col gap-1 mb-4 justify-start items-start">
            {product_meta?.sizes.map((size, index) => (
              <button
                onClick={() => toggleValue("sizes", size)}
                key={index}
                className={`px-3 py-1 mr-2  rounded-full border text-sm ${
                  filters.sizes.includes(size)
                    ? "bg-black text-white border-black"
                    : "border-gray-300"
                }`}
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
              className="px-3 w-full py-1 rounded-md border border-gray-300 text-sm mb-2"
              value={filters.minPrice!}
              onChange={(e) => handlePriceChange("minPrice", e.target.value)}
            />
            <input
              type="number"
              min={product_meta?.minPrice}
              placeholder={`Max ($${product_meta?.maxPrice})`}
              className="px-3 w-full py-1 rounded-md border border-gray-300 text-sm"
              value={filters.maxPrice!}
              onChange={(e) => handlePriceChange("maxPrice", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className=" col-span-10 gap-6">
        <h1 className="text-2xl font-bold mb-2">Products</h1>
        {products.length === 0 ? (
          <p className="text-gray-600">
            No products found matching the filters.
          </p>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default ProductFilter;
