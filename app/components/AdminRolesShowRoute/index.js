"use strict";

import React, { PropTypes } from "react";
import { Link, RouteHandler } from "react-router";
import AltContainer from "alt/AltContainer";
import RoleActionCreators from "../../actions/RoleActionCreators";
import RoleStore from "../../stores/RoleStore";
import storeComponent from "../../decorators/storeComponent";

@storeComponent(RoleStore)
export default class AdminRolesShowRoute extends React.Component {
  static fetchData(router) {
    return RoleActionCreators.getRoles();
  }

  static getStateFromStores(router) {
    return {
      roles: RoleStore.getRoles()
    };
  }

  handleDestroy(roleId) {
    return () => {
      RoleActionCreators.destroyRole(roleId);
    };
  }

  render() {
    let { roles } = this.props;

    return (
      <div className="admin-roles-show-route">
        { !roles &&
          <p>Loading...</p>
        }
        { roles &&
          <ul className="role-list">
            <lh className="id">id</lh>
            <lh className="name">Role Name</lh>
            <lh className="actions">Actions</lh>
            { roles.toList().map((role, key) => [
              <li
                key={ `${key}.id` }
                className="id">
                { role.get("id") }
              </li>,
              <li
                className="name"
                key={ `${key}.name` }>
                <Link
                  params={{ roleId: role.get("id") }}
                  to="editRole">
                  { role.get("name") }
                </Link>
              </li>,
              <li
                key={ `${key}.actions` }
                className="actions">
                <button onClick={ this.handleDestroy(role) }>
                  Remove
                </button>
              </li>
            ]) }
          </ul>
        }
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-roles-show-route.styl");
}
