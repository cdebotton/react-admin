"use strict";

import React, { PropTypes } from  "react";
import storeComponent from "../../decorators/storeComponent";
import UserActionCreators from "../../actions/UserActionCreators";
import UserStore from "../../stores/UserStore";

@storeComponent(UserStore)
export default class AdminUsersShow extends React.Component {
  static fetchData(router) {
    return UserActionCreators.getUsers();
  }

  static getStateFromStores(params, query) {
    let { users, loading } = UserStore.getState();

    return { users, loading };
  }

  render() {
    return (
      <div className="admin-users-show">
        <ul>
          { this.props.users.toList().map((user, key) => (
            <li key={ key }>{ user.get("email") }</li>
          )) }
        </ul>
      </div>
    );
  }
}
