import { type ReviewMetadata, Role, type User } from "@prisma/client";

import { createUser } from "../users";
import { createReview, deleteReview, getReview, getReviews, updateReview } from ".";

describe("Review model", () => {
  const randomContent = Math.random().toString(36).substring(7);
  const createdAt = new Date();
  const updatedAt = new Date();
  const randomRating = Math.random() * 5;

  const randomEmail = Math.random().toString(36).substring(7);
  const randomPhone = Math.random().toString(36).substring(7);
  const randomPassword = Math.random().toString(36).substring(7);
  const randomPasswordHash = randomPassword;

  let user: User = {
    id: "",
    email: randomEmail + "@shopbebin.com",
    phone: randomPhone,
    passwordHash: randomPasswordHash,
    addresses: [
      {
        unitNumber: "123A",
        street: "Ho Tung Mau",
        district: "Quan 1",
        city: "Ho Chi Minh",
      },
    ],
    role: Role.USER,
  };

  test("create user", async () => {
    user = await createUser(user);
  });

  let review: ReviewMetadata = {
    id: "",
    userId: "",
    comment: randomContent,
    createdAt,
    updatedAt,
    rating: randomRating,
  };

  test("create review", async () => {
    review.userId = user.id;
    review = await createReview(review);
  });

  test("get review by id", async () => {
    const foundReview = await getReview(review.id);
    expect(foundReview).not.toBeNull();
    expect(foundReview).toEqual(review);
  });

  test("get reviews", async () => {
    const reviews = await getReviews();
    expect(reviews).not.toBeNull();
    expect(reviews).toEqual([review]);
  });

  test("update review", async () => {
    const newContent = Math.random().toString(36).substring(7);
    review.comment = newContent;
    await updateReview(review);
    const updatedReview = await getReview(review.id);
    expect(updatedReview).not.toBeNull();
    expect(updatedReview).toEqual(review);
  });

  test("delete review", async () => {
    await deleteReview(review.id);
    const deletedReview = await getReview(review.id);
    expect(deletedReview).toBeNull();
  });
});
