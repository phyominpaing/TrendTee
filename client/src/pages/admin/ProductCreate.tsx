import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "../../components/admin/ProductForm";
import { useCreateProductMutation } from "@/store/slices/productApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const ProductCreate = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormInputs) => {
    
    try {
      await createProduct(data).unwrap();

      toast.success("Product created successfully.");
      navigate("/admin/manage-products");
    } catch (error) {
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <section>
      <h1 className="text-xl font-semibold uppercase mb-6 text-center">
        Create New Product
      </h1>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </section>
  );
};

export default ProductCreate;
