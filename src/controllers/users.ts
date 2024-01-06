import { type RequestHandler } from "express";

import { getUsers, type UserProps } from "../models/users";

export const fetchUsers: RequestHandler = (req, res) => {
  const { role, isBanned }: UserProps = req.query;

  const handleGetUsers = async () => {
    const users = await getUsers({ role, isBanned });
    console.log(users);

    res.json(users);
  };

  handleGetUsers().catch((err) => {
    console.log("[ERROR] fetchUsers", err);
    res.status(500).json(err);
  });
};
