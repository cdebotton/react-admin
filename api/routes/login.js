"use strict";

import Router from "koa-router";
import NotFoundError from "../lib/NotFoundError";
import * as AuthService from "../services/AuthService";
import { User } from "../models";

const router = new Router();

router.post("/login", AuthService.login(), function *(next) {

  this.body = this.user;
  // this.body = { authed: isAuthed };
});

router.del("/logout", function *(next) {
  delete this.session.user;

  this.body = { message: "Ok" };
});

export default router;
