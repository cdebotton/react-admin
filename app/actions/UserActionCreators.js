"use strict";

import alt from "../alt";
import UserAPI from "../utils/UserAPI";

class UserActionCreators {
  constructor() {
    this.generateActions(
      "createUserSuccess",
      "createUserError",
      "getUsersSuccess",
      "getUsersError",
      "destroyUserSuccess",
      "destroyUserError"
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

  async destroyUser(user) {
    this.dispatch(user);

    try {
      let userId = user.get("id");
      let success = await UserAPI.destroyUser(userId);

      this.actions.destroyUserSuccess(true);
      return true;
    }
    catch (err) {
      this.actions.destroyUserError({ err, user });
    }
  }
}

export default alt.createActions(UserActionCreators);
