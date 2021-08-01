const { body } = require("express-validator");
const throwExpressValidationErrors = require("../middleware/throwValidationErrors");

const amount = body("amount")
  .exists()
  .withMessage("should be included")
  .notEmpty()
  .withMessage("cannot be empty")
  .isFloat({ min: 0 })
  .withMessage("should be a a positive float.");

const date = body("date")
  .exists()
  .withMessage("should be included")
  .isDate()
  .withMessage("Should be a date (yyyy-mm-dd)");

const paymentValidator = [
  amount,
  date,
  throwExpressValidationErrors,
];

module.exports = paymentValidator;
