import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
  } from "@/components/ui/dialog";
  import { Brand, Category } from "@/lib/types/schemaTypes";
  
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
  
  function ProductDetailsDialog({
    product,
    isOpen,
    onClose,
  }: {
    product: FetchedProductData | null;
    isOpen: boolean;
    onClose: () => void;
  }) {
    if (!product) return null;
  
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="max-w-lg p-8 rounded-lg shadow-lg bg-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-800">
              {product.name}
            </DialogTitle>
            <DialogClose className="absolute top-3 right-3 text-gray-600 hover:text-gray-900" />
          </DialogHeader>
          <DialogDescription>
            <div className="flex flex-col items-center">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-64 object-cover rounded-lg mb-6 shadow-md"
              />
              <div className="w-full space-y-4 text-gray-700">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">ID</h3>
                    <p className="text-sm text-gray-600">{product.id}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Brand</h3>
                    <p className="text-sm text-gray-600">{product.brand.name}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Categories</h3>
                  <p className="text-sm text-gray-600">
                    {product.categories.map((cat) => cat.category.name).join(", ")}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Base Price</h3>
                    <p className="text-sm text-gray-600">
                      <span className="text-green-700">$</span>{product.basePrice.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Discount Price</h3>
                    <p className="text-sm text-gray-600">
                      {product.discountPrice
                        ? `$${product.discountPrice.toFixed(2)}`
                        : "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Status</h3>
                  <p
                    className={`text-sm capitalize ${
                      product.status === "active"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {product.status}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Description</h3>
                  <p className="text-sm text-gray-600">
                    {product.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }
  
  export default ProductDetailsDialog;
  