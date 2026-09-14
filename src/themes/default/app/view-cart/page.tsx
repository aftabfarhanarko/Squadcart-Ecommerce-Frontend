"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiPlus, FiMinus } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function ViewCartPage() {
  const { cart, loading, updateCartItem, deleteCartItem } = useCart();
  const router = useRouter();

  const items = Array.isArray(cart?.items) ? cart.items : [];
  const subtotal = items.reduce(
    (sum, item) => sum + Number(item.unitPrice || 0) * (item.quantity || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/20 to-white py-10 font-baiJamjuree">
      <div className="max-w-7xl mx-auto px-5">
        {/* Header Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-3 py-1 border border-pink-100 mb-2">
              <span className="h-2 w-2 rounded-full bg-pink-500" />
              <span className="text-[11px] font-semibold text-pink-700">
                আপনার কেনাকাটার ব্যাগ
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Shopping Cart
            </h1>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <FiArrowLeft /> আরও কেনাকাটা করুন
          </Link>
        </div>

        {loading ? (
          <div className="min-h-[300px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
          </div>
        ) : items.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm max-w-lg mx-auto my-12">
            <div className="w-20 h-20 bg-pink-50 text-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-5">
              <FiShoppingBag />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              আপনার কার্ট খালি রয়েছে
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              আপনার পছন্দসই পণ্যসমূহ খুঁজে বের করতে আমাদের কালেকশন ভিজিট করুন।
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all shadow-md active:scale-95"
            >
              পণ্যসমূহ দেখুন
            </Link>
          </div>
        ) : (
          /* Cart Items & Summary Grid */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => {
                const itemTotal = Number(item.unitPrice || 0) * item.quantity;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-center gap-4 transition-all hover:shadow-md"
                  >
                    {/* Product Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gray-50 overflow-hidden flex-shrink-0 border border-gray-100">
                      {item.product?.thumbnail || item.product?.images?.[0]?.url ? (
                        <Image
                          src={item.product?.thumbnail || item.product?.images?.[0]?.url || ""}
                          alt={item.product?.name || "Product"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left">
                      <h3 className="font-bold text-gray-900 text-base line-clamp-1 mb-1">
                        {item.product?.name || "Product"}
                      </h3>
                      <p className="text-primary font-bold text-sm">
                        ৳{item.unitPrice?.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="p-1 text-gray-600 hover:text-primary transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-600 hover:text-primary transition-colors"
                        aria-label="Increase quantity"
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>

                    {/* Total & Remove */}
                    <div className="flex items-center gap-4 text-right">
                      <p className="font-extrabold text-gray-900 text-base min-w-[70px]">
                        ৳{itemTotal.toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        aria-label="Remove item"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-black text-gray-900 border-b border-gray-100 pb-4">
                অর্ডার সামারি
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>সাবটোটাল</span>
                  <span className="font-bold text-gray-900">
                    ৳{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>শিপিং চার্জ</span>
                  <span className="text-xs text-gray-400">চেকআউট ধাপে হিসাব করা হবে</span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-900 text-base">সর্বমোট (আনুমানিক)</span>
                <span className="font-black text-primary text-xl">
                  ৳{subtotal.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full bg-primary text-white font-bold py-4 rounded-2xl hover:bg-primary/90 transition-all shadow-lg active:scale-95 text-center block"
              >
                চেকআউট সম্পূর্ণ করুন
              </button>

              <Link
                href="/products"
                className="w-full border border-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl hover:bg-gray-50 transition-all text-center block text-sm"
              >
                কেনাকাটা চালিয়ে যান
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

