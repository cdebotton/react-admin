"use strict";

import React, { PropTypes } from "react";
import cloneWithProps from "react/lib/cloneWithProps";
import classNames from "classnames";
import { Map } from "immutable";

export class Repeater extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      values: new Map(props.data)
    };

    this.handleUpdate = this.handleUpdate.bind(this);
  }

  static _isReactFormElement = true

  static contextTypes = {
    onValidate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    validate: PropTypes.string,
    data: PropTypes.object
  }

  static childContextTypes = {
    onUpdate: PropTypes.func.isRequired,
    onValidate: PropTypes.func
  }

  getChildContext() {
    return {
      onUpdate: this.handleUpdate
    };
  }

  handleUpdate(name, value, errors) {
    let { onUpdate } = this.context;
    let { children, name: repeaterName } = this.props;
    let { values: repeaterValue } = this.state;
    let [fieldName, fieldKey] = name.split(".");

    repeaterValue = repeaterValue.setIn([fieldKey, fieldName], value);

    this.setState({ values: repeaterValue }, () => {
      onUpdate(repeaterName, repeaterValue.toJS());
    });
  }

  render() {
    let {
      className,
      children,
      data,
      ...otherProps
    } = this.props;

    return (
      <div className={ classNames(["repeater", className]) }>
        { data && data.map((dataItem, dataKey) => {
          return (
            <div
              key={ dataKey }
              className="repeater-row">
              { React.Children.map(children, (child, key) => {
                return cloneWithProps(child, {
                  defaultValue: dataItem[child.props.name],
                  index: key,
                  name: `${child.props.name}.${dataKey}`
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
  static propTypes = {
    onClick: PropTypes.func.isRequired
  }

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

if (process.env.BROWSER) {
  require("./repeater.styl");
}
