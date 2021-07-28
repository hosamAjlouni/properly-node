const { BadRequestError, FieldError } = require("../middleware/error-handler");
const Unit = require("../models/units");
const { listWorkspaceUnits, getWorkspaceUnit } = require("../services/units");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  const isNumUnique = await Unit.isNumUnique(body.propertyId, body.num);
  if (!isNumUnique)
    errors.push(
      new FieldError("num", "Unit number should be unique for each property.")
    );

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, unitId, body) => {
  const errors = [];

  const oldInstance = await getWorkspaceUnit(workspaceId, unitId);
  if (!oldInstance) throw new BadRequestError("Resource not found.");
  if (oldInstance.num !== body.num) {
    const isNumUnique = await Unit.isNumUnique(body.propertyId, body.num);
    if (!isNumUnique)
      errors.push(
        new FieldError("num", "Unit number should be unique for each property.")
      );
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, UnitId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
