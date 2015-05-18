"use strict";

import React, { PropTypes } from "react";
import { RouteHandler, Link } from "react-router";
import DocumentTitle from "react-document-title";
import storeComponent from "../../decorators/storeComponent";
import SessionActionCreators from "../../actions/SessionActionCreators";
import SessionStore from "../../stores/SessionStore";

@storeComponent(SessionStore)
export default class AdminRoute extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  static getStateFromStores(props) {
    let session = SessionStore.getState();

    return {
      isAuthed: SessionStore.isAuthed(),
      token: session.get("token")
    };
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  async handleLogout(event) {
    event.preventDefault();

    await SessionActionCreators.logout();
    this.context.router.transitionTo("login");
  }

  get userName() {
    const name = [];
    let { token } = this.props;
    let user, { Profile: profile } = token.get("User").toJS();

    if (profile.firstName) {
      name.push(profile.firstName);
    }

    if (profile.lastName) {
      name.push(profile.lastName);
    }

    if (name.length === 0) {
      name.push(user.email);
    }

    return name.join(" ");
  }

  render() {
    let { isAuthed } = this.props;

    return (
      <DocumentTitle title="admin - debotton.io">
        <div className="admin-route">
          <header className="header">
            <h1>koa server <small>Admin</small></h1>
            { isAuthed &&
              <div className="admin-controls">
                <p>Welcome back, { this.userName }</p>
                <nav>
                  <ul>
                    <li>
                      <Link to="dashboard">Dashboard</Link>
                    </li>
                    <li>
                      <Link to="users">Users</Link>
                    </li>
                    <li>
                      <Link to="roles">Roles</Link>
                    </li>
                    <li>
                      <button onClick={ this.handleLogout }>Logout</button>
                    </li>
                  </ul>
                </nav>
              </div>
            }
          </header>
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-route.styl");
}
