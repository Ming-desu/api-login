const mongoose = require("mongoose");
const ApiClientError = require("../errors/ApiClientError");

module.exports = () =>
  new Promise((resolve, reject) => {
    mongoose
      .connect("mongodb://localhost:27017/api-login")
      .then(() => {
        console.log("Successfully connected to the database.");
        resolve("ok");
      })
      .catch((err) => {
        reject(
          new ApiClientError(
            "Cannot connect to the database: " + err.message,
            500
          )
        );
      });
  });
