import { z } from "zod";

export const profileUpdateSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email"),

    oldPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
    newPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
    confirmPassword: z.string().min(6, "Password must be at least 6 characters").optional(),
  })
  .refine(
    (data) => {
      if (data.oldPassword || data.newPassword || data.confirmPassword) {
        return (
          data.oldPassword &&
          data.newPassword &&
          data.confirmPassword
        );
      }
      return true;
    },
    {
      message: "All password fields are required",
      path: ["oldPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && data.confirmPassword) {
        return data.newPassword === data.confirmPassword;
      }
      return true;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );