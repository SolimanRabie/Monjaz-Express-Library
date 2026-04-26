const mongoose = require("mongoose");
const validator = require("validator");
const userRoles = require("../utils/userRoles");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "fild must be a valid email"],
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
  },
  role: {
    type: String,
    enum: [userRoles.ADMIN, userRoles.MANGER, userRoles.USER],
    default: userRoles.USER,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
