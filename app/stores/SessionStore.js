"use strict";

import immutable from "alt/utils/ImmutableUtil";
import { createStore } from "alt/utils/decorators";
import Immutable, { Map, Iterable } from "immutable";
import alt from "../alt";
import SessionActionCreators from "../actions/SessionActionCreators";

@createStore(alt)
@immutable
export default class SessionStore {
  static displayName = "SessionStore"

  constructor() {
    this.state = new Map({
      status: null,
      loading: false,
      nextPath: null,
      token: false
    });

    this.bindActions(SessionActionCreators);
  }

  static isAuthed() {
    let session = this.getState();

    return session.get("token") !== false;
  }

  static getToken() {
    return this.getState().getIn(["token", "key"]) || false;
  }

  onLogin() {
    let state = this.state.merge({
      loading: true
    });

    this.setState(state);
  }

  onLoginSuccess(token) {
    let state = this.state.merge({
      loading: false,
      nextPath: null,
      token: token,
      status: 200
    });

    this.setState(state);
  }

  onLoginError(err) {
    let status = parseInt(err.status, 10);

    let state = this.state.merge({
      loading: false,
      status: status,
      token: false
    });

    this.setState(state);
  }

  onSetNextPath(path) {
    let state = this.state.merge({
      nextPath: path
    });

    this.setState(state);
  }

  onLogout(token) {
    let state = this.state.merge({ token: false });

    this.setState(state);
  }
}
