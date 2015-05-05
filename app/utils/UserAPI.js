"use strict";

import * as request from "./request";
import { Schema, arrayOf, normalize } from "normalizr";

let User = new Schema("users");

class UserAPI {
  createUser(user) {
    return request.post("/api/users", user)
      .then(users => normalize(users, arrayOf(User)));
  }

  getUsers() {
    return request.get("/api/users")
      .then(users =>  normalize(users, arrayOf(User)));
  }

  getUser(id) {
    return request.get(`/api/users/${id}`)
      .then(users => normalize(users, arrayOf(User)));
  }

  updateUser(id, model) {
    return request.put(`/api/users/${id}`, model)
      .then(users => normalize(users, arrayOf(User)));
  }

  destroyUser(userId) {
    return request.del(`/api/users/${userId}`);
  }
}

export default new UserAPI();
