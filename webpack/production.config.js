"use strict";

var webpack = require("webpack");
var path = require("path");
var strip = require("strip-loader");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var writeStats = require("./utils/write-stats");

module.exports = {
  devtool: false,
  progress: true,
  entry: {
    bundle: "./app/index.js"
  },
  output: {
    path: path.join(__dirname, "../public"),
    filename: "[name]-[chunkhash].js",
    chunkFilename: "[name]-[chunkhash].js",
    publicPath: "/"
  },
  module: {
    resolve: {
      extensions: ["", ".js"]
    },
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "eslint" }
    ],
    loaders: [
      { test: /\.json$/, exclude: /node_modules/, loader: "json" },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=/fonts/[name].[ext]&limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader?name=/fonts/[name].[ext]" },
      { test: /\.(jpe?g|png|gif|svg)$/, exclude: /node_modules/, loader: "file" },
      { test: /\.css$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style", "css") },
      { test: /\.styl$/, exclude: /node_modules/, loader: ExtractTextPlugin.extract("style", "css!stylus") },
      { test: /\.js$/, exclude: /node_modules/, loaders: [strip.loader("debug"), "babel?stage=0&optional=runtime"] }
    ]
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /debug/,
      process.cwd() + "/webpack/utils/noop.js"
    ),
    new webpack.DefinePlugin({
      "process.env.BROWSER": JSON.stringify(true),
      NODE_ENV: JSON.stringify("production")
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: false
      }
    }),
    new ExtractTextPlugin("stylesheets/app-[chunkhash].css"),
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