"use client";
import { Select } from "antd";
import { useRouter, useSearchParams } from "next/navigation"; // For App Router
import FilterDrawer from "./FilterDrawer";

const TopBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current sorting value from the URL, default to "Default Sorting"
  const currentSort = searchParams.get("sort") || "Default Sorting";

  // Handle change and update only the "sort" query param while keeping others
  const handleChange = (value: { value: string; label: React.ReactNode }) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.value === "Default Sorting") {
      params.delete("sort"); // Remove "sort" parameter if Default Sorting is selected
    } else {
      params.set("sort", value.value); // Update "sort" parameter
    }

    // Push updated URL while keeping other query parameters intact
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex justify-between pt-5">
      <div>
        <div className="min-[950px]:hidden block">
          <FilterDrawer />
        </div>
      </div>
      <div>
        <Select
          labelInValue
          value={{ value: currentSort, label: currentSort }}
          style={{ width: 200 }}
          onChange={handleChange}
          options={[
            { value: "Default Sorting", label: "Default Sorting" },
            { value: "Sort by popularity", label: "Sort by popularity" },
            {
              value: "Sort by average rating",
              label: "Sort by average rating",
            },
            { value: "Sort by latest", label: "Sort by latest" },
            {
              value: "Sort by price: low to high",
              label: "Sort by price: low to high",
            },
            {
              value: "Sort by price: high to low",
              label: "Sort by price: high to low",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TopBar;
