"use strict";

var fs = require("fs");
var path = require("path");

var FILEPATH = path.resolve(__dirname, "../../api/webpack-stats.json");

module.exports = function writeStats(stats) {
  var publicPath = this.options.output.publicPath;
  var json = stats.toJson();

  function getChunks(name, ext) {
    var chunk = json.assetsByChunkName[name];
    ext = (ext || "js");

    if (Object.prototype.toString.call(chunk) !== "[object Array]") {
      chunk = [chunk];
    }

    return chunk
      .filter(function (chunk) {
        return path.extname(chunk) === "." + ext;
      })
      .map(function (chunk) {
        return publicPath + chunk;
      });
  }

  var scripts = getChunks("bundle", "js");
  var styles = getChunks("bundle", "css");

  var contents = {
    scripts: scripts,
    styles: styles
  };

  fs.writeFileSync(FILEPATH, JSON.stringify(contents));
};
