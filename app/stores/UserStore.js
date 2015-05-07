"use strict";

import alt from "../alt";
import { createStore } from "../decorators/alt";
import immutable from "alt/utils/ImmutableUtil";
import Immutable, { Map, Iterable } from "immutable";
import UserActionCreators from "../actions/UserActionCreators";

@createStore(alt)
@immutable
export default class UserStore {
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
        UserActionCreators.GET_USERS_SUCCESS,
        UserActionCreators.GET_USER_SUCCESS,
        UserActionCreators.UPDATE_USER_SUCCESS
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

  static getUserById(id) {
    let state = this.getState();

    return state.getIn(["users", id]);
  }

  static getLatestUser() {
    return this.getState().get("users").toList().last();
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
