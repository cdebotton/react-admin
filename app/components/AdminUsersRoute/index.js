"use strict";

import React, { PropTypes } from "react";
import { Link, RouteHandler } from "react-router";
import UserStore from "../../stores/UserStore";
import authedComponent from "../../decorators/authedComponent";

@authedComponent
export default class AdminUsersRoute extends React.Component {
  render() {
    return (
      <div className="admin-users-route">
        <h2>User Management</h2>
        <nav>
          <Link to="users">Users</Link>
          <Link to="tokens">Tokens</Link>
        </nav>
        <RouteHandler />
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-route.styl");
}
