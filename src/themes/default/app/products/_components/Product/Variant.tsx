"use client";

import { cn } from "@/utils/cn";
import { useEffect, useState } from "react";
interface VariantProps {
  available_quantity: number;
  id: string;
  price: number;
  size: string;
  stock_status: string;
}
const Variant = ({
  variant,
  handlePrice,
}: {
  variant: VariantProps[];
  handlePrice: (price: number | undefined) => void;
}) => {
  const [activeId, setActiveId] = useState(variant[0]?.id);

  // Update price when active variant changes (avoids setState during render)
  useEffect(() => {
    if (!variant || variant.length === 0) return;
    const active = variant.find((v) => v.id === activeId) ?? variant[0];
    handlePrice(active?.price);
  }, [activeId, handlePrice, variant]);
  const handleClick = (id: string) => {
    console.log("clicked" + id);
    setActiveId(id);
  };
  const stockStatus = variant.find((v) => v.id === activeId)?.stock_status;
  const stockQuantity = variant.find(
    (v) => v.id === activeId
  )?.available_quantity;
  return (
    <div className=" flex flex-col gap-2">
      <div className=" border-[1.5px] text-gray-800 max-w-max px-3 py-0.5 border-primary font-medium rounded sm:text-sm text-xs">
        {stockStatus === "upcoming"
          ? "Upcoming"
          : stockQuantity === 0
          ? "Out of Stock"
          : `In Stock (${stockQuantity})`}
      </div>
      <div>
        <h2 className=" sm:text-lg text-base font-medium">Size</h2>
        <div className=" flex gap-2 items-center flex-wrap">
          {variant?.map((variant) => (
            <button
              key={variant.id}
              onClick={() => handleClick(variant.id)}
              className={cn(
                "border-[1.5px] border-gray-300 px-3 py-1 rounded-lg hover:border-primary transition-all ease-linear duration-200",
                activeId === variant.id ? "border-primary" : ""
              )}
            >
              {variant.size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Variant;
