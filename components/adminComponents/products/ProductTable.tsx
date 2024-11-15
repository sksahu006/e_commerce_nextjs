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
import { Delete, Eye, SquarePen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProductDetailsDialog from "./ProductdetailsModal";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { AddProductButton } from "./AddProductButton";

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
type ProductsResponse = {
  products: FetchedProductData[];
  totalPages: number;
};

export function ProductList({
  page,
  search,
}: {
  page: number;
  search: string;
}) {
  // const [products, setProducts] = useState<FetchedProductData[]>([]);
  // const [totalPages, setTotalPages] = useState<number>(1);
  const router = useRouter();
  const [editableProduct, setEditableProduct] =
    useState<FetchedProductData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const searchParams = useSearchParams();
  const [viewingProduct, setViewingProduct] =
    useState<FetchedProductData | null>(null);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchProducts =async (page: number, search: string): Promise<ProductsResponse> => {
    const response = await fetch(
      `/api/products?page=${page}&search=${encodeURIComponent(search)}`
    );
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  };

  const { data, isLoading, error, isFetching } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", page, debouncedSearchTerm],
    queryFn: () => fetchProducts(page, debouncedSearchTerm),
    placeholderData: (previousData) => previousData
  });
  if (isLoading) {
    return <div>Loading...{isFetching && <div>Loading new data...</div>}</div>;
  }
  if (error) return <div>An error occurred: {error.message}</div>;

  const { products, totalPages } = data|| { products: [], totalPages: 1 };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    router.push(
      `/admin/products?search=${encodeURIComponent(e.target.value)}&page=1`
    );
  };

  const handleEditClick = (id: string) => {
    const selectedProduct =
      products?.find((ele: FetchedProductData) => ele?.id === id) || null;
    setEditableProduct(selectedProduct);
    setIsEditing(true);
  };
  const handleView = (product: FetchedProductData) => {
    const viewProduct = product || null;
    setViewingProduct(viewProduct);
  };
  const handleCloseView = () => {
    setViewingProduct(null);
  };

  return (
    <div>
      {isEditing && editableProduct && (
        <ProductFormModal
          product={editableProduct}
          onClose={() => setIsEditing(false)}
        />
      )}
      <div className="flex justify-between mb-6">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="max-w-sm"
        />
        <AddProductButton />
      </div>
      <ProductDetailsDialog
        product={viewingProduct}
        isOpen={!!viewingProduct}
        onClose={handleCloseView}
      />
      <Table>
        <TableHeader>
          <TableRow className="uppercase font-thunder-lc text-xl ">
            <TableHead>image</TableHead>
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
          {products?.map((product: FetchedProductData) => (
            <TableRow key={product?.id} className="font-semibold text-gray-800">
              <TableCell>
                <img
                  src={product?.images[0]}
                  className="h-14 w-14 rounded-full"
                />
              </TableCell>
              <TableCell className="w-32 ">
                <span className="w-20 block truncate">{product?.id}</span>
              </TableCell>
              <TableCell>{product?.name}</TableCell>
              <TableCell>{product?.brand.name}</TableCell>
              <TableCell>
                {product?.categories
                  ?.map((cat) => cat.category.name)
                  .join(", ")}
              </TableCell>
              <TableCell>${product?.basePrice}</TableCell>
              <TableCell>
                {product?.discountPrice ? `$${product?.discountPrice}` : "-"}
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 font-Oswald capitalize rounded ${
                    product?.status === "active"
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {product?.status}
                </span>
              </TableCell>
              <TableCell className="flex items-center justify-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="mr-2">
                      <Eye onClick={() => handleView(product)} />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View the product</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <Button
                  onClick={() => handleEditClick(product?.id)}
                  className="mr-2 bg-amber-500"
                >
                  <SquarePen />
                  Edit
                </Button>
                <Button variant="destructive" className="">
                  <Delete />
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
