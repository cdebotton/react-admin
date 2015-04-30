"use strict";

import Router from "koa-router";
import NotFoundError from "../lib/NotFoundError";
import { User } from "../models";

const router = new Router();

router.post("/login", function *(next) {
  const { email, password } = this.request.body;

  let user = yield User.find({
    where: { email },
    attributes: ["id"]
  });

  if (!user) {
    this.status = 404;
    throw new NotFoundError("User not found.");
  }

  this.body = this.request.body;
});

export default router;
