"use strict";

import alt from "../alt";
import Immutable, { OrderedMap, Iterable } from "immutable";
import UserActionCreators from "../actions/UserActionCreators";

class UserStore {
  constructor() {
    this.users = new OrderedMap();
    this.loading = false;

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
      ]
    });

    this.on("serialize", () => ({
      loading: this.loading,
      users: this.users.toJS()
    }));

    this.on("deserialize", data => Immutable.fromJS(data, (key, value) => {
      let isIndexable = Iterable.isIndexed(value);
      return isIndexable ? value.toList() : value.toOrderedMap();
    }));
  }

  onGetUsers() {

  }

  onCreateUser(user) {

  }

  onAddUsersSuccess(response) {
    let { users: userResponse } = response.entities;
    let { users } = this;

    users = this.users.merge(userResponse);
    this.setState({ users });
  }

  onAddUsersError(err) {
    console.log(err);
  }
}

export default alt.createStore(UserStore, "UserStore");
