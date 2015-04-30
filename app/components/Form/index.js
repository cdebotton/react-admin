"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";
import validator from "validator";
import { OrderedMap } from "immutable";
import cloneWithProps from "react/lib/cloneWithProps";

validator.extend("isRequired", (str) => {
  return str.trim() !== "";
});

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: new OrderedMap()
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  }

  static childContextTypes = {
    formName: PropTypes.string,
    onValidate: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    isValid: PropTypes.bool.isRequired
  }

  isValid() {
    return this.state.formData.reduce((memo, field) => {
      return memo && field.get("errors").size === 0;
    }, true);
  }

  getChildContext() {
    return {
      formName: this.props.name,
      onValidate: this.handleValidate,
      onUpdate: this.handleUpdate,
      isValid: this.isValid()
    };
  }

  handleValidate(value, validation) {
    let errors = validation.split("|").reduce((memo, v) => {
      let [validation, args] = v.split(":");
      let isValid;

      if (args) {
        args = [value].concat(args.split(","));
      }
      else {
        args = [value];
      }

      isValid = validator[validation].apply(null, args);

      if (!isValid) {
        memo.push(validation);
      }
      return memo;
    }, []);

    return errors;
  }

  handleUpdate(name, value, errors) {
    let { formData } = this.state;

    formData = formData.update(name, v => {
      return OrderedMap.isOrderedMap(v) ?
        v.merge({ value, errors }) :
        new OrderedMap({ value, errors });
    });

    this.setState({ formData });
  }

  componentWillMount() {
    let fields = [];

    React.Children.forEach(this.props.children, child => {
      let { name, value, validation } = child.props;
      let errors = [];

      if (!name) {
        return false;
      }

      if (validation) {
        errors = this.handleValidate(value, validation);
      }

      fields.push({ name, value, errors });
    });

    if (fields.length) {
      let formData = fields.reduce((memo, { name, value, errors }) => {
        memo = memo.set(name, new OrderedMap({ value, errors }));
        return memo;
      }, new OrderedMap());

      this.setState({ formData });
    }
  }

  handleSubmit(event) {
    let { onSubmit } = this.props;
    let { formData } = this.state;
    let model = formData.reduce((memo, field, key) => {
      memo[key] = field.get("value");
      return memo;
    }, {});

    event.preventDefault();
    onSubmit(model);
  }

  render() {
    let {
      className,
      children,
      ...otherProps
    } = this.props;

    return (
      <form
        { ...otherProps }
        onSubmit={ this.handleSubmit }
        className={ classNames(["form", className, {
          valid: this.isValid()
        } ]) }>
        { React.Children.map(children, cloneWithProps) }
      </form>
    );
  }
}

import _Input from "./Input";
export { _Input as Input };
import _Submit from "./Submit";
export { _Submit as Submit };

if (process.env.BROWSER) {
  require("./form.styl");
}
