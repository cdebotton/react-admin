"use strict";

import alt from "../alt";
import RoleAPI from "../utils/RoleAPI";
import { createActions } from "alt/utils/decorators";

@createActions(alt)
export default class RoleActionCreators {
  constructor() {
    this.generateActions(
      "createRoleSuccess",
      "createRoleError",
      "getRolesSuccess",
      "getRolesError",
      "getRoleSuccess",
      "getRoleError",
      "updateRoleSuccess",
      "updateRoleError",
      "destroyRoleSuccess",
      "destroyRoleError"
    );
  }

  async createRole(data) {
    this.dispatch(data);

    try {
      let role = await RoleAPI.createRole(data);
      this.actions.createRoleSuccess(role);

      return role;
    }
    catch (err) {
      this.actions.createRoleError(err);

      return err;
    }
  }

  async getRoles() {
    this.dispatch();

    try {
      let roles = await RoleAPI.getRoles();
      this.actions.getRolesSuccess(roles);

      return roles;
    }
    catch (err) {
      this.actions.getRolesError(err);

      return err;
    }
  }

  async destroyRole(role) {
    this.dispatch(role);

    try {
      let roleId = role.get("id");
      let success = await RoleAPI.destroyRole(roleId);

      this.actions.destroyRoleSuccess(true);
      return true;
    }
    catch (err) {
      this.actions.destroyRoleError({ err, role });
    }
  }

  async getRole(roleId) {
    this.dispatch(roleId);

    try {
      let role = await RoleAPI.getRole(roleId);
      this.actions.getRoleSuccess(role);
    }
    catch (err) {
      this.actions.getRoleError(err);
    }
  }

  async updateRole(roleId, model) {
    this.dispatch(roleId, model);

    try {
      let role = await RoleAPI.updateRole(roleId, model);
      this.actions.updateRoleSuccess(role);
      return role;
    }
    catch (err) {
      this.actions.updateRoleError(err);
    }
  }
}
