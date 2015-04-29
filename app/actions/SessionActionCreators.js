"use strict";

import alt from "../alt";
import SessionAPI from "../utils/SessionAPI";

class SessionActionCreators {
  constructor() {
    this.generateActions(
      "loginSuccess",
      "loginError",
      "setNextPath"
    );
  }

  async login(credentials) {
    this.dispatch(credentials);

    try {
      let session = await SessionAPI.login(credentials);
      this.actions.loginSuccess(session);
    }
    catch (err) {
      this.actions.loginError(err);
    }
  }
}

export default alt.createActions(SessionActionCreators);
