"use strict";

import React, { PropTypes } from "react";
import authedComponent from "../../decorators/authedComponent";

@authedComponent
export default class DashboadRoute extends React.Component {
  render() {
    return (
      <div className="dashboard-route">
        <h2>Dashboard</h2>
      </div>
    );
  }
}
