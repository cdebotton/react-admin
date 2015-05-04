"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

export default class DestroyButton extends React.Component {
  render() {
    let { children, className, ...otherProps } = this.props;

    return (
      <button
        className={ ["destroy-button", className] }
        { ...otherProps }
        type="button">
        { children }
      </button>
    );
  }
}
