"use strict";

import React, { PropTypes } from "react";
import cloneWithProps from "react/lib/cloneWithProps";
import classNames from "classnames";

export default class Repeater extends React.Component {
  render() {
    let {
      className,
      children,
      data,
      ...otherProps
    } = this.props;

    return (
      <div className={ classNames(["repeater", className]) }>
        { data.map((dataItem, key) => {
          return (
            <div
              key={ key }
              className="repeater-row">
              { React.Children.map(children, (child, key) => {
                return cloneWithProps(child, {
                  defaultValue: dataItem[child.props.name]
                });
              }) }
            </div>
          );
        }) }

      </div>
    );
  }
}
