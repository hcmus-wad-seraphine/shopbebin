import bcrypt from "bcryptjs";
import { type RequestHandler } from "express";

import { createUser } from "../models/users";
import { type ApiResponse } from "./types";

export const register: RequestHandler = (req, res) => {
  const { email, phone, password } = req.body;

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(password, salt);

  const user = {
    email: email as string,
    phone: phone as string,
    passwordHash,
    addresses: [],
  };

  const register = async () => {
    await createUser(user);
    const response: ApiResponse = {
      ok: true,
      data: user,
    };
    res.json(response);
  };

  register().catch(() => {
    const response: ApiResponse = {
      ok: false,
      errorMessage: "Email or phone number already exists",
    };
    res.status(500).json(response);
  });
};
