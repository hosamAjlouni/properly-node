const { BadRequestError } = require("../middleware/error-handler");
const Property = require("../models/properties");
const { Op } = require("sequelize");

const listWorkspaceProperties = async (workspaceId, filter = {}) => {
  const where = { [Op.and]: { workspaceId: workspaceId, ...filter } };
  const objects = await Property.findAll({ where: where });
  return objects;
};

const getWorkspaceProperty = async (workspaceId, propertyId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: propertyId } };
  const instance = await Property.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found");
  return instance;
};

const createProperty = async (workspaceId, body) => {
  body.workspaceId = workspaceId;
  const instance = await Property.create(body);
  return instance;
};

const updateProperty = async (workspaceId, propertyId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: propertyId } };
  const instance = await Property.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  await instance.update(body);
  return instance;
};

const deleteProperty = async (workspaceId, propertyId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: propertyId } };
  const instance = await Property.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  const deleted = await instance.destroy();
  return deleted;
};

module.exports = {
  createProperty,
  deleteProperty,
  getWorkspaceProperty,
  listWorkspaceProperties,
  updateProperty,
};
