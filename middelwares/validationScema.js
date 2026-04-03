const { body } = require("express-validator");
const validationScema = () => {
  return [
    body("title").notEmpty().withMessage("title is required"),
    body("price").notEmpty().withMessage("price is required"),
  ];
};
module.exports = { validationScema };
