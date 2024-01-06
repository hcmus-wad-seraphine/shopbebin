import { Role, type User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { type RequestHandler } from "express";
import jsonwebtoken from "jsonwebtoken";
import { type ErrorResponse } from "react-router-dom";

import { createUser, getUserByEmail, getUserByPhone } from "../models/users";
import { hashPassword } from "./utils";

export const register: RequestHandler = (req, res) => {
  const { email, phone, password } = req.body;

  const passwordHash = hashPassword(password);

  const user: User = {
    id: "",
    email,
    phone,
    passwordHash,
    name: email,
    avatar: "https://picsum.photos/200",
    role: Role.USER,
    addresses: [],
    cart: [],
    isBanned: false,
  };

  createUser(user)
    .then(() => {
      res.status(201).json({ status: 201, statusText: "User registered successfully" });
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

export const login: RequestHandler = (req, res) => {
  const { identifier, password } = req.body;
  const isEmail = identifier.includes("@");

  const getUser = async () => {
    if (isEmail === true) {
      return await getUserByEmail(identifier);
    } else {
      return await getUserByPhone(identifier);
    }
  };

  getUser()
    .then((user) => {
      if (user === null) {
        const errorResponse: ErrorResponse = {
          status: 401,
          statusText: "User not found",
          data: null,
        };
        return res.status(401).json(errorResponse);
      }

      const passwordMatch = bcrypt.compareSync(password, user.passwordHash);

      if (!passwordMatch) {
        const errorResponse: ErrorResponse = {
          status: 401,
          statusText: "Incorrect password",
          data: null,
        };
        return res.status(401).json(errorResponse);
      }

      const oneHour = 1000 * 60 * 60;

      const payload: jsonwebtoken.JwtPayload = {
        sub: user.id,
        iat: Date.now(),
        exp: Date.now() + oneHour,
      };

      const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET ?? "bidumdum");

      res.json({ token, user });
    })
    .catch((err) => {
      const errorResponse: ErrorResponse = {
        status: 500,
        statusText: "Unknown error occurred",
        data: err,
      };

      res.status(500).json(errorResponse);
    });
};
