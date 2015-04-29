"use strict";

var gulp = require("gulp");

var taskFiles = require("require-dir")("./tasks");
var tasks = [];
var watchers = [];

Object.keys(taskFiles).forEach(function (key) {
  var opts = taskFiles[key];
  var taskName = opts.taskName;
  var dependencies = opts.dependencies;
  var task = opts.task;
  var watch = opts.watch;

  if (task) {
    gulp.task(taskName, dependencies, task);
    tasks.push(taskName);
  }

  if (watch) {
    var watcherName = taskName + ":watch";
    gulp.task(watcherName, watch);
    watchers.push(opts);
  }
});

gulp.task("default", tasks);
gulp.task("watch", function() {
  watchers.forEach(function(watcher) {
    watcher.watch();
  });
});
