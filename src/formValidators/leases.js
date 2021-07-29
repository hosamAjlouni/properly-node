const { Op } = require("sequelize");
const { BadRequestError, FieldError } = require("../middleware/error-handler");
const Unit = require("../models/units");
const {
  listWorkspaceLeases,
  getWorkspaceLease,
} = require("../services/leases");

const createValidator = async (workspaceId, body) => {
  const errors = [];
  // check unit availability
  const unit = await Unit.findByPk(body.unitId);
  const isUnitAvailable = await unit.isAvailableBetween(body.start, body.end);
  
  if (!isUnitAvailable)
    errors.push(
      new FieldError("start", "A conflicting lease on the same unit exists.")
    );

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, leaseId, body) => {
  const errors = [];
  const oldInstance = await getWorkspaceLease(workspaceId, leaseId);

  if (!oldInstance) throw new BadRequestError("Resource not found.");
  if (
    oldInstance.firstName !== body.firstName ||
    oldInstance.middleName !== body.middleName ||
    oldInstance.lastName !== body.lastName
  ) {
    // check full name uniqueness
    let objects = await listWorkspaceLeases(workspaceId, {
      [Op.and]: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
      },
    });
    if (objects.length)
      errors.push({
        param: "name",
        msg: "Lease full name should be unique.",
      });
  }

  if (oldInstance.phone !== body.phone) {
    // check phone uniqueness
    let objects = await listWorkspaceLeases(workspaceId, {
      phone: body.phone,
    });
    if (objects.length)
      errors.push({
        param: "name",
        msg: "Lease phone number should be unique.",
      });
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, leaseId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
