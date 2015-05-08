"use strict";

import path from "path";
import compress from "koa-compress";
import bodyparser from "koa-bodyparser";
import session from "koa-session";
import statics from "koa-static";
import mount from "koa-mount";
import render from "./middleware/render";
import errorHandler from "./middleware/errorHandler";

const app = require("koa")();
const routes = require("require-dir")("./routes");

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";
const KEY = process.env.KEY || "koa key";
const KEY_SECRET = process.env.KEY_SECRET || "koa key secret";

app.proxy = true;
app.keys = [KEY, KEY_SECRET];
app.use(session(app));
app.use(errorHandler());
app.use(compress());
app.use(bodyparser());
app.use(statics(path.join(__dirname, "../public")));
app.use(function *(next) {
  let { url } = this.req;
  let { User, Profile } = require("./models");

  if (url === "/seed") {
    let user = yield User.create({
      email: "admin@cdb.io",
      password: "testing"
    });

    let profile = yield Profile.create({
      UserId: user.id,
      firstName: "Christian",
      lastName: "de Botton",
      biography: "Hello, my name is Christian and I'm the Technical Director " +
        "at Brooklyn United."
    });

    user = User.findOne(user.id);

    this.body = user;
  }
  else {
    yield next;
  }
});
Object.keys(routes).forEach(routeName => {
  let route = routes[routeName];
  app.use(mount("/api", route.middleware()));
});
app.use(render());

const server = require("./sockets")(app);

server.listen(PORT, () => {
  if (ENV === "development") {
    console.log(`Listening in ${ENV} mode on port ${PORT}.`);
  }
});

export default app;
