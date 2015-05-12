"use strict";

import React, { PropTypes } from "react";
import cloneWithProps from "react/lib/cloneWithProps";
import classNames from "classnames";

export class Repeater extends React.Component {
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

export class AddRepeater extends React.Component {
  render() {
    let {
      children,
      className,
      ...otherProps
    } = this.props;


    if (!children) {
      children = "+";
    }

    return (
      <button
        { ...otherProps }
        className={ classNames(["add-repeater", className]) }
        type="button">
        { children }
      </button>
    );
  }
}
