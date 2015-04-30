"use strict";

import React from "react";
import Router from "./router";
import alt from "./alt";
import SessionActionCreators from "./actions/SessionActionCreators";

let payload = JSON.parse(document.getElementById("payload").innerText);
alt.bootstrap(payload);

Router.run((Handler, state) => {
  React.render(
    <Handler { ...state } />,
    document.getElementById("root")
  );
});
