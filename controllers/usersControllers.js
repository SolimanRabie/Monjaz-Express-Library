const asyncWrapper = require("../middelwares/asyncWrapper");
const User = require("../models/user-model");
const httpStatusText = require("../utils/httpStatusText");
const appError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const generateJWT = require("../utils/generateJWT");

//////
const getAllUsers = asyncWrapper(async (req, res, next) => {
  // get all courses from DBusing Course model
  console.log("headers", req.headers);
  const query = req.query;
  console.log("query ", query);
  const limit = query.limit || 5;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const users = await User.find({}, { __v: false, password: false })
    .limit(limit)
    .skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users: users } }); // use jsend object
});

const register = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const { firstName, lastName, email, password, role } = req.body;

  // ***** validation if exist ******//
  const oldUser = await User.findOne({ email: email });
  if (oldUser) {
    const error = appError.create(
      "user already exist ",
      400,
      httpStatusText.FAIL,
    );
    return next(error);
  }
  // ***** validation if exist ******//
  //
  // **** password hashing ******//
  const hashedPassword = await bcrypt.hash(password, 10);
  // **** password hashing ******//
  //
  // ****** Happy Senario -> creating new user *******//
  const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
  });
  // generate jwt token
  const token = await generateJWT({
    email: newUser.email,
    id: newUser._id,
    role: newUser.role,
  });
  newUser.token = token;
  // generate jwt token
  await newUser.save();
  res.json({ status: httpStatusText.SUCCESS, data: { user: newUser } });

  // ****** Happy Senario -> creating new user *******//
});

const login = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && !password) {
    const error = appError.create(
      "email and password not required ",
      400,
      httpStatusText.FAIL,
    );
    return next(error);
  }

  const user = await User.findOne({ email: email });
  //
  if (!user) {
    const error = appError.create("user not found ", 400, httpStatusText.FAIL);
    return next(error);
  }
  //
  const matchedPassword = await bcrypt.compare(password, user.password);
  console.log(user, matchedPassword);
  if (user && matchedPassword) {
    const token = await generateJWT({
      email: user.email,
      id: user._id,
      role: user.role,
    });

    return res.json({
      status: httpStatusText.SUCCESS,
      data: { token },
    });
  } else {
    const error = appError.create(
      "something wrong yy ",
      500,
      httpStatusText.ERROR,
    );
    return next(error);
  }
});

module.exports = {
  getAllUsers,
  register,
  login,
};
