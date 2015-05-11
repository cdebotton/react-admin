"use strict";

import React, { PropTypes } from "react";
import Form, {
  Input,
  Repeater,
  ToggleGroup,
  Toggle,
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
      role: RoleStore.getRoleById(roleId).merge({
        Permissions: new List([
          {
            controller: "users",
            resourceId: "*",
            create: true,
            read: true,
            update: true,
            destroy: true
          },
          {
            controller: "roles",
            resourceId: "*",
            create: false,
            read: true,
            update: false,
            destroy: false
          }
        ])
      })
    };
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
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
                data={ role.get("Permissions") }>
                <Input
                  className="controller"
                  name="controller"
                  placeholder="Controller" />
                <Input
                  className="resource-id"
                  name="resourceId"
                  placeholder="id?" />
                <ToggleGroup className="crud-toggles" name="crud">
                  <Toggle name="create">Create</Toggle>
                  <Toggle name="read">Read</Toggle>
                  <Toggle name="update">Update</Toggle>
                  <Toggle name="destroy">Destroy</Toggle>
                </ToggleGroup>
              </Repeater>
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
