"use strict";

import alt from "../alt";
import UserActionCreators from "../actions/UserActionCreators";

class UserStore {
  constructor() {
    this.bindActions(UserActionCreators);
  }

  onCreateUser(user) {

  }

  onCreateUserSuccess(user) {

  }

  onCreateUserError(err) {
    console.log(err);
  }
}

export default alt.createStore(UserStore, "UserStore");
