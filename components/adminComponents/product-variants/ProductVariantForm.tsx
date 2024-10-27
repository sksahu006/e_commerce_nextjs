"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product, Size, Color, ProductVariant } from "@/lib/types/schemaTypes";
import { useTransition } from "react";

const productVariantSchema = z.object({
  productId: z.string().min(1, "Product is required"),
  sizeId: z.string().min(1, "Size is required"),
  colorId: z.string().min(1, "Color is required"),
  stockQuantity: z.number().int().positive("Stock quantity must be positive"),
  additionalPrice: z.number().nonnegative("Additional price must be non-negative"),
});

type ProductVariantFormData = z.infer<typeof productVariantSchema>;

interface ProductVariantFormProps {
  variant?: Partial<ProductVariant>;
  onClose: () => void;
  onSuccess: (data: ProductVariantFormData) => Promise<void>;
}

export function ProductVariantForm({
  variant,
  onClose,
  onSuccess,
}: ProductVariantFormProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductVariantFormData>({
    resolver: zodResolver(productVariantSchema),
    defaultValues: {
      productId: variant?.productId || "",
      sizeId: variant?.sizeId || "",
      colorId: variant?.colorId || "",
      stockQuantity: variant?.stockQuantity || 0,
      additionalPrice: variant?.additionalPrice || 0,
    },
  });

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");
      const { products } = await response.json();
      return products;
    },
  });

  const { data: sizes } = useQuery<Size[]>({
    queryKey: ["sizes"],
    queryFn: async () => {
      const response = await fetch("/api/sizes");
      const { sizes } = await response.json();
      return sizes;
    },
  });

  const { data: colors } = useQuery<Color[]>({
    queryKey: ["colors"],
    queryFn: async () => {
      const response = await fetch("/api/colors");
      const { colors } = await response.json();
      return colors;
    },
  });

  const onSubmit = async (data: ProductVariantFormData) => {
    setError(null);
    startTransition(async () => {
      try {
        await onSuccess(data);
        setIsOpen(false);
      } catch (err) {
        setError("An unexpected error occurred");
        console.error("Error saving product variant:", err);
      }
    });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant?.id ? "Edit" : "Create"} Product Variant
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md">{error}</div>
          )}

          <Controller
            control={control}
            name="productId"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Product</label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products?.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.productId && (
                  <p className="text-red-500 text-sm">{errors.productId.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="sizeId"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Size</label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes?.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.sizeId && (
                  <p className="text-red-500 text-sm">{errors.sizeId.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="colorId"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Color</label>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colors?.map((color) => (
                      <SelectItem key={color.id} value={color.id}>
                        {color.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.colorId && (
                  <p className="text-red-500 text-sm">{errors.colorId.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="stockQuantity"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock Quantity</label>
                <Input
                  type="number"
                  placeholder="Enter stock quantity"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
                {errors.stockQuantity && (
                  <p className="text-red-500 text-sm">{errors.stockQuantity.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            control={control}
            name="additionalPrice"
            render={({ field }) => (
              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Price</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="Enter additional price"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
                {errors.additionalPrice && (
                  <p className="text-red-500 text-sm">{errors.additionalPrice.message}</p>
                )}
              </div>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}