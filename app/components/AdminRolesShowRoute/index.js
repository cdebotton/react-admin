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
          <ul>
            { roles.toList().map((role, key) => (
              <li key={ key }>
                <Link
                  params={{ roleId: role.get("id") }}
                  to="editRole">
                  { role.get("name") }
                </Link>
                <button onClick={ this.handleDestroy(role) }>
                  Remove
                </button>
              </li>
            )) }
          </ul>
        }
      </div>
    );
  }
}
