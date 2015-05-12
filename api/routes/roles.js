"use strict";

import fs from "fs";
import inflection from "inflection";
import Router from "koa-router";
import { Role, Permission } from "../models";
import * as AuthService from "../services/AuthService";

let router = new Router();

router.get("/roles", AuthService.protect(), function *(next) {
  let roles = yield Role.findAll();

  this.body = roles;
});

router.get("/roles/:roleId", AuthService.protect(), function *(next) {
  let role = yield Role.findOne({ where: { id: this.params.roleId } });
  let controllers = yield new Promise((resolve, reject) => {
    fs.readdir(__dirname, (err, dirs) => {
      if (err) {
        return reject(err);
      }
      dirs = dirs.map(d => d.match(/^(.+)\.js$/)[1])
        .reduce((memo, controller) => {
          let controllerName = inflection.transform(controller, [
            "singularize",
            "titleize"
          ]) + "Controller";

          memo[controller] = controllerName;
          return memo;
        }, { every: "*" });

      resolve(dirs);
    });
  });

  role.setDataValue("Controllers", controllers);

  this.body = [role];
});

router.post("/roles", AuthService.protect(), function *(next) {
  let { name } = this.request.body;
  let role = yield Role.create({ name });

  this.body = [role];
});

router.put("/roles/:roleId", AuthService.protect(), function *(next) {
  let { name } = this.request.body;
  let role = yield Role.findOne({
    where: { id: this.params.roleId },
    include: [{ model: Permission }]
  });

  if (!role) {
    this.app.emit("error", `Role: ${this.params.id} not found.`, this);
  }

  role.name = name;
  role = yield role.save();

  this.body = [role];
});

router.del("/roles/:roleId", function *(next) {
  let { roleId } = this.params;
  let role = yield Role.findOne({ where: { id: roleId } });


  if (!role) {
    this.app.emit("error", `Role: ${this.params.id} not found.`, this);
  }

  try {
    yield role.destroy();
    this.body = { message: "Ok" };
  }
  catch (err) {
    this.app.emit("error", err, this);
  }
});

export default router;
