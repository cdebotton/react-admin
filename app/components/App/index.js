"use strict";

import React, { PropTypes } from "react";
import { RouteHandler } from "react-router";
import DocumentTitle from "react-document-title";
import Header from "../Header";

export default class App extends React.Component {
  render() {
    return (
      <DocumentTitle title="koa server">
        <div className="app">
          <RouteHandler />
        </div>
      </DocumentTitle>
    );
  }
}

if (process.env.BROWSER) {
  require("./app.styl");
}
