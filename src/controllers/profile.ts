import { getUser, updateUser } from "@models/users";
import bcrypt from "bcryptjs";
import { type RequestHandler } from "express";
import { type ErrorResponse } from "react-router-dom";

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
