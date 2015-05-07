"use strict";

import React, { PropTypes } from  "react";
import { Link } from "react-router";
import DestroyButton from "../DestroyButton";
import storeComponent from "../../decorators/storeComponent";
import UserActionCreators from "../../actions/UserActionCreators";
import UserStore from "../../stores/UserStore";

@storeComponent(UserStore)
export default class AdminUsersShowRoute extends React.Component {
  static fetchData(router) {
    return UserActionCreators.getUsers();
  }

  static getStateFromStores(params, query) {
    return {
      users: UserStore.getUsers(),
      loading: UserStore.isLoading()
    };
  }

  render() {
    return (
      <div className="admin-users-show-route">
        <nav>
          <Link to="createUser">Create user</Link>
        </nav>
        <ul>
          { this.props.users.toList().map((user, key) => (
            <li key={ key }>
              <Link
                to="editUser"
                params={{ userId: user.get("id") }}>
                { user.get("email") }
              </Link>
              <DestroyButton
                onClick={() => UserActionCreators.destroyUser(user)}>
                Remove
              </DestroyButton>
            </li>
          )) }
        </ul>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-show-route.styl");
}
