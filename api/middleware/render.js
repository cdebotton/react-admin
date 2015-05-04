"use strict";

import path from "path";
import React from "react";
import ReactRouter from "react-router";
import PrettyError from "pretty-error";
import alt from "../../app/alt";
import { fetchData } from "../../app/utils/helpers";
import HTMLDocument from "../../app/components/HTMLDocument";
import NotFoundError from "../lib/NotFoundError";
import RedirectError from "../lib/RedirectError";

const getAlt = () => {
  delete require.cache[path.resolve("../../app/alt")];
  return require("../../app/alt");
}
const doctype = "<!doctype>";
const pe = new PrettyError();
const ENV = process.env.NODE_ENV || "development";
let stats;

if (ENV === "production") {
  stats = require("../webpack-stats.json");
}

export default function() {
  return function *(next) {
    if (ENV === "development") {
      delete require.cache[path.resolve("./api/webpack-stats.json")];
      stats = require("../webpack-stats.json");
    }

    const router = createReactRouter(this);

    let [Handler, state] = yield getHandlerWithState(router);
    let data = yield fetchData(state);
    let body = getBody(Handler, state);
    let notFound = state.routes.map(route => route.handler.name)
      .indexOf("NotFoundRoute") > -1;

    if (notFound) {
      this.status = 404;
    }

    this.body = body;
  }
};

const createReactRouter = context => {
  return ReactRouter.create({
    location: context.req.url,
    routes: require("../../app/routes"),
    onAbort(reason) {
      if (reason === "404") {
        throw new NotFoundError();
      }
      else {
        let { to, params, query, ...otherParams } = reason;
        let path = this.makePath(to, params, query);
        throw new RedirectError(path, 301);
      }
    }
  });
};

const getHandlerWithState = Router => {
  return new Promise((resolve, reject) => {
    try {
      Router.run((...handlers) => resolve(handlers));
    }
    catch (err) {
      reject(err);
    }
  });
};

const getBody = (Handler, state) => {
  let markup = React.renderToString(<Handler { ...state } />);
  let data = alt.flush();

  let htmlDocument = (
    <HTMLDocument
      markup={ markup }
      snapshot={ data }
      { ...stats } />
  );
  let html = React.renderToStaticMarkup(htmlDocument);

  return doctype + html;
};
