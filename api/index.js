"use strict";

import http from "http";
import path from "path";
import compress from "koa-compress";
import bodyparser from "koa-bodyparser";
import statics from "koa-static";
import mount from "koa-mount";
import render from "./middleware/render";
import errorHandler from "./middleware/errorHandler";

const app = require("koa")();
const routes = require("require-dir")("./routes");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.use(errorHandler());
app.use(compress());
app.use(bodyparser());
app.use(statics(path.join(__dirname, "../public")));
Object.keys(routes).forEach(routeName => {
  let route = routes[routeName];
  app.use(mount("/api", route.middleware()));
});
app.use(render());

const server = http.createServer(app.callback());

server.listen(PORT, () => {
  if (ENV === "development") {
    console.log(`Listening in ${ENV} mode on port ${PORT}.`);
  }
});

export default app;
