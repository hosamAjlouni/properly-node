const { BadRequestError } = require("../middleware/error-handler");
const { Op } = require('sequelize')
const User = require("../models/users");

const listWorkspaceUserPermissions = async (workspaceId, userId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: userId } };
  const user = await User.findOne({ where: where });
  if (!user) throw new BadRequestError("User not found.");

  const userPermissions = await user.getPermissions({joinTableAttributes: []});
  return userPermissions;
};

const setWorkspaceUserPermissions = async (workspaceId, userId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: userId } };
  const user = await User.findOne({ where: where });

  if (!user) throw new BadRequestError("User not found.");
  await user.setPermissions(body.permissions);
  return await user.getPermissions();
};

module.exports = {
  listWorkspaceUserPermissions,
  setWorkspaceUserPermissions,
};
