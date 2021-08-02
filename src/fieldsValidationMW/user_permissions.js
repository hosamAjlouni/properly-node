const { body } = require("express-validator");
const throwExpressValidationError = require("../middleware/throwValidationErrors");

const permissions = body("permissions").exists().isArray();

const userPermissionsValidators = [
  permissions,
  throwExpressValidationError,
];

module.exports = userPermissionsValidators;
