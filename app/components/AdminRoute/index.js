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
      email: session.getIn(["token", "user", "email"])
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

  render() {
    let { isAuthed, email } = this.props;

    return (
      <DocumentTitle title="admin - debotton.io">
        <div className="admin-route">
          <header className="header">
            <h1>koa server <small>Admin</small></h1>
            { isAuthed &&
              <div className="admin-controls">
                <nav>
                  <p>Welcome back, { email }</p>
                  <ul>
                    <li><Link to="admin">Dashboard</Link></li>
                    <li><Link to="users">Users</Link></li>
                  </ul>
                </nav>
                <button onClick={ this.handleLogout }>Logout</button>
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
