import { type ShopbebinReview } from "@models/interface";

import ReviewItem from "./ReviewItem";

interface ReviewsProps {
  reviews: ShopbebinReview[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className="flex-col">
      <h1 className="text-3xl font-semibold text-center mb-8">Reviews</h1>

      {reviews.length === 0 ? (
        <p className="text-center">No reviews yet.</p>
      ) : (
        <div className="flex-col gap-10">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
