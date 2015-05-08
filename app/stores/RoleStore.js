"use strict";

import alt from "../alt";
import { createStore } from "alt/utils/decorators";
import immutable from "alt/utils/ImmutableUtil";
import Immutable, { Map, Iterable } from "immutable";
import RoleActionCreators from "../actions/RoleActionCreators";

@createStore(alt)
@immutable
export default class RoleStore {
  static displayName = "RoleStore"

  state = Map({
    roles: Map({}),
    loading: false
  })

  constructor() {
    this.bindListeners({
      onGetRoles: RoleActionCreators.GET_ROLES,
      onCreateRole: RoleActionCreators.CREATE_ROLE,
      onAddRolesSuccess: [
        RoleActionCreators.CREATE_ROLE_SUCCESS,
        RoleActionCreators.GET_ROLES_SUCCESS,
        RoleActionCreators.GET_ROLE_SUCCESS,
        RoleActionCreators.UPDATE_ROLE_SUCCESS
      ],
      onAddRolesError: [
        RoleActionCreators.CREATE_ROLE_ERROR,
        RoleActionCreators.GET_ROLES_ERROR
      ],
      onDestroyRole: [
        RoleActionCreators.DESTROY_ROLE
      ],
      onDestroyRoleError: [
        RoleActionCreators.DESTROY_ROLE_ERROR
      ]
    });
  }

  static getRoles() {
    return this.getState().get("roles");
  }

  static getRoleById(id) {
    let state = this.getState();

    return state.getIn(["roles", id]);
  }

  static getLatestRole() {
    return this.getState().get("roles").toList().last();
  }

  static isLoading() {
    return this.getState().get("loading");
  }

  onGetRoles() {

  }

  onCreateRole(role) {

  }

  onAddRolesSuccess(response) {
    let { roles: roleResponse } = response.entities;
    let state = this.state.updateIn(["roles"], u => u.merge(roleResponse));

    this.setState(state);
  }

  onAddRolesError(err) {
    console.log(err);
  }

  onDestroyRole(role) {
    let { state } = this;
    let roleId = role.get("id").toString();

    state = state.updateIn(["roles"], u => u.delete(roleId));
    this.setState(state);
  }

  onDestroyRoleError(response) {
    let { err, role } = response;
    let state = this.state.updateIn(["roles"], u => u.merge({
      [role.get("id")]: role
    }));

    this.setState(state);
    console.log(err);
  }
}
