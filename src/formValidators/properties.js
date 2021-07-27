const { BadRequestError } = require("../middleware/error-handler");
const {
  listWorkspaceProperties,
  getWorkspaceProperty,
} = require("../services/properties");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  let objects = await listWorkspaceProperties(workspaceId, {
    name: body.name,
  });

  if (objects.length)
    errors.push({ param: "name", msg: "Property name should be unique." });

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, propertyId, body) => {
  const errors = [];
  const oldInstance = await getWorkspaceProperty(workspaceId, propertyId);
  
  if (!oldInstance) throw new BadRequestError("Resource not found.");
  if (oldInstance.name !== body.name) {
    let objects = await listWorkspaceProperties(workspaceId, {
      name: body.name,
    });
    if (objects.length)
      errors.push({ param: "name", msg: "Property name should be unique." });
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, propertyId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
