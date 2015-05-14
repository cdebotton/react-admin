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

import AdminRolesRoute from "./components/AdminRolesRoute";
import AdminRolesShowRoute from "./components/AdminRolesShowRoute";
import AdminRolesCreateRoute from "./components/AdminRolesCreateRoute";
import AdminRolesEditRoute from "./components/AdminRolesEditRoute";

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
        <DefaultRoute name="dashboard" handler={ AdminDashboardRoute } />
        <Route name="login" handler={ AdminLoginRoute } />
        <Route name="users" handler={ AdminUsersRoute }>
          <DefaultRoute handler={ AdminUsersShowRoute } />
          <Route name="createUser" path="new" handler={ AdminUsersCreateRoute } />
          <Route name="editUser" path=":userId" handler={ AdminUsersEditRoute } />
        </Route>
        <Route name="roles" handler={ AdminRolesRoute }>
          <DefaultRoute handler={ AdminRolesShowRoute } />
          <Route name="createRole" path="new" handler={ AdminRolesCreateRoute } />
          <Route name="editRole" path=":roleId" handler={ AdminRolesEditRoute} />
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
