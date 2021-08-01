const { BadRequestError } = require("../middleware/error-handler");
const Invoice = require("../models/invoices");
const { Op } = require("sequelize");

const listWorkspaceInvoices = async (workspaceId, filter = {}) => {
  const where = { [Op.and]: { workspaceId: workspaceId, ...filter } };
  const objects = await Invoice.findAll({ where: where });
  return objects;
};

const getWorkspaceInvoice = async (workspaceId, invoiceId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: invoiceId } };
  const instance = await Invoice.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found");
  return instance;
};

const createInvoice = async (workspaceId, body) => {
  body.workspaceId = workspaceId;
  const instance = await Invoice.create(body);
  return instance;
};

const updateInvoice = async (workspaceId, invoiceId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: invoiceId } };
  const instance = await Invoice.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  await instance.update(body);
  return instance;
};

const deleteInvoice = async (workspaceId, invoiceId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: invoiceId } };
  const instance = await Invoice.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  const deleted = await instance.destroy();
  return deleted;
};

module.exports = {
  createInvoice,
  deleteInvoice,
  getWorkspaceInvoice,
  listWorkspaceInvoices,
  updateInvoice,
};
