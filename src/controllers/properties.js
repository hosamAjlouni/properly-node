const Property = require("../models/properties");
const { BadRequestError } = require("../middleware/error-handler");
const {
  createProperty,
  deleteProperty,
  getWorkspaceProperty,
  listWorkspaceProperties,
  updateProperty,
} = require("../services/properties");

const create = async (req, res) => {
  const errors = [];

  // Entry validation
  let objects = await listWorkspaceProperties(req.workspaceId, {
    name: req.body.name,
  });
  if (objects.length)
    errors.push({ param: "name", msg: "Property name should be unique." });
  if (errors.length) throw new BadRequestError(errors);

  const instance = await createProperty(req.workspaceId, body);
  res.send(instance);
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
  const errors = [];
  // Entry validation
  const oldInstance = await getWorkspaceProperty(
    req.workspaceId,
    req.params.id
  );
  if (oldInstance.name !== req.body.name) {
    let objects = await listWorkspaceProperties(req.workspaceId, {
      name: req.body.name,
    });
    if (objects.length)
      errors.push({ param: "name", msg: "Property name should be unique." });
  }

  if (errors.length) throw new BadRequestError(errors);

  const instance = await updateProperty(
    req.workspaceId,
    req.params.id,
    req.body
  );

  res.send(instance);
};

const remove = async (req, res) => {
  const instance = await deleteProperty(req.workspaceId, req.params.id);
  res.send(instance);
};

module.exports = {
  create,
  list,
  detail,
  update,
  remove,
};
