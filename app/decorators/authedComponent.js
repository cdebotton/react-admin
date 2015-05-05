"use strict";

import React, { PropTypes } from "react";
import SessionActionCreators from "../actions/SessionActionCreators";
import SessionStore from "../stores/SessionStore";

const fnStatics = Object.getOwnPropertyNames(function() {});

export default function authedComponent(Target) {
  class AuthenticatedComponent extends React.Component {
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
  }

  let statics = Object.getOwnPropertyNames(Target)
    .filter(fn => fnStatics.indexOf(fn) === -1);

  statics.forEach(fn => AuthenticatedComponent[fn] = Target[fn]);

  return AuthenticatedComponent;
}
