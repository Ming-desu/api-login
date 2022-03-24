const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require("../../lib/database");
const ApiClientError = require("../../errors/ApiClientError");
const User = require("../model/User");
const { SECRET } = require("../../lib/config");
const { TokenExpiredError } = require("jsonwebtoken");

exports.login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      throw new ApiClientError(
        "Please specify the required fields. [username, password]"
      );
    }

    // Connect to the database
    await db();

    // Check if user exists
    const user = await User.findOne({ username });

    if (!user) {
      throw new ApiClientError("Invalid username or password.");
    }

    // Validate the password provided with the hashed password of the user
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new ApiClientError("Invalid username or password.");
    }

    // Set user password to null
    user.password = null;

    // Generate JSON Web Tokens
    const accessToken = jwt.sign({ sub: user.toJSON() }, SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    const refreshToken = jwt.sign({ sub: Date.now() }, SECRET, {
      algorithm: "HS256",
      expiresIn: "3h",
    });

    res.status(200).json({
      message: "Successfully logged in.",
      authentication: {
        accessToken,
        refreshToken,
      },
      sub: user.toJSON(),
    });
  } catch (err) {
    next(err);
  }
};

exports.refreshToken = (req, res, next) => {
  const { accessToken, refreshToken } = req.body;

  try {
    if (!accessToken || !refreshToken) {
      throw new ApiClientError("AccessToken or RefreshToken is not provided.");
    }

    // Verify the access token
    const { sub } = jwt.verify(accessToken, SECRET, {
      algorithms: ["HS256"],
    });

    const authentication = {
      accessToken: null,
      refreshToken: null,
    };

    // Verify the refresh token and check if expired
    jwt.verify(
      refreshToken,
      SECRET,
      { algorithms: ["HS256"] },
      function (err, decoded) {
        // If token expired, generate new accessTokens
        if (!err || err instanceof TokenExpiredError) {
          authentication.accessToken = jwt.sign({ sub }, SECRET, {
            algorithm: "HS256",
            expiresIn: "7d",
          });

          authentication.refreshToken = jwt.sign({ sub: Date.now() }, SECRET, {
            algorithm: "HS256",
            expiresIn: "3h",
          });

          return;
        }

        if (err) {
          throw new ApiClientError(err.message, 400);
        }
      }
    );

    res.status(200).json({
      message: "Successfully refreshed tokens.",
      authentication,
    });
  } catch (err) {
    next(err);
  }
};
