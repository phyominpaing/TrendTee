import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: ProductFormInputs) => void;
  isLoading: boolean;
}
const ProductForm = ({
  initialData,
  onSubmit,
  isLoading,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    // formState: { errors, isSubmitting },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      price: 0,
      instock_count: 0,
      category: "",
      sizes: [],
      colors: [],
      is_feature: false,
      is_new_arrival: false,
      rating_count: 0,
      images: [],
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="name"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
        >
          Product Name
        </label>
        <Input
          id="name"
          type="text"
          placeholder="Enter current password"
          className="h-11 rounded-xl border-slate-200"
          // {...register("")}
        />
      </div>

      {/* <div className="space-y-2 md:col-span-2">
        <label
          htmlFor="new-password"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
        >
         Description
        </label>
        <Input
          type="password"
          placeholder="Enter new password"
          // {...register("")}
          className="h-11 rounded-xl border-slate-200"
        />
      </div> */}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 col-span-1">
          <label
            htmlFor="price"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            Product Price
          </label>
          <Input
            id="price"
            type="number"
            placeholder="eg: 29.99"
            className="h-11 rounded-xl border-slate-200"
            {...register("price", { valueAsNumber: true })}
          />
        </div>

        <div className="space-y-2 col-span-1">
          <label
            htmlFor="instock_count"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            In Stock Count
          </label>
          <Input
            id="instock_count"
            type="number"
            placeholder="eg: 1"
            className="h-11 rounded-xl border-slate-200"
            {...register("instock_count", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="images"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
        >
          Images
        </label>
        <Controller
          control={control}
          name="images"
          render={({ field }) => (
            <ImageUpload images={field.value} onChange={field.onChange} />
          )}
        />
      </div>
    </form>
  );
};

export default ProductForm;
