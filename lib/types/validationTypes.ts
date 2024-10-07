import * as z from "zod";

export const SignUpSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phoneNumber: z.string().optional(),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>;

export const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  images: z
    .array(z.string().url("Invalid image URL"))
    .min(1, "At least one image is required"),
  basePrice: z.number().positive("Base price must be positive"),
  discountPrice: z
    .number()
    .positive("Discount price must be positive")
    .optional(),
  brand: z.string().min(1, "Brand is required"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  status: z.enum(["draft", "published"]),
});

export type ProductFormData = z.infer<typeof productSchema>;
