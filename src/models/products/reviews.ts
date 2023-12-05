import { type ProductReview, type ReviewMetadata } from "@prisma/client";

import { getPrismaClient } from "../prisma";

export const createReview = async (review: ReviewMetadata) => {
  const client = getPrismaClient();

  const { id, ...data } = review;

  const createdReview = await client.reviewMetadata.create({
    data,
  });

  return createdReview;
};

export const createProductReview = async (productReview: ProductReview) => {
  const client = getPrismaClient();
  const createdProductReview = await client.productReview.create({
    data: {
      productMetadataId: productReview.productMetadataId,
      reviewMetadataId: productReview.reviewMetadataId,
    },
    include: {
      review: true,
    },
  });

  return createdProductReview;
};

export const getProductReview = async (id: string) => {
  const client = getPrismaClient();

  return await client.productReview.findUnique({
    where: {
      id,
    },
    include: {
      review: true,
    },
  });
};

export const getReviews = async () => {
  const client = getPrismaClient();

  return await client.reviewMetadata.findMany();
};

export const getReview = async (id: string) => {
  const client = getPrismaClient();

  return await client.reviewMetadata.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });
};

export const updateReview = async (review: ReviewMetadata) => {
  const client = getPrismaClient();

  const { id, ...data } = review;

  const updatedReview = await client.reviewMetadata.update({
    where: {
      id,
    },
    data,
  });

  return updatedReview;
};

export const deleteReview = async (id: string) => {
  const client = getPrismaClient();

  return await client.reviewMetadata.delete({
    where: {
      id,
    },
  });
};
