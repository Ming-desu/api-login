const bcrypt = require("bcrypt");

const db = require("./../../lib/database");
const User = require("../model/User");
const ApiClientError = require("../../errors/ApiClientError");

exports.register = async (req, res, next) => {
  const { first_name, last_name, username, password } = req.body;

  try {
    if (!first_name || !last_name || !username || !password) {
      throw new ApiClientError(
        "Please specify all the required fields. [first_name, last_name, username, password]"
      );
    }

    // Connect to the database
    await db();

    // Check if username already exists
    const exists = await User.findOne({ username });

    if (exists) {
      throw new ApiClientError("Username already exists.");
    }

    const hashed_password = await bcrypt.hash(password, 10);

    // Proceed to creating user
    const user = new User({
      first_name,
      last_name,
      username,
      password: hashed_password,
    });

    await user.save();

    // Set user password to null
    user.password = null;

    // Respond back to the client
    res.status(200).json({
      message: "Successfully created a new user.",
      sub: user.toJSON(),
    });
  } catch (err) {
    next(err);
  }
};
