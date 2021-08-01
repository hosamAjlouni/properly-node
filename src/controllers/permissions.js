const {
  listPermissions,
  
} = require("../services/permissions");

const list = async (req, res) => {
  const objects = await listPermissions(req.workspaceId);
  res.status(200).send(objects);
};

module.exports = {
  list,
};
