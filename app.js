const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

// internal imports

const {
  errorHandler,
  notfoundHandler,
} = require("./middlewares/common/errorHandler");

const app = express();
dotenv.config();

// db connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => console.log("mongodb connection successful"))
  .catch((err) => console.log(err));

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// 404 handler
app.use(notfoundHandler);

// common handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("app is running on port", process.env.PORT);
});
