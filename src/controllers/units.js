const Unit = require("../models/units");
const { BadRequestError } = require("../middleware/error-handler");
const {
  createUnit,
  deleteUnit,
  getWorkspaceUnit,
  listWorkspaceUnits,
  updateUnit,
} = require("../services/units");

const create = async (req, res) => {
  // const errors = [];

  // Entry validation
  // let objects = await listWorkspaceUnits(req.workspaceId, {
  //   name: req.body.name,
  // });
  // if (objects.length)
  //   errors.push({ param: "name", msg: "Unit name should be unique." });
  // if (errors.length) throw new BadRequestError(errors);
  // res.send(req.body)
  
  const instance = await createUnit(req.workspaceId, req.body);
  res.send(instance);
};

const list = async (req, res) => {
  const objects = await listWorkspaceUnits(req.workspaceId, req.filter);
  res.status(200).send(objects);
};

const detail = async (req, res) => {
  const instance = await getWorkspaceUnit(req.workspaceId, req.params.id);
  res.status(200).send(instance);
};

const update = async (req, res) => {
  const errors = [];
  // Entry validation
  // const oldInstance = await getWorkspaceUnit(
  //   req.workspaceId,
  //   req.params.id
  // );
  // if (oldInstance.name !== req.body.name) {
  //   let objects = await listWorkspaceUnits(req.workspaceId, {
  //     name: req.body.name,
  //   });
  //   if (objects.length)
  //     errors.push({ param: "name", msg: "Unit name should be unique." });
  // }

  // if (errors.length) throw new BadRequestError(errors);

  const instance = await updateUnit(
    req.workspaceId,
    req.params.id,
    req.body
  );

  res.send(instance);
};

const remove = async (req, res) => {
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
