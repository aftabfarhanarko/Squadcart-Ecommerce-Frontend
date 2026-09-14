"use client";

import { calculateAverageRating } from "@/utils/getAverageRating";
import { Rate } from "antd";
import ReviewModal from "./ReviewModal";
import ReviewsCarousel from "./ReviewsCarousel";
import { Review } from "@/types/review";
import { useMemo, useState } from "react";
import { API_CONFIG } from "@/lib/api-config";

interface ReviewProps {
  reviews: Review[];
  productId: number;
  companyId?: string;
}

const Reviews: React.FC<ReviewProps> = ({ reviews, productId, companyId }) => {
  const [reviewList, setReviewList] = useState<Review[]>(reviews || []);
  const effectiveCompanyId = companyId || API_CONFIG.companyId;

  const averageRating = useMemo(
    () => calculateAverageRating(reviewList),
    [reviewList]
  );

  const handleNewReview = (review: Review) => {
    setReviewList((prev) => [review, ...prev]);
  };

  return (
    <section className="flex gap-5 flex-col min-[850px]:flex-row">
      <div className="flex gap-3 flex-col min-w-max">
        <div>
          <h1 className=" text-base sm:text-lg font-medium">
            Customer Reviews
          </h1>
          <div className="flex gap-1 items-center">
            <Rate disabled value={averageRating} allowHalf />
            <p className=" sm:text-base text-xs">
              Based on {reviewList.length} review
            </p>
          </div>
        </div>

        <ReviewModal
          productId={productId}
          companyId={effectiveCompanyId}
          onSubmitted={handleNewReview}
        />
      </div>
      <div className=" overflow-hidden px-5 w-full">
        {reviewList.length > 0 ? (
          <ReviewsCarousel reviews={reviewList} />
        ) : (
          <p className="text-sm text-gray-600">No reviews yet.</p>
        )}
      </div>
    </section>
  );
};

export default Reviews;
