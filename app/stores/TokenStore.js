"use strict";

import alt from "../alt";
import immutable from "alt/utils/ImmutableUtil";
import { Map } from "immutable";
import TokenActionCreators from "../actions/TokenActionCreators";

@immutable
class TokenStore {
  static displayName = "TokenStore"

  constructor() {
    this.state = new Map({
      tokens: new Map()
    });

    this.bindListeners({
      onGetTokensSuccess: [
        TokenActionCreators.GET_TOKENS_SUCCESS
      ],
      onGetTokensError: [
        TokenActionCreators.GET_TOKENS_ERROR
      ]
    });
  }

  static getTokens() {
    let state = this.getState();

    return state.get("tokens");
  }

  onGetTokensSuccess(response) {
    let { tokens } = response.entities;
    let state = this.state.update("tokens", v => v.merge(tokens));

    this.setState(state);
  }

  onGetTokensError(err) {
    console.log(err);
  }
}

export default alt.createStore(TokenStore);
