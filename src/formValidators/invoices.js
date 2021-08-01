const { Op } = require("sequelize");
const { BadRequestError, FieldError } = require("../middleware/error-handler");
const Invoice = require("../models/invoices");
const {
  getWorkspaceInvoice,
} = require("../services/invoices");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  // const isFullNameUnique = await Invoice.isFullNameUnique(
  //   workspaceId,
  //   body.firstName,
  //   body.middleName,
  //   body.lastName
  // );
  // if (!isFullNameUnique)
  //   errors.push(new FieldError("name", "Invoice full name should be unique."));

  // const isPhoneUnique = await Invoice.isPhoneUnique(workspaceId, body.phone);

  // if (!isPhoneUnique)
  //   errors.push(new FieldError("name", "A invoice with this phone exists."));

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, invoiceId, body) => {
  const errors = [];
  // const oldInstance = await getWorkspaceInvoice(workspaceId, invoiceId);

  // if (!oldInstance) throw new BadRequestError("Resource not found.");
  // if (
  //   oldInstance.firstName !== body.firstName ||
  //   oldInstance.middleName !== body.middleName ||
  //   oldInstance.lastName !== body.lastName
  // ) {
  //   const isFullNameUnique = await Invoice.isFullNameUnique(
  //     workspaceId,
  //     body.firstName,
  //     body.middleName,
  //     body.lastName
  //   );
  //   if (!isFullNameUnique)
  //     errors.push(
  //       new FieldError("name", "Invoice full name should be unique.")
  //     );
  // }

  // if (oldInstance.phone !== body.phone) {
  //   const isPhoneUnique = await Invoice.isPhoneUnique(workspaceId, body.phone);
  //   if (!isPhoneUnique)
  //     errors.push(new FieldError("name", "A invoice with this phone exists."));
  // }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, invoiceId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
