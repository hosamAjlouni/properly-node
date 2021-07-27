const { BadRequestError } = require("../middleware/error-handler");
const Unit = require("../models/units");
const { Op } = require("sequelize");

const createUnit = async (workspaceId, body) => {
  body.workspaceId = workspaceId;
  const instance = await Unit.create(body);
  return instance;
};

const listWorkspaceUnits = async (workspaceId, filter = {}) => {
  const where = { [Op.and]: { workspaceId: workspaceId, ...filter } };
  const objects = await Unit.findAll({ where: where });
  return objects;
};

const getWorkspaceUnit = async (workspaceId, unitId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: unitId } };
  const instance = await Unit.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found");
  return instance;
};

const updateUnit = async (workspaceId, unitId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: unitId } };
  const instance = await Unit.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  await instance.update(body);
  return instance;
};

const deleteUnit = async (workspaceId, unitId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: unitId } };
  const instance = await Unit.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  const deleted = await instance.destroy();
  return deleted;
};

module.exports = {
  createUnit,
  deleteUnit,
  getWorkspaceUnit,
  listWorkspaceUnits,
  updateUnit,
};
