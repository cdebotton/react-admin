"use strict";

import PrettyError from "pretty-error";
import RedirectError from "../lib/RedirectError";
import NotFoundError from "../lib/NotFoundError";

const pe = new PrettyError();
const ENV = process.env.NODE_ENV || "development";

export default function() {
  return function *() {
    const { err } = this;

    if (err instanceof RedirectError) {
      this.redirect(err.path);
    }
    else if (err instanceof NotFoundError) {
      if (this.status != 404) {
        return false;
      }

      this.status = 404;

      switch (this.accepts("html", "json")) {
        case "html":
          this.type = "html";
          this.body = "<p>Page Not Found</p>";
          break;
        case "json":
          this.type = "json";
          if (!this.body) {
            this.body = { message: "Page Not Found" };
          }
          break;
        default:
          this.type = "text";
          this.body = "Page Not Found";
      }
    }
    else if (ENV === "development") {
      console.log(pe.render(err));
      this.body = err.stack;
    }
  };
}
