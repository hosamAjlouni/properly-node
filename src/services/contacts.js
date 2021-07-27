const { BadRequestError } = require("../middleware/error-handler");
const Contact = require("../models/contacts");
const { Op } = require("sequelize");

const listWorkspaceContacts = async (workspaceId, filter = {}) => {
  const where = { [Op.and]: { workspaceId: workspaceId, ...filter } };
  const objects = await Contact.findAll({ where: where });
  return objects;
};

const getWorkspaceContact = async (workspaceId, contactId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: contactId } };
  const instance = await Contact.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found");
  return instance;
};

const createContact = async (workspaceId, body) => {
  body.workspaceId = workspaceId;
  const instance = await Contact.create(body);
  return instance;
};

const updateContact = async (workspaceId, contactId, body) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: contactId } };
  const instance = await Contact.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  await instance.update(body);
  return instance;
};

const deleteContact = async (workspaceId, contactId) => {
  const where = { [Op.and]: { workspaceId: workspaceId, id: contactId } };
  const instance = await Contact.findOne({ where: where });
  if (!instance) throw new BadRequestError("Resource not found.");
  const deleted = await instance.destroy();
  return deleted;
};

module.exports = {
  createContact,
  deleteContact,
  getWorkspaceContact,
  listWorkspaceContacts,
  updateContact,
};
