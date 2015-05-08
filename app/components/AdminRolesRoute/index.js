"use strict";

import React, { PropTypes } from "react";
import { Link, RouteHandler } from "react-router";

export default class AdminRolesRoute extends React.Component {
  render() {
    return (
      <div className="admin-roles-route">
        <h2>Roles</h2>
        <nav>
          <Link to="createRole">Create role</Link>
        </nav>
        <RouteHandler />
      </div>
    );
  }
}