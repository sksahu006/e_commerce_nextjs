"use client";

import { fetchProducts } from "@/app/actions/adminActions/product";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Brand, Category } from "@/lib/types/schemaTypes";
import { Pagination } from "./Pagination";
import ProductFormModal from "./AddProduct";

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

export function ProductList({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  const [products, setProducts] = useState<FetchedProductData[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [editableProduct, setEditableProduct] = useState<FetchedProductData | null>(null)
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function loadProducts() {
      const { products, total } = await fetchProducts(page, 10, search);
      setProducts(products);
      setTotalPages(Math.ceil(total / 10));
    }
    loadProducts();
  }, [page, search]);

  if (products.length === 0) return <div>No products found.</div>;

  const handleEditClick = (id: string) => {
    const selectedProduct = products?.find((ele) => ele?.id === id) || null;
    setEditableProduct(selectedProduct);
    setIsEditing(true);
  };

  return (
    <div>
     {isEditing && editableProduct && (
        <ProductFormModal
          product={editableProduct}
          onClose={() => setIsEditing(false)}
        />
      )}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead>Base Price</TableHead>
            <TableHead>Discount Price</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product) => (
            <TableRow key={product?.id}>
              <TableCell>{product?.id}</TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{product?.brand.name}</TableCell>
              <TableCell>
                {product?.categories
                  ?.map((cat) => cat.category.name)
                  .join(", ")}
              </TableCell>
              <TableCell>${product?.basePrice.toFixed(2)}</TableCell>
              <TableCell>
                {product?.discountPrice
                  ? `$${product?.discountPrice.toFixed(2)}`
                  : "-"}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded ${
                    product?.status === "active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product?.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEditClick(product?.id)}
                  variant="link"
                  className="mr-2"
                >
                  Edit
                </Button>
                <Button variant="link" className="text-red-600">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
