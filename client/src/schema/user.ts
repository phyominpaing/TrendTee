import z from "zod";

export const profileUpdateSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(20, "Name must not exceed 20 characters"),

  email: z
    .string()
    .email("Please enter a valid email address"),
});
