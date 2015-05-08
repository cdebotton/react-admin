"use strict";

import React, { PropTypes } from "react";
import cloneWithProps from "react/lib/cloneWithProps";
import { Map } from "immutable";
import classNames from "classnames";

export class ToggleGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      toggleData: new Map()
    };

    this.handleUpdateToggle = this.handleUpdateToggle.bind(this);
  }

  static _isReactFormElement = true

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.string
  }

  static childContextTypes = {
    onUpdateToggle: PropTypes.func.isRequired
  }

  static getValue(map) {
    return map.reduce((memo, v, k) => {
      if (v) {
        memo.push(k);
      }
      else {
        let index = memo.indexOf(k);
        if (index > -1) {
          memo.splice(index, 1);
        }
      }
      return memo;
    }, []);
  }

  getChildContext() {
    return {
      onUpdateToggle: this.handleUpdateToggle
    };
  }

  static contextTypes = {
    onValidate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  handleUpdateToggle(name, value) {
    let { toggleData } = this.state;

    toggleData = toggleData.set(name, value);
    this.setState({ toggleData }, () => {
      let value = ToggleGroup.getValue(toggleData);

      this.context.onUpdate(this.props.name, value);
    });
  }

  render() {
    let { children, className, ...otherProps } = this.props;

    return (
      <ul
        { ...otherProps }
        className={ classNames(["toggle-group", className]) }>
        { React.Children.map(children, (child, key) => {
          return cloneWithProps(child, { key });
        }) }
      </ul>
    );
  }
}

export class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.state = { active: false };
    this.handleClick = this.handleClick.bind(this);
  }

  static contextTypes = {
    onUpdateToggle: PropTypes.func.isRequired
  }

  static propTypes = {
    value: PropTypes.number.isRequired
  }

  handleClick(event) {
    let active = !this.state.active;
    let { value } = this.props;

    this.setState({ active }, () => {
      this.context.onUpdateToggle(value, active);
    });
  }

  render() {
    let { children, className, ...otherProps } = this.props;
    let { active } = this.state;

    return (
      <li
        { ...otherProps }
        onClick={ () => this.handleClick() }
        className={ classNames(["toggle", className, { active }]) }>
        { children }
      </li>
    );
  }
}

if (process.env.BROWSER) {
  require("./toggles.styl");
}
