const propertyValidators = require("../formValidators/properties");
const {
  createProperty,
  deleteProperty,
  getWorkspaceProperty,
  listWorkspaceProperties,
  updateProperty,
} = require("../services/properties");

const create = async (req, res) => {
  await propertyValidators.createValidator(req.workspaceId, req.body);
  const instance = await createProperty(req.workspaceId, req.body);
  res.status(200).send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspaceProperties(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  const instance = await getWorkspaceProperty(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

const update = async (req, res) => {
  await propertyValidators.updateValidator(
    req.workspaceId,
    req.params.id,
    req.body
  );

  const instance = await updateProperty(
    req.workspaceId,
    req.params.id,
    req.body
  );

  res.status(200).send(instance);
};

const remove = async (req, res) => {
  await propertyValidators.deleteValidator(req.workspaceId, req.params.id);
  const instance = await deleteProperty(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
