"use strict";

import Router from "koa-router";
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
    this.body = { message: "User not found" };
    return yield next;
  }

  this.body = this.request.body;
});

export default router;
