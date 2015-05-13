"use strict";

import alt from "../alt";
import { createStore } from "alt/utils/decorators";
import immutable from "alt/utils/ImmutableUtil";
import Immutable, { Map, Iterable, List } from "immutable";
import UserActionCreators from "../actions/UserActionCreators";
import RoleActionCreators from "../actions/RoleActionCreators";

@createStore(alt)
@immutable
export default class RoleStore {
  static displayName = "RoleStore"

  state = Map({
    roles: Map({}),
    loading: false,
    status: 200
  })

  constructor() {
    this.bindActions(RoleActionCreators);
  }

  static getRoles() {
    return this.getState().get("roles");
  }

  static getRoleById(id) {
    let state = this.getState();
    return state.getIn(["roles", id.toString()]);
  }

  static getLatestRole() {
    return this.getState().get("roles").toList().last();
  }

  static isLoading() {
    return this.getState().get("loading");
  }

  setLoading(loading) {
    let state = this.state.set("loading", loading);
    this.setState(state);
  }

  mergeRoles(response) {
    let { roles: roleResponse } = response.entities;
    let state = this.state.updateIn(["roles"], u => u.merge(roleResponse));

    this.setState(state);
  };

  onGetRoles() {
    this.setLoading(true);
  }

  onCreateRole(role) {
    this.setLoading(true);
  }

  onDestroyRole(role) {
    let { state } = this;
    let roleId = role.get("id").toString();

    state = state.updateIn(["roles"], u => u.delete(roleId));

    this.setLoading(true);
    this.setState(state);
  }

  onCreateRoleSuccess(response) {
    let roles = this.mergeRoles(response);

    this.setLoading(false);
    this.setState(roles);
  }

  onGetRolesSuccess(response) {
    let roles = this.mergeRoles(response);

    this.setLoading(false);
    this.setState(roles);
  }

  onGetRoleSuccess(response) {
    let roles = this.mergeRoles(response);

    this.setLoading(false);
    this.setState(roles);
  }

  onUpdateRoleSuccess(response) {
    let roles = this.mergeRoles(response);

    this.setLoading(false);
    this.setState(roles);
  }

  onGetRolesError(err) {
    this.setLoading(false);
    console.log(err);
  }

  onGetRoleError(err) {
    this.setLoading(false);
    console.log(err);
  }

  onCreateRoleError(err) {
    this.setLoading(false);
    console.log(err);
  }

  onDestroyRoleError(response) {
    let { err, role } = response;
    let state = this.state.updateIn(["roles"], u => u.merge({
      [role.get("id")]: role
    }));

    this.setLoading(false);
    this.setState(state);
    console.log(err);
  }

  onAddPermission(roleId) {
    let state = this.state.updateIn(["roles", roleId.toString()], r => {
      return r.update("Permissions", p => p.push({
        id: null,
        RoleId: roleId,
        crud: new List(),
        controller: null
      }));
    });

    this.setState(state);
  }
}
