const express = require("express");
const router = express.Router();
const { validationScema } = require("../middelwares/validationScema");
const verfiyToken = require("../middelwares/verifyToken");
router.use(express.json());
const { body } = require("express-validator");
const coursesControllers = require("../controllers/courseControllers");
const userRoles = require("../utils/userRoles");
const allowedTo = require("../middelwares/allowedTo");
//////////////////////
router.route("/").get(coursesControllers.getAllCourses).post(
  verfiyToken,
  allowedTo(userRoles.MANGER), // manger only who can add new course
  validationScema(),
  coursesControllers.createNewCourse,
);

router
  .route("/:id")
  .get(coursesControllers.getSingleCourse)
  .patch(coursesControllers.updateCourse)
  .delete(
    verfiyToken,
    allowedTo(userRoles.ADMIN, userRoles.MANGER), // manger and admin only can delete a course
    coursesControllers.deleteCourse,
  );

module.exports = router;
