const express = require("express");
const Router = express.Router();

const { profile } = require("../controllers/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

Router.get("/profile", isAuthenticated, profile);

module.exports = Router;
