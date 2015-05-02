"use strict";

var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./development.config.js");

var WEBPACK_HOST = process.env.HOST || "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || 3001;

var serverOptions = {
  contentBase: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
  quiet: true,
  noInfo: true,
  hot: true,
  colors: true,
  publicPath: config.output.publicPath
};

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, serverOptions);

server.listen(WEBPACK_PORT, WEBPACK_HOST, function() {
  console.log(
    "WebpackDevServer listening on %s:%s", WEBPACK_HOST, WEBPACK_PORT
  );
});
