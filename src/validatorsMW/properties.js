const { body } = require("express-validator");
const throwExpressValidationErrors = require('../middleware/throwValidationErrors')

const name = body("name")
    .exists()
    .withMessage("should be included")
    .notEmpty()
    .withMessage("cannot be empty")
    .isString()
    .withMessage("should be a string");

const yearBuilt = body("yearBuilt")
    .exists()
    .withMessage("should exist")
    .notEmpty()
    .withMessage("cannot be empty")
    .isDate()
    .withMessage("should be a valid date");

const createPropertyValidator = [
  name,
  yearBuilt,
  throwExpressValidationErrors,
];

module.exports = {
  createPropertyValidator,
};
