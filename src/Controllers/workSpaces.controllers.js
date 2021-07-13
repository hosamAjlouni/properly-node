const standardControllerSet = require("./standardControllerSet");
const WorkSpace = require("../Models/workspaces");

const viewSet = standardControllerSet(WorkSpace);

module.exports = {
  ...viewSet
};
