"use strict";

import alt from "../alt";
import UserAPI from "../utils/UserAPI";
import { createActions } from "alt/utils/decorators";

@createActions(alt)
export default class UserActionCreators {
  constructor() {
    this.generateActions(
      "createUserSuccess",
      "createUserError",
      "getUsersSuccess",
      "getUsersError",
      "getUserSuccess",
      "getUserError",
      "updateUserSuccess",
      "updateUserError",
      "destroyUserSuccess",
      "destroyUserError"
    );
  }

  async createUser(data) {
    this.dispatch(data);

    try {
      let user = await UserAPI.createUser(data);
      this.actions.createUserSuccess.defer(user);

      return user;
    }
    catch (err) {
      this.actions.createUserError.defer(err);

      return err;
    }
  }

  async getUsers() {
    this.dispatch();

    try {
      let users = await UserAPI.getUsers();
      this.actions.getUsersSuccess.defer(users);

      return users;
    }
    catch (err) {
      this.actions.getUsersError.defer(err);

      return err;
    }
  }

  async destroyUser(user) {
    this.dispatch(user);

    try {
      let userId = user.get("id");
      let success = await UserAPI.destroyUser(userId);

      this.actions.destroyUserSuccess.defer(true);
      return true;
    }
    catch (err) {
      this.actions.destroyUserError.defer({ err, user });
    }
  }

  async getUser(userId) {
    this.dispatch(userId);

    try {
      let user = await UserAPI.getUser(userId);
      this.actions.getUserSuccess.defer(user);

      return user;
    }
    catch (err) {
      this.actions.getUserError.defer(err);

      return err;
    }
  }

  async updateUser(userId, model) {
    this.dispatch(userId, model);

    try {
      let user = await UserAPI.updateUser(userId, model);
      this.actions.updateUserSuccess.defer(user);
      return user;
    }
    catch (err) {
      this.actions.updateUserError.defer(err);
    }
  }
}
