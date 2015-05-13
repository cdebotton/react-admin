"use strict";

import React, { PropTypes } from "react";
import classNames from "classnames";
import validator from "validator";
import { OrderedMap, List, Iterable } from "immutable";
import { Repeater } from "./Repeater";
import cloneWithProps from "react/lib/cloneWithProps";
import autobind from "../../decorators/autobind";

validator.extend("isRequired", (str) => {
  return str.trim() !== "";
});

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.handleValidate = this.handleValidate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.assignOwnership = this.assignOwnership.bind(this);
  }

  state = { formData: new OrderedMap() }

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
      return memo && (
        !field.get("errors") || field.get("errors").size === 0
      );
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
    if (!validation) {
      return new List();
    }

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

  handleUpdate(name, value, errors = new List()) {
    let { formData } = this.state;

    formData = formData.update(name, v => {
      return OrderedMap.isOrderedMap(v) ?
        v.merge({ value, errors }) :
        new OrderedMap({ value, errors });
    });

    this.setState({ formData });
  }

  componentWillMount() {
    let fields = this.registerInputs(this.props.children);

    if (fields.length) {
      let formData = fields.reduce((memo, { name, value, errors }) => {
        memo = memo.set(name, new OrderedMap({ value, errors }));
        return memo;
      }, new OrderedMap());

      this.setState({ formData });
    }
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

  registerInputs(fields) {
    let registeredFields = [];

    React.Children.forEach(fields, field => {
      if (!field.props) {
        return false;
      }

      let {
        name,
        validation,
        children,
        defaultValue: value
      } = field.props;

      let errors = new List();

      if (field.type !== Repeater && children) {
        registeredFields = registeredFields
          .concat(this.registerInputs(children));
      }

      if (!(field.type &&
          field.type._isReactFormElement &&
          field.props.name)) {
        return false;
      }

      if (validation) {
        errors = this.handleValidate(value, validation);
      }

      registeredFields.push({ name, value, errors });
    });

    return registeredFields;
  }

  handleSubmit(event) {
    let { onSubmit } = this.props;
    let { formData } = this.state;
    let model = formData.reduce((memo, field, key) => {
      let value = field.get("value");

      if (Iterable.isIterable(value)) {
        value = value.toJS();
      }

      memo[key] = value;

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

export Input from "./Input";
export TextArea from "./TextArea";
export { Toggle, ToggleGroup } from "./Toggles";
export { Repeater, AddRepeater, RemoveRepeater } from "./Repeater";
export Select from "./Select";
export Submit from "./Submit";
export Cancel from "./Cancel";

if (process.env.BROWSER) {
  require("./form.styl");
}
