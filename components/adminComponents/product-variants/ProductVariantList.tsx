"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/Pagination";
import { ProductVariantForm } from "./ProductVariantForm";
import { ProductVariant } from "@/lib/types/schemaTypes";
import { 
  createProductVariant, 
  deleteProductVariant, 
  updateProductVariant 
} from "@/app/actions/adminActions/productVariants";
import { Pencil, Trash2 } from 'lucide-react';
import { useDebounce } from "@/lib/hooks/useDebounce";

type ProductVariantWithRelations = ProductVariant;

interface ApiResponse {
  variants: ProductVariantWithRelations[];
  total: number;
}

export function ProductVariantList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [editingVariant, setEditingVariant] = useState<ProductVariantWithRelations | null>(null);
  const queryClient = useQueryClient();
  const debouncedSearch = useDebounce(search, 300)

  const { data, isLoading, error } = useQuery<ApiResponse>({
    queryKey: ["productVariants", page, debouncedSearch],
    queryFn: () =>
      fetch(`/api/product-variants?page=${page}&search=${debouncedSearch}`).then((res) =>
        res.json()
      ),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteProductVariant(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productVariants"] });
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: Omit<ProductVariant, 'id' | 'product' | 'size' | 'color' | 'orderItems' | 'cartItems'>) => 
      createProductVariant(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productVariants"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { 
      id: string; 
      data: Omit<ProductVariant, 'id' | 'product' | 'size' | 'color' | 'orderItems' | 'cartItems'> 
    }) => updateProductVariant(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["productVariants"] });
    },
  });

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this variant?")) {
      deleteMutation.mutate(id);
    }
  };

  const handleAdd = () => {
    setEditingVariant({} as ProductVariantWithRelations);
  };

  const handleSave = async (data: Omit<ProductVariant, 'id' | 'product' | 'size' | 'color' | 'orderItems' | 'cartItems'>) => {
    if (editingVariant?.id) {
      await updateMutation.mutateAsync({ id: editingVariant.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
    setEditingVariant(null);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.toString()}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search variants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAdd}>
          Add New Variant
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Color</TableHead>
            <TableHead>Stock Quantity</TableHead>
            <TableHead>Additional Price</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell>{variant.product.name}</TableCell>
              <TableCell>{variant.size.name}</TableCell>
              <TableCell>{variant.color.name}</TableCell>
              <TableCell>{variant.stockQuantity}</TableCell>
              <TableCell>${variant.additionalPrice}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  className="mr-2"
                  onClick={() => setEditingVariant(variant)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(variant.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        total={data?.total || 0}
        page={page}
        pageSize={10}
        onPageChange={setPage}
      />
      {editingVariant && (
        <ProductVariantForm
          variant={editingVariant}
          onClose={() => setEditingVariant(null)}
          onSuccess={handleSave}
        />
      )}
    </div>
  );
}