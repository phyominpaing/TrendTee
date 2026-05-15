import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Product description must be at least 10 characters"),
  price: z
    .number({ error: "Product price is required" })
    .positive("Price must be greater than 0"),
  instock_count: z
    .number({ error: "Stock count is required" })
    .int("Stock count must be a whole number")
    .min(0, "Stock count cannot be negative"),
  category: z.string().min(1, "Category is required"),
  sizes: z
    .array(z.string())
    .min(1, "At least one size must be selected"),
  colors: z.array(z.string()).min(1, "At least one color must be selected"),
  images: z
    .array(
      z.object({
        file: z.string().optional(),
        url: z.string(),
        public_alt: z.string().optional(),
      }),
    )
    .min(1, "At least one image URL must be provided"),
  is_new_arrival: z.boolean(),
  is_feature: z.boolean(),
  rating_count: z
    .number({ error: "Rating count is required" })
    .min(0, "Rating count cannot be negative"),
});

export type ProductFormInputs = z.infer<typeof productSchema>;
