import { type RequestHandler } from "express";

export const fetchProfile: RequestHandler = (req, res, next) => {
  if (req.user === undefined) {
    res.status(500).json({ error: "User is undefined" });
    return;
  }

  next();
};
