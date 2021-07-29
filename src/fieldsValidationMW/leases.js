const { body } = require("express-validator");
const throwExpressValidationErrors = require("../middleware/throwValidationErrors");

const start = body("start")
  .exists()
  .withMessage("should be included")
  .isDate()
  .withMessage("Should be a date (yyyy-mm-dd)");

const end = body("end")
  .exists()
  .withMessage("should be included")
  .isDate()
  .withMessage("Should be a date (yyyy-mm-dd)");

const unitId = body("unitId")
  .exists()
  .withMessage("should be included")
  .isInt()
  .withMessage("Should be an integer");

const leaseValidator = [start, end, unitId, throwExpressValidationErrors];

module.exports = leaseValidator;
