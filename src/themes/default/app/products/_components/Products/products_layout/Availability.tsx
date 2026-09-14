"use client";

import { Checkbox } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OPTIONS = [
  { label: "In Stock", value: "in-stock" },
  { label: "Upcoming", value: "upcoming" },
  { label: "Out of Stock", value: "out-of-stock" },
];

const Availability: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get selected values from URL query (split by comma)
  const selectedValues = searchParams.get("availability")?.split(",") || [];

  const [checkedValues, setCheckedValues] = useState<string[]>(selectedValues);

  // Update state when URL query changes
  useEffect(() => {
    setCheckedValues(searchParams.get("availability")?.split(",") || []);
  }, [searchParams]);

  const handleChange = (values: string[]) => {
    setCheckedValues(values);

    // Update search query
    const params = new URLSearchParams(searchParams.toString());

    if (values.length > 0) {
      params.set("availability", values.join(",")); // Store as comma-separated string
    } else {
      params.delete("availability");
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-gray-900">Availability</h2>
      <Checkbox.Group value={checkedValues} onChange={handleChange}>
        <div className="flex flex-col gap-1">
          {OPTIONS.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              <span className="text-sm text-gray-700">{option.label}</span>
            </Checkbox>
          ))}
        </div>
      </Checkbox.Group>
    </div>
  );
};

export default Availability;
