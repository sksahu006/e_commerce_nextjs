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

export const ProductSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  description: z.string().optional(),
  basePrice: z.number().positive("Base price must be positive"),
  discountPrice: z
    .number()
    .positive("Discount price must be positive")
    .optional(),
  featured: z.boolean().optional(),
  status: z.enum(["draft", "published"]),
  brandId: z.string().uuid("Invalid brand ID"),
  categoryIds: z.array(z.string().uuid("Invalid category ID")),
});

export type ProductFormData = z.infer<typeof ProductSchema>;

export const brandSchema = z.object({
  name: z.string().nonempty("Brand name is required"),
  logo: z.string().optional(),
  description: z.string().optional(),
});

export type BrandFormData = z.infer<typeof brandSchema>;

export const colorSchema = z.object({
  name: z.string().nonempty("Color name is required"),
  hexCode: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex code"),
});

export type colorFormData = z.infer<typeof colorSchema>;

export const sizeSchema = z.object({
  name: z.string().nonempty("Size name is required"),
});

export type sizeFormData = z.infer<typeof sizeSchema>;
