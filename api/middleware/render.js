"use strict";

import React from "react";
import ReactRouter from "react-router";
import alt from "../../app/alt";
import HTMLDocument from "../../app/components/HTMLDocument";
import PrettyError from "pretty-error";

const pe = new PrettyError();
const ENV = process.env.NODE_ENV || "development";
const REDIRECT_PATH = Symbol("redirect path");
const REDIRECT_CODE = Symbol("redirect code");

class RedirectError extends Error {
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

export default function() {
  const doctype = "<!doctype>";
  return function *(next) {
    const stats = require("../webpack-stats.json");
    const Router = ReactRouter.create({
      location: this.req.url,
      routes: require("../../app/routes"),
      onAbort({ to, params, query }) {
        let path = this.makePath(to, params, query);

        throw new RedirectError(path, 301);
      }
    });

    try {
      let [Handler, state] = yield new Promise((resolve, reject) => {
        try {
          Router.run((...handlers) => resolve(handlers));
        }
        catch (err) {
          reject(err);
        }
      });

      let markup = React.renderToString(
        <Handler
          { ...state } />
      );

      let snapshot = alt.flush();
      let htmlDocument = (
        <HTMLDocument
          markup={ markup }
          snapshot={ snapshot }
          { ...stats } />
      );
      let html = React.renderToStaticMarkup(htmlDocument);

      this.body = doctype + html;
    }
    catch (err) {
      if (err instanceof RedirectError) {
        this.redirect(err.path);
      }
      else if (ENV === "development") {
        console.log(pe.render(err));
        this.body = err.stack;
      }
    }
  }
};
