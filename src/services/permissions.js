const Permission = require("../models/permissions");

const listPermissions = async (workspaceId, filter = {}) => {
  const objects = await Permission.findAll();
  return objects;
};

module.exports = {
  listPermissions,
};
