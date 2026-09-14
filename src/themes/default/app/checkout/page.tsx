"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useEffect, useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import CheckoutCart from "./_components/CheckoutCart";
import CustomerInfo from "./_components/CustomerInfo";
import toast from "react-hot-toast";
import {
  createOrder,
  getPromocodes,
  PromoCode,
  getProduct,
} from "@/lib/api-services";
import { API_CONFIG } from "@/lib/api-config";

const CheckoutContent = () => {
  const { userSession } = useAuth();
  const { cart, refetch } = useCart();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promo, setPromo] = useState<PromoCode | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  const [availablePromos, setAvailablePromos] = useState<PromoCode[]>([]);
  const [availablePromosLoading, setAvailablePromosLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "prepaid">("cod");
  const [deliveryType, setDeliveryType] = useState<"inside" | "outside">(
    "inside",
  );
  const [enrichedItems, setEnrichedItems] = useState<
    Array<{
      id: number;
      product: {
        id: number;
        name: string;
        thumbnail?: string;
        images?: { url: string; alt?: string }[];
      };
      quantity: number;
      unitPrice: number;
      totalPrice: number;
    }>
  >([]);
  const [queryProduct, setQueryProduct] = useState<{
    id: number;
    product: {
      id: number;
      name: string;
      thumbnail?: string;
      images?: { url: string; alt?: string }[];
    };
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  } | null>(null);

  // Fetch product from query params
  useEffect(() => {
    const productId = searchParams.get("productId");
    const companyId =
      searchParams.get("companyId") ||
      userSession?.companyId ||
      API_CONFIG.companyId;

    if (productId && companyId) {
      const fetchQueryProduct = async () => {
        try {
          const product = await getProduct(parseInt(productId), companyId);
          // Calculate final price (considering discount)
          const finalPrice = product.discountPrice || product.price;
          setQueryProduct({
            id: 0, // Temporary ID for query product
            product: {
              id: product.id,
              name: product.name,
              thumbnail: product.thumbnail,
              images: product.images,
            },
            quantity: 1,
            unitPrice: finalPrice,
            totalPrice: finalPrice,
          });
        } catch (error) {
          console.error("Failed to fetch product from query params:", error);
          toast.error("Failed to load product");
        }
      };

      fetchQueryProduct();
    } else {
      setQueryProduct(null);
    }
  }, [searchParams, userSession?.companyId]);

  // Prefill user info when logged in
  useEffect(() => {
    if (userSession?.user) {
      setName(userSession.user.name || "");
      setEmail(userSession.user.email || "");
      setPhone((userSession.user.phone as string | undefined) || "");
      setAddress((userSession.user.address as string | undefined) || "");
    }
  }, [userSession]);

  // Fetch product details for cart items
  useEffect(() => {
    const enrichCartItems = async () => {
      if (
        !cart?.items ||
        !Array.isArray(cart.items) ||
        !cart.items.length ||
        !userSession?.companyId
      ) {
        setEnrichedItems([]);
        return;
      }

      try {
        const companyId = userSession.companyId || API_CONFIG.companyId;
        const enriched = await Promise.all(
          cart.items.map(async (item) => {
            // If product already has name, use it
            if (item.product?.name) {
              return item;
            }
            // Otherwise fetch product details
            try {
              const product = await getProduct(item.product.id, companyId);
              return {
                ...item,
                product: {
                  id: product.id,
                  name: product.name,
                  thumbnail: product.thumbnail,
                  images: product.images,
                },
              };
            } catch (error) {
              console.error(
                `Failed to fetch product ${item.product.id}:`,
                error,
              );
              return item;
            }
          }),
        );
        setEnrichedItems(enriched);
      } catch (error) {
        console.error("Failed to enrich cart items:", error);
        setEnrichedItems(Array.isArray(cart.items) ? cart.items : []);
      }
    };

    enrichCartItems();
  }, [cart?.items, userSession?.companyId]);

  // Clear query product if it's already in cart
  useEffect(() => {
    if (queryProduct && cart?.items) {
      const existsInCart = cart.items.some(
        (item) => item.product.id === queryProduct.product.id,
      );
      if (existsInCart) {
        setQueryProduct(null);
        // Remove query params from URL
        const url = new URL(window.location.href);
        url.searchParams.delete("productId");
        url.searchParams.delete("companyId");
        window.history.replaceState({}, "", url.toString());
      }
    }
  }, [queryProduct, cart?.items]);

  // Combine cart items with query product if present
  const items = useMemo(() => {
    const cartItems =
      enrichedItems.length > 0
        ? enrichedItems
        : Array.isArray(cart?.items)
          ? cart.items
          : [];

    // If query product exists and not already in cart, add it
    if (queryProduct) {
      const existsInCart = cartItems.some(
        (item) => item.product.id === queryProduct.product.id,
      );
      if (!existsInCart) {
        return [queryProduct, ...cartItems];
      }
    }

    return cartItems;
  }, [enrichedItems, cart?.items, queryProduct]);
  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + Number(item.unitPrice || 0) * (item.quantity || 0),
        0,
      ),
    [items],
  );

  const discount = useMemo(() => {
    if (!promo) return 0;
    // validate min order
    if (promo.minOrderAmount && subtotal < promo.minOrderAmount) return 0;
    if (promo.discountType === "percentage") {
      return Math.min((subtotal * promo.discountValue) / 100, subtotal);
    }
    return Math.min(promo.discountValue, subtotal);
  }, [promo, subtotal]);

  const shippingCharge = deliveryType === "inside" ? 60 : 120;
  const total = Math.max(subtotal - discount, 0);
  const grandTotal = total + shippingCharge;

  const applyPromoCore = async (code: string) => {
    const trimmed = code.trim();
    if (!trimmed) return;
    if (!userSession?.accessToken) {
      toast.error("Please login to apply promo code");
      router.push("/login");
      return;
    }
    try {
      setPromoLoading(true);
      let promos: PromoCode[] = availablePromos;
      if (!promos.length) {
        promos = await getPromocodes(
          userSession.accessToken,
          userSession.companyId || API_CONFIG.companyId,
        );
        setAvailablePromos(promos);
      }
      const now = new Date();
      const match = promos.find(
        (p) =>
          p.code.toLowerCase() === trimmed.toLowerCase() &&
          p.isActive &&
          (!p.startsAt || new Date(p.startsAt) <= now) &&
          (!p.expiresAt || new Date(p.expiresAt) >= now),
      );
      if (!match) {
        toast.error("Invalid promo code");
        setPromo(null);
        return;
      }
      // date checks
      const currentTime = new Date();
      if (match.startsAt && new Date(match.startsAt) > currentTime) {
        toast.error("Promo not started");
        setPromo(null);
        return;
      }
      if (match.expiresAt && new Date(match.expiresAt) < currentTime) {
        toast.error("Promo expired");
        setPromo(null);
        return;
      }
      if (match.minOrderAmount && subtotal < match.minOrderAmount) {
        toast.error(`Minimum order ${match.minOrderAmount} required`);
        setPromo(null);
        return;
      }
      setPromoCode(match.code);
      setPromo(match);
      toast.success("Promo applied");
    } catch (error) {
      console.error("Failed to apply promo", error);
      toast.error("Failed to apply promo");
    } finally {
      setPromoLoading(false);
    }
  };

  const applyPromo = async () => {
    if (!promoCode.trim()) return;
    await applyPromoCore(promoCode);
  };

  const applyPromoFromButton = async (code: string) => {
    setPromoCode(code);
    await applyPromoCore(code);
  };

  // Prefetch available promos for auto-select buttons
  useEffect(() => {
    const fetchPromos = async () => {
      if (!userSession?.accessToken) {
        setAvailablePromos([]);
        return;
      }
      try {
        setAvailablePromosLoading(true);
        const promos = await getPromocodes(
          userSession.accessToken,
          userSession.companyId || API_CONFIG.companyId,
        );
        const now = new Date();
        const activePromos = promos.filter((p) => {
          if (!p.isActive) return false;
          if (p.startsAt && new Date(p.startsAt) > now) return false;
          if (p.expiresAt && new Date(p.expiresAt) < now) return false;
          return true;
        });
        setAvailablePromos(activePromos);
      } catch (error) {
        console.error("Failed to load promo codes", error);
        setAvailablePromos([]);
      } finally {
        setAvailablePromosLoading(false);
      }
    };

    fetchPromos();
  }, [userSession?.accessToken, userSession?.companyId]);

  const handleOrder = async () => {
    if (!userSession?.accessToken || !userSession?.userId) {
      toast.error("Please login to place order");
      router.push("/login");
      return;
    }
    if (!items.length) {
      toast.error("Cart is empty");
      return;
    }
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("Name, phone, and address are required");
      return;
    }
    try {
      setOrderLoading(true);
      await createOrder(
        {
          customerId: userSession.userId,
          customerName: name,
          customerPhone: phone,
          customerAddress: address,
          shippingAddress: address,
          deliveryType:
            deliveryType === "inside" ? "INSIDEDHAKA" : "OUTSIDEDHAKA",
          paymentMethod: paymentMethod === "cod" ? "COD" : "DIRECT",
          items: items.map((i) => ({
            productId: i.product.id,
            quantity: i.quantity,
          })),
        },
        userSession.accessToken,
        userSession.companyId,
      );
      toast.success("Order placed successfully");
      await refetch();
      router.push("/my-account/orders");
    } catch (error) {
      console.error("Order failed", error);
      toast.error("Order failed");
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/40 to-white">
      <section className="max-w-7xl mx-auto px-5 py-8 md:py-10">
        <div className="flex flex-col gap-3 border-b border-pink-100 pb-5">
          <p className="text-[11px] font-semibold tracking-[0.18em] text-pink-600 uppercase">
            Checkout
          </p>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            অর্ডার সম্পূর্ণ করুন
          </h1>
          <p className="text-sm text-gray-600">
            আপনার ডেলিভারি তথ্য দিন এবং পেমেন্ট পদ্ধতি নির্বাচন করুন।
          </p>
          <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-[11px]">
                1
              </span>
              <span>কার্ট</span>
            </div>
            <span className="h-px w-6 bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[11px] text-white">
                2
              </span>
              <span className="font-medium text-gray-900">চেকআউট</span>
            </div>
            <span className="h-px w-6 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-200 text-[11px]">
                3
              </span>
              <span>অর্ডার সম্পন্ন</span>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-5 min-[820px]:grid-cols-5 min-[950px]:grid-cols-3">
          <div className="min-[820px]:col-span-3 min-[950px]:col-span-2">
            <CustomerInfo
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              address={address}
              setAddress={setAddress}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              deliveryType={deliveryType}
              setDeliveryType={setDeliveryType}
              onSubmit={handleOrder}
              submitting={orderLoading}
            />
          </div>
          <div className="min-[820px]:col-span-2 min-[950px]:col-span-1 order-first min-[820px]:order-none md:sticky md:top-24 self-start">
            <CheckoutCart
              items={items}
              subtotal={subtotal}
              discount={discount}
              total={total}
              shipping={shippingCharge}
              grandTotal={grandTotal}
              promoCode={promoCode}
              setPromoCode={setPromoCode}
              applyPromo={applyPromo}
              promoLoading={promoLoading}
              promo={promo}
              availablePromos={availablePromos}
              availablePromosLoading={availablePromosLoading}
              applyPromoFromButton={applyPromoFromButton}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

const Checkout = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-[300px] flex items-center justify-center">
          <p className="text-sm text-gray-600">Checkout লোড হচ্ছে...</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default Checkout;
