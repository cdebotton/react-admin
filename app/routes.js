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
import AdminLoginRoute from "./components/AdminLoginRoute";
import AdminDashboardRoute from "./components/AdminDashboardRoute";
import AdminUsersRoute from "./components/AdminUsersRoute";
import AdminUsersShowRoute from "./components/AdminUsersShowRoute";
import AdminUsersCreateRoute from "./components/AdminUsersCreateRoute";
import HomeRoute from "./components/HomeRoute";
import NotFoundPage from "./components/NotFoundRoute";
import NotFoundError from "./components/NotFoundError";

export default (
  <Route>
    <Route handler={ App }>
      <DefaultRoute handler={ HomeRoute } />
      <Route
        name="admin"
        handler={ AdminRoute }>
        <DefaultRoute handler={ AdminDashboardRoute } />
        <Route
          name="login"
          handler={ AdminLoginRoute } />
        <Route
          name="users"
          handler={ AdminUsersRoute }>
          <DefaultRoute
            name="users-show"
            handler={ AdminUsersShowRoute } />
          <Route
            name="users-create"
            path="create"
            handler={ AdminUsersCreateRoute } />
        </Route>
      </Route>
      <NotFoundRoute handler={ NotFoundPage } />
    </Route>
    <Route path="/api">
      <NotFoundRoute handler={ NotFoundError } />
    </Route>
  </Route>
);
