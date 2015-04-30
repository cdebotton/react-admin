"use strict";

import * as request from "./request";

class UserAPI {
  createUser(user) {
    return request.post("/api/users", user);
  }
}

export default new UserAPI();
