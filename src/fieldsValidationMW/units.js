const { body } = require("express-validator");
const throwExpressValidationErrors = require("../middleware/throwValidationErrors");

const num = body("num")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number")
  .isInt({ min: 0 })
  .withMessage("Should be a positive integer");

const beds = body("beds")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number")
  .isInt({ min: 0 })
  .withMessage("Should be a positive integer");

const baths = body("baths")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number")
  .isInt({ min: 0 })
  .withMessage("Should be a positive integer");

const size = body("size")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number")
  .isInt({ min: 0 })
  .withMessage("Should be a positive integer");

const marketRent = body("marketRent")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number")
  .isFloat({ min: 0 })
  .withMessage("Should be positive");

const propertyId = body("propertyId")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .withMessage("should be a number")
  .isInt({ min: 0 })
  .withMessage("Should be a positive integer");

const unitValidator = [
  num,
  beds,
  baths,
  size,
  marketRent,
  propertyId,
  throwExpressValidationErrors,
];

module.exports = unitValidator;
