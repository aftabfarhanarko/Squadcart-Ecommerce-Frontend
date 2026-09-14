"use client";

import { getCategories } from "@/lib/api-services";
import { API_CONFIG } from "@/lib/api-config";
import type { Category } from "@/types/category";
import { Checkbox } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const ShopByCategory: React.FC = () => {
  const { userSession } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get selected categories from URL
  const selectedValues = useMemo(
    () => searchParams.get("categories")?.split(",") || [],
    [searchParams]
  );

  const [checkedValues, setCheckedValues] = useState<string[]>(selectedValues);

  // Fetch categories (theme: use companyId from session or fallback so guest users still see categories)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const companyId = userSession?.companyId || API_CONFIG.companyId;
        const data = await getCategories(companyId);
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [userSession?.companyId]);

  // Sync state with URL changes (when manually updated)
  useEffect(() => {
    setCheckedValues(selectedValues);
  }, [selectedValues]);

  const handleChange = (values: string[]) => {
    setCheckedValues(values);

    // Avoid updating URL if values are unchanged
    if (values.join(",") === selectedValues.join(",")) return;

    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set("categories", values.join(","));
    } else {
      params.delete("categories");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories || categories.length === 0) return <p>No categories found.</p>;

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-gray-900">Shop by category</h2>
      <Checkbox.Group value={checkedValues} onChange={handleChange}>
        <div className="flex flex-col gap-1">
          {categories.map((category: Category) => (
            <Checkbox key={category.slug} value={category.name}>
              <span className="text-sm text-gray-700">{category.name}</span>
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
    </div>
  );
};

export default ShopByCategory;
