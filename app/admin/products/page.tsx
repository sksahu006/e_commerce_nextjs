import { AddProductButton } from "@/components/adminComponents/products/AddProductButton";
// import { ProductSearch } from "@/components/adminComponents/products/ProductSearch";
import { ProductList } from "@/components/adminComponents/products/ProductTable";
import { Suspense } from "react";
import Loading from "../loading";

export default function ProductPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const search = searchParams.search || "";

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Product Management</h1>
      {/* <div className="flex justify-between items-center mb-6">
        <ProductSearch />
        <AddProductButton />
      </div> */}
      <Suspense fallback={<Loading />}>
        <ProductList page={page} search={search} />
      </Suspense>
    </div>
  );
}