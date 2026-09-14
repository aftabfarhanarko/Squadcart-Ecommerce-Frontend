"use client";
import formatteeNumber from "@/utils/formatteNumber";
import { calculateAverageRating } from "@/utils/getAverageRating";
import { Rate } from "antd";
import Link from "next/link";
import { useState } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { FaRegClock, FaTruckFast } from "react-icons/fa6";
import { GoArrowUpRight, GoShareAndroid } from "react-icons/go";
import {
  RiMastercardFill,
  RiShieldCheckFill,
  RiVisaLine,
} from "react-icons/ri";
import { TbCurrencyTaka, TbTruckReturn } from "react-icons/tb";
import ProductCart from "./ProductCart";
import Variant from "./Variant";
import { Review } from "@/types/review";

interface CategoryProps {
  name: string;
  slug: string;
}
interface List {
  id: string;
  item: string;
}

interface ListItems {
  id: string;
  title: string;
  list: List[];
}
interface DescriptionProps {
  id: string;
  summary: string;
  list_items: ListItems[];
}
interface ImageProps {
  name: string;
  url: string;
}
interface VariantProps {
  available_quantity: number;
  id: string;
  price: number;
  size: string;
  stock_status: string;
}
interface ProductProps {
  product: {
    id?: number;
    companyId?: string;
    SKU: string;
    documentId: string;
    off: number;
    price: number;
    discountPrice?: number;
    title: string;
    total_sale: number;
    categories: CategoryProps[];
    description: DescriptionProps;
    images: ImageProps[];
    reviews: Review[];
    variant: VariantProps[];
  };
}

