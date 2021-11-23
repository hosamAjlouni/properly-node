const authenticationRequired = require("../middleware/authenticationRequired");
const router = require("express").Router();

const users = require("./users");
const workspaces = require("./workspaces");
const properties = require("./properties");
const units = require("./units");
const leases = require("./leases");
const contacts = require("./contacts");
const invoices = require("./invoices");
const payments = require("./payments");
const permissions = require("./permissions");
const user_permissions = require("./user_permissions");

router.use("/users", users);
router.use("/workspaces", workspaces);

router.use(authenticationRequired);

router.use("/properties", properties);
router.use("/units", units);
router.use("/leases", leases);
router.use("/contacts", contacts);
router.use("/invoices", invoices);
router.use("/payments", payments);
router.use("/permissions", permissions);
router.use("/user_permissions", user_permissions);

module.exports = router;
