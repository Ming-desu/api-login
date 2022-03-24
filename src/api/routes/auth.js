const express = require("express");
const Router = express.Router();

const { login, refreshToken } = require("./../controllers/auth.controller");

Router.post("/login", login);
Router.post("/refresh-token", refreshToken);

module.exports = Router;
