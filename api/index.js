"use strict";

import path from "path";
import compress from "koa-compress";
import bodyparser from "koa-bodyparser";
import statics from "koa-static";
import render from "./middleware/render";

const app = require("koa")();

const PORT = process.env.PORT || 3000;
const ENV = process.env.NODE_ENV || "development";

app.use(compress());
app.use(bodyparser());
app.use(statics(path.join(__dirname, "../public")));
app.use(render());

app.listen(PORT, () => {
  if (ENV === "development") {
    console.log(`Listening in ${ENV} mode on port ${PORT}.`);
  }
});

export default app;
