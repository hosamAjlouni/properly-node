const { BadRequestError } = require("../middleware/error-handler");
const {
  listWorkspaceUnits,
  getWorkspaceUnit,
} = require("../services/units");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  let objects = await listWorkspaceUnits(workspaceId, {
    propertyId: body.propertyId,
    num: body.num
  });
  if (objects.length)
    errors.push({ param: "num", msg: "Unit number should be unique for each property." });

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, unitId, body) => {
  const errors = [];

  const oldInstance = await getWorkspaceUnit(workspaceId, unitId);
  if (!oldInstance) throw new BadRequestError("Resource not found.");
  if (oldInstance.num !== body.num) {
    let objects = await listWorkspaceProperties(workspaceId, {
      propertyId: body.propertyId,
      num: body.num,
    });
    if (objects.length)
      errors.push({ param: "num", msg: "Unit number should be unique for each property." });
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, UnitId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
