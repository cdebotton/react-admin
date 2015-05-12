"use strict";

import React, { PropTypes } from "react/addons";
import classNames from "classnames";
import { List } from "immutable";

const { CSSTransitionGroup } = React.addons;

let selectOpen = null;

export default class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      value: props.defaultValue,
      errors: new List()
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  static _isReactFormElement = true

  static contextTypes = {
    onValidate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  static propTypes = {
    values: PropTypes.any.isRequired,
    validate: PropTypes.string
  }

  componentDidMount() {
    let { name } = this.props;
    let { value } = this.state;
    let { onValidate, onUpdate } = this.context;
    let errors = onValidate(value, this.props.validation);

    this.setState({ value, errors });
  }

  handleSelect(value) {
    return event => {
      const { onUpdate, onValidate } = this.context;
      const open = false;
      let { name } = this.props;
      let errors = onValidate(value, this.props.validation);

      this.setState({
        value,
        errors,
        open
      }, () => onUpdate(name, value, errors));
      event.preventDefault();
    };
  }

  handleOpen(event) {
    let { open } = this.state;

    if (selectOpen) {
      selectOpen.close();
      selectOpen = null;
    }

    selectOpen = { close: this.close.bind(this) };

    open = !open;
    this.setState({ open });
    event.preventDefault();
  }

  close() {
    this.setState({ open: false });
  }

  render() {
    let {
      className,
      placeholder,
      values,
      ...otherProps
    } = this.props;

    let { open, value, errors } = this.state;
    let isValid = errors.size === 0;
    let valueItems;
    let selected;

    const isLabelVisible = value.trim() !== "";

    if (values) {
      valueItems = [];

      for (let [key, value] of values.entries()) {
        valueItems.push(
          <li
            onClick={ this.handleSelect(key) }
            key={ key }>
            { value }
          </li>
        );
      }

      selected = values.get(value);
    }

    return (
      <div
        { ...otherProps }
        className={ classNames(["select", className, {
          valid: isValid
        }]) }>
        { values && [
          <span
            key="value"
            className="select-value"
            onClick={ this.handleOpen }>
            <span className="value">{ selected }</span>
            <span className="select-btn">
              <i className="fa fa-chevron-down" />
            </span>
          </span>,
          open && (
            <ul key="list" className="select-list">
              { valueItems }
            </ul>
          ),
          <div key="underline" className="underline" />,
          <label key="placeholder" className={ classNames(["label", {
            visible: isLabelVisible
          }] )}>
            { placeholder }
            <CSSTransitionGroup transitionName="validate">
              { isValid &&
                <i className="fa fa-check" />
              }
            </CSSTransitionGroup>
          </label>
        ] }
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./select.styl");
}
