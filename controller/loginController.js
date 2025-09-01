// external imports
const bcrypt = require("bcrypt");
const { createError } = require("http-errors");

// internal imports

const User = require("../models/People");
const jwt = require("jsonwebtoken");

// login page
const getLogin = (req, res, next) => {
  res.render("index");
};

// do login
const login = async (req, res, next) => {
  try {
    // find a user who have this email or mobile
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isValidPassword) {
        // prepare the user object to gen token]
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };

        // token generate
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });

        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.JWT_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set login user local identifier
        res.locals.loggedInUser = userObject;

        res.render("inbox");
      } else {
        throw createError("Login failed, please try again .");
      }
    } else {
      throw createError("Login failed, please try again .");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

module.exports = { getLogin, login };
