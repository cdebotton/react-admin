"use strict";

import alt from "../alt";
import UserAPI from "../utils/UserAPI";

class UserActionCreators {
  constructor() {
    this.generateActions(
      "createUserSuccess",
      "createUserError",
      "getUsersSuccess",
      "getUsersError"
    );
  }

  async createUser(data) {
    this.dispatch(data);

    try {
      let user = await UserAPI.createUser(data);
      this.actions.createUserSuccess(user);

      return user;
    }
    catch (err) {
      this.actions.createUserError(err);

      return err;
    }
  }

  async getUsers() {
    this.dispatch();

    try {
      let users = await UserAPI.getUsers();
      this.actions.getUsersSuccess(users);

      return users;
    }
    catch (err) {
      this.actions.getUsersError(err);

      return err;
    }
  }
}

export default alt.createActions(UserActionCreators);
