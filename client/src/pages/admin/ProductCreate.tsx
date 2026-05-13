import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "../../components/admin/ProductForm";

const ProductCreate = () => {
  const onSubmit = async (data: ProductFormInputs) => {
    console.log(data);
  };
  const isLoading = false;
  return <section>
    <h1 className="text-xl font-semibold uppercase mb-6 text-center">Create New Product</h1>
    <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
  </section>;
};

export default ProductCreate;
