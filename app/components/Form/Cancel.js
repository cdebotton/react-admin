"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

export default class Cancel extends React.Component {
  static _isReactFormElement = true

  render() {
    let { children, className, ...otherProps } = this.props;

    return (
      <button
        { ...otherProps }
        className={ classNames(["cancel", className]) }
        type="button">
        { children }
      </button>
    );
  }
}

if (process.env.BROWSER) {
  require("./cancel.styl");
}
