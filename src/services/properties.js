const Property = require("../models/properties");

const getProperties = async (workspaceId, filter = {}) => {
  const objects = await Property.findAll({
    where: { workspaceId: workspaceId, ...filter },
  });
  return objects;
};

const createProperty = async (body) => {
  await Property.create(req.body);
};

module.exports = {
  getProperties,
  createProperty,
};
