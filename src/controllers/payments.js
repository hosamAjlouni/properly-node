const paymentValidators = require("../formValidators/payments");
const {
  createPayment,
  deletePayment,
  getWorkspacePayment,
  listWorkspacePayments,
  updatePayment,
} = require("../services/payments");

const create = async (req, res) => {
  await paymentValidators.createValidator(req.workspaceId, req.body);
  const instance = await createPayment(req.workspaceId, req.body);
  res.status(200).send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspacePayments(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  const instance = await getWorkspacePayment(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

const update = async (req, res) => {
  await paymentValidators.updateValidator(
    req.workspaceId,
    req.params.id,
    req.body
  );

  const instance = await updatePayment(req.workspaceId, req.params.id, req.body);
  res.send(instance);
};

const remove = async (req, res) => {
  await paymentValidators.deleteValidator(req.workspaceId, req.params.id);
  const instance = await deletePayment(req.workspaceId, req.params.id);
  res.send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
