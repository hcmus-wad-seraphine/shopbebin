import { type User } from "@prisma/client";
import { type RequestHandler } from "express";

import { createReview } from "../models/reviews";

export const makeReview: RequestHandler = (req, res) => {
  const handleMakeReview = async () => {
    const user = req.user as User | undefined;
    if (user === undefined) {
      throw new Error("User is undefined");
    }

    const review = req.body.review;
    if (review === undefined) {
      throw new Error("Review is undefined");
    }

    await createReview(review);
    res.json(review);
  };

  handleMakeReview().catch((err) => {
    console.log("[ERROR] makeReview", err);

    res.status(500).json(err);
  });
};
