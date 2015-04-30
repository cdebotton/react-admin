"use strict";

import React from "react";

export default class NotFoundError extends React.Component {
  static willTransitionTo(transition, params, query) {
    transition.abortReason = "404";
    transition.abort();
  }

  render() {
    return false;
  }
}
