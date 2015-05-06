"use strict";

import * as request from "./request";
import { normalize, arrayOf, Schema } from "normalizr";

const Token = new Schema("tokens");

class SessionAPI {
  getTokens(credentials) {
    return request.get("/api/tokens")
      .then(tokens => normalize(tokens, arrayOf(Token)));
  }
}

export default new SessionAPI();
