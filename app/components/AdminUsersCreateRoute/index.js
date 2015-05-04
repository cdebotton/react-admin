"use strict";

import React, { PropTypes } from "react";
import UserActionCreators from "../../actions/UserActionCreators";
import * as helpers from "../../utils/helpers";
import Form, {
  Input,
  Submit,
  Cancel
} from "../Form";

export default class AdminUsersCreateRoute extends React.Component {
  constructor(props) {
    super(props);

    this.handleCancel = this.handleCancel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  handleSubmit(model) {
    let user = helpers.mask(model, "email", "password");
    UserActionCreators.createUser(user);
    this.context.router.transitionTo("users");
  }

  handleCancel(event) {
    event.preventDefault();
    this.context.router.transitionTo("users");
  }

  render() {
    return (
      <div className="admin-users-create-route">
        <h3>Create a user</h3>
        <Form onSubmit={ this.handleSubmit }>
          <Input
            autoComplete="off"
            validation="isEmail|isRequired"
            name="email"
            placeholder="Email address" />
          <Input
            validation="isLength:5|isRequired"
            name="password"
            type="password"
            placeholder="Password" />
          <Submit>Create</Submit>
          <Cancel onClick={ this.handleCancel }>Cancel</Cancel>
        </Form>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-create-route.styl");
}
