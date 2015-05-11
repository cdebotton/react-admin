"use strict";

import PrettyError from "pretty-error";
import ResourceExistsError from "../lib/ResourceExistsError";
import RedirectError from "../lib/RedirectError";
import NotFoundError from "../lib/NotFoundError";

const pe = new PrettyError();
const ENV = process.env.NODE_ENV || "development";

export default function errorHandler() {
  return function *errorHandlerMiddleware(next) {
    try {
      yield next;
    }
    catch (err) {
      const { status, body } = this;

      if (err instanceof ResourceExistsError) {
        this.status = 400;
        this.body = { message: err.reason };
      }
      else if (err instanceof RedirectError) {
        this.redirect(err.path);
      }
      else if (err instanceof NotFoundError) {
        if (this.status != 404) {
          return false;
        }

        let message = err.reason || "Page Not Found";

        this.status = 404;

        switch (this.accepts("html", "json")) {
          case "html":
            this.type = "html";
            this.body = `<p>${message}</p>`;
            break;
          case "json":
            this.type = "json";
            if (!this.body) {
              this.body = { message: message };
            }
            break;
          default:
            this.type = "text";
            this.body = message;
        }
      }
      else if (ENV === "development") {
        console.log(pe.render(err));
        this.body = err.stack;
      }
    }
  };
}
