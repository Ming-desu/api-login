const jwt = require("jsonwebtoken");
const ApiClientError = require("../../errors/ApiClientError");
const { SECRET } = require("../../lib/config");

exports.isAuthenticated = (req, res, next) => {
  const accessToken = req.header("AccessToken");

  try {
    if (!accessToken) {
      throw new ApiClientError("AccessToken is missing.");
    }

    const { sub } = jwt.verify(accessToken, SECRET, { algorithms: ["HS256"] });

    req.user = sub;

    next();
  } catch (err) {
    next(err);
  }
};
