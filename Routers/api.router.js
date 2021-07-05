const express = require("express");
const routers = require("./index.router");

const router = express.Router();

router.use("/properties", routers.propertiesRouter);
router.use("/units", routers.unitsRouter);
router.use("/contacts", routers.contactsRouter);
router.use("/users", routers.usersRouter);

module.exports = router;
