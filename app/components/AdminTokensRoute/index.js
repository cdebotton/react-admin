"use strict";

import React, { PropTypes } from "react";
import TokenActionCreators from "../../actions/TokenActionCreators";
import TokenStore from "../../stores/TokenStore";
import storeComponent from "../../decorators/storeComponent";

@storeComponent(TokenStore)
export default class AdminTokensRoute extends React.Component {
  static fetchData(router) {
    return TokenActionCreators.getTokens();
  }

  static getStateFromStores(router) {
    return {
      tokens: TokenStore.getTokens()
    };
  }

  render() {
    return (
      <div className="admin-tokens-route">
        <h2>Active Tokens</h2>
        <ul>
          { this.props.tokens.toList().map((token, key) => (
            <li key={ key }>
              <span>{ token.get("key") }</span>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}
