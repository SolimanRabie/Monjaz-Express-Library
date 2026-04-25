const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const verfiyToken = require("../middelwares/verifyToken");
// get all users

// register

// login

router.route("/").get(verfiyToken, usersController.getAllUsers);

router.route("/register").post(usersController.register);
router.route("/login").post(usersController.login);

module.exports = router;
