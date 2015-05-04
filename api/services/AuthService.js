"use strict";

import { User, Token } from "../models";

const Errors = {
  invalidLogin: new Error("Invalid email address or password provided."),
  invalidToken: new Error("Invalid api authorization token.")
};

export let login = () => {
  return function *(next) {
    if (this.session.user) {
      return yield next;
    }

    let { email, password } = this.request.body;

    if (!email || !password) {
      this.app.emit("error", Errors.invalidLogin, this);
    }

    let user = yield User.find({
      where: { email: email },
      attributes: ["id", "password"]
    });

    if (!user) {
      this.app.emit("error", Errors.invalidLogin, this);
    }

    if (user.verifyPassword(password)) {
      let [token, success] = yield Token.findOrCreate({
        where: {
          ipAddress: this.request.ip,
          UserId: user.id
        },
        include: [{ model: User }],
        defaults: {
          key: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
            let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
          })
        }
      });

      this.session.token = token;

      return yield next;
    }
    else {
      this.app.emit("error", Errors.invalidLogin, this);
    }
  };
};

export let protect = () => {
  return function *(next) {
    let tokenKey = this.request.headers["x-api-token"] || false;

    if (!tokenKey) {
      return this.app.emit("error", Errors.invalidToken, this);
    }

    let token = Token.find({
      where: { key: tokenKey }
    });

    if (token) {
      yield next;
    }
    else {
      this.app.emit("error", Errors.invalidToken, this);
    }
  };
};
