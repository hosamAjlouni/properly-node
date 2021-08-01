const { BadRequestError } = require("../middleware/error-handler");
const Payment = require("../models/payments");
const { Op } = require("sequelize");

const listWorkspacePayments = async (workspaceId, filter = {}) => {
  const where = { [Op.and]: { workspaceId: workspaceId, ...filter } };
  const objects = await Payment.findAll({ where: where });
  return objects;
};

const getWorkspacePayment = async (workspaceId, paymentId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: paymentId } };
  const instance = await Payment.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found");
  return instance;
};

const createPayment = async (workspaceId, body) => {
  body.workspaceId = workspaceId;
  const instance = await Payment.create(body);
  return instance;
};

const updatePayment = async (workspaceId, paymentId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: paymentId } };
  const instance = await Payment.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  await instance.update(body);
  return instance;
};

const deletePayment = async (workspaceId, paymentId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: paymentId } };
  const instance = await Payment.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  const deleted = await instance.destroy();
  return deleted;
};

module.exports = {
  createPayment,
  deletePayment,
  getWorkspacePayment,
  listWorkspacePayments,
  updatePayment,
};
