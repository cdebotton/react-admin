"use strict";

import React, { PropTypes } from "react";
import cloneWithProps from "react/lib/cloneWithProps";
import { List } from "immutable";
import classNames from "classnames";

export class ToggleGroup extends React.Component {
  constructor(props) {
    super(props);

    this.state = { toggleData: this.getFormData(props) };
    this.handleUpdateToggle = this.handleUpdateToggle.bind(this);
  }

  static _isReactFormElement = true

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string,
    validate: PropTypes.string,
    defaultValue: PropTypes.any
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

  static contextTypes = {
    onValidate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  getChildContext() {
    return {
      onUpdateToggle: this.handleUpdateToggle
    };
  }

  getFormData(props) {
    let { defaultValue } = props;

    return List.isList(defaultValue) ? defaultValue : new List(defaultValue);
  }

  componentDidMount() {
    let { name } = this.props;
    let toggleData = this.getFormData(this.props);

    this.setState({ toggleData }, () => {
      this.context.onUpdate(name, toggleData);
    });
  }

  handleUpdateToggle(id) {
    let { toggleData } = this.state;
    let key = toggleData.findIndex(v => v === id);

    if (key > -1) {
      toggleData = toggleData.splice(key, 1);
    }
    else {
      toggleData = toggleData.push(id);
    }

    this.setState({ toggleData }, () => {
      this.context.onUpdate(this.props.name, toggleData);
    });
  }

  render() {
    let { children, className, ...otherProps } = this.props;
    let { toggleData } = this.state;

    return (
      <ul
        { ...otherProps }
        className={ classNames(["toggle-group", className]) }>
        { React.Children.map(children, (child, key) => {
          let value = child.props.value;
          let active = toggleData.indexOf(value) > -1;

          return cloneWithProps(child, { key, active });
        }) }
      </ul>
    );
  }
}

export class Toggle extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  static contextTypes = {
    onUpdateToggle: PropTypes.func.isRequired
  }

  static propTypes = {
    value: PropTypes.number.isRequired
  }

  handleClick(event) {
    this.context.onUpdateToggle(this.props.value);
  }

  render() {
    let { children, className, active, ...otherProps } = this.props;
    let { defaultValue } = this.context;

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
