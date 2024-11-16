import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductSchema, ProductFormData } from "@/lib/types/validationTypes";
import { useQueryClient } from "@tanstack/react-query";
import { addProduct, updateProduct } from "@/app/actions/adminActions/product";
import { Brand, Category } from "@/lib/types/schemaTypes";
import { Loader2 } from "lucide-react";
import ImageUpload from "../ImageUpload";
import Image from "next/image";

type FetchedProductData = {
  id: string;
  name: string;
  slug: string;
  images: string[];
  description: string | null;
  basePrice: number;
  discountPrice: number | null;
  featured: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  brand: Omit<Brand, "products">;
  brandId: string;
  categories: Array<{
    category: Omit<Category, "products">;
    productId: string;
    categoryId: string;
  }>;
};

export function ProductFormModal({
  product,
  onClose,
}: {
  product?: FetchedProductData;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(ProductSchema),
    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          images: product.images,
          description: product.description || "",
          basePrice: Number(product.basePrice),
          discountPrice: Number(product.discountPrice )|| undefined,
          featured: product.featured,
          status: product.status as "draft" | "published",
          brandId: product.brandId,
          categoryIds: product.categories.map((pc) => pc.categoryId),
        }
      : {
          name: "",
          slug: "",
          images: [],
          description: "",
          basePrice: 0,
          discountPrice: undefined,
          featured: false,
          status: "draft",
          brandId: "",
          categoryIds: [],
        },
  });

  useEffect(() => {
    const fetchBrandsAndCategories = async () => {
      try {
        const [brandsResponse, categoriesResponse] = await Promise.all([
          fetch("/api/brands"),
          fetch("/api/category"),
        ]);

        if (!brandsResponse.ok || !categoriesResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const brandsData = await brandsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setBrands(brandsData);
        setCategories(categoriesData.categories);
      } catch (error) {
        console.error("Error fetching brands and categories:", error);
      }
    };

    fetchBrandsAndCategories();
  }, []);

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);
    try {
      if (product) {
        await updateProduct(product.id, data);
      } else {
        await addProduct(data);
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      onClose();
    } catch (error) {
      console.error("Error submitting product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (url: string) => {
    const currentImages = form.getValues("images");
    form.setValue("images", [...currentImages, url]);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {product ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-h-[70vh] overflow-y-scroll p-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div>
                      <ImageUpload onImageUpload={handleImageUpload} />
                      {field?.value?.map((url, index) => (
                        <div key={index} className="mt-2 flex items-center">
                          <Image
                            src={url}
                            alt={`Uploaded ${index}`}
                            width={100}
                            height={100}
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="ml-2"
                            onClick={() => {
                              const newImages = [...field.value];
                              newImages.splice(index, 1);
                              form.setValue("images", newImages);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discountPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Price (optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      value={field.value === undefined ? "" : field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === ""
                            ? undefined
                            : parseFloat(e.target.value)
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Featured</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brandId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryIds"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) =>
                        field.onChange([...field.value, value])
                      }
                      value=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select categories" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <div>
                    {field.value.map((categoryId) => {
                      const category = categories.find(
                        (c) => c.id === categoryId
                      );
                      return category ? (
                        <div key={categoryId}>
                          {category.name}
                          <Button
                            onClick={() => {
                              const newCategories = field.value.filter(
                                (id) => id !== categoryId
                              );
                              field.onChange(newCategories);
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : null;
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductFormModal;
