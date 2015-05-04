"use strict";

import React from "react";
import ws from "socket.io-client";
import Router from "./router";
import alt from "./alt";
import { fetchData } from "./utils/helpers";
import SessionActionCreators from "./actions/SessionActionCreators";

let io = new ws();

let bootstrapped = false;
let { payload } = window;
alt.bootstrap(JSON.stringify(payload));

Router.run((Handler, state) => {
  if (!bootstrapped) {
    bootstrapped = true;
  }
  else {
    fetchData(state);
  }

  React.render(
    <Handler { ...state } />,
    document.getElementById("root")
  );
});
