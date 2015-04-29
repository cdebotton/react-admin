"use strict";

import React, { PropTypes } from "react";
import SessionActionCreators from "../actions/SessionActionCreators";
import SessionStore from "../stores/SessionStore";

export default function authedComponent(Target) {
  return class AuthenticatedComponent extends React.Component {
    static willTransitionTo(transition, params, query) {
      if (!SessionStore.isAuthed()) {
        SessionActionCreators.setNextPath(transition.path);
        transition.redirect("login");
      }
    }

    render() {
      return (
        <Target
          { ...this.props }
          { ...this.state } />
      );
    }
  };
}
