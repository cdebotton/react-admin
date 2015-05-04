"use strict";

import React, { PropTypes } from "react";

const fnStatics = Object.getOwnPropertyNames(function() {});

export default function storeComponent(...stores) {
  return function storeComponentDecorator(Target) {
    let { getStateFromStores, fetchData } = Target;
    delete Target.getStateFromStores;

    class StoreComponent extends React.Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = getStateFromStores(props);
      }

      componentDidMount() {
        stores.forEach(store => store.listen(this.handleChange));
      }

      componentWillUnmount() {
        stores.forEach(store => store.unlisten(this.handleChange));
      }

      handleChange() {
        this.setState(getStateFromStores(this.props));
      }

      render() {
        return (
          <Target
            { ...this.props }
            { ...this.state } />
        );
      }
    }

    let statics = Object.getOwnPropertyNames(Target)
      .filter(fn => fnStatics.indexOf(fn) === -1);

    statics.forEach(fn => StoreComponent[fn] = Target[fn]);

    return StoreComponent;
  };
}
