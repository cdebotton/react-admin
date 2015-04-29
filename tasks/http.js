"use strict";

var gulp = require("gulp");
var path = require("path");
var spawn = require("child_process").spawn;

var server = path.join(__dirname, "../index.js");

module.exports = {
  taskName: "http",
  watch: function() {
    process.env.PATH = path.join(
      __dirname, "../node_modules/.bin"
    ) + ":" + process.env.PATH;

    spawn("supervisor", ["--harmony", "--ignore ./public", "-e js", server], {
      stdio: "inherit",
      env: process.env
    });
  }
};
