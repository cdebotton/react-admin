"use strict";

import React, { PropTypes } from "react";

export default class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1>Brooklyn United <small>AssetLibrary</small></h1>
      </header>
    );
  }
}

if (process.env.BROWSER) {
  require("./header.styl");
}
