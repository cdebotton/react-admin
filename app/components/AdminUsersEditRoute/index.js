"use strict";

import React, { PropTypes } from "react";
import Form, { Input, Submit } from "../Form";
import UserActionCreators from "../../actions/UserActionCreators";
import UserStore from "../../stores/UserStore";
import ProfileStore from "../../stores/ProfileStore";
import storeComponent from "../../decorators/storeComponent";
import authedComponent from "../../decorators/authedComponent";

@authedComponent
@storeComponent(UserStore, ProfileStore)
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

    return {
      user: UserStore.getUserById(userId),
      profile: ProfileStore.getByUserId(userId)
     };
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
    let { user, profile } = this.props;
    user = user ? user.toJS() : {};
    profile = profile ? profile.toJS() : {};

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
            <Input
              name="firstName"
              validation="isLength:2|isRequired"
              placeholder="First name"
              defaultValue={ profile.firstName } />
            <Input
              name="lastName"
              validation="isLength:2|isRequired"
              placeholder="Last name"
              defaultValue={ profile.lastName } />
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
