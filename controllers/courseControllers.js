// ******************** Import *****************//
let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
// ******************** Import *****************//

// ************** functions controllers **************//
// # getAllCourses
const getAllCourses = (req, res) => {
  res.json(courses);
};
// # getSingleCourse
const getSingleCourse = (req, res) => {
  console.log(req.params.id);
  const courseId = +req.params.id;
  const cours = courses.find((course) => course.id === courseId);
  if (!cours) {
    return res.status(404).json({ msg: "course not found" });
  }
  res.json(cours);
};
// # create new course
const createNewCourse = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  console.log("errors : ", errors);
  if (!req.body.title) {
    return res.status(400).json({ error: "error enter titel" });
  }
  if (!req.body.price) {
    return res.status(400).json({ error: "error enter price" });
  }
  courses.push({ id: courses.length + 1, ...req.body });
  res.status(201).json(courses);
};
// # Update Course
const updateCourse = (req, res) => {
  const courseId = +req.params.id;
  let course = courses.find((course) => courseId === course.id);
  if (!course) {
    res.status(404).json({ msg: "course not found" });
  }
  course = { ...course, ...req.body };
  res.status(200).json(course);
};
// # Delete course
const deleteCourse = (req, res) => {
  const courseId = +req.params.id;
  courses = courses.filter((course) => courseId !== course.id);

  res.status(200).json({ success: "true" });
};
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
