const MovieController = require("../controller/movieController");
const express = require("express");
const route = express.Router();

route
    .post("/register", MovieController.register)
    .get("/:page", MovieController.getAll)
    .get("/:id", MovieController.getById)
    .post("/rating/:idMovie/:idUser", MovieController.rating)
    .delete("/delete/:id", MovieController.deleteById)

module.exports = route;