
const { BadRequestError } = require("../middleware/error-handler");

const updateValidator = async (workspaceId, contactId, body) => {
  const errors = [];

  if (errors.length) throw new BadRequestError(errors);
};

module.exports = {
  updateValidator,
};
