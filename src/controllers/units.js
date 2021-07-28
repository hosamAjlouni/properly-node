const unitValidators = require("../formValidators/units");
const {
  createUnit,
  deleteUnit,
  getWorkspaceUnit,
  listWorkspaceUnits,
  updateUnit,
} = require("../services/units");

const create = async (req, res) => {
  await unitValidators.createValidator(req.workspaceId, req.body);
  const instance = await createUnit(req.workspaceId, req.body);
  res.status(200).send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspaceUnits(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  console.log('controller')
  const instance = await getWorkspaceUnit(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

const update = async (req, res) => {
  await unitValidators.updateValidator(
    req.workspaceId,
    req.params.id,
    req.body
  );

  const instance = await updateUnit(req.workspaceId, req.params.id, req.body);
  res.send(instance);
};

const remove = async (req, res) => {
  await unitValidators.deleteValidator(req.workspaceId, req.params.id);
  const instance = await deleteUnit(req.workspaceId, req.params.id);
  res.send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
