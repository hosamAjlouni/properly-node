const standardControllerSet = require("./standardControllerSet");
const Contact = require("../Models/leases");

const viewSet = standardControllerSet(Contact);

module.exports = {
  ...viewSet
};
