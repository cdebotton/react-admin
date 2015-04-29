"use strict";

import React, { PropTypes } from "react";

export default function storeComponent(...stores) {
  return function storeComponentDecorator(Target) {
    let { getStateFromStores } = Target;
    delete Target.getStateFromStores;

    return class StoreComponent extends React.Component {
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
    };
  };
}