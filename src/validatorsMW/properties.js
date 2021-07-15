const { Op } = require('sequelize')
const Property = require("../models/properties");
const _ = require('lodash');
const { body, validationResult } = require("express-validator");
const { BadRequestError } = require("../middleware/error-handler");

const preValidate = (req, res, next) => {
  req.body.workspaceId = req.workspaceId;
  next()
};

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

const formValidation = async (req, res, next) => {
  const fieldErrors = validationResult(req);
  if (!fieldErrors.isEmpty()) throw new BadRequestError(fieldErrors.array().map(error => _.pick(error, ["msg", "param"])));
  const errors = [];
  
  let instance = await Property.findOne({where: {
    [Op.and]: {
      workspaceId: req.workspaceId,
      name: req.body.name
    }
  }})

  if (instance) errors.push({param: "name", msg: "property name should be unique."})
  
  
  if (!!errors.length) throw new BadRequestError(errors)
  
  next();
};

module.exports = [preValidate, name, yearBuilt, formValidation];
