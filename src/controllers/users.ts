import { type RequestHandler } from "express";

export const fetchProfile: RequestHandler = (req, res) => {
  if (req.user === undefined) {
    res.status(500).json({ error: "User is undefined" });
    return;
  }

  res.json(req.user);
};
