"use strict";

import Immutable, { OrderedMap, Iterable } from "immutable";
import alt from "../alt";
import SessionActionCreators from "../actions/SessionActionCreators";

class SessionStore {
  constructor() {
    this.bindActions(SessionActionCreators);
    this.session = new OrderedMap({
      loading: false,
      nextPath: null,
      status: 200
    });
    this.on("init", this.setup);
    this.on("bootstrap", this.setup);
  }

  static isAuthed() {
    let { session } = this.getState();
    return session.has("token");
  }

  setup() {
    if (!OrderedMap.isOrderedMap(this.session)) {
      this.session = Immutable.fromJS(this.session, (key, value) => {
        let isIndexable = Iterable.isIndexed(value);
        return isIndexable ? value.toList() : value.toOrderedMap();
      });
    }
  }

  onLogin() {
    this.session = this.session.set("loading", true);
  }

  onLoginSuccess(session) {
    this.session = this.session.merge({
      loading: false,
      nextPath: null
    });
  }

  onLoginError(err) {
    this.session = this.session.set("loading", false);
    console.log(err);
  }

  onSetNextPath(path) {
    this.session = this.session.set("nextPath", path);
  }
}

export default alt.createStore(SessionStore, "SessionStore");
