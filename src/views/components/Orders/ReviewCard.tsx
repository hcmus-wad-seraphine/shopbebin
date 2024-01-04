import { shortenProductName } from "@utils/converter";
import { useState } from "react";

interface ReviewCardProps {
  name: string;
  image: string;
  onChangeComment: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onChangeRating: (rating: number) => void;
}

const ReviewCard = ({ name, image, onChangeComment, onChangeRating }: ReviewCardProps) => {
  const [rating, setRating] = useState(0);
  const ratingList = [1, 2, 3, 4, 5];

  const handleChangeRating = (rating: number) => {
    setRating(rating);
    onChangeRating(rating);
  };

  return (
    <div className="w-full gap-5 p-5">
      <div className="flex-col justify-center items-center w-[100px] flex-wrap">
        <img
          src={image}
          alt={name}
          className="w-[100px] h-[100px] object-cover rounded-md"
        />
        <p>{shortenProductName(name)}</p>
      </div>

      <div className="flex-col w-full gap-3 justify-center">
        <div className="gap-1">
          {ratingList.map((item) => {
            return (
              <button
                key={item}
                onClick={() => {
                  handleChangeRating(item);
                }}
              >
                <i
                  className={`fa-${item <= rating ? "solid" : "regular"} fa-star text-primary`}
                ></i>
              </button>
            );
          })}
        </div>
        <textarea
          className="w-full h-full border border-gray-400 rounded-md p-2"
          maxLength={200}
          onChange={onChangeComment}
        />
      </div>
    </div>
  );
};

export default ReviewCard;
