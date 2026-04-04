// ******************** Import *****************//
// let { courses } = require("../data/courses");
const { validationResult } = require("express-validator");
const { Course } = require("../models/course-model");

// ******************** Import *****************//

// ************** functions controllers **************//
// # getAllCourses
const getAllCourses = async (req, res) => {
  // get all courses from DBusing Course model
  const courses = await Course.find();
  res.json(courses);
};
// # getSingleCourse
const getSingleCourse = async (req, res) => {
  // console.log(req.params.id);
  // const courseId = +req.params.id;
  // const cours = courses.find((course) => course.id === courseId);
  const sourseId = req.params.id;
  console.log(sourseId);
  try {
    const course = await Course.findById(sourseId);
    if (!cours) {
      return res.status(404).json({ msg: "course not found" });
    }
    res.json(cours);
  } catch {
    return res.status(400).json({ msg: "invalid id" });
  }
};
// # create new course
const createNewCourse = async (req, res) => {
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
  // courses.push({ id: courses.length + 1, ...req.body });
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.status(201).json(newCourse);
};
// # Update Course
const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  //   let course = courses.find((course) => courseId === course.id);
  //   if (!course) {
  //     res.status(404).json({ msg: "course not found" });
  //   }
  //   course = { ...course, ...req.body };
  //   res.status(200).json(course);
  //////////////////////////////////////////////
  try {
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      $set: { ...req.body },
    });
    res.status(200).json(updatedCourse);
  } catch (e) {
    res.status(400).json({ error: e, msg: "invalid" });
  }
};
// # Delete course
const deleteCourse = async (req, res) => {
  // const courseId = +req.params.id;
  // courses = courses.filter((course) => courseId !== course.id);
  const data = await Course.deleteOne({ _id: req.params.id });
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
