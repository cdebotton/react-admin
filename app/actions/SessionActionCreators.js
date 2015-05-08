"use strict";

import alt from "../alt";
import SessionAPI from "../utils/SessionAPI";
import { createActions } from "alt/utils/decorators";

@createActions(alt)
export default class SessionActionCreators {
  constructor() {
    this.generateActions(
      "loginSuccess",
      "loginError",
      "setNextPath",
      "logoutSuccess",
      "logoutError"
    );
  }

  async login(credentials) {
    this.dispatch(credentials);

    try {
      let session = await SessionAPI.login(credentials);
      this.actions.loginSuccess.defer(session);

      return session;
    }
    catch (err) {
      this.actions.loginError.defer(err);

      return err;
    }
  }

  async logout(user) {
    this.dispatch(user);

    try {
      let session = await SessionAPI.logout(user);
      this.actions.logoutSuccess.defer(session);

      return session;
    }
    catch (err) {
      this.actions.logoutError.defer(err);

      return err;
    }
  }
}
