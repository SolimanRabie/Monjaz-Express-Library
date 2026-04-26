const { model } = require("mongoose");
const jwt = require("jsonwebtoken");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
///////////////////////////
const verfiyToken = (req, res, next) => {
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"];
  if (!authHeader) {
    const error = appError.create(
      " token is requierd ",
      401,
      httpStatusText.ERROR,
    );
    return next(error);
  }
  //   console.log("authHeader", authHeader);
  const token = authHeader.split(" ")[1];
  //   console.log("toookennn", token);
  try {
    const currentUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("currentUser", currentUser);
    req.currentUser = currentUser;

    next();
  } catch (err) {
    console.log("hommmar");
    const error = appError.create("invalid token ", 401, httpStatusText.ERROR);
    return next(error);
  }
};
module.exports = verfiyToken;
