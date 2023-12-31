import { type ShopbebinReview } from "@models/interface";

interface ReviewItemProps {
  review: ShopbebinReview;
}

const ReviewItem = ({ review }: ReviewItemProps) => {
  const { reviewMetadata } = review;
  const maxRatingList = [0, 1, 2, 3, 4];
  const ratingLostList = maxRatingList.filter((item) => item >= reviewMetadata.rating);
  const ratingList = [];
  for (let i = 0; i < reviewMetadata.rating; i++) {
    ratingList.push(i);
  }

  return (
    <div className="gap-2">
      <img
        src={"https://picsum.photos/200"}
        alt={""}
        className="w-10 h-10 rounded-full"
      />
      <div className="gap-2 flex-col">
        <h1 className="font-medium">{reviewMetadata.user.email}</h1>
        <p className="text-gray-500">{new Date(reviewMetadata.updatedAt).toLocaleDateString()}</p>

        <div>
          {ratingList.map((index) => (
            <i
              key={index}
              className="fa-solid fa-star text-primary"
            ></i>
          ))}
          {ratingLostList.map((index) => (
            <i
              key={index}
              className="fa-regular fa-star text-gray-400"
            ></i>
          ))}
        </div>

        <p>{reviewMetadata.comment}</p>
      </div>
    </div>
  );
};

export default ReviewItem;
