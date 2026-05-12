import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import ColorPicker from "./ColorPicker";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import SizeSelector from "./SizeSelector";
import Tiptap from "../editor/TipTap";

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
          placeholder="Enter Product Name"
          className="h-11 rounded-xl border-slate-200"
        />
      </div>

      <div className="space-y-2 col-span-1 flex flex-col gap-2  ">
        <label
          htmlFor="description"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 mb-0"
        >
          Product Description
        </label>
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Tiptap value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

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

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label
            htmlFor="images"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            Category
          </label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <CategorySelect value={field.value} onChange={field.onChange} />
            )}
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="sizes"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            Sizes
          </label>
          <Controller
            control={control}
            name="sizes"
            render={({ field }) => (
              <SizeSelector sizes={field.value} onChange={field.onChange} />
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 ">
        <div className="space-y-2 col-span-1">
          <label
            htmlFor="colors"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600"
          >
            Colors
          </label>
          <Controller
            control={control}
            name="colors"
            render={({ field }) => (
              <ColorPicker colors={field.value} onChange={field.onChange} />
            )}
          />
        </div>
        <div className="col-span-1 rounded-md border px-4 py-2 flex items-center justify-between gap-4">
          <div className="space-y-2 col-span-1 flex items-center gap-4 ">
            <label
              htmlFor="is_new_arrival"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 mb-0"
            >
              Is New Arrival
            </label>
            <Controller
              control={control}
              name="is_new_arrival"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mb-0"
                ></Switch>
              )}
            />
          </div>

          <div className="space-y-2 col-span-1 flex items-center gap-4">
            <label
              htmlFor="is_feature"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 mb-0"
            >
              Featured Product
            </label>
            <Controller
              control={control}
              name="is_feature"
              render={({ field }) => (
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mb-0"
                ></Switch>
              )}
            />
          </div>
        </div>
      </div>

      <Button type="submit" className=" w-full mt-4 p-5  " disabled={isLoading}>
        {isLoading
          ? "Saving..."
          : initialData
            ? "Update Product"
            : "Create Product"}
      </Button>
    </form>
  );
};

export default ProductForm;
