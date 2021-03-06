"use strict";

import Router from "koa-router";
import NotFoundError from "../lib/NotFoundError";
import ResourceExistsError from "../lib/ResourceExistsError";
import * as helpers from "../../app/utils/helpers";
import * as AuthService from "../services/AuthService";
import { User, Profile, Token, Role } from "../models";

const router = new Router();

router.get("/users", AuthService.protect(), function *(next) {
  let users = yield User.findAll({
    attributes: ["id", "email", "lastLogin"],
    include: [{ model: Role }]
  });

  if (!users) {
    users = [];
  }

  this.body = users;
});

router.get("/users/:id", AuthService.protect(), function *(next) {
  let user = yield User.findOne({
    where: { id: this.params.id },
    include: [{ model: Token }, {model: Profile }, { model: Role }]
  });

  if (!user) {
    throw new NotFoundError(`Can't find user with id ${this.params.id}.`);
  }

  this.body = [user];
});

router.post("/users", AuthService.protect(), function *(next) {
  let data = this.request.body;

  let exists = yield User.find({
    where: { email: data.email }
  });

  if (exists) {
    throw new ResourceExistsError("User exists.");
  }

  let user = yield User.create(helpers.mask(data, "email", "password"));
  let profile = yield Profile.create({ UserId: user.id });

  this.body = [user];
});

router.put("/users/:id", AuthService.protect(), function *(next) {
  let user = yield User.find(this.params.id, {
    include: [{ model: Profile }, { model: Role }, { model: Token }]
  });
  let profile = yield user.getProfile();

  if (!user) {
    throw new Error("User not found");
  }

  let {
    email,
    firstName,
    lastName,
    biography,
    roles
  } = this.request.body;

  let roleModels = [];
  for (let i in roles) {
    let role = yield Role.findOne(roles[i]);
    roleModels.push(role);
  }

  yield user.setRoles(roleModels);

  user.email = email;
  profile.firstName = firstName;
  profile.lastName = lastName;
  profile.biography = biography;

  profile = yield profile.save();
  user = yield user.save();

  user = yield User.findOne({
    where: { id: user.id },
    include: [{ model: Profile }, { model: Role }, { model: Token }]
  });

  this.body = [user];
});

router.del("/users/:id", AuthService.protect(), function *(next) {
  let user = yield User.find({
    where: { id: this.params.id },
    include: [{ model: Profile }]
  });

  if (!user) {
    throw new Error("User not found.");
  }

  try {
    user.destroy();
    this.body = { message: "Ok" };
  }
  catch (err) {
    throw err;
  }
});

export default router;
