const express = require("express");
const user = require("../src/routes/user");
const movie = require("../src/routes/movie");

module.exports = function (app) {
  app
    .use(express.json())
    .use("/user", user)
    .use("/movie", movie)
};
