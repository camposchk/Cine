const express = require("express");
const movie = require("../src/routes/movie");

module.exports = function (app) {
  app
    .use(express.json())
    .use("/api/movie", movie);
};
