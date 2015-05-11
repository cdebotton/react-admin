"use strict";

import React, { PropTypes } from  "react";
import { Link } from "react-router";
import DestroyButton from "../DestroyButton";
import storeComponent from "../../decorators/storeComponent";
import UserActionCreators from "../../actions/UserActionCreators";
import RoleActionCreators from "../../actions/RoleActionCreators";
import RoleStore from "../../stores/RoleStore";
import UserStore from "../../stores/UserStore";

@storeComponent(UserStore, RoleStore)
export default class AdminUsersShowRoute extends React.Component {
  static fetchData(router) {
    let users = UserActionCreators.getUsers();
    let roles = RoleActionCreators.getRoles();

    return Promise.all([users, roles]);
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
          <lh className="id">id</lh>
          <lh className="email">Email</lh>
          <lh className="roles">Roles</lh>
          <lh className="actions">Actions</lh>
          { this.props.users.toList().map((user, key) => [
            <li className="id">{ user.get("id") }</li>,
            <li
              className="email"
              key={ key }>
              <Link
                to="editUser"
                params={{ userId: user.get("id") }}>
                { user.get("email") }
              </Link>
            </li>,
            <li className="roles">
              { user.get("Roles").toList().map((role, key) => (
                <span
                  className="role"
                  key={ key }>
                  { RoleStore.getRoleById(role).get("name") }
                </span>
              )) }
            </li>,
            <li className="actions">
              <DestroyButton
                onClick={() => UserActionCreators.destroyUser(user)}>
                Remove
              </DestroyButton>
            </li>
          ]) }
        </ul>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-show-route.styl");
}
