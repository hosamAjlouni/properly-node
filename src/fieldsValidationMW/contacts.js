const { body } = require("express-validator");
const throwExpressValidationErrors = require("../middleware/throwValidationErrors");

const firstName = body("firstName")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isAlpha()
  .withMessage("should be a alphabetical")
  .isLength({ min: 1, max: 50 })
  .withMessage("should not exceed 50 characters");

const middleName = body("middleName")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isAlpha()
  .withMessage("should be a alphabetical")
  .isLength({ min: 1, max: 50 })
  .withMessage("should not exceed 50 characters");

const lastName = body("lastName")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isAlpha()
  .withMessage("should be a alphabetical")
  .isLength({ min: 1, max: 50 })
  .withMessage("should not exceed 50 characters");

const phone = body("phone")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isNumeric()
  .isLength({ min: 13, max: 14 })
  .withMessage("should be 13 - 14 digits")
  .isMobilePhone()
  .withMessage("should be a valid phone number");

const contactValidator = [
  firstName,
  middleName,
  lastName,
  phone,
  throwExpressValidationErrors,
];

module.exports = contactValidator;
