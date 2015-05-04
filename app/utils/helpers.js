"use strict";

export let mask = (obj, ...props) => {
  return props.reduce((memo, key) => {
    memo[key] = obj[key] || null;
    return memo;
  }, {});
};

export let fetchData = (state) => {
  return new Promise((resolve, reject) => {
    let promises = state.routes.filter(route => {
      return typeof route.handler.fetchData === "function";
    }).map(route => route.handler.fetchData(state));

    Promise.all(promises)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};
