import { type CartItem, type User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

import { getUser, updateUser } from "../models/users";
import { hashPassword } from "./utils";

export const changePassword: RequestHandler = (req, res) => {
  const { id, password, newPassword } = req.body;
  getUser(id)
    .then((user) => {
      if (user === null) {
        console.log("user not found at 13");
        const errorResponse: ErrorResponse = {
          status: 401,
          statusText: "User not found",
          data: null,
        };
        return res.status(401).json(errorResponse);
      }

      const passwordMatch = bcrypt.compareSync(password, user?.passwordHash);
      if (!passwordMatch) {
        console.log("password not match at 24");

        const errorResponse: ErrorResponse = {
          status: 401,
          statusText: "Current password is incorrect",
          data: null,
        };
        return res.status(401).json(errorResponse);
      }

      user.passwordHash = hashPassword(newPassword);

      updateUser(user)
        .then(() => {
          res.json({ user });
        })
        .catch((err) => {
          console.log("something went wrong at 41");

          const errorResponse: ErrorResponse = {
            status: 500,
            statusText: "Update password failed, please try again later",
            data: err,
          };

          res.status(500).json(errorResponse);
        });
    })
    .catch((err) => {
      const errorResponse: ErrorResponse = {
        status: 500,
        statusText: "Update password failed, please try again later",
        data: err,
      };

      res.status(500).json(errorResponse);
    });
};

export const updateCart: RequestHandler = (req, res) => {
  const handleUpdateCart = async () => {
    const cart = req.body.cart as CartItem[] | undefined;
    if (cart === undefined) {
      throw new Error("Cart is undefined");
    }

    const user = req.user as User | undefined;
    if (user === undefined) {
      throw new Error("User is undefined");
    }

    user.cart = cart;
    await updateUser(user);

    res.json({ status: 200, statusText: "Cart updated successfully" });
  };

  handleUpdateCart().catch((err) => {
    console.log("[ERROR] updateCart", err);

    const errorResponse: ErrorResponse = {
      status: 500,
      statusText: "Internal server error",
      data: err,
    };

    res.status(500).json(errorResponse);
  });
};
