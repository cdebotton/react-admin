"use strict";

import React, { PropTypes } from "react";
import Form, { Input, Submit } from "../Form";
import UserActionCreators from "../../actions/UserActionCreators";
import UserStore from "../../stores/UserStore";
import storeComponent from "../../decorators/storeComponent";
import authedComponent from "../../decorators/authedComponent";

@authedComponent
@storeComponent(UserStore)
export default class AdminUserEditRoute extends React.Component {
  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  static async fetchData(router) {
    let { userId } = router.params;
    let user = await UserActionCreators.getUser(userId);

    return user;
  }

  static getStateFromStores(router) {
    let { userId } = router.params;
    let user = UserStore.getUserById(userId);

    return { user };
  }

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(formData) {
    let userId = this.props.user.get("id");

    UserActionCreators.updateUser(userId, formData);
    this.context.router.transitionTo("users");
  }

  render() {
    let { user } = this.props;
    user = user ? user.toJS() : {};

    return (
      <div className="admin-users-edit-route">
        <h2>Edit { user.email }</h2>
        <Form onSubmit={ this.handleSubmit }>
          <div className="form-row">
            <Input
              name="email"
              validation="isEmail|isRequired"
              placeholder="Email address"
              defaultValue={ user.email } />
          </div>
          <Submit>Save</Submit>
        </Form>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-edit-route.styl");
}
