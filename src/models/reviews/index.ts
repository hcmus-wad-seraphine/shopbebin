import { type Review } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createReview = async (review: Review) => {
  const client = getPrismaClient();
  const { id, ...data } = review;

  const createdReview = await client.review.create({
    data,
  });

  return createdReview;
};
