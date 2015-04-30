"use strict";

import React, { PropTypes } from "react";
import DocumentTitle from "react-document-title";
import SessionActionCreators from "../../actions/SessionActionCreators";

export default class NotFoundRoute extends React.Component {
  render() {
    return (
      <DocumentTitle title="page not found - debotton.io">
        <div className="not-found-route">
          <h2>Page not found</h2>
        </div>
      </DocumentTitle>
    );
  }
}
