const express = require("express");
const Router = express.Router();

const { register } = require("../controllers/register.controller");

Router.post("/register", register);

module.exports = Router;
