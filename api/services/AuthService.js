"use strict";

import { User, Token } from "../models";

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
      let token = yield Token.findOrCreate({
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

      this.session.token = token[0];

      return yield next;
    }
    else {
      this.app.emit("error", Errors.InvalidLogin, this);
    }
  };
};
