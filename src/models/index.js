const User = require("./users");
const Property = require("./properties");
const Unit = require("./units");
const Contact = require("./contacts");
const Lease = require("./leases");
const Workspace = require("./workspaces");
require('./associations');

module.exports = {
  User,
  Property,
  Unit,
  Lease,
  Contact,
  Workspace
};
