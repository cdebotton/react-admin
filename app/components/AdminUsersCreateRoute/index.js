"use strict";

import React, { PropTypes } from "react";
import Form, {
  Input,
  Submit
} from "../Form";

export default class AdminUsersCreateRoute extends React.Component {
  handleSubmit(model) {
    console.log(model);
  }

  render() {
    return (
      <div className="admin-users-create-route">
        <h3>Create a user</h3>
        <Form onSubmit={ this.handleSubmit }>
          <Input
            validation="isEmail|isRequired"
            name="email"
            placeholder="Email address" />
          <Input
            validation="isLength:5|isRequired"
            name="password"
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
