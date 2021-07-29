const { body } = require("express-validator");
const throwExpressValidationErrors = require("../middleware/throwValidationErrors");

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
  .isDate()
  .withMessage("Should be a date (yyyy-mm-dd)");

const description = body("description")
  .isString()
  .withMessage("should be a string");

const propertyValidator = [
  name,
  yearBuilt,
  description,
  throwExpressValidationErrors,
];

module.exports = propertyValidator;
