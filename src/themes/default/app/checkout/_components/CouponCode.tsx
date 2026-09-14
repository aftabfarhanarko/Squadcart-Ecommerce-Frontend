"use client";

import { PromoCode } from "@/lib/api-services";

interface CouponCodeProps {
  promoCode: string;
  setPromoCode: (v: string) => void;
  applyPromo: () => void;
  loading?: boolean;
  appliedPromo?: PromoCode | null;
  availablePromos?: PromoCode[];
  availablePromosLoading?: boolean;
  onSelectPromo?: (code: string) => void | Promise<void>;
}

const CouponCode = ({
  promoCode,
  setPromoCode,
  applyPromo,
  loading,
  appliedPromo,
  availablePromos,
  availablePromosLoading,
  onSelectPromo,
}: CouponCodeProps) => {
  const hasAvailablePromos = (availablePromos ?? []).length > 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 items-center justify-between">
        <input
          className="border-[1.5px] border-gray-300 outline-none rounded-[5px] py-[10px] px-2 focus:border-[#6d198a] placeholder:text-gray-500 flex-1"
          type="text"
          placeholder="Coupon Code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
        />
        <button
          type="button"
          onClick={applyPromo}
          disabled={loading}
          className="bg-primary text-white w-[40%] py-3 px-5 rounded-md disabled:opacity-70"
        >
          {loading ? "Applying..." : appliedPromo ? "Update" : "Apply"}
        </button>
      </div>

      {availablePromosLoading && (
        <p className="text-xs text-gray-500">Available coupons loading...</p>
      )}

      {hasAvailablePromos && !availablePromosLoading && (
        <div className="mt-1 flex flex-wrap gap-2">
          {availablePromos!.map((promo) => {
            const isActive = appliedPromo?.code === promo.code;
            return (
              <button
                key={promo.id}
                type="button"
                onClick={() => onSelectPromo?.(promo.code)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  isActive
                    ? "bg-primary text-white border-primary"
                    : "bg-pink-50 text-pink-700 border-pink-200 hover:bg-primary/10"
                }`}
              >
                <span className="font-semibold">{promo.code}</span>
                <span className="ml-1 text-[11px] text-pink-900/80">
                  {promo.discountType === "percentage"
                    ? `${promo.discountValue}% off`
                    : `$${promo.discountValue} off`}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {appliedPromo && (
        <p className="text-sm text-green-600">
          Applied: {appliedPromo.code}
        </p>
      )}
    </div>
  );
};

export default CouponCode;
