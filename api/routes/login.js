"use strict";

import Router from "koa-router";
import NotFoundError from "../lib/NotFoundError";
import * as AuthService from "../services/AuthService";
import { User, Token } from "../models";

const router = new Router();

router.post("/login", AuthService.login(), function *(next) {
  this.body = this.session.token;
});

router.del("/logout", function *(next) {
  let token = yield Token.find({
    where: {
      key: this.session.token.key,
      ipAddress: this.request.ip
    }
  });

  if (token) {
    yield token.destroy();
  }

  delete this.session.token;

  this.body = { message: "Ok" };
});

export default router;
