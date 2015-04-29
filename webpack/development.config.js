"use strict";

var path = require("path");
var webpack = require("webpack");
var writeStats = require("./utils/write-stats");
var notifyStats = require("./utils/notify-stats");

var WEBPACK_HOST = process.env.HOST || "localhost";
var WEBPACK_PORT = parseInt(process.env.PORT) + 1 || "3001";

module.exports = {
  devtool: "eval",
  progress: true,
  entry: {
    "bundle": [
      "webpack-dev-server/client?http://" + WEBPACK_HOST + ":" + WEBPACK_PORT,
      "webpack/hot/only-dev-server",
      "./app/index.js"
    ]
  },
  output: {
    path: path.join(__dirname, "../public"),
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "http://" + WEBPACK_HOST + ":" + WEBPACK_PORT + "/"
  },
  module: {
    resolve: {
      extensions: ["", ".js", ".styl"]
    },
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint" }
    ],
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: "json" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=/fonts/[name].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=/fonts/[name].[ext]" },
      { test: /\.(jpe?g|png|gif|svg)$/, exclude: /node_modules/, loader: "file" },
      { test: /\.css$/, exclude: /node_modules/, loaders: ["style-loader", "css-loader"] },
      { test: /\.styl$/, exclude: /node_modules/, loaders: ["style-loader", "css-loader", "stylus-loader"] },
      { test: /\.js$/, exclude: /node_modules/, loaders: ["react-hot", "babel?stage=0&optional=runtime"] }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProgressPlugin(function(percentage, message) {
      var MOVE_LEFT = new Buffer("1b5b3130303044", "hex").toString();
      var CLEAR_LINE = new Buffer("1b5b304b", "hex").toString();

      process.stdout.write(CLEAR_LINE + Math.round(percentage * 100) +
        message + MOVE_LEFT);
    }),
    new webpack.DefinePlugin({
      "process.env.BROWSER": JSON.stringify(true),
      NODE_ENV: JSON.stringify("production")
    }),
    function() {
      this.plugin("done", notifyStats);
    },
    function() {
      this.plugin("done", writeStats);
    }
  ],
  eslint: {
    failOnError: true
  },
  stylus: {
    use: [
      require("nib")(),
      require("jeet")(),
      require("rupture")()
    ]
  }
};
