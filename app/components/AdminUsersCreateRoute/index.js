"use strict";

import React, { PropTypes } from "react";
import UserActionCreators from "../../actions/UserActionCreators";
import * as helpers from "../../utils/helpers";
import Form, {
  Input,
  Submit
} from "../Form";

export default class AdminUsersCreateRoute extends React.Component {
  handleSubmit(model) {
    let user = helpers.mask(model, "email", "password");
    UserActionCreators.createUser(user);
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
        </Form>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-create-route.styl");
}
