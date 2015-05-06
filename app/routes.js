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
import AdminUsersEditRoute from "./components/AdminUsersEditRoute";
import AdminUsersShowRoute from "./components/AdminUsersShowRoute";
import AdminUsersCreateRoute from "./components/AdminUsersCreateRoute";
import AdminTokensRoute from"./components/AdminTokensRoute";
import HomeRoute from "./components/HomeRoute";
import NotFoundPage from "./components/NotFoundRoute";
import NotFoundError from "./components/NotFoundError";

/* eslint-disable */
export default (
  <Route>
    <Route handler={ App }>
      <DefaultRoute handler={ HomeRoute } />
      <Route name="admin" handler={ AdminRoute }>
        <DefaultRoute handler={ AdminDashboardRoute } />
        <Route name="login" handler={ AdminLoginRoute } />
        <Route name="users" handler={ AdminUsersRoute }>
          <DefaultRoute handler={ AdminUsersShowRoute } />
          <Route name="tokens" handler={ AdminTokensRoute } />
          <Route name="createUser" path="new" handler={ AdminUsersCreateRoute } />
          <Route name="editUser" path=":userId" handler={ AdminUsersEditRoute } />
        </Route>
      </Route>
      <NotFoundRoute handler={ NotFoundPage } />
    </Route>
    <Route path="/api">
      <NotFoundRoute handler={ NotFoundError } />
    </Route>
  </Route>
);
/* eslint-enable */
