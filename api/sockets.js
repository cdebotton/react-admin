"use strict";

import http from "http";

export default (app) => {
  let server = http.createServer(app.callback());
  let io = require("socket.io")(server);

  io.on("connection", socket => {
    console.log("A user has connected");
    socket.on("disconnect", () => {
      console.log("A user has disconnected");
    });
  });

  return server;
};
