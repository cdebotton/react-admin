"use strict";

import alt from "../alt";
import TokenAPI from "../utils/TokenAPI";
import { createActions } from "../decorators/alt";

@createActions(alt)
export default class TokenActionCreators {
  constructor() {
    this.generateActions(
      "getTokensSuccess",
      "getTokensError"
    );
  }

  async getTokens() {
    this.dispatch();

    try {
      let tokens = await TokenAPI.getTokens();

      this.actions.getTokensSuccess(tokens);
    }
    catch (err) {
      this.actions.getTokensError(err);
    }
  }
}
