const Workspace = require("./workspaces");
const User = require("./users");
const Property = require("./properties");
const Unit = require("./units");
const Contact = require("./contacts");
const Lease = require("./leases");
const Invoice = require("./invoices");
const Payment = require("./payments");
const Permission = require("./permissions");
require("./associations");

module.exports = {
  Workspace,
  User,
  Property,
  Unit,
  Lease,
  Contact,
  Invoice,
  Payment,
};
