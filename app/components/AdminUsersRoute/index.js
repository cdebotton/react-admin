"use strict";

import React, { PropTypes } from "react";
import { Link, RouteHandler } from "react-router";
import UserStore from "../../stores/UserStore";

export default class AdminUsersRoute extends React.Component {
  render() {
    return (
      <div className="admin-users-route">
        <h2>Users</h2>
        <Link to="users-create">Create user</Link>
        <RouteHandler />
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-users-route.styl");
}
