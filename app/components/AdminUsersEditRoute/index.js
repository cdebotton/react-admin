"use strict";

import React, { PropTypes } from "react";
import UserActionCreators from "../../actions/UserActionCreators";
import RoleActionCreators from "../../actions/RoleActionCreators";
import UserStore from "../../stores/UserStore";
import ProfileStore from "../../stores/ProfileStore";
import TokenStore from "../../stores/TokenStore";
import RoleStore from "../../stores/RoleStore";
import storeComponent from "../../decorators/storeComponent";
import authedComponent from "../../decorators/authedComponent";
import Form, {
  Input,
  TextArea,
  Submit,
  Cancel,
  ToggleGroup,
  Toggle
} from "../Form";

@authedComponent
@storeComponent(UserStore, ProfileStore, TokenStore)
export default class AdminUserEditRoute extends React.Component {
  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  static async fetchData(router) {
    let { userId } = router.params;
    let user = await UserActionCreators.getUser(userId);
    let roles = await RoleActionCreators.getRoles();

    return user;
  }

  static getStateFromStores(router) {
    let { userId } = router.params;

    return {
      user: UserStore.getUserById(userId),
      profile: ProfileStore.getByUserId(userId),
      tokens: TokenStore.getTokens(),
      roles: RoleStore.getRoles()
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
    let { user, profile, tokens, roles } = this.props;

    if (!(user && profile && tokens)) {
      return (
        <div className="loading">Loading...</div>
      );
    }

    return (
      <div className="admin-users-edit-route">
        <Form
          onSubmit={ this.handleSubmit }>
          <div className="form-col user-info">
            <h2>Edit { user.get("email") }</h2>
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
            <div className="form-row">
              <TextArea
                name="biography"
                placeholder={ `About ${profile.get("firstName")}` }
                defaultValue={ profile.get("biography") } />
            </div>
          </div>
          <div className="form-col roles">
            <h2>Roles</h2>
            <ToggleGroup name="roles">
            { roles.toList().map((role, key) => (
              <Toggle
                name={ role.get("name") }
                value={ role.get("id") }
                key={ key }>
                { role.get("name") }
              </Toggle>
            )) }
            </ToggleGroup>
          </div>
          <div className="form-col active-sessions">
            <h2>Active Sessions</h2>
            <dl className="session-list">
              { tokens.toList().map((token, key) => [
                <dt>
                  <label>SSID:</label>
                  <p>{ token.get("key") }</p>
                </dt>,
                <dd>
                  <label>IP Address:</label>
                  <p>{ token.get("ipAddress") }</p>
                </dd>
              ]) }
            </dl>
          </div>
          <div className="form-row">
            <Submit>Save</Submit>
            <Cancel
              onClick={ () => this.context.router.transitionTo("users") }>
              Cancel
            </Cancel>
          </div>
        </Form>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-edit-route.styl");
}
