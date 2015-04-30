"use strict";

import React from "react";
import Router from "./router";
import alt from "./alt";
import { fetchData } from "./utils/helpers";
import SessionActionCreators from "./actions/SessionActionCreators";

let bootstrapped = false;
let payload = JSON.parse(document.getElementById("payload").innerText);


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
