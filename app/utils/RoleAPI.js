"use strict";

import * as request from "./request";
import { Schema, arrayOf, normalize } from "normalizr";

let Role = new Schema("roles");

class RoleAPI {
  createRole(role) {
    return request.post("/api/roles", role)
      .then(roles => normalize(roles, arrayOf(Role)));
  }

  getRoles() {
    return request.get("/api/roles")
      .then(roles =>  normalize(roles, arrayOf(Role)));
  }

  getRole(id) {
    return request.get(`/api/roles/${id}`)
      .then(roles => {
        console.log(roles);
        return normalize(roles, arrayOf(Role));
      });
  }

  updateRole(id, model) {
    return request.put(`/api/roles/${id}`, model)
      .then(roles => normalize(roles, arrayOf(Role)));
  }

  destroyRole(roleId) {
    return request.del(`/api/roles/${roleId}`);
  }
}

export default new RoleAPI();
