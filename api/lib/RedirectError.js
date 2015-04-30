"use strict";

const REDIRECT_PATH = Symbol("redirect path");
const REDIRECT_CODE = Symbol("redirect code");

export default class RedirectError extends Error {
  constructor(path, code=301, msg="Redirect") {
    super(msg);
    this[REDIRECT_PATH] = path;
    this[REDIRECT_CODE] = code;
  }

  get path() {
    return this[REDIRECT_PATH];
  }
  set path(path) {
    throw new Error("Cannot set RedirectError.path");
  }

  get code() {
    return this[REDIRECT_CODE];
  }
  set code(code) {
    throw new Error("Cannot set RedirectError.code");
  }
}
