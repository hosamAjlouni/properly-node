const Lease = require("../models/leases");
const { BadRequestError } = require("../middleware/error-handler");
const leaseValidators = require("../formValidators/leases");
const {
  createLease,
  deleteLease,
  getWorkspaceLease,
  listWorkspaceLeases,
  updateLease,
} = require("../services/leases");

const create = async (req, res) => {
  await leaseValidators.createValidator(req.workspaceId, req.body);
  const instance = await createLease(req.workspaceId, req.body);
  res.status(200).send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspaceLeases(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  const instance = getWorkspaceLease(req.workspaceId, req.params.id)
  res.status(200).send(instance);
};

const update = async (req, res) => {
  await leaseValidators.updateValidator(
    req.workspaceId,
    req.params.id,
    req.body
  );
  const instance = await updateLease(req.workspaceId, req.params.id, req.body);

  res.status(200).send(instance);
};

const remove = async (req, res) => {
  await leaseValidators.deleteValidator(req.workspaceId, req.params.id)
  const instance = await deleteLease(req.params.id);
  res.status(200).send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
