"use client";
import Quantity from "@/components/shared/Quantity";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import formatteeNumber from "@/utils/formatteNumber";
import { Badge } from "antd";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";

interface ItemProps {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: {
    id: number;
    name: string;
    thumbnail?: string;
    images?: { url: string; alt?: string }[];
  };
}

const CartProduct = ({ item }: { item: ItemProps }) => {
  const quantity = item?.quantity ?? 0;
  const { updateCartItem, deleteCartItem, addCartItem, refetch } = useCart();
  const { userSession } = useAuth();

  const imageUrl = item.product.thumbnail || item.product.images?.[0]?.url || "/placeholder.png";
  const imageAlt = item.product.images?.[0]?.alt || item.product.name || "product";

  const handleIncrement = async () => {
    try {
      // If this is a query product (id: 0), add it to cart first
      if (item.id === 0) {
        if (!userSession?.accessToken || !userSession?.userId) {
          toast.error("Please login to update cart");
          return;
        }
        await addCartItem(item.product.id, quantity + 1);
        await refetch(); // Refetch cart to get the new cart item ID
        toast.success("Cart updated");
      } else {
        await updateCartItem(item.id, quantity + 1);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const handleDecrement = async () => {
    if (quantity <= 1) {
      // If quantity is 1 and we decrement, remove the item
      await handleDelete();
      return;
    }

    try {
      // If this is a query product (id: 0), add it to cart first
      if (item.id === 0) {
        if (!userSession?.accessToken || !userSession?.userId) {
          toast.error("Please login to update cart");
          return;
        }
        await addCartItem(item.product.id, quantity - 1);
        await refetch(); // Refetch cart to get the new cart item ID
        toast.success("Cart updated");
      } else {
        await updateCartItem(item.id, quantity - 1);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const handleDelete = async () => {
    try {
      // If this is a query product (id: 0), just reload the page without the query param
      if (item.id === 0) {
        window.location.href = "/checkout";
        return;
      }
      await deleteCartItem(item.id);
      toast.success("Product removed");
    } catch (error) {
      console.error("Error deleting cart item:", error);
      toast.error("Failed to remove product");
    }
  };
  return (
    <div className=" flex justify-between gap-4">
      <div className="flex gap-3">
        <Badge count={quantity} size="small">
          <div className="rounded overflow-hidden ">
            <Image
              src={imageUrl}
              alt={imageAlt}
              width={100}
              height={100}
              className=" aspect-[6/5]"
            />
          </div>
        </Badge>
        <div className=" flex flex-col justify-between ">
          <p className=" text-sm line-clamp-1">{item.product.name}</p>
          <div>
            <Quantity
              quantity={quantity}
              handleDecrement={handleDecrement}
              handleIncrement={handleIncrement}
              secondary
            />
          </div>
        </div>
      </div>
      <div className=" flex flex-col justify-between items-end ">
        <p className=" text-sm">{formatteeNumber(item.unitPrice * quantity)}$</p>
        <button
          onClick={handleDelete}
          className=" hover:text-primary transition-all"
        >
          <FaXmark />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
