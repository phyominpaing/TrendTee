import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "../../components/admin/ProductForm";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/store/slices/productApi";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useEffect } from "react";

const ProductUpdate = () => {
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { id } = useParams();

  const {
    data: initialData,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(id as string);
  const navigate = useNavigate();

  useEffect(() => {
    if (isError || !id) {
      navigate("/admin");
    }
  }, [id, isError, navigate]);

  const onSubmit = async (data: ProductFormInputs) => {
    if (!id) return;

    try {
      const existingImages = data.images.filter(
        (img) => !img.file && img.url && img.public_alt,
      );
      const newImages = data.images.filter((img) => img.file);

      const payload = {
        ...data,
        images: [...existingImages, ...newImages],
      };

      await updateProduct({ id, data: payload }).unwrap();

      toast.success("Update product successfully.");
      navigate("/admin/manage-products");
    } catch {
      toast.error("Failed to update product. Please try again.");
    }
  };

  return (
    <section>
      <h1 className="text-xl font-semibold uppercase mb-6 text-center">
        Edit Product
      </h1>
      <ProductForm
        onSubmit={onSubmit}
        isLoading={isLoading}
        initialData={initialData}
        isUpdating={isUpdating}
      />
    </section>
  );
};

export default ProductUpdate;
