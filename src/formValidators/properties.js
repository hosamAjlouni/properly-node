const Property = require("../models/properties")
const { BadRequestError, FieldError } = require("../middleware/error-handler");
const {
  getWorkspaceProperty,
} = require("../services/properties");

const createValidator = async (workspaceId, body) => {
  const errors = [];
  const isNameUnique = await Property.isNameUnique(workspaceId, body.name)
  if (!isNameUnique)
    errors.push(new FieldError("name", "Property name should be unique."));

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, propertyId, body) => {
  const errors = [];
  const oldInstance = await getWorkspaceProperty(workspaceId, propertyId);
  if (!oldInstance) throw new BadRequestError("Resource not found.");
  
  if (oldInstance.name !== body.name) {
    let isNameUnique = await Property.isNameUnique(workspaceId, body.name)
    if (!isNameUnique)
      errors.push(new FieldError("name", "Property name should be unique."));
  }
  

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, propertyId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
