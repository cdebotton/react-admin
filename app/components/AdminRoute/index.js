"use strict";

import React, { PropTypes } from "react";
import { RouteHandler } from "react-router";
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
    return {
      isAuthed: SessionStore.isAuthed()
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
    let { isAuthed } = this.props;

    return (
      <DocumentTitle title="admin - debotton.io">
        <div className="admin-route">
          <header className="header">
            <h1>koa server <small>Admin</small></h1>
            { isAuthed &&
              <div className="admin-controls">
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
