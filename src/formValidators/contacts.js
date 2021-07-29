const { Op } = require("sequelize");
const { BadRequestError, FieldError } = require("../middleware/error-handler");
const Contact = require("../models/contacts");
const {
  listWorkspaceContacts,
  getWorkspaceContact,
} = require("../services/contacts");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  const isFullNameUnique = await Contact.isFullNameUnique(
    workspaceId,
    body.firstName,
    body.middleName,
    body.lastName
  );
  if (!isFullNameUnique)
    errors.push(new FieldError("name", "Contact full name should be unique."));

  const isPhoneUnique = await Contact.isPhoneUnique(workspaceId, body.phone);

  if (!isPhoneUnique)
    errors.push(new FieldError("name", "A contact with this phone exists."));

  if (errors.length) throw new BadRequestError(errors);
};

const updateValidator = async (workspaceId, contactId, body) => {
  const errors = [];
  const oldInstance = await getWorkspaceContact(workspaceId, contactId);

  if (!oldInstance) throw new BadRequestError("Resource not found.");
  if (
    oldInstance.firstName !== body.firstName ||
    oldInstance.middleName !== body.middleName ||
    oldInstance.lastName !== body.lastName
  ) {
    const isFullNameUnique = await Contact.isFullNameUnique(
      workspaceId,
      body.firstName,
      body.middleName,
      body.lastName
    );
    if (!isFullNameUnique)
      errors.push(
        new FieldError("name", "Contact full name should be unique.")
      );
  }

  if (oldInstance.phone !== body.phone) {
    const isPhoneUnique = await Contact.isPhoneUnique(workspaceId, body.phone);
    if (!isPhoneUnique)
      errors.push(new FieldError("name", "A contact with this phone exists."));
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, contactId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
