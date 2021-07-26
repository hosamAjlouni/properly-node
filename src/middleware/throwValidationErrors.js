const _ = require('lodash')
const { BadRequestError } = require('./error-handler')
const { validationResult } = require("express-validator");

throwExpressValidationErrors = async (req, res, next) => {
  const fieldErrors = validationResult(req);
  if (!fieldErrors.isEmpty())
    throw new BadRequestError(
      fieldErrors.array().map((error) => _.pick(error, ["msg", "param"]))
    );

  next();
};

module.exports = throwExpressValidationErrors;
