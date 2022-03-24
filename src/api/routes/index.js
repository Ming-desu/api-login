const express = require("express");
const Router = express.Router();

Router.use("/auth", require("./auth"));
Router.use(require("./register"));
Router.use(require("./user"));

module.exports = Router;
