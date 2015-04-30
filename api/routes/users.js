"use strict";

import Router from "koa-router";
import ResourceExistsError from "../lib/ResourceExistsError";
import * as helpers from "../../app/utils/helpers";
import { User } from "../models";

const router = new Router();

router.get("/users", function *(next) {

});

router.get("/users/:id", function *(next) {

});

router.post("/users", function *(next) {
  let data = this.request.body;

  let exists = yield User.find({
    where: { email: data.email }
  });

  if (exists) {
    throw new ResourceExistsError("User exists.");
  }

  let user = yield User.create(helpers.mask(data, "email", "password"));
  this.body = user;
});

router.put("/users/:id", function *(next) {

});

router.del("/users/:id", function *(next) {

});

export default router;
