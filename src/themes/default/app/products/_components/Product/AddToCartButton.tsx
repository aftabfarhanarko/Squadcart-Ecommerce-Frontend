import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { TbCurrencyTaka } from "react-icons/tb";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AddToCartButtonProps {
  totalQuantity: number;
  price: number;
  productId: number;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  totalQuantity,
  price,
  productId,
}) => {
  const { addCartItem } = useCart();
  const { userSession } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!productId) {
      toast.error("Product not found");
      return;
    }

    if (!userSession?.accessToken) {
      toast("Please login to add items to cart", { icon: "🔒" });
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      await addCartItem(productId, totalQuantity);
      toast.success("Added to cart");
      router.push("/view-cart");
    } catch (error: unknown) {
      const err = error as { message?: string };
      const msg = err?.message || "Failed to add to cart";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const total = Number(price || 0) * totalQuantity;

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="flex items-center justify-center gap-2 bg-black hover:bg-primary transition-all ease-linear duration-200 px-4 py-1.5 rounded-3xl text-white sm:text-base text-sm disabled:opacity-70"
    >
      <span>{loading ? "Adding..." : "কার্টে যোগ করুন -"}</span>
      <div className=" flex items-center">
        <TbCurrencyTaka className=" sm:text-2xl text-xl" />
        <h2 className=" mt-[2px]  sm:text-xl font-bold text-lg">
          {new Intl.NumberFormat("en-US").format(total)}
        </h2>
      </div>
    </button>
  );
};

export default AddToCartButton;
