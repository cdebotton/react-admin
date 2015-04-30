"use strict";

const REASON = Symbol("reason");

export default class ResourceExistsError extends Error {
  constructor(reason = "Resource exists.") {
    super(reason);
    this[REASON] = reason;
  }

  get reason() {
    return this[REASON];
  }
  set reason(v) {
    throw new Error("ResourceExistsError.reason is read-only.");
  }
}
