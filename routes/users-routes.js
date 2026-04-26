const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersControllers");
const verfiyToken = require("../middelwares/verifyToken");
const multer = require("multer");
const appError = require("../utils/appError");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("file", file);
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});
const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(appError.create("file must be an image ", 400), false);
  }
};
const upload = multer({ storage: diskStorage, fileFilter });
// get all users
router.route("/").get(verfiyToken, usersController.getAllUsers);

// register
router
  .route("/register")
  .post(upload.single("avatar"), usersController.register);

// login
router.route("/login").post(usersController.login);

module.exports = router;
