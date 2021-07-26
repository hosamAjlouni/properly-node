const authenticationRequired = require("../middleware/authenticationRequired");
const router = require("express").Router();

const users = require("./users");
const workspaces = require("./workspaces");
const properties = require("./properties");
const units = require("./units");
const leases = require("./leases");
const contacts = require("./contacts");

router.use("/users", users);
router.use("/workspaces", authenticationRequired, workspaces);
router.use("/properties", authenticationRequired, properties);
router.use("/units", authenticationRequired, units);
router.use("/leases", authenticationRequired, leases);
router.use("/contacts", authenticationRequired, contacts);

module.exports = router;
