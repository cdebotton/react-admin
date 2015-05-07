"use strict";

export default function autobind(...args) {
  if (args.length === 1) {
    return boundClass(...args);
  }
  else {
    return boundMethod(...args);
  }
}

function boundClass(target) {
  Reflect.ownKeys(target.prototype).forEach(key => {
    if (key === "constructor") {
      return;
    }

    let descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);

    if (typeof descriptor.value === "function") {
      Object.defineProperty(
        target.prototype,
        key,
        boundMethod(target, key, descriptor)
      );
    }
  });

  return target;
}

function boundMethod(target, key, descriptor) {
  let fn = descriptor.value;

  if (typeof fn !== "function") {
    throw new Error(`@autobind decorator can only be applied to ` +
      `methods, not: ${typeof fn}`);
  }

  let FN_SYM = Symbol(key);

  return {
    configurable: true,
    get() {
      this[FN_SYM] = fn.bind(this);

      Object.defineProperty(this, key, {
        value: this[FN_SYM],
        configurable: true,
        writable: true
      });

      return this[FN_SYM];
    }
  };
}
