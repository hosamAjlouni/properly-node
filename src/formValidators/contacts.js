const { Op } = require("sequelize");
const { BadRequestError } = require("../middleware/error-handler");
const {
  listWorkspaceContacts,
  getWorkspaceContact,
} = require("../services/contacts");

const createValidator = async (workspaceId, body) => {
  const errors = [];

  // check full name uniqueness
  let objects = await listWorkspaceContacts(workspaceId, {
    [Op.and]: {
      firstName: body.firstName,
      middleName: body.middleName,
      lastName: body.lastName,
    },
  });
  if (objects.length)
    errors.push({ param: "name", msg: "Contact full name should be unique." });

  // check phone uniqueness
  objects = await listWorkspaceContacts(workspaceId, {
    phone: body.phone,
  });
  if (objects.length)
    errors.push({ param: "name", msg: "Contact phone number should be unique." });

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
    // check full name uniqueness
    let objects = await listWorkspaceContacts(workspaceId, {
      [Op.and]: {
        firstName: body.firstName,
        middleName: body.middleName,
        lastName: body.lastName,
      },
    });
    if (objects.length)
      errors.push({
        param: "name",
        msg: "Contact full name should be unique.",
      });
  }

  if (oldInstance.phone !== body.phone) {
    // check phone uniqueness
    let objects = await listWorkspaceContacts(workspaceId, {
      phone: body.phone,
    });
    if (objects.length)
      errors.push({
        param: "name",
        msg: "Contact phone number should be unique.",
      });
  }

  if (errors.length) throw new BadRequestError(errors);
};

const deleteValidator = async (workspaceId, contactId) => {};

module.exports = {
  createValidator,
  updateValidator,
  deleteValidator,
};
