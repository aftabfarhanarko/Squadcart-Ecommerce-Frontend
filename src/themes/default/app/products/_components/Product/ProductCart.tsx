"use client";
import { useState } from "react";
import Quantity from "@/components/shared/Quantity";
import AddToCartButton from "./AddToCartButton";

interface ProductCartProps {
  price: number;
  productId: number;
}

const ProductCart = ({ price, productId }: ProductCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrement = async () => {
    setQuantity(quantity + 1);
  };
  const handleDecrement = async () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="flex gap-4 items-center min-[410px]:flex-row min-[810px]:flex-row md:flex-col flex-col">
      <div className=" self-start">
        <Quantity
          quantity={quantity}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          primary
        />
      </div>
      <div className=" flex-1 w-full">
        <AddToCartButton totalQuantity={quantity} price={price} productId={productId} />
      </div>
    </div>
  );
};

export default ProductCart;
