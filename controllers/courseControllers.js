// ******************** Import *****************//
// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const { Course } = require("../models/course-model");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middelwares/asyncWrapper");
const appError = require("../utils/appError");
// ******************** Import *****************//

// ************** functions controllers **************//
// # getAllCourses
const getAllCourses = asyncWrapper(async (req, res, next) => {
  // get all courses from DBusing Course model
  const query = req.query;
  console.log("query ", query);
  const limit = query.limit || 2;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const courses = await Course.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { courses: courses } }); // use jsend object
});
// # getSingleCourse
const getSingleCourse = asyncWrapper(async (req, res, next) => {
  const sourseId = req.params.id;
  console.log(sourseId);
  // try {
  const course = await Course.findById(sourseId);
  if (!course) {
    const error = appError.create("course not found", 404, httpStatusText.FAIL);
    return next(error);
  }
  res.json({ status: httpStatusText.SUCCESS, data: { course } });
});
// # create new course
const createNewCourse = asyncWrapper(async (req, res, next) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = appError.create(errors.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  console.log("errors : ", errors);

  const newCourse = new Course(req.body);
  await newCourse.save();
  res
    .status(201)
    .json({ status: httpStatusText.SUCCESS, data: { course: newCourse } });
});
// # Update Course
const updateCourse = asyncWrapper(async (req, res, next) => {
  const courseId = req.params.id;
  const updatedCourse = await Course.findByIdAndUpdate(courseId, {
    $set: { ...req.body },
  });
  res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: { course: updatedCourse },
  });
});
// # Delete course
const deleteCourse = asyncWrapper(async (req, res, next) => {
  const data = await Course.deleteOne({ _id: req.params.id });
  res.status(200).json({ status: httpStatusText.SUCCESS, data: null });
});
// ************** functions controllers **************//

// ************** Exports *********** //
module.exports = {
  getAllCourses,
  createNewCourse,
  getSingleCourse,
  updateCourse,
  deleteCourse,
};
// ************** Exports *********** //
