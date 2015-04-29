"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";

export default class Input extends React.Component {
  static contextTypes = {
    onValidate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
    validate: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: "",
      errors: []
    };
  }

  componentDidMount() {
    let { name } = this.props;
    let { value } = React.findDOMNode(this._input);
    let { onValidate, onUpdate } = this.context;
    let errors = onValidate(value, this.props.validation);

    this.setState({ value, errors }, () => {
      onUpdate(name, value, errors);
    });
  }

  handleChange(event) {
    let { value } = React.findDOMNode(this._input);
    let { name } = this.props;
    const { onUpdate, onValidate } = this.context;
    let errors = onValidate(value, this.props.validation);

    this.setState({ value, errors }, () => onUpdate(name, value, errors));
  }

  render() {
    let { className, ...otherProps } = this.props;
    let { value, errors } = this.state;
    let isValid = errors.length === 0;

    const isLabelVisible = value.trim() !== "";

    return (
      <div className={ classNames(["input", className, {
        valid: isValid
      }] ) }>
        <input
          onChange={ this.handleChange }
          ref={ c => this._input = c }
          type="type"
          { ...otherProps } />
        <span className="underline" />
        <label className={ classNames(["label", {
          visible: isLabelVisible
        }] )}>
          { otherProps.placeholder }
        </label>
      </div>
    );
  }
}

if (process.env.BROWSER) {
  require("./input.styl");
}
