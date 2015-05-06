"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";
import validator from "validator";
import { OrderedMap, List } from "immutable";
import cloneWithProps from "react/lib/cloneWithProps";

validator.extend("isRequired", (str) => {
  return str.trim() !== "";
});

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this._processing = false;
    this._callbacks = {};
    this.state = { formData: new OrderedMap() };

    this.assignOwnership = this.assignOwnership.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleValidate = this.handleValidate.bind(this);
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
        return memo.push(validation);
      }

      return memo;
    }, new List());

    return errors;
  }

  handleUpdate(name, value, errors) {
    let { formData } = this.state;

    if (this._processing) {
      return this._callbacks[name] = () => {
        this.handleUpdate(name, value, errors);
      };
    }

    this._processing = true;

    formData = formData.update(name, v => {
      return OrderedMap.isOrderedMap(v) ?
        v.merge({ value, errors }) :
        new OrderedMap({ value, errors });
    });

    this.setState({ formData }, () => {
      this._processing = false;
      delete this._callbacks[name];

      Object.keys(this._callbacks).forEach(key => {
        let cb = this._callbacks[key];
        cb();
      });
    });
  }

  processUpdate(name, value, errors) {

  }

  assignOwnership(child) {
    if (child.props && child.props.children) {
      let Child = child.type;
      return (
        <Child {...child.props}>
          { React.Children.map(child.props.children, this.assignOwnership) }
        </Child>
      );
    }
    else if (child.type && child.type._isReactFormElement) {
      return cloneWithProps(child);
    }
    else {
      return child;
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
        autoComplete="off"
        onSubmit={ this.handleSubmit }
        className={ classNames(["form", className, {
          valid: this.isValid()
        } ]) }>
        { React.Children.map(children, this.assignOwnership) }
      </form>
    );
  }
}

import _Input from "./Input";
export { _Input as Input };
import _Submit from "./Submit";
export { _Submit as Submit };
import _Cancel from "./Cancel";
export { _Cancel as Cancel };

if (process.env.BROWSER) {
  require("./form.styl");
}
