import { type RequestHandler } from "express";
import { type JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { ExtractJwt, Strategy, type StrategyOptions } from "passport-jwt";

import { getUser } from "../models/users";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(options, (payload: JwtPayload, done) => {
    const isExpired = Date.now() > (payload.exp as number);
    if (isExpired) {
      done(null, false);
      return;
    }

    const uid = payload.sub;
    if (uid === undefined) {
      done("Undefined uid", false);
      return;
    }

    getUser(uid)
      .then((user) => {
        if (user === null) {
          done(null, false);
          return;
        }
        done(null, user);
      })
      .catch((err) => {
        done(err);
      });
  }),
);

export const requireAuth: RequestHandler = (req, res, next) => {
  passport.authenticate("jwt", { session: false })(req, res, next);
};
