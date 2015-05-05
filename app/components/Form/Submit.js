"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

export default class Submit extends React.Component {
  static _isReactFormElement = true

  static contextTypes = {
    isValid: PropTypes.bool.isRequired
  }

  render() {
    let { isValid } = this.context;
    let { children, className, ...otherProps } = this.props;

    return (
      <button
        className={ classNames(["submit", className]) }
        type="submit"
        disabled={ !isValid }>
        { children }
      </button>
    );
  }
}

if (process.env.BROWSER) {
  require("./submit.styl");
}
