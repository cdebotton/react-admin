"use strict";

import * as request from "./request";

class SessionAPI {
  login(credentials) {
    return request.post("/api/login", credentials);
  }

  logout() {
    return request.del("/api/logout");
  }
}

export default new SessionAPI();