const ProductDetails: React.FC<ProductProps> = ({ product }) => {
  const [price, setPrice] = useState(
    Number(product?.price ?? product?.variant[0]?.price ?? 0),
  );

  const handlePrice = (variantPrice: number = 0) => {
    setPrice(variantPrice);
  };

  const originalPrice = Number(price || 0);
  const discountedPrice = Number(product?.discountPrice || 0);

  const getFinalPrice = () => {
    if (
      originalPrice > 0 &&
      discountedPrice > 0 &&
      discountedPrice < originalPrice
    ) {
      return discountedPrice;
    }
    return originalPrice;
  };

  const hasDiscount = discountedPrice > 0 && discountedPrice < originalPrice;

  // ============================================
  // 📋 CONSOLE LOGS - SECTION WISE DATA
  // ============================================

  console.group("🛍️ === PRODUCT DETAILS PAGE DATA ===");

  // Section 1: Basic Product Information
  console.group("📦 BASIC PRODUCT INFO");
  console.log("Product ID:", product?.id);
  console.log("Document ID:", product?.documentId);
  console.log("Company ID:", product?.companyId);
  console.log("SKU:", product?.SKU);
  console.log("Title:", product?.title);
  console.log("Total Sales:", product?.total_sale);
  console.groupEnd();

  // Section 2: Categories
  console.group("🏷️ CATEGORIES");
  console.log("Categories Count:", product?.categories?.length || 0);
  console.table(product?.categories);
  console.groupEnd();

  // Section 3: Pricing Information
  console.group("💰 PRICING DETAILS");
  console.log("Base Price:", product?.price);
  console.log("Discount Price:", product?.discountPrice);
  console.log("Discount Percentage:", product?.off + "%");
  console.log("Current Selected Price:", price);
  console.log("Original Price:", originalPrice);
  console.log("Final Price:", getFinalPrice());
  console.log("Has Discount:", hasDiscount);
  console.groupEnd();

  // Section 4: Variants
  console.group("📏 PRODUCT VARIANTS");
  console.log("Variants Count:", product?.variant?.length || 0);
  console.table(product?.variant);
  product?.variant?.forEach((variant, index) => {
    console.log(`Variant ${index + 1}:`, {
      id: variant.id,
      size: variant.size,
      price: variant.price,
      stock: variant.available_quantity,
      status: variant.stock_status,
    });
  });
  console.groupEnd();

  // Section 5: Images
  console.group("🖼️ PRODUCT IMAGES");
  console.log("Images Count:", product?.images?.length || 0);
  console.table(product?.images);
  product?.images?.forEach((image, index) => {
    console.log(`Image ${index + 1}:`, image.url);
  });
  console.groupEnd();

  // Section 6: Reviews & Ratings
  console.group("⭐ REVIEWS & RATINGS");
  console.log("Total Reviews:", product?.reviews?.length || 0);
  console.log("Average Rating:", calculateAverageRating(product?.reviews));
  console.table(product?.reviews);
  console.groupEnd();

  // Section 7: Description & Features
  console.group("📝 DESCRIPTION");
  console.log("Summary:", product?.description?.summary);
  console.log("List Items:", product?.description?.list_items);
  product?.description?.list_items?.forEach((item, index) => {
    console.group(`Feature ${index + 1}: ${item.title}`);
    console.table(item.list);
    console.groupEnd();
  });
  console.groupEnd();

  // Section 8: Complete Product Object
  console.group("🔍 COMPLETE PRODUCT OBJECT");
  console.log("Full Product Data:", product);
  console.groupEnd();

  console.groupEnd(); // End of Product Details Page Data

  return (
    <section className="flex flex-col gap-4 md:gap-5">
      {/* product category and review amounts start  */}
      <div className="flex flex-wrap items-center gap-3 min-[400px]:gap-4 text-xs sm:text-sm">
        <div className="flex items-center gap-2">
          <span className="text-[11px] uppercase tracking-wide text-gray-500">
            ক্যাটাগরি
          </span>
          <div className="flex flex-wrap gap-1">
            {product?.categories?.map((category, index) => (
              <span
                key={category?.slug}
                className="rounded-full bg-pink-50 px-2 py-[2px] text-[11px] font-medium text-primary"
              >
                {category?.name}
                {index < product.categories.length - 1 && ","}
              </span>
            ))}
          </div>
        </div>
        <div className="h-4 w-px bg-gray-200 hidden sm:block" />
        <div className="flex gap-1.5 items-center">
          <Rate
            disabled
            allowHalf
            defaultValue={calculateAverageRating(product?.reviews)}
          />
          <p className="text-xs sm:text-sm text-gray-600">
            ({product?.reviews.length} reviews)
          </p>
        </div>
      </div>
      {/* product category and review amounts end  */}

      {/* title & stock info start */}
      <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-snug">
        {product?.title}
      </h1>
      {/* title & stock info end */}

      {/* product  variant start */}
      <div className="pt-1 border-t border-pink-100">
        <Variant variant={product?.variant} handlePrice={handlePrice} />
      </div>
      {/* product variant end */}

      {/* product price info start */}
      <div className="flex items-end gap-3">
        <div className="flex items-center text-primary">
          <span className="text-3xl sm:text-4xl">
            <TbCurrencyTaka />
          </span>
          <h2 className="mt-[2px] sm:text-4xl text-2xl font-bold">
            {formatteeNumber(getFinalPrice())}
          </h2>
        </div>
        {hasDiscount && (
          <div className="flex flex-col gap-0.5 text-xs sm:text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <TbCurrencyTaka size={14} />
              <span className="line-through">
                {formatteeNumber(originalPrice)}
              </span>
            </div>
            <span className="inline-flex items-center rounded-full bg-red-50 px-2 py-[1px] text-[11px] font-medium text-red-600">
              {product?.off}% OFF
            </span>
          </div>
        )}
      </div>
      {/* product price info end */}

      {/* cart & buy now button start */}
      <div className="flex min-[1035px]:flex-row md:flex-col min-[500px]:flex-row flex-col gap-3">
        <div>
          <ProductCart
            price={getFinalPrice()}
            productId={Number(product?.documentId || product?.id)}
          />
        </div>
        <Link
          className="flex-1 flex items-center justify-center gap-1 px-4 py-2 sm:text-base text-sm hover:bg-black bg-primary text-white rounded-3xl transition-all ease-linear duration-200"
          href={`/checkout?productId=${encodeURIComponent(
            String(product?.documentId || product?.id),
          )}&companyId=${encodeURIComponent(product?.companyId || "")}`}
        >
          <span>এখনই কিনুন</span>
          <GoArrowUpRight className="sm:text-2xl text-xl" />
        </Link>
      </div>
      {/* cart & buy now button end */}

      <div className="flex gap-4 flex-wrap items-center text-sm sm:text-base">
        <Link
          href={"/product/111"}
          className=" flex items-center gap-1 hover:text-primary transition-all"
        >
          <FaRegQuestionCircle /> <span>Ask a question</span>
        </Link>
        <Link
          href={"/product/111"}
          className=" flex items-center gap-1 hover:text-primary transition-all"
        >
          <FaTruckFast /> <span>Delivery & Return</span>
        </Link>
        <Link
          href={"/product/111"}
          className=" flex items-center gap-1 hover:text-primary transition-all"
        >
          <GoShareAndroid />
          <span> Share</span>
        </Link>
      </div>
      <div className="grid min-[820px]:grid-cols-2 md:grid-cols-1 min-[500px]:grid-cols-2 grid-cols-1 grid-rows-2 min-[500px]:grid-rows-1 md:grid-rows-2 min-[820px]:grid-rows-1 gap-3 text-sm sm:text-base">
        <div className="flex flex-col items-center justify-center text-center border border-pink-100 bg-pink-50/40 px-5 py-3 rounded-xl w-full">
          <div>
            <FaRegClock size={20} />
          </div>
          <p>
            Estimate delivery times:
            <strong> 2-3 days</strong>
          </p>
        </div>
        <div className="flex flex-col items-center justify-center text-center border border-pink-100 bg-pink-50/40 px-5 py-3 rounded-xl">
          <div>
            <TbTruckReturn size={23} />
          </div>
          <p>
            Return within <strong>20 days</strong> of purchase. Duties & taxes
            are non-refunable
          </p>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-5">
        <div className="flex items-center gap-1">
          <div className="text-lg sm:text-xl text-green-600">
            <RiShieldCheckFill />
          </div>
          <p className="text-sm sm:text-base">Guaranted Safe Checkout</p>
        </div>
        <div className="flex gap-3">
          <div className="text-3xl bg-gray-100 px-3 text-blue-800 rounded-lg">
            <RiVisaLine />
          </div>
          <div className="text-3xl bg-gray-100 px-3 text-rose-600 rounded-lg">
            <RiMastercardFill />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
