"use strict";

import { User } from "../models";

const Errors = {
  InvalidLogin: new Error("Invalid email address or password provided.")
};

export let login = () => {
  return function *(next) {
    if (this.session.user) {
      return yield next;
    }

    let { email, password } = this.request.body;

    if (!email || !password) {
      this.app.emit("error", Errors.InvalidLogin, this);
    }

    let user = yield User.find({
      where: { email: email },
      attributes: ["id", "password"]
    });

    if (!user) {
      this.app.emit("error", Errors.InvalidLogin, this);
    }

    if (user.verifyPassword(password)) {
      this.session.user = user;
      return yield next;
    }
    else {
      this.app.emit("error", Errors.InvalidLogin, this);
    }
  };
};
