"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { HiMiniXMark } from "react-icons/hi2";

const ActiveFilter: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Extract filter values from search params
  const sort = searchParams.get("sort");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");

  // Memoize availability and categories to prevent unnecessary re-renders
  const availability = useMemo(
    () => searchParams.get("availability")?.split(",") || [],
    [searchParams],
  );

  const categories = useMemo(
    () => searchParams.get("categories")?.split(",") || [],
    [searchParams],
  );

  // Store active filter items
  const [filterItems, setFilterItems] = useState<
    { label: string; key: string }[]
  >([]);

  useEffect(() => {
    setFilterItems((prevItems) => {
      const filters: { label: string; key: string }[] = [];

      if (sort) filters.push({ label: `Sort: ${sort}`, key: "sort" });
      if (minPrice && maxPrice)
        filters.push({
          label: `Price: $${minPrice} - $${maxPrice}`,
          key: "price",
        });

      availability.forEach((item) =>
        filters.push({
          label: `${item}`,
          key: `availability-${item}`,
        }),
      );

      categories.forEach((item) =>
        filters.push({
          label: `${item}`,
          key: `categories-${item}`,
        }),
      );

      // Prevent unnecessary re-renders by checking if the state actually changed
      if (JSON.stringify(prevItems) === JSON.stringify(filters)) {
        return prevItems;
      }

      return filters;
    });
  }, [sort, minPrice, maxPrice, availability, categories]);

  // Remove a single filter
  const handleRemoveFilter = (key: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "sort") params.delete("sort");
    if (key === "price") {
      params.delete("minPrice");
      params.delete("maxPrice");
    }
    if (key.startsWith("availability-")) {
      const value = key.replace("availability-", "");
      const updatedAvailability = availability.filter((item) => item !== value);

      if (updatedAvailability.length > 0) {
        params.set("availability", updatedAvailability.join(","));
      } else {
        params.delete("availability");
      }
    }
    if (key.startsWith("categories-")) {
      const value = key.replace("categories-", "");
      const updatedCategories = categories.filter((item) => item !== value);

      if (updatedCategories.length > 0) {
        params.set("categories", updatedCategories.join(","));
      } else {
        params.delete("categories");
      }
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Clear all filters
  const handleClearAll = () => {
    router.push("?", { scroll: false });
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold tracking-wide text-gray-900">
            Active Filters
          </h2>
          <p className="text-xs text-gray-500">
            Fine-tune results by adjusting filters below.
          </p>
        </div>
        {filterItems.length > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs font-medium text-pink-600 hover:text-pink-700 hover:underline underline-offset-4"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {filterItems.length === 0 && (
          <div className="rounded-full border border-dashed border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-500">
            No filters applied
          </div>
        )}
        {filterItems.map(({ label, key }) => (
          <button
            key={key}
            onClick={() => handleRemoveFilter(key)}
            className="group flex items-center gap-1 rounded-full bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700 border border-pink-100 hover:bg-pink-600 hover:text-white transition-colors"
          >
            <span className="truncate max-w-[140px]">{label}</span>
            <span className="inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-700 group-hover:bg-white group-hover:text-pink-600 h-4 w-4 text-[10px]">
              <HiMiniXMark />
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilter;
