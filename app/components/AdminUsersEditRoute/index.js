"use strict";

import React, { PropTypes } from "react";
import Form, { Input, Submit } from "../Form";
import UserActionCreators from "../../actions/UserActionCreators";
import UserStore from "../../stores/UserStore";
import ProfileStore from "../../stores/ProfileStore";
import TokenStore from "../../stores/TokenStore";
import storeComponent from "../../decorators/storeComponent";
import authedComponent from "../../decorators/authedComponent";

@authedComponent
@storeComponent(UserStore, ProfileStore, TokenStore)
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
      profile: ProfileStore.getByUserId(userId),
      tokens: TokenStore.getTokens()
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
    let { user, profile, tokens } = this.props;

    if (!(user && profile && tokens)) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    return (
      <div className="admin-users-edit-route">
        <h2>Edit { user.get("email") }</h2>
        <Form onSubmit={ this.handleSubmit }>
          <div className="form-row">
            <Input
              name="email"
              validation="isEmail|isRequired"
              placeholder="Email address"
              defaultValue={ user.get("email") } />
            <Input
              name="firstName"
              validation="isLength:2|isRequired"
              placeholder="First name"
              defaultValue={ profile.get("firstName") } />
            <Input
              name="lastName"
              validation="isLength:2|isRequired"
              placeholder="Last name"
              defaultValue={ profile.get("lastName") } />
          </div>
          <Submit>Save</Submit>
        </Form>
        <h2>Active Sessions</h2>
        <dl>
          { tokens.toList().map((token, key) => [
            <dt>SSID: { token.get("key") }</dt>,
            <dd>IP Address: { token.get("ipAddress") }</dd>
          ]) }
        </dl>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-edit-route.styl");
}
