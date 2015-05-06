"use strict";

import alt from "../alt";
import UserStore from "./UserStore";
import immutable from "alt/utils/ImmutableUtil";
import { Map } from "immutable";
import UserActionCreators from "../actions/UserActionCreators";

@immutable
class ProfileStore {
  static displayName = "ProfileStore"

  constructor() {
    this.state = new Map({
      profiles: new Map()
    });

    this.bindListeners({
      onGetProfileSuccess: [
        UserActionCreators.UPDATE_USER_SUCCESS,
        UserActionCreators.GET_USER_SUCCESS
      ]
    });
  }

  static getByUserId(userId) {
    let state = this.getState();
    let profiles = state.get("profiles").toList();

    return profiles.find(p => p.get("UserId") === parseInt(userId, 10));
  }

  onGetProfileSuccess(response) {
    let { profiles } = response.entities;
    let state = this.state.update("profiles", v => v.merge(profiles));

    this.setState(state);
  }
}

export default alt.createStore(ProfileStore);
