"use strict";

import React, { PropTypes } from "react";
import Form, {
  Input,
  Repeater,
  AddRepeater,
  RemoveRepeater,
  ToggleGroup,
  Toggle,
  Select,
  Submit,
  Cancel
} from "../Form";
import { List } from "immutable";
import RoleActionCreators from "../../actions/RoleActionCreators";
import RoleStore from "../../stores/RoleStore";
import storeComponent from "../../decorators/storeComponent";

@storeComponent(RoleStore)
export default class AdminRolesEditRoute extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddPermission = this.handleAddPermission.bind(this);
    this.handleRemovePermission = this.handleRemovePermission.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static fetchData(router) {
    let { roleId } = router.params;

    return RoleActionCreators.getRole(roleId);
  }

  static getStateFromStores(router) {
    let { roleId } = router.params;

    return {
      role: RoleStore.getRoleById(roleId)
    };
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  handleAddPermission(event) {
    let roleId = this.props.role.get("id");

    RoleActionCreators.addPermission(roleId);
    event.preventDefault();
  }

  handleRemovePermission(permission) {
    let roleId = this.props.role.get("id");

    RoleActionCreators.removePermission({
      roleId,
      permission
    });
  }

  handleSubmit(formData) {
    let roleId = this.props.role.get("id");

    RoleActionCreators.updateRole(roleId, formData);
  }

  handleCancel(event) {
    event.preventDefault();
    this.context.router.transitionTo("roles");
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
        { !role &&
          <p>Loading role data...</p>
        }
        { role &&
          <Form onSubmit={ this.handleSubmit }>
            <div className="form-col">
              <h2>Edit Role { role.get("name") }</h2>
              <div className="form-row">
                <Input
                  name="name"
                  defaultValue={ role.get("name") }
                  placeholder="Role name" />
              </div>
            </div>
            <div className="form-col">
              <h2>Permissions</h2>
              <Repeater
                className="permissions"
                name="Permissions"
                data={ role.get("Permissions") }>
                <Select
                  placeholder="Controller"
                  name="controller"
                  className="controller"
                  values={ role.get("Controllers") } />
                <ToggleGroup className="crud-toggles" name="crud">
                  <Toggle value="create">Create</Toggle>
                  <Toggle value="read">Read</Toggle>
                  <Toggle value="update">Update</Toggle>
                  <Toggle value="destroy">Destroy</Toggle>
                </ToggleGroup>
                <RemoveRepeater onClick={ this.handleRemovePermission }>
                  Remove Permission
                </RemoveRepeater>
              </Repeater>
              <AddRepeater onClick={ this.handleAddPermission }>
                + Add Permission Rule
              </AddRepeater>
            </div>
            <div className="form-row">
              <Submit>Save { role.get("name") }</Submit>
              <Cancel onClick={ this.handleCancel }>Cancel</Cancel>
            </div>
          </Form>
        }
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-roles-edit-route.styl");
}
