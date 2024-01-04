import { type CartItem, type Order, type Review } from "@prisma/client";
import { appState, type Profile } from "@views/valtio";
import { useEffect, useState } from "react";
import Modal from "react-modal";

import ReviewCard from "./ReviewCard";

interface ReviewProps {
  orderId: string;
  cart: CartItem[];
  isOpen: boolean;
  onSetOrder?: (order: Order) => void;
}

const ReviewProduct = ({ orderId, cart, isOpen, onSetOrder }: ReviewProps) => {
  const [comments, setComments] = useState<string[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { user } = appState.profile as Profile;

  const reviews: Review[] = cart.map((item) => ({
    id: "",
    userId: user.id,
    productMetadataId: item.metadataId,
    rating: 0,
    comment: "",
    createdAt: new Date(),
  }));

  const handleCreateReview = async (review: Review) => {
    if (!appState.profile) return;

    await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${appState.profile.token}`,
      },
      body: JSON.stringify({ review }),
    });
  };

  const handleUpdateReviewState = async () => {
    if (!appState.profile) return;

    const response = await fetch(`/api/orders/status/${orderId}?status=REVIEWED`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${appState.profile.token}`,
      },
    });

    const updatedOrder = await response.json();
    onSetOrder && onSetOrder(await updatedOrder.json());
  };

  const handleSubmit = () => {
    reviews.forEach((review, index) => {
      review.comment = comments[index];
      review.rating = ratings[index];

      if (review.rating === 0) return;
      handleCreateReview(review).catch((err) => {
        console.log(err);
      });
    });

    handleUpdateReviewState().catch((err) => {
      console.log(err);
    });

    setIsModalOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      width: "80%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      maxHeight: 500,
    },
  };

  useEffect(() => {
    setComments(reviews.map((review) => review.comment));
    setRatings(reviews.map((review) => review.rating));
  }, []);

  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  return (
    <Modal
      isOpen={isModalOpen}
      style={customStyles}
    >
      <div className="flex-col w-full gap-5">
        <h1 className="text-2xl font-semibold text-primary">Review</h1>

        <div className="flex-col gap-5">
          {cart.map((item, index) => {
            const changeRating = (rating: number) => {
              const newRatings = [...ratings];
              newRatings[index] = rating;
              setRatings(newRatings);
            };

            const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
              const newComments = [...comments];
              newComments[index] = e.target.value;
              setComments(newComments);
            };

            return (
              <div key={index}>
                <ReviewCard
                  name={item.name}
                  image={item.image}
                  onChangeComment={changeComment}
                  onChangeRating={changeRating}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={handleSubmit}
          className="bg-primary text-white rounded-full px-10 py-2 self-center"
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};

export default ReviewProduct;
