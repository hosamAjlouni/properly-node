const { Op } = require("sequelize");
const { BadRequestError, FieldError } = require("../middleware/error-handler");
const Unit = require("../models/units");
const {
  listWorkspaceLeases,
  getWorkspaceLease,
} = require("../services/leases");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  // check (start before end) dates
  if (new Date(body.start) > new Date(body.end))
    throw new BadRequestError(
      new FieldError("start", "Start date should not exceed end date.")
    );

  // check unit availability
  const unit = await Unit.findByPk(body.unitId);
  const isUnitAvailable = await unit.isAvailableBetween(body.start, body.end);

  if (!isUnitAvailable)
    errors.push(
      new FieldError("start", "Unit is not available for this period.")
    );

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, leaseId, body) => {
  const errors = [];
  const oldInstance = await getWorkspaceLease(workspaceId, leaseId);
  if (!oldInstance) throw new BadRequestError("Resource not found.");

  // check (start before end) dates
  if (new Date(body.start) > new Date(body.end))
    throw new BadRequestError(
      new FieldError("start", "Start date should not exceed end date.")
    );

  if (oldInstance.start !== body.start || oldInstance.end !== body.end) {
    // check unit availability
    const unit = await Unit.findByPk(body.unitId);
    const isUnitAvailable = await unit.isAvailableBetween(
      body.start,
      body.end,
      leaseId
    );

    if (!isUnitAvailable)
      errors.push(
        new FieldError("start", "Unit is not available for this period.")
      );
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, leaseId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
