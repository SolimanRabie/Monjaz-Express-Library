const express = require("express");
const router = express.Router();
const { validationScema } = require("../middelwares/validationScema");
router.use(express.json());
const { body } = require("express-validator");
const coursesControllers = require("../controllers/courseControllers");
router
  .route("/")
  .get(coursesControllers.getAllCourses)
  .post(validationScema(), coursesControllers.createNewCourse);

router
  .route("/:id")
  .get(coursesControllers.getSingleCourse)
  .patch(coursesControllers.updateCourse)
  .delete(coursesControllers.deleteCourse);

module.exports = router;
