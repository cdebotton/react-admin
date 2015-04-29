"use strict";

import ReactRouter, { HistoryLocation } from "react-router";
import routes from "./routes";

export default ReactRouter.create({
  location: HistoryLocation,
  routes: routes
});
