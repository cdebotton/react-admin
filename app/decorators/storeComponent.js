"use strict";

import React, { PropTypes } from "react";

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

      static fetchData(router) {
        return Target.fetchData.call(this, router);
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

    if (fetchData) {
      StoreComponent.fetchData = Target.fetchData;
    }

    return StoreComponent;
  };
}
