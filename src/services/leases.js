const { BadRequestError } = require("../middleware/error-handler");
const Lease = require("../models/leases");
const { Op } = require("sequelize");

const listWorkspaceLeases = async (workspaceId, filter = {}) => {
  const where = { [Op.and]: { workspaceId: workspaceId, ...filter } };
  const objects = await Lease.findAll({ where: where });
  return objects;
};

const getWorkspaceLease = async (workspaceId, leaseId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: leaseId } };
  const instance = await Lease.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found");
  return instance;
};

const createLease = async (workspaceId, body) => {
  body.workspaceId = workspaceId;
  const instance = await Lease.create(body);
  return instance;
};

const updateLease = async (workspaceId, leaseId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: leaseId } };
  const instance = await Lease.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  await instance.update(body);
  return instance;
};

const deleteLease = async (workspaceId, leaseId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: leaseId } };
  const instance = await Lease.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  const deleted = await instance.destroy();
  return deleted;
};

module.exports = {
  createLease,
  deleteLease,
  getWorkspaceLease,
  listWorkspaceLeases,
  updateLease,
};
