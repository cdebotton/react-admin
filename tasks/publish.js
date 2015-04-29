"use strict";

var gulp = require("gulp");

module.exports = {
  taskName: "publish",
  dependencies: ["del"],
  task: function() {
    gulp.src("./node_modules/font-awesome/fonts/**/*")
      .pipe(gulp.dest("./public/fonts/"));

    gulp.src("./app/assets/**/*")
      .pipe(gulp.dest("./public/"));
  },

  watch: function() {
    this.task();
    gulp.watch(["./app/assets/**/*"], this.task);
  }
};
