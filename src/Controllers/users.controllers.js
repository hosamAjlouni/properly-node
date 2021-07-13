const standardControllerSet = require("./standardControllerSet");
const User = require("../Models/users");

const viewSet = standardControllerSet(User);

module.exports = {
  ...viewSet
};
