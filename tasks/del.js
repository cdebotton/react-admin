"use strict";

var del = require("del");

module.exports = {
  taskName: "del",
  task: function () {
    return del.sync("./public");
  }
};
