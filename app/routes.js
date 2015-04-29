"use strict";

import React from "react";
import {
  Route,
  DefaultRoute,
  NotFoundRoute,
  Redirect
} from "react-router";

import App from "./components/App";
import AdminRoute from "./components/AdminRoute";
import LoginRoute from "./components/LoginRoute";
import DashboardRoute from "./components/DashboardRoute";

export default (
  <Route handler={ App }>
    <Route name="admin" handler={ AdminRoute }>
      <DefaultRoute handler={ DashboardRoute } />
      <Route name="login" handler={ LoginRoute } />
    </Route>
  </Route>
);
