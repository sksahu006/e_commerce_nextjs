"use client";
import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation"; // use `next/router` for older Next.js versions
import { getColors } from "@/app/actions/adminActions/color";
import { getSizes } from "@/app/actions/adminActions/size";
import { getAllCategory } from "@/app/actions/adminActions/category";

const ProductSidebar = () => {
  const router = useRouter();
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);




  const { data: colors } = useQuery({
    queryKey: ["colors"],
    queryFn: () => getColors(),
    staleTime: 1000 * 60 * 5,
  });

  const { data: sizes } = useQuery({
    queryKey: ["sizes"],
    queryFn: () => getSizes(),
    staleTime: 1000 * 60 * 5,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategory(),
    staleTime: 1000 * 60 * 5,
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const categoriesFromUrl = params.get("categories");
    const sizesFromUrl = params.get("sizes");
    const colorsFromUrl = params.get("colors");
    const priceRangeFromUrl = params.get("priceRange");

    if (categoriesFromUrl) {
      setSelectedCategories(categoriesFromUrl.split(","));
    }

    if (sizesFromUrl) {
      setSelectedSizes(sizesFromUrl.split(","));
    }

    if (colorsFromUrl) {
      setSelectedColors(colorsFromUrl.split(","));
    }

    if (priceRangeFromUrl) {
      const [min, max] = priceRangeFromUrl.split(",").map(Number);
      setPriceRange([min, max]);
    }
  }, [searchParams]);

  const updateQuery = (key: string, value: string[] | [number, number]) => {
    const params = new URLSearchParams(window.location.search);

    if (Array.isArray(value)) {
      if (value.length === 0) {
        params.delete(key);
      } else {
        if (key === "priceRange") {
          params.set("minPrice", value[0].toString());
          params.set("maxPrice", value[1].toString());
        }
        params.set(key, value.join(","));
      }
    } else {
      // params.set(key, value?.toString());
    }

    router.push(`?${params.toString()}`, undefined);
  };

  const handleSizeChange = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    setSelectedSizes(updatedSizes);
    updateQuery("sizes", updatedSizes);
  };

  const handleCategoryChange = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId]
    setSelectedCategories(updatedCategories);
    updateQuery("categories", updatedCategories);
  };

  const handleColorChange = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    setSelectedColors(updatedColors);
    updateQuery("colors", updatedColors);
  };

  const handlePriceRangeChange = (newRange: [number, number]) => {
    setPriceRange(newRange);
    updateQuery("priceRange", newRange);
  };

  return (
    <aside className="w-full md:w-1/4 bg-white space-y-8 p-4 border border-gray-200 rounded-lg shadow-md">
      {/* Category Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Category</h3>
        <div className="space-y-2">
          {categories?.categories?.map((category) => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.name)} // Check if category is selected
                onCheckedChange={() => handleCategoryChange(category.name)} // Handle change
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm font-medium leading-none"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
        <hr className="mt-4 border-t border-gray-300" />
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Size</h3>
        <div className="space-y-2">
          {sizes?.sizes?.map((size) => (
            <div key={size.id} className="flex items-center">
              <Checkbox
                id={`size-${size.id}`}
                checked={selectedSizes.includes(size.name)}
                onCheckedChange={() => handleSizeChange(size.name)}
              />
              <label
                htmlFor={`size-${size.id}`}
                className="ml-2 text-sm font-medium leading-none"
              >
                {size.name}
              </label>
            </div>
          ))}
        </div>
        <hr className="mt-4 border-t border-gray-300" />
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Color</h3>
        <div className="space-y-2">
          {colors?.colors?.map((color) => (
            <div key={color.id} className="flex items-center">
              <Checkbox
                id={`color-${color.id}`}
                checked={selectedColors.includes(color.name)}
                onCheckedChange={() => handleColorChange(color.name)}
              />
              <label
                htmlFor={`color-${color.id}`}
                className="ml-2 text-sm font-medium leading-none"
              >
                {color.name}
              </label>
            </div>
          ))}
        </div>
        <hr className="mt-4 border-t border-gray-300" />
      </div>

      {/* Price Range Selection */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={2000}
          step={1}
          value={priceRange as [number, number]}
          onValueChange={handlePriceRangeChange}
          className="w-full"
        />
        <div className="flex justify-between mt-2 text-sm">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
        <hr className="mt-4 border-t border-gray-300" />
      </div>
    </aside>
  );
};

export default ProductSidebar;
