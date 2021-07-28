const contactValidators = require("../formValidators/contacts");
const {
  createContact,
  deleteContact,
  getWorkspaceContact,
  listWorkspaceContacts,
  updateContact,
} = require("../services/contacts");

const create = async (req, res) => {
  await contactValidators.createValidator(req.workspaceId, req.body);
  const instance = await createContact(req.workspaceId, req.body);
  res.status(200).send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspaceContacts(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  const instance = await getWorkspaceContact(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

const update = async (req, res) => {
  await contactValidators.updateValidator(
    req.workspaceId,
    req.params.id,
    req.body
  );

  const instance = await updateContact(req.workspaceId, req.params.id, req.body);
  res.send(instance);
};

const remove = async (req, res) => {
  await contactValidators.deleteValidator(req.workspaceId, req.params.id);
  const instance = await deleteContact(req.workspaceId, req.params.id);
  res.send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
