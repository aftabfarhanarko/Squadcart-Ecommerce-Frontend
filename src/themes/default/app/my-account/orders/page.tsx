"use client";

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { getApiUrl, getApiHeaders } from "@/lib/api-config";
import { TbCurrencyTaka } from "react-icons/tb";
import { FiPackage, FiTruck } from "react-icons/fi";
import Link from "next/link";

interface OrderItem {
  id: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product: {
    id: number;
    name: string;
    image?: string;
    sku?: string;
  };
}

interface Order {
  id: number;
  totalAmount: number;
  status: string;
  paymentMethod: string;
  customerAddress?: string;
  createdAt: string;
  items: OrderItem[];
}

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    case "shipped":
      return "bg-blue-100 text-blue-800";
    case "paid":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const Orders = () => {
  const { userSession } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState<number | null>(
    null,
  );

  const fetchOrders = useCallback(async () => {
    try {
      const response = await axios.get(getApiUrl("/orders/my-orders"), {
        headers: getApiHeaders(userSession?.accessToken),
      });
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [userSession?.accessToken]);

  useEffect(() => {
    if (userSession?.accessToken) {
      fetchOrders();
    }
  }, [userSession, fetchOrders]);

  const isOrderCancellable = (order: Order): boolean => {
    if (order.status.toLowerCase() === "cancelled") return false;
    if (order.status.toLowerCase() === "delivered") return false;

    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const hoursDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60);

    return hoursDiff <= 24;
  };

  const handleCancelOrder = async (orderId: number) => {
    if (!confirm("Are you sure you want to cancel this order?")) {
      return;
    }

    try {
      setCancellingOrderId(orderId);
      await axios.patch(
        getApiUrl(`/orders/${orderId}/cancel`),
        {},
        {
          headers: getApiHeaders(userSession?.accessToken),
        },
      );
      alert("Order cancelled successfully!");
      fetchOrders(); // Refresh orders list
    } catch (error: unknown) {
      console.error("Error cancelling order:", error);
      const axiosError = error as {
        response?: { data?: { message?: string; error?: string } };
      };
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.response?.data?.error ||
        "Failed to cancel order. Please try again.";
      alert(errorMessage);
    } finally {
      setCancellingOrderId(null);
    }
  };

  if (loading) {
    return (
      <section className="w-full flex justify-center items-center min-h-[320px]">
        <div className="max-w-md w-full text-center space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-pink-50 px-4 py-1 border border-pink-100">
            <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
            <span className="text-[11px] font-medium text-pink-700">
              Loading your orders
            </span>
          </div>
          <p className="text-sm text-gray-600">
            আপনার সাম্প্রতিক অর্ডারগুলো লোড হচ্ছে, একটু অপেক্ষা করুন।
          </p>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="w-full flex flex-col gap-5">
        <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-md px-4 py-4 sm:px-5 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-pink-100/90">
                My account
              </p>
              <h2 className="text-xl md:text-2xl font-semibold">My orders</h2>
              <p className="text-xs sm:text-sm text-pink-50/95 max-w-md">
                আপনি এখনও কোনো অর্ডার করেননি। প্রথম অর্ডারের সাথে প্রিমিয়াম
                অভিজ্ঞতা শুরু করুন।
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs sm:text-sm">
              <FiPackage className="text-pink-100" />
              <span>অর্ডার হিস্টোরি এখানে দেখা যাবে</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center min-h-[220px]">
          <div className="max-w-md w-full text-center space-y-4 rounded-2xl border border-dashed border-pink-200 bg-white/70 px-6 py-8">
            <p className="text-sm font-semibold text-gray-900">
              বর্তমানে কোনো অর্ডার পাওয়া যায়নি
            </p>
            <p className="text-sm text-gray-600">
              শপ থেকে আপনার পছন্দের পণ্য নির্বাচন করে এখনই প্রথম অর্ডার করে
              ফেলুন।
            </p>
            <div className="flex justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
              >
                শপে যান
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-orange-400 text-white shadow-md px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="space-y-1.5">
            <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-pink-100/90">
              My account
            </p>
            <h2 className="text-xl md:text-2xl font-semibold">My orders</h2>
            <p className="text-xs sm:text-sm text-pink-50/95 max-w-md">
              আপনার সব অর্ডারের স্ট্যাটাস, পেমেন্ট এবং পণ্য তালিকা প্রিমিয়াম
              ভিউতে দেখুন।
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
            <div className="rounded-xl bg-white/10 px-3 py-2 flex items-center gap-2">
              <FiPackage className="text-pink-50" />
              <span className="text-[11px] font-medium">
                মোট অর্ডার {orders.length}
              </span>
            </div>
            <div className="rounded-xl bg-white/10 px-3 py-2 flex items-center gap-2">
              <FiTruck className="text-pink-50" />
              <span className="text-[11px] font-medium">
                ট্র্যাক করুন ডেলিভারি স্ট্যাটাস
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white/95 p-4 sm:p-5 rounded-2xl shadow-sm border border-pink-50"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-wide text-gray-500">
                  Order ID #{order.id}
                </p>
                <p className="text-sm text-gray-700">
                  Date: {formatDate(order.createdAt)}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status.toUpperCase()}
              </span>
            </div>

            <div className="border-t border-gray-100 pt-4 mb-4">
              <div className="flex flex-col gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Quantity: {item.quantity} ×{" "}
                        <span className="inline-flex items-center">
                          <TbCurrencyTaka size={12} />
                          {item.unitPrice}
                        </span>
                      </p>
                    </div>
                    <div className="flex items-center text-primary font-semibold">
                      <TbCurrencyTaka size={18} />
                      <span>{item.totalPrice}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                <div className="space-y-1">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Payment: {order.paymentMethod}
                  </p>
                  {order.customerAddress && (
                    <p className="text-xs sm:text-sm text-gray-600">
                      Address: {order.customerAddress}
                    </p>
                  )}
                </div>
                <div className="inline-flex items-center rounded-full bg-pink-50 px-4 py-2 text-primary text-base sm:text-lg font-semibold">
                  <TbCurrencyTaka size={24} />
                  <span>{order.totalAmount}</span>
                </div>
              </div>
              {isOrderCancellable(order) && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={cancellingOrderId === order.id}
                    className="px-4 py-2 rounded-full bg-red-500 text-white text-xs sm:text-sm font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {cancellingOrderId === order.id
                      ? "Cancelling..."
                      : "Cancel Order"}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
