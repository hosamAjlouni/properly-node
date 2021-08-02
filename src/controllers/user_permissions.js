const userPermissionsValidators = require("../formValidators/user_permissions");
const {
  listWorkspaceUserPermissions,
  setWorkspaceUserPermissions,
} = require("../services/user_permissions");

const list = async (req, res) => {
  const userPermissions = await listWorkspaceUserPermissions(
    req.workspaceId,
    req.params.userId
  );
  res.status(200).send(userPermissions);
};

const update = async (req, res) => {
  // await userPermissionsValidators.updateValidator(
  //   req.workspaceId,
  //   req.params.id,
  //   req.body
  // );
  const userPermissions = await setWorkspaceUserPermissions(
    req.workspaceId,
    req.params.userId,
    req.body
  );
  res.status(200).send(userPermissions);
};

module.exports = {
  list,
  update,
};
