const standardControllerSet = require("./standardControllerSet");
const Lease = require("../Models/leases");

const viewSet = standardControllerSet(Lease);

module.exports = {
  ...viewSet
};
