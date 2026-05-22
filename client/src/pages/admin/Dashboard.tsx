import ProductStatusCard from "@/components/admin/ProductStatusCard";
import ProductChart from "@/components/products/ProductChart";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { Package } from "lucide-react";

const Dashboard = () => {
  const { data: products = [], isLoading } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
  };

  const totalProducts = products.length;
  const featuredProductsLength = products.filter(
    (product) => product.is_feature,
  ).length;
  const newArrivalsProductsLength = products.filter(
    (product) => product.is_new_arrival,
  ).length;
  const inStockProductsCount = products.reduce(
    (sum, product) => sum + product.instock_count,
    0,
  );

  return (
    <section>
      <div className="grid grid-cols-4 gap-4 mb-4">
        <ProductStatusCard
          title="Total Products"
          value={totalProducts}
          isLoading={isLoading}
          icon={<Package size={20} className="text-muted-foreground" />}
        />
        <ProductStatusCard
          title="Featured"
          value={featuredProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="New Arrivals"
          value={newArrivalsProductsLength}
          isLoading={isLoading}
        />
        <ProductStatusCard
          title="Total In Stock"
          value={inStockProductsCount}
          isLoading={isLoading}
        />
      </div>

      <div>
        <ProductChart data={products} />
      </div>
    </section>
  );
};

export default Dashboard;
