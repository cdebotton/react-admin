"use strict";

import * as request from "./request";

class SessionAPI {
  login(credentials) {
    return request.post("/api/login", credentials);
  }
}

export default new SessionAPI();
