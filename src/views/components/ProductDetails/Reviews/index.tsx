import { type Review } from "@models/interface";

import ReviewItem from "./ReviewItem";

interface ReviewsProps {
  reviews: Review[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div className="flex-col">
      <h1 className="text-3xl font-semibold text-center">Reviews</h1>
      <div className="flex-col">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </div>
    </div>
  );
};

export default Reviews;
