import ProductStatusCard from "@/components/admin/ProductStatusCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductsQuery } from "@/store/slices/productApi";
import type { Product } from "@/types/product";
import { DatabaseIcon } from "lucide-react";

const ProductManagement = () => {
  const {
    data: response,
    isLoading,
    isError,
  } = useGetProductsQuery({}) as {
    data: Product[];
    isLoading: boolean;
    isError: boolean;
  };

  const products = response || [];

  if (isError) {
    return (
      <div>
        <Card className="p-4">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription className="text-destructive">
              Fail to load products. Please try again.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold ">Products</h1>
        <p className="text-muted-foreground">Manage your products inventory</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <ProductStatusCard
          title="Total Products"
          isLoading={isLoading}
          value={products.length}
        />
        <ProductStatusCard
          title="Instock Products"
          iconColor="text-green-500"
          isLoading={isLoading}
          value={products.filter((product) => product.instock_count > 0).length}
        />
         <ProductStatusCard
          title="Outof stock Products"
          iconColor="text-destructive"
          isLoading={isLoading}
          value={products.filter((product) => product.instock_count === 0).length}
        />

      </div>
    </div>
  );
};

export default ProductManagement;
