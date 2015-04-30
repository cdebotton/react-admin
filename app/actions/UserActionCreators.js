"use strict";

import alt from "../alt";
import UserAPI from "../utils/UserAPI";

class UserActionCreators {
  constructor() {
    this.generateActions(
      "createUserSuccess",
      "createUserError"
    );
  }

  async createUser(data) {
    this.dispatch(data);

    try {
      let user = await UserAPI.createUser(data);
      this.actions.createUserSuccess(user);
    }
    catch (err) {
      this.actions.createUserError(err);
    }
  }
}

export default alt.createActions(UserActionCreators);
