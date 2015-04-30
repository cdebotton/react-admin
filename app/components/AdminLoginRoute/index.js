"use strict";

import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import Form, { Input, Submit } from "../Form";
import storeComponent from "../../decorators/storeComponent";
import SessionActionCreators from "../../actions/SessionActionCreators";
import SessionStore from "../../stores/SessionStore";
import * as helpers from "../../utils/helpers";

@storeComponent(SessionStore)
export default class LoginRoute extends React.Component {
  static contextTypes = {
    router: PropTypes.any.isRequired
  }

  static getStateFromStores(props) {
    let { session } = SessionStore.getState();

    return { session };
  }

  handleSubmit(data) {
    let credentials = helpers.mask(data, "email", "password");

    SessionActionCreators.login(credentials);
  }

  render() {
    let nextPath  = this.props.session.get("nextPath", null);

    return (
      <DocumentTitle title="admin/login - debotton.io">
        <div className="admin-login-route">
          <div className="admin-login-modal">
            <h2>Hello,</h2>
            <Form onSubmit={ this.handleSubmit }>
              <Input
                name="email"
                validation="isEmail|isRequired"
                placeholder="Email"
                type="email" />
              <Input
                name="password"
                validation="isLength:4|isRequired"
                placeholder="Password"
                type="password" />
              <Submit>Login</Submit>
            </Form>
            { nextPath &&
              <div className="disclaimers">
                <p>Please Login to continue to `{ nextPath }`.</p>
              </div>
            }
          </div>
        </div>
      </DocumentTitle>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-login-route.styl");
}
