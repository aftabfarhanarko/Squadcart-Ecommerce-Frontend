"use client";
import CouponCode from "./CouponCode";
import formatteeNumber from "@/utils/formatteNumber";
import { PromoCode } from "@/lib/api-services";

interface CheckoutCartProps {
  items: {
    id: number;
    product: { id: number; name: string; thumbnail?: string; images?: { url: string; alt?: string }[] };
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }[];
  subtotal: number;
  discount: number;
  total: number;
  shipping: number;
  grandTotal: number;
  promoCode: string;
  setPromoCode: (v: string) => void;
  applyPromo: () => void;
  promoLoading?: boolean;
  promo: PromoCode | null;
  availablePromos?: PromoCode[];
  availablePromosLoading?: boolean;
  applyPromoFromButton?: (code: string) => void | Promise<void>;
}

const CheckoutCart = ({
  items,
  subtotal,
  discount,
  shipping,
  grandTotal,
  promoCode,
  setPromoCode,
  applyPromo,
  promoLoading,
  promo,
  availablePromos,
  availablePromosLoading,
  applyPromoFromButton,
}: CheckoutCartProps) => {
  return (
    <section className="rounded-2xl border border-pink-100 bg-white/90 p-5 md:p-6 shadow-sm flex flex-col gap-6">
      <h1 className="text-lg md:text-xl font-semibold text-gray-900">
        আপনার কার্ট
      </h1>
      {/* products */}
      {/* <div className=" flex flex-col gap-4">
        {items.map((item) => (
          <CartProduct key={item.id} item={item} />
        ))}
      </div> */}
      {/* coupon code  */}
      <CouponCode
        promoCode={promoCode}
        setPromoCode={setPromoCode}
        applyPromo={applyPromo}
        loading={promoLoading}
        appliedPromo={promo}
        availablePromos={availablePromos}
        availablePromosLoading={availablePromosLoading}
        onSelectPromo={(code) => applyPromoFromButton?.(code)}
      />
      {/* total */}
      <div className="border-t-[1.5px]">
        {/* item summary */}
        <div className="flex flex-col gap-2 py-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between text-sm text-gray-700"
            >
              <span className="line-clamp-1">
                {item.product.name} × {item.quantity}
              </span>
              <span>{formatteeNumber(item.unitPrice * item.quantity)}$</span>
            </div>
          ))}
        </div>
        <div className=" flex flex-col gap-1 py-3">
          <div className=" flex justify-between items-center">
            <p>Subtotal</p>
            <p>{formatteeNumber(subtotal)}$</p>
          </div>
          {promo && (
            <div className=" flex justify-between items-center text-green-600">
              <p>Promo ({promo.code})</p>
              <p>-{formatteeNumber(discount)}$</p>
            </div>
          )}
          <div className=" flex justify-between items-center">
            <p>Shipping</p>
            <p>{formatteeNumber(shipping)}$</p>
          </div>
        </div>
        <div className=" flex justify-between items-center border-t-[1.5px] pt-2 font-bold">
          <p>Total</p>
          <p>{formatteeNumber(grandTotal)}$</p>
        </div>
      </div>

      <p className=" font-medium text-center">
        যেকোনো সমস্যায় নির্দ্বিধায় যোগাযোগ করুন- 01774617452
      </p>
    </section>
  );
};

export default CheckoutCart;
