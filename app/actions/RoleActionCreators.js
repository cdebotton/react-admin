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
      this.actions.createRoleSuccess.defer(role);

      return role;
    }
    catch (err) {
      this.actions.createRoleError.defer(err);

      return err;
    }
  }

  async getRoles() {
    this.dispatch();

    try {
      let roles = await RoleAPI.getRoles();
      this.actions.getRolesSuccess.defer(roles);

      return roles;
    }
    catch (err) {
      this.actions.getRolesError.defer(err);

      return err;
    }
  }

  async destroyRole(role) {
    this.dispatch(role);

    try {
      let roleId = role.get("id");
      let success = await RoleAPI.destroyRole(roleId);

      this.actions.destroyRoleSuccess.defer(true);
      return true;
    }
    catch (err) {
      this.actions.destroyRoleError.defer({ err, role });
    }
  }

  async getRole(roleId) {
    this.dispatch(roleId);

    try {
      let role = await RoleAPI.getRole(roleId);
      this.actions.getRoleSuccess.defer(role);

      return role;
    }
    catch (err) {
      this.actions.getRoleError.defer(err);

      return err;
    }
  }

  async updateRole(roleId, model) {
    this.dispatch(roleId, model);

    try {
      let role = await RoleAPI.updateRole(roleId, model);
      this.actions.updateRoleSuccess.defer(role);
      return role;
    }
    catch (err) {
      this.actions.updateRoleError.defer(err);
    }
  }
}
