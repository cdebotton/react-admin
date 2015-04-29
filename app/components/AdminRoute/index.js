"use strict";

import React, { PropTypes } from "react";
import { RouteHandler } from "react-router";
import DocumentTitle from "react-document-title";

export default class AdminRoute extends React.Component {
  render() {
    return (
      <DocumentTitle title="admin - debotton.io">
        <div className="admin-route">
          <h1>debotton.io <small>Admin</small></h1>
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
}

if (process.env.BROWSER) {
  require("./admin-route.styl");
}
