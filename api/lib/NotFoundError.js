"use strict";

const REASON = Symbol("reason");

export default class NotFoundError extends Error {
  constructor(reason) {
    super(reason);
    this[REASON] = reason;
  }

  get reason() {
    return this[REASON];
  }
  set reason(v) {
    throw new Error("NotFoundError.reason is read-only.");
  }
}
