"use strict";

import Router from "koa-router";
import { Token } from "../models";
import * as AuthService from "../services/AuthService";

let router = new Router();

router.get("/tokens", AuthService.protect(), function *(next) {
  let tokens = yield Token.findAll();

  this.body = tokens;
});

export default router;
