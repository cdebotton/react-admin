"use strict";

import React, { PropTypes } from "react";
import Form, { Input, Submit, Cancel } from "../Form";
import RoleActionCreators from "../../actions/RoleActionCreators";
import * as helpers from "../../utils/helpers";

export default class AdminRolesCreateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  handleSubmit(formData) {
    let model = helpers.mask(formData, "name");
    RoleActionCreators.createRole(model);
  }

  handleCancel(event) {
    event.preventDefault();
    this.context.router.transitionTo("roles");
  }

  render() {
    return (
      <div className="admin-roles-create-route">
        <h3>Create a new role</h3>
        <Form onSubmit={ this.handleSubmit }>
          <Input
            name="name"
            validation="isRequired|isLength:3"
            placeholder="Role name" />
          <Submit>Create role</Submit>
          <Cancel onClick={ this.handleCancel }>Cancel</Cancel>
        </Form>
      </div>
    );
  }
}
