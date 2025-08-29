const createError = require("http-errors");
//404 not found
const notfoundHandler = (req, res, next) => {
  next(createError(404, "your requested content was not found"));
};

// default error handler

const errorHandler = (err, req, res, next) => {
  res.locals.error =
    process.env.NODE_ENV === "development" ? err : { message: err.message };
  const statusCode = err.statusCode || 500;
  res.status(statusCode);
  if (!res.locals.html) {
    // html response
    res.render("error", {
      title: "Error Page",
    });
  } else {
    // json response
    res.json(res.locals.error);
  }
};

module.exports = {
  notfoundHandler,
  errorHandler,
};
