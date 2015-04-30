"use strict";

export let mask = (obj, ...props) => {
  return props.reduce((memo, key) => {
    memo[key] = obj[key] || null;
    return memo;
  }, {});
};
