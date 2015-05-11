"use strict";

import React, { PropTypes } from "react";
import RoleActionCreators from "../../actions/RoleActionCreators";
import RoleStore from "../../stores/RoleStore";
import storeComponent from "../../decorators/storeComponent";

@storeComponent(RoleStore)
export default class AdminRolesEditRoute extends React.Component {
  static fetchData(router) {
    let { roleId } = router.params;

    return RoleActionCreators.getRole(roleId);
  }

  static getStateFromStores(router) {
    let { roleId } = router.params;
    console.log(RoleStore.getState().toJS());
    return {
      role: RoleStore.getRoleById(roleId)
    };
  }

  render() {
    let { role } = this.props;

    if (!role) {
      return (
        <div className="admin-roles-edit-route">
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <div className="admin-roles-edit-route">
        <h2>Edit Role { role.get("name") }</h2>
      </div>
    );
  }
}
