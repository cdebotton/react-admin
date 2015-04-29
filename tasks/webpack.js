"use strict";

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var gutil = require("gulp-util");

var WEBPACK_HOST = "localhost";
var WEBPACK_PORT = 9000;

module.exports = {
  taskName: "webpack",
  dependencies: ["del"],
  task: function (callback) {
    var config = require("../webpack/production.config.js");
    webpack(config, function (err, stats) {
      if (err) {
        throw new gutil.PluginError("webpack", err);
      }

      gutil.log("webpack", stats.toString({
        progress: true,
        colors: true
      }));

      callback();
    });
  },

  watch: function() {
    require("../webpack/dev-server");
  }
}
