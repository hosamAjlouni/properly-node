const router = require("express").Router();

const users = require("./users");
const workspaces = require("./workspaces");
const properties = require("./properties");
const units = require("./units");
const leases = require("./leases");
const contacts = require("./contacts");

router.use("/users", users);
router.use("/workspaces", workspaces);
router.use("/properties", properties);
router.use("/units", units);
router.use("/leases", leases);
router.use("/contacts", contacts);

module.exports = router;
