"use strict";

import React, { PropTypes } from "react";
import cloneWithProps from "react/lib/cloneWithProps";
import classNames from "classnames";

export default class Repeater extends React.Component {
  render() {
    let {
      className,
      children,
      ...otherProps
    } = this.props;

    return (
      <div className={ classNames(["repeater", className]) }>
        { React.Children.map(children, child => cloneWithProps(child)) }
      </div>
    );
  }
}
