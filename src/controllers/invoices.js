const invoiceValidators = require("../formValidators/invoices");
const {
  createInvoice,
  deleteInvoice,
  getWorkspaceInvoice,
  listWorkspaceInvoices,
  updateInvoice,
} = require("../services/invoices");

const create = async (req, res) => {
  await invoiceValidators.createValidator(req.workspaceId, req.body);
  const instance = await createInvoice(req.workspaceId, req.body);
  res.status(200).send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspaceInvoices(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  const instance = await getWorkspaceInvoice(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

const update = async (req, res) => {
  await invoiceValidators.updateValidator(
    req.workspaceId,
    req.params.id,
    req.body
  );

  const instance = await updateInvoice(req.workspaceId, req.params.id, req.body);
  res.send(instance);
};

const remove = async (req, res) => {
  await invoiceValidators.deleteValidator(req.workspaceId, req.params.id);
  const instance = await deleteInvoice(req.workspaceId, req.params.id);
  res.send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
