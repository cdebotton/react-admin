"use strict";

import passport from "koa-passport";
import { User } from "./models";
import { Strategy as LocalStrategy } from "passport-local";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.find(id).then(user => done(user));
});

passport.use(new LocalStrategy((email, password, done) => {
  User.find({
    where: { email: email },
    attributes: ["id"]
  }).then((err, user) => {
    if (err) {
      return done(err);
    }
    else if (!user) {
      return done("User not found");
    }
    else {
      return done(null, user);
    }
  });
}));

