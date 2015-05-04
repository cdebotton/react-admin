"use strict";

import * as request from "./request";
import { Schema, arrayOf, normalize } from "normalizr";

let User = new Schema("users");

class UserAPI {
  createUser(user) {
    return request.post("/api/users", user)
      .then(users => {
        return normalize(users, arrayOf(User));
      });
  }

  getUsers() {
    return request.get("/api/users")
      .then(users => {
        return normalize(users, arrayOf(User));
      });
  }

  destroyUser(userId) {
    return request.del(`/api/users/${userId}`);
  }
}

export default new UserAPI();
