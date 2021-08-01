const { Op } = require("sequelize");
const { BadRequestError, FieldError } = require("../middleware/error-handler");
const Payment = require("../models/payments");
const {
  listWorkspacePayments,
  getWorkspacePayment,
} = require("../services/payments");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  // const isFullNameUnique = await Payment.isFullNameUnique(
  //   workspaceId,
  //   body.firstName,
  //   body.middleName,
  //   body.lastName
  // );
  // if (!isFullNameUnique)
  //   errors.push(new FieldError("name", "Payment full name should be unique."));

  // const isPhoneUnique = await Payment.isPhoneUnique(workspaceId, body.phone);

  // if (!isPhoneUnique)
  //   errors.push(new FieldError("name", "A payment with this phone exists."));

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, paymentId, body) => {
  const errors = [];
  // const oldInstance = await getWorkspacePayment(workspaceId, paymentId);

  // if (!oldInstance) throw new BadRequestError("Resource not found.");
  // if (
  //   oldInstance.firstName !== body.firstName ||
  //   oldInstance.middleName !== body.middleName ||
  //   oldInstance.lastName !== body.lastName
  // ) {
  //   const isFullNameUnique = await Payment.isFullNameUnique(
  //     workspaceId,
  //     body.firstName,
  //     body.middleName,
  //     body.lastName
  //   );
  //   if (!isFullNameUnique)
  //     errors.push(
  //       new FieldError("name", "Payment full name should be unique.")
  //     );
  // }

  // if (oldInstance.phone !== body.phone) {
  //   const isPhoneUnique = await Payment.isPhoneUnique(workspaceId, body.phone);
  //   if (!isPhoneUnique)
  //     errors.push(new FieldError("name", "A payment with this phone exists."));
  // }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, paymentId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
