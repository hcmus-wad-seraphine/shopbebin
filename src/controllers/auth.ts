import bcrypt from "bcryptjs";
import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { createUser } from "../models/users";

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

  createUser(user)
    .then(() => {
      res.status(201).json({ status: 201, statusText: "Created" });
    })
    .catch((err) => {
      const errorResponse: ErrorResponse = {
        status: 500,
        statusText: "Email or phone already exists",
        data: err,
      };

      res.status(500).json(errorResponse);
    });
};
