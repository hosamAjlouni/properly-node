const { body } = require("express-validator");
const throwExpressValidationErrors = require("../middleware/throwValidationErrors");

const num = body("num")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number");

const beds = body("beds")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number");

const baths = body("baths")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number");

const marketRent = body("marketRent")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isFloat()
  .withMessage("should be a number");

const propertyId = body("propertyId")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number");

const yearBuilt = body("yearBuilt")
  .exists()
  .withMessage("should exist")
  .notEmpty()
  .withMessage("cannot be empty")
  .isDate()
  .withMessage("should be a valid date");

const unitValidator = [
  num,
  beds,
  baths,
  marketRent,
  propertyId,
  throwExpressValidationErrors,
];

module.exports = {
  unitValidator,
};
