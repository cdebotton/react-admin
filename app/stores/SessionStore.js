"use strict";

import immutable from "alt/utils/ImmutableUtil";
import Immutable, { Map, Iterable } from "immutable";
import alt from "../alt";
import SessionActionCreators from "../actions/SessionActionCreators";

@immutable
class SessionStore {
  constructor() {
    this.state = new Map({
      loading: false,
      nextPath: null,
      user: false
    });

    this.bindActions(SessionActionCreators);
  }

  static isAuthed() {
    let session = this.getState();

    return session.get("user") !== false;
  }

  onLogin() {
    let state = this.state.merge({
      loading: true
    });

    this.setState(state);
  }

  onLoginSuccess(user) {
    let state = this.state.merge({
      loading: false,
      nextPath: null,
      user: user
    });

    this.setState(state);
  }

  onLoginError(err) {
    let state = this.state.merge({
      loading: false
    });

    console.log(err);
    this.setState(state);
  }

  onSetNextPath(path) {
    let state = this.state.merge({
      nextPath: path
    });

    this.setState(state);
  }

  onLogout(user) {
    let state = this.state.merge({ user: false });

    this.setState(state);
  }
}

export default alt.createStore(SessionStore, "SessionStore");
