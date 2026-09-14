"use client";
import { useCart } from "../../context/CartContext";
import formatteeNumber from "../../utils/formatteNumber";
import { Rate } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";

interface ImageProps {
  name: string;
  url: string;
}

interface Review {
  rating?: number;
}

interface Variant {
  price: number;
  size: string;
  available_quantity: number;
  stock_status: string;
}

interface ProductProps {
  id?: number;
  name?: string;
  title?: string;
  documentId?: string;
  off?: number;
  SKU?: string;
  sku?: string;
  price?: number | string;
  discountPrice?: number | string;
  thumbnail?: string;
  reviews?: Review[];
  images?: ImageProps[];
  variant?: Variant[];
}

const ProductCard = ({ product }: { product: ProductProps }) => {
  const { addCartItem } = useCart();
  const router = useRouter();

  const getNumericProductId = () => {
    if (typeof product?.id === "number") return product.id;
    if (product?.documentId) {
      const parsed = Number(product.documentId);
      if (!Number.isNaN(parsed)) return parsed;
    }
    return undefined;
  };

  const getProductSlug = () => {
    return (
      product?.sku ||
      product?.SKU ||
      (product?.id ? String(product.id) : undefined)
    );
  };

  const calculateDiscountPercentage = () => {
    const originalPrice = Number(
      product?.price || product?.variant?.[0]?.price || 0,
    );
    const discountedPrice = Number(product?.discountPrice || 0);

    if (
      originalPrice > 0 &&
      discountedPrice > 0 &&
      discountedPrice < originalPrice
    ) {
      return Math.round(
        ((originalPrice - discountedPrice) / originalPrice) * 100,
      );
    }
    return product?.off || 0;
  };

  const getFinalPrice = () => {
    const discountedPrice = Number(product?.discountPrice || 0);
    const originalPrice = Number(
      product?.price || product?.variant?.[0]?.price || 0,
    );
    return discountedPrice > 0 && discountedPrice < originalPrice
      ? discountedPrice
      : originalPrice;
  };

  const getOriginalPrice = () => {
    const originalPrice = Number(
      product?.price || product?.variant?.[0]?.price || 0,
    );
    const discountedPrice = Number(product?.discountPrice || 0);
    if (discountedPrice > 0 && discountedPrice < originalPrice) {
      return originalPrice;
    }
    return 0;
  };

  const calculateAverageRating = () => {
    if (!product?.reviews || product.reviews.length === 0) return 4.5; // Demo default
    const total = product.reviews.reduce(
      (sum, review) => sum + (review.rating || 0),
      0,
    );
    return total / product.reviews.length;
  };

  const handleAddProduct = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const productId = getNumericProductId();
    if (!productId) {
      toast.error("Product ID not found");
      return;
    }
    try {
      await addCartItem(Number(productId), 1);
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full font-baiJamjuree">
      <Link href={`/products/${getProductSlug()}`} className="relative group block overflow-hidden aspect-square">
        <Image
          src={product?.thumbnail || ""}
          alt={product?.title || "Product"}
          width={400}
          height={400}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {calculateDiscountPercentage() > 0 && (
          <div className="absolute top-3 left-3 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
            SAVE {calculateDiscountPercentage()}%
          </div>
        )}
        <button
          onClick={handleAddProduct}
          className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full text-primary shadow-lg hover:bg-primary hover:text-white transition-all duration-300 transform translate-y-12 group-hover:translate-y-0"
        >
          <IoCartOutline size={20} />
        </button>
      </Link>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-1">
            <Rate disabled allowHalf defaultValue={calculateAverageRating()} className="text-[10px] text-yellow-400" />
            <span className="text-[10px] text-gray-400 font-medium">(4.5)</span>
        </div>
        
        <Link href={`/products/${getProductSlug()}`}>
          <h3 className="text-gray-900 font-semibold text-sm line-clamp-2 hover:text-primary transition-colors h-10">
            {product?.title || product?.name}
          </h3>
        </Link>
        
        <div className="mt-auto pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">
              ${formatteeNumber(getFinalPrice())}
            </span>
            {getOriginalPrice() > 0 && (
              <span className="text-xs text-gray-400 line-through">
                ${formatteeNumber(getOriginalPrice())}
              </span>
            )}
          </div>
          
          <button 
            className="w-full mt-3 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:bg-opacity-90 active:scale-95 transition-all"
            onClick={(e) => {
                e.stopPropagation();
                router.push(`/products/${getProductSlug()}`);
            }}
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
