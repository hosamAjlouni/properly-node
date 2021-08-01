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

router.use("/users", users);
router.use("/workspaces", authenticationRequired, workspaces);
router.use("/properties", authenticationRequired, properties);
router.use("/units", authenticationRequired, units);
router.use("/leases", authenticationRequired, leases);
router.use("/contacts", authenticationRequired, contacts);
router.use("/invoices", authenticationRequired, invoices);
router.use("/payments", authenticationRequired, payments);

module.exports = router;
