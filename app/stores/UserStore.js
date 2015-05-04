"use strict";

import alt from "../alt";
import immutable from "alt/utils/ImmutableUtil";
import Immutable, { Map, Iterable } from "immutable";
import UserActionCreators from "../actions/UserActionCreators";

@immutable
class UserStore {
  static displayName = "UserStore"

  state = Map({
    users: Map({}),
    loading: false
  })

  constructor() {
    this.bindListeners({
      onGetUsers: UserActionCreators.GET_USERS,
      onCreateUser: UserActionCreators.CREATE_USER,
      onAddUsersSuccess: [
        UserActionCreators.CREATE_USER_SUCCESS,
        UserActionCreators.GET_USERS_SUCCESS
      ],
      onAddUsersError: [
        UserActionCreators.CREATE_USER_ERROR,
        UserActionCreators.GET_USERS_ERROR
      ],
      onDestroyUser: [
        UserActionCreators.DESTROY_USER
      ],
      onDestroyUserError: [
        UserActionCreators.DESTROY_USER_ERROR
      ]
    });
  }

  static getUsers() {
    return this.getState().get("users");
  }

  static isLoading() {
    return this.getState().get("loading");
  }

  onGetUsers() {

  }

  onCreateUser(user) {

  }

  onAddUsersSuccess(response) {
    let { users: userResponse } = response.entities;
    let state = this.state.updateIn(["users"], u => u.merge(userResponse));

    this.setState(state);
  }

  onAddUsersError(err) {
    console.log(err);
  }

  onDestroyUser(user) {
    let { state } = this;
    let userId = user.get("id").toString();

    state = state.updateIn(["users"], u => u.delete(userId));
    this.setState(state);
  }

  onDestroyUserError(response) {
    let { err, user } = response;
    let state = this.state.updateIn(["users"], u => u.merge({
      [user.get("id")]: user
    }));

    this.setState(state);
    console.log(err);
  }
}

export default alt.createStore(UserStore, "UserStore");
