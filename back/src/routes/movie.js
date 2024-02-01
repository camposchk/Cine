const MovieController = require("../controller/movieController");
const express = require("express");
const route = express.Router();

route
    .post("/register", MovieController.register)

module.exports = route;