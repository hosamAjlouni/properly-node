const userPermissionsValidators = require("../formValidators/user_permissions");
const {
  listWorkspaceUserPermissions,
  setWorkspaceUserPermissions,
} = require("../services/user_permissions");

const list = async (req, res) => {
  const objects = await listWorkspaceUserPermissions(req.workspaceId, req.params.userId);
  res.status(200).send(objects);
};

const update = async (req, res) => {
  // await userPermissionsValidators.updateValidator(
  //   req.workspaceId,
  //   req.params.id,
  //   req.body
  // );
  const instance = await setWorkspaceUserPermissions(
    req.workspaceId,
    req.params.userId,
    req.body
  );
  res.send(instance);
};

module.exports = {
  list,
  update,
};
